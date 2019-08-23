const router = require('express').Router();
const db = require('./user-model.js');


const restricted = require('../auth/authenticate-middleware.js');

router.get('/users', restricted, (req, res) => {
    return db.findUser()
        .then(user => {
            res.status(200).json({ loggedInUser: req.user.username, user })
        })
        .catch(err => {
            res.status(400).json({ message: 'Could not retrieve user list, make sure you are logged in.' })
        })
})//creates a new user for database

module.exports = router;