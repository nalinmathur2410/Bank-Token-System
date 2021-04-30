const express = require('express');
const router = express.Router();
const User = require('../models/user');
const localStorage = require('localStorage');

router.get('/login', function (req, res, next) {
    const user = localStorage.getItem('user');
    if (user) {
        switch (user.role) {
            case 'officer': {
                res.render('officer');
                break;
            }
            case 'agent': {
                res.render('agent');
                break;
            }
            case 'display': {
                res.render('display');
                break;
            }
        }
    } else {
        res.render('login');
    }
});

router.get('/register', function (req, res, next) {
    res.render('registration');
});

router.post('/login', function (req, res, next) {
    User.findOne(req.body, {}, {}, function (err, result) {
        if (err) {
            res.send(err);
        } else if (result) {
            localStorage.setItem('user', result);
            switch (result.role) {
                case 'officer': {
                    res.render('officer');
                    break;
                }
                case 'agent': {
                    res.render('agent');
                    break;
                }
                case 'display': {
                    res.render('display');
                    break;
                }
            }
        } else {
            res.render('login', {message: "Invalid Username or Id"});
        }
    });
});

router.post('/register', function (req, res, next) {
    const user = new User(req.body);
    user.save(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.render('registration', {message: "User Registered"});
        }
    });
});

module.exports = router;
