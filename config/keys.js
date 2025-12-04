let googleAuthClient;
let cookieKey;
let mongoURI;

if (process.env.NODE_ENV === 'production') {
    const mod = await import('./prod.js');
    googleAuthClient = mod.googleAuthClient;
    cookieKey = mod.cookieKey;
    mongoURI = mod.mongoURI;
} else {
    const mod = await import('./dev.js');
    googleAuthClient = mod.googleAuthClient;
    cookieKey = mod.cookieKey;
    mongoURI = mod.mongoURI;
}
console.log({ googleAuthClient, cookieKey, mongoURI });
export { googleAuthClient, cookieKey, mongoURI };