const sgMail = require('@sendgrid/mail')
const keys = require('../config/keys')

sgMail.setApiKey(keys.sendGridApiKey)

class Mailer {
  constructor(content, template) {
    this.msg = {
      to: content.recepients,
      from: 'no_reply@emaily.com',
      subject: content.subject,
      text: content.body,
      html: template,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
        openTracking: {
          enable: true
        }
      }
    }
  }

  async send() {
    const response = await sgMail.send(this.msg)
    return response
  }
}

module.exports = Mailer
