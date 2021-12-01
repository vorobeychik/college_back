const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    avatar: String,
});

module.exports = mongoose.model('User', userSchema);