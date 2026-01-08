import requireCredits from "../middleware/requireCredits.js";
import requireLogin from "../middleware/requireLogin.js";
import Survey from "../models/Survey.js";
import createMailerService from "../services/mailerService.js";
import surveyTemplate from "../services/emailTemplates/surveyTemplate.js";

const surveyRoutes = (app) => {
    app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
        try {
            const { title, subject, body, recipients } = req.body;

            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
                _user: req.user.id,
                dateSent: Date.now(),
            });

            const mailer = createMailerService();

            await mailer.sendEmail({
                subject: survey.subject,
                recipients: survey.recipients,
                html: surveyTemplate(survey),
            });

            await survey.save();

            res.status(200).send(survey);
        } catch (err) {
            console.error("POST /api/surveys failed:", err?.response?.body || err);

            res.status(500).send({
                error: err.message,
                sendgrid: err?.response?.body || null,
            });
        }
    });
};

export default surveyRoutes;