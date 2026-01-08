import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import path from 'path';
import passport from 'passport';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js'
import billingRoutes from './routes/billingRoutes.js'
import surveyRoutes from './routes/surveyRoutes.js'
import connectDB from './database/db.js';
import { cookieKey } from './config/keys.js'
import passportService from './services/passportService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passportService();

const app = express();
app.set('trust proxy', 1);

app.use(bodyParser.json());
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
billingRoutes(app);
surveyRoutes(app);

connectDB();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'dist')));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

const PORT = process.env.PORT || 1000;

app.listen(PORT);