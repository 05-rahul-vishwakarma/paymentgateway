const Rozarpay = require('razorpay');

const rozarpay = async (req, res) => {
   console.log(req.body);
   const rozarpay = new Rozarpay({
      key_id: 'rzp_test_PUhry8KkFfyGoo',
      key_secret: 'X9NexIkn4StZlv55OJw1gnfL'
   })

   const options = {
      amount: req.body.amount,
      currency: req.body.currency,
      receipt: "receipt",
      payment_capture: 1
   }

   console.log(options);

   try {
      let response = await rozarpay.orders.create(options);
      res.json({
         order_id: response.id,
         currency: response.currency,
         amount: response.amount
      })
   } catch (error) {
      console.log(error);
   }
}

const getPaymentDetails = async (req, res) => {
   const { paymentId } = req.params;

   const rozarpay = new Rozarpay({
      key_id: 'rzp_test_PUhry8KkFfyGoo',
      key_secret: 'X9NexIkn4StZlv55OJw1gnfL'
   })

   try {
      const payments = await Razorpay.payments.fetch(paymentId);
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

module.exports = {rozarpay , getPaymentDetails }