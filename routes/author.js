const express = require('express');
const router = express.Router();

const authorController = require('../controllers/admin');


router.get('/upload', authorController.bookUpload);

module.exports = router;