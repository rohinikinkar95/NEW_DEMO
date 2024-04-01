const express = require('express');
const router = express.Router();

const registerController = require('../controllers/register');


router.post('/register', registerController.registerAll);
router.post('/login', registerController.login);
router.post('/verify', registerController.verfiyOtp);
module.exports = router;