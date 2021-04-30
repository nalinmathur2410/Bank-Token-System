const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const socket = require("socket.io");

const app = express();
let io = socket();
app.io = io;

const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const displayRouter = require('./routes/display');
const officerRouter = require('./routes/officer');
const agentRouter = require('./routes/agent')(io);


io.on('connection', (socket) => {
    console.log('connected');
});

mongoose.connect('mongodb://localhost:27017/queue', {
    useUnifiedTopology: true, useNewUrlParser: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/officer', officerRouter);
app.use('/agent', agentRouter);
app.use('/display', displayRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
