const axios = require('axios');

const router = require('express').Router();
const restricted = require('../auth/authenticate-middleware.js');

router.get('/', restricted, (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios //axios to get the data
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});//Get list of jokes after being properly logged in


module.exports = router;
