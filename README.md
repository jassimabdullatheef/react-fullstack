# react-fullstack

add config/dev.js with following code
```
module.exports = {
    googleClientId: 'client-id-from-google-developer-console',
    googleClientSecret: 'client-secret-from-google-developer-console'
    mongoURI: 'your-mongodb-uri-with-username-and-password',
    cookieKey: 'any-random-name-to-be-named-as-cookie',
    stripePublishableKey: 'stripe-publishable-key',
    stripeSecretKey: 'stripe-secret-key',
    sendGridApiKey: 'send-grid-api-key',
    redirectDomain: 'http://localhost:3000'
}
```

Add .env.production and .env.development with the following code

```
REACT_APP_STRIPE_KEY=stripe-publishable-key
```