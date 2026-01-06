import sendGrid from 'sendgrid';
import { mail as helper } from 'sendgrid';

import { sendGridKey } from '../config/keys.js';

const DEFAULT_FROM_EMAIL = 'aperfectcirclerlz@gmail.com'

const formatAddresses = (recipients) => {
    recipients.map(({ email }) => new helper.Email(email));
}

const buildMail = ({ fromEmail, subject, recipients, html }) => {
    const mail = new helper.Mail();

    mail.setFrom(new helper.Email(fromEmail || DEFAULT_FROM_EMAIL));
    mail.setSubject(subject);
    mail.addContent(new helper.Content('text/html', html));

    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    mail.addTrackingSettings(trackingSettings);

    const personalization = new helper.Personalization();
    formatAddresses(recipients).forEach(email => {
        personalization.addTo(email);
    });
    mail.addPersonalization(personalization);

    return mail;
}

const createMailerService = ({
    apiKey = sendGridKey.key,
    defaultFromEmail = DEFAULT_FROM_EMAIL,
} = {}) => {
    const sendGridApi = sendGrid(apiKey);

    const sendEmail = async ({ subject, recipients, html, fromEmail }) => {
        const mail = buildMail({
            fromEmail: fromEmail || defaultFromEmail,
            subject,
            recipients,
            html
        });

        const request = sendGridApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        return sendGridApi.API(request);
    }

    return {
        sendEmail
    };
}

export default createMailerService