import mongoose from "mongoose"

import requireCredits from "../middleware/requireCredits.js"
import requireLogin from "../middleware/requireLogin.js"
import mailerService from "../services/mailerService.js"
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js"

const Survey = mongoose.model('surveys');
const Recipient = mongoose.model('recipients');

const surveyRoutes = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //send the email here
        mailerService(survey, surveyTemplate(survey));
    });
}