const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/email_templates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });
};
