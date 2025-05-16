const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const validateEmailData = require('../middlewares/validateEmailData');


router.get('/', emailController.testRoute);

router.post('/send-email', validateEmailData, emailController.sendEmail);

module.exports = router; 