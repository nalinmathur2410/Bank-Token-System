const express = require('express');
const router = express.Router();
const Token = require('../models/token');
const io = require('socket.io-client');
const socket = io('http://localhost:3000');
let tokenArray = [];

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect('/display');
});

socket.on('changeDisplay', async (data) => {
    try {
        const token = await Token.findById(data.data._id);
        tokenArray.push(token);
        data.res.render('display', {message: 'Token Changed'});
    } catch (error) {
        data.res.send(error);
    }
});

module.exports = router;
