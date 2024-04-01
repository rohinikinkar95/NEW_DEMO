const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/Book';


const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("dB connected");
    }
    catch (error) {
        console.log(' errror while connecting ' + error.message);
    }
};
module.exports = connectDB;