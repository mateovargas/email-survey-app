let cookieKey;
let googleAuthClient;
let mongoURI;
let sendGridKey;
let stripeKeys;


if (process.env.NODE_ENV === 'production') {
    const mod = await import('./prod.js');
    cookieKey = mod.cookieKey;
    googleAuthClient = mod.googleAuthClient;
    mongoURI = mod.mongoURI;
    sendGridKey = mod.sendGridKey;
    stripeKeys = mod.stripeKeys;
} else {
    const mod = await import('./dev.js');
    googleAuthClient = mod.googleAuthClient;
    cookieKey = mod.cookieKey;
    mongoURI = mod.mongoURI;
    sendGridKey = mod.sendGridKey;
    stripeKeys = mod.stripeKeys;
}

export { cookieKey, googleAuthClient, mongoURI, sendGridKey, stripeKeys };