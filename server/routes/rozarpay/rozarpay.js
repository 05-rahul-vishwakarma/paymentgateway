const express = require('express');
const {rozarpay, getPaymentDetails, orderVerify} = require('../../controler/rozar/rozarpay');
const router = express.Router();

router.post('/orders',rozarpay);
router.post ('/orders/verify',orderVerify)
router.get ('/getPaymentDetails',getPaymentDetails)

module.exports = router;