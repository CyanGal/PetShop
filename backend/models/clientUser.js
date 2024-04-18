const mongoose = require('mongoose')

//Sign Up Schema (for User)
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false,
    },
    emailToken: {
        type: String,
    }
},
      
    { timestamps: true })

const clientUser = mongoose.model('clientUser', usersSchema)
module.exports = clientUser