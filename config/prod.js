const cookieKey = {
    key: process.env.COOKIE_KEY
}

const googleAuthClient = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

const mongoURI = {
    URI: process.env.MONGO_URI
}

const sendGridKey = {
    key: process.env.SENDGRID_API_KEY
}

const stripeKeys = {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY
}

export {
    cookieKey,
    googleAuthClient,
    mongoURI,
    sendGridKey,
    stripeKeys
}