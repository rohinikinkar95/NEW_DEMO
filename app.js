const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/admin');
const protectedRoute = require('./routes/protected');
const authorRoutes = require('./routes/author');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("view", path.resolve("./views"));

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/user', registerRoutes);
app.use('/author', authorRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

// let PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server is up and running on ${3000} ...`);
});