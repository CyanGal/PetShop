const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Sign Up Schema (for ADMIN)
const SignUpSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String
  },
  password: {
    type: String,
    trim: true
  },
  updated: Date,
});

module.exports = Mongoose.model('SignUp', SignUpSchema);
