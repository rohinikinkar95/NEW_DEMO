const mongoose = require('mongoose')
const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,


    },
    address: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },

    roles: {
        type: String,
        enum: ['admin', 'user', 'author']
    },


});
module.exports = mongoose.model('register', registerSchema);