const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

const verifyToken = require('../middleware/adminAuth');
router.get('/getUser', verifyToken, adminController.getUser);

module.exports = router;