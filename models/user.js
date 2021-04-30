const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    password: {type: String},
    role: {type: String}
}, {versionKey: false, timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;
