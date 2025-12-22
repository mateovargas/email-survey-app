import mongoose from 'mongoose';
import Recipient from './Recipient';

const { Schema } = mongoose;

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [Recipient],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;