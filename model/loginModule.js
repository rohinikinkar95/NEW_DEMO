const mongoose = require('mongoose')
const loginSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,


    },
    otp: {
        type: String,

    },
    isVerified: {
        required: true,
        type: Boolean,
        default: false
    }

});
module.exports = mongoose.model('otpdb', loginSchema);