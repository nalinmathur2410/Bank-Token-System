const express = require('express');
const router = express.Router();
const socket = require('socket.io-client');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('officer');
});

router.get('/next-token', function (req, res, next) {
    console.log('next token');
    res.redirect('/officer');
});

module.exports = router;
