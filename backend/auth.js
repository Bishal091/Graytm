const { auth } = require('express-openid-connect');


const config = {
    authRequired: false, // Set to true if you want to require authentication for all routes
    auth0Logout: true, // Enable Auth0 logout functionality
    secret:  `${process.env.RANDOM_STRING}`, // Replace with a long, random string
    baseURL: 'http://localhost:5173', // Replace with your app's base URL
    clientID: `${process.env.CLIENT_ID}`, // Replace with your Auth0 Client ID
    issuerBaseURL:  `${process.env.ISSUEBASEURL}` // Replace with your Auth0 Domain
  };

  module.exports = auth(config);