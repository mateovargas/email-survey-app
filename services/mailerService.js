import sgMail from "@sendgrid/mail";
import { sendGridKey } from "../config/keys.js";

const DEFAULT_FROM_EMAIL = "aperfectcirclerlz@gmail.com";

const createMailerService = ({
    apiKey = sendGridKey.key,
    defaultFromEmail = DEFAULT_FROM_EMAIL,
} = {}) => {
    sgMail.setApiKey(apiKey);

    const sendEmail = async ({ subject, recipients, html, fromEmail }) => {
        const to = recipients.map(({ email }) => email);

        const msg = {
            to,
            from: fromEmail || defaultFromEmail,
            subject,
            html,
            trackingSettings: {
                clickTracking: {
                    enable: true,
                    enableText: true,
                },
            },
        };

        return sgMail.send(msg);
    };

    return { sendEmail };
};

export default createMailerService;