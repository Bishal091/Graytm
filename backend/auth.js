const { auth } = require('express-openid-connect');


const config = {
    authRequired: false, // Set to true if you want to require authentication for all routes
    auth0Logout: true, // Enable Auth0 logout functionality
    secret:  `${process.env.RANDOM_STRING}`, // Replace with a long, random string
    baseURL: 'http://localhost:5173', // Replace with your app's base URL
    clientID: '8wYbnQlEbEk5hXpOQKI5ZoSuPFAm4h4e', // Replace with your Auth0 Client ID
    issuerBaseURL: 'https://dev-vrswwuzj4trdznbk.us.auth0.com' // Replace with your Auth0 Domain
  };

  module.exports = auth(config);