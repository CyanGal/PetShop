const mongoose = require("mongoose");
const { default: Navigate } = require("../../frontend/src/Components/Navigation/Navigate");

const SearchSchema = new mongoose.Schema({
    title: String,
    content: String,
  });
  
  
const Navigate = mongoose.model('Navigate', SearchSchema);

module.exports = Navigate;
