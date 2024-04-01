const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/adminAuth');
// Protected route
router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});

module.exports = router;