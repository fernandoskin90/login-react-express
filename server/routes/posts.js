const request = require('request');
const router = require('express').Router();
const { validateUserByToken } = require('../config/auth');

router.get('/', validateUserByToken, (req, res) => {
  request('https://jsonplaceholder.typicode.com/posts', function(error, _, data) {
    res.json({
      data: data ? JSON.parse(data) : null,
      message: error || ''
    })
  })
})

module.exports = router
