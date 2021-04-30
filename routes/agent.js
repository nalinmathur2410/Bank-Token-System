const express = require('express');
const app = require('../app');
const socket = app.io;
const Token = require('../models/token');

const agent = (io) => {
    const router = express.Router();
    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('agent');
    });
    router.post('/generate-token', async function (req, res) {
        try {
            const token = new Token(req.body);
            const result = await token.save();
            if (result) {
                io.emit('changeDisplay', {data: result, res});
                res.render('agent');
            }
        } catch (error) {
            res.send(error);
        }
    });
    return router;
}
module.exports = agent;
