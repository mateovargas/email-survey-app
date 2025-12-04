const googleAuthClient = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}

const cookieKey = {
    key: process.env.COOKIE_KEY
}

const mongoURI = {
    URI: process.env.MONGO_URI
}

export {
    googleAuthClient,
    cookieKey,
    mongoURI
}