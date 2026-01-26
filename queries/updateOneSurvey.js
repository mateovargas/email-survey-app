import Survey from "../models/Survey.js";

export function updateOneSurvey(surveyId, email, choice) {
    return Survey.updateOne(
        {
            _id: surveyId,
            recipients: {
                $elemMatch: { email, responded: false }
            }
        },
        {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
        }
    ).exec();
}