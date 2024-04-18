const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  card_name: {
    type: String,
    require: true,
  },
  card_description: {
    type: String,
  },
  card_image: {
    type: String,
    require: true,
  },
  card_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  // Lidhja me admin
  adminCard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendee",
  },

});
const About = mongoose.model("About", cardSchema);

module.exports = About;