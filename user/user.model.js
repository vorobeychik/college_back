const mongoose = require("mongoose");
const { ObjectId} = require("mongoose");

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    plan: ObjectId,
});

module.exports = mongoose.model('FilmUser', userSchema);