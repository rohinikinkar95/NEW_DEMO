const mongoose = require('mongoose')
const authorSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },



});
module.exports = mongoose.model('author', authorSchema);