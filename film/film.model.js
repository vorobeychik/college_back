const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    type: String,
    director: String,
    image: String,
    description: String,
    country: String,
    releaseYear: String,
    runningTime: String,
});

module.exports = mongoose.model('Film', userSchema);