const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const Attendee = mongoose.model('Attendee', attendeeSchema);


module.exports = Attendee;