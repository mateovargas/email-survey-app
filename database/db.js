import colors from 'colors';
import mongoose, { connect } from "mongoose";

import { mongoURI } from '../config/keys.js';

const connectDB = async () => {
    const conn = await mongoose.connect(mongoURI.URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.red.underline.bold);
};

export default connectDB;