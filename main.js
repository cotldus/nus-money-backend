// demonstration of using Auth0 to login users before allowing access to endpoints
// to step through this, see James Quick's video tutorial at https://www.youtube.com/watch?v=QQwo4E_B0y8

const express = require('express');
const cors = require("cors");
// const data = require("./data");
const app = express();
require('dotenv').config();
const transactions = require("./transactions");
const user = require("./user");

app.use(express.json()); // JSON parser to accept JSON object responses
app.use(cors());
app.use(transactions.router);
app.use(user.router);

// const { auth, requiresAuth } = require('express-openid-connect');
// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET,
//     idpLogout: true,
//   })
// );

// // req.isAuthenticated is provided from the auth router
// app.get('/', (request, response) => {
//   response.send(request.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
// });

// app.get('/profile', requiresAuth(), (request, response) => {
//     response.send(JSON.stringify(request.oidc.user));
// });

const port = process.env.PORT || 3000;
app.listen(3000, (errors) => {
  if (errors) {
    console.log("Server couldn't start. Error: " + errors);
  } else {
    console.log(`Listening on port ${port}`);
  }
});