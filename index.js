import express from 'express';
import mongoose, { connect } from 'mongoose';
import colors from 'colors';
import cookieSession from 'cookie-session';
import passport from 'passport';

import { cookieKey, mongoURI } from './config/keys.js'
import authRoutes from './routes/authRoutes.js'
import passportService from './services/passport.js';


passportService();

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [cookieKey.key]
    })
);

//patch for cookie-session. use express-session in the future
app.use((req, res, next) => {
    if (req.session && typeof req.session.regenerate !== 'function') {
        req.session.regenerate = cb => cb();
    }
    if (req.session && typeof req.session.save !== 'function') {
        req.session.save = cb => cb();
    }
    if (req.session && typeof req.session.destroy !== 'function') {
        req.session.destroy = cb => cb();
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const connectDB = async () => {
    const conn = await mongoose.connect(mongoURI.URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.red.underline.bold);
};

connectDB();

const PORT = process.env.PORT || 1000;

app.listen(PORT);