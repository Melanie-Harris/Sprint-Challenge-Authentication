const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');
const users= require('./user-model.js');

router.post('/reg', (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash
  return users.addUser(user)
    .then(created => {
      res.status(201).json(created)
    }).catch(error => {
      res.status(500).json({ message: 'failed to register user' })
    })
})// creates user


router.post('/login', (req, res) => {
  let { password, username } = req.body
  users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Hello ${user.username}, You've successfully logged in`, token })
      } else {
        res.status(401).json({ message: 'invalid login info, try again.' })
      }
    }).catch(error => {
      res.status(500).json({ message: 'Hey backend, you messed up, login failed' })
    })
})// logs in the user

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const option = {
    expiresIn: '8h'
  }
  return jwt.sign(payload, secret.jwtSecret, option)
}// protection

module.exports = router;