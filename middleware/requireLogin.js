const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must be logged in to purchase credits!' });
    }
    next();
}

export default requireLogin;