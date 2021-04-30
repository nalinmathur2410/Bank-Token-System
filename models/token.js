const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    name: {type: String},
    purpose: {type: String},
    tokenNo: {type: Number},
    tokenState: {type: Number}
}, {versionKey: false, timestamps: true});

const Token = mongoose.model('token', tokenSchema);
module.exports = Token;
