const mongoose = require('mongoose')
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('survey')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recepients } = req.body

    const survey = new Survey({
      title,
      body,
      subject,
      recepients: recepients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })

    const mailer = new Mailer(survey, surveyTemplate(survey))

    try {
      await mailer.send()
      await survey.save()
      req.user.credit -= 1
      const user = await req.user.save()

      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recepients: false
    })
    res.send(surveys)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhook', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice')

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)
        if (match) return { email, ...match }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recepients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recepients.$.responded': false },
            lastResponded: new Date()
          }
        ).exec()
      })
      .value()

    res.send({})
  })
}
