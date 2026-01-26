import { Path } from "path-parser";
import { URL } from "url";


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
            req.user.credits -= 1;
            const user = await req.user.save();
            res.status(200).send(user);
        } catch (err) {
            console.error("POST /api/surveys failed:", err?.response?.body || err);

            res.status(500).send({
                error: err.message,
                sendgrid: err?.response?.body || null,
            });
        }
    });

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const events = req.body.map(({ email, url }) => {
            try {
                const eventPathname = new URL(url).pathname;
                const path = new Path('/api/surveys/:surveyId/:choice');

                const match = path.test(eventPathname);
                if (!match) return null;
                return { email, surveyId: match.surveyId, choice: match.choice };
            } catch {
                return null
            }
        }).filter(event => event !== null);
        const uniqueEvents = Array.from(
            new Map([...events].reverse().map(e => [e.id, e])).values()
        ).reverse();
        console.log('Unique events:', uniqueEvents);
        res.send({});
    });
};

export default surveyRoutes;