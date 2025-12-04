import passport from 'passport';


const authRoutes = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/api/current_user');
    });

    app.get('/api/current_user', (req, res) => {
        console.log(req.user);
        res.send(req.user || 'no user');
    });

    app.get('/api/logout', (req, res) => {
        req.logout(() => {
            console.log(req.user);
            res.send(req.user);
        });
    });
}

export default authRoutes;
