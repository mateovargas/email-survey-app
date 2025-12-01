import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';

import { googleAuthClient } from '../config/keys.js';
import User from '../models/User.js';

const passportService = () => {
    passport.use(new GoogleStrategy({
        clientID: googleAuthClient.clientID,
        clientSecret: googleAuthClient.clientSecret,
        callbackURL: 'http://localhost:1000/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({
            googleID: profile.id
        });
        if (!existingUser) {
            const newUser = new User({
                googleID: profile.id
            });
            await newUser.save();
            done(null, newUser);
        } else {
            done(null, existingUser);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};

export default passportService;