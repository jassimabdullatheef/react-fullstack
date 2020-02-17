const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('survey')

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recepients } = req.body

    console.log(req.body)

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

  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys/webhook', (req, res) => {
    console.log(req.body)
    res.send({})
  })
}
