/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

//protection
module.exports = (req, res, next) => {
  // we'll read the username and password from headers
  // the client is responsible for setting those headers

  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodeToken) => {
      if (error) {
        res.status(400).json({ message: 'Sorry, can not pass, check credentials' })
      } else {
        req.user = { username: decodeToken.username }
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'Darn it, no token found!' })
  }

}