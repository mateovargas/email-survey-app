import passport from 'passport';


const authRoutes = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        //res.redirect('/api/current_user');
        // After successful Google login, send user back to the client app
        if (process.env.NODE_ENV === 'production') {
            // In production, your client is served by the same origin as the server
            res.redirect('/surveys');
        } else {
            // In Vite dev, the client is at :5173 and the API at :5000
            res.redirect('http://localhost:5173/surveys');
        }
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout(() => {
            res.redirect('/');
        });
    });
}

export default authRoutes;
