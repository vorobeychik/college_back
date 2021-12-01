const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    type: String,
    coast: String,
    time: { value: String, isActive: Boolean },
    quality: {value: String, isActive: Boolean},
    available: { value:String, isActive: Boolean},
    devices: { value:String, isActive: Boolean},
    support: { value:String, isActive: Boolean},
});

module.exports = mongoose.model('Plan', userSchema);