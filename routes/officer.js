const express = require('express');
const router = express.Router();
const Token = require('../models/token');

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('officer');
});

router.get('/get-all-tokens', async function (req, res, next) {
    try {
        const allTokens = await Token.find();
        res.status(200).send(allTokens);
    } catch (error) {
        res.send(error);
    }
});

router.get('/select-token', function (req, res, next) {
    console.log('next token');
    res.redirect('/officer');
});

module.exports = router;
