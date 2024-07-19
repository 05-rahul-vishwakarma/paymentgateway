const express = require('express');
const { sendOtp, verifyOtp } = require('../../controler/authControler/auth');
const router = express.Router();

router.post('/send-otp',sendOtp);
router.post('/verify-otp' ,verifyOtp)
module.exports = router;