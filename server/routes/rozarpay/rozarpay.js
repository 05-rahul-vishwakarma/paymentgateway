const express = require('express');
const {rozarpay, getPaymentDetails} = require('../../controler/rozar/rozarpay');
const router = express.Router();

router.post('/orders',rozarpay);
router.get ('/getPaymentDetails',getPaymentDetails)

module.exports = router;