const Rozarpay = require('razorpay');
const crypto = require("crypto");
require("dotenv").config();

const rozarpay = async (req, res) => {
   const rozarpay = new Rozarpay({
      key_id: 'rzp_test_PUhry8KkFfyGoo',
      key_secret: 'X9NexIkn4StZlv55OJw1gnfL'
   })

   const options = {
      amount: req?.body?.amount,
      currency: req?.body?.currency,
      receipt: req?.body?.recipt,
      payment_capture: 1
   }



   try {
      let response = await rozarpay.orders.create(options);
      if (!response) throw new Error("response not return")
      res.json({
         response
      })
   } catch (error) {
      console.log(error);
   }
}

const getPaymentDetails = async (req, res) => {
   const paymentId = req.query.id;
   console.log(paymentId);
   const rozarpay = new Rozarpay({
      key_id: 'rzp_test_PUhry8KkFfyGoo',
      key_secret: 'X9NexIkn4StZlv55OJw1gnfL'
   })

   try {
      const payments = await rozarpay.payments.fetch(paymentId);
      if (!payments) {
         throw new Error("something went wrong during the fetching payments")
      }

      res.json({
         message: "okay good working",
         status: 200,
         data: payments
      })

   } catch (error) {
      console.log(error);
   }

}

const orderVerify = async (req, res) => {
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;


   const sha = crypto.createHmac("sha256", "X9NexIkn4StZlv55OJw1gnfL");
   //order_id + "|" + razorpay_payment_id
   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
   const digest = sha.digest("hex");
   if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
   }

   res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
   });
}

module.exports = { rozarpay, getPaymentDetails, orderVerify }