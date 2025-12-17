import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    credits: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

export default User;