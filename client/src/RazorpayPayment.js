// src/RazorpayPayment.js
import React, { useState } from 'react';
import { createOrder, verifyOrder } from './api';

const RazorpayPayment = () => {
  const [orderId, setOrderId] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const order = await createOrder({
      amount: 50000, // Amount in paisa
      currency: 'INR',
    });

    const options = {
      key: 'your_razorpay_key', // Enter your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async (response) => {
        const verificationResponse = await verifyOrder(response.razorpay_order_id);
        setVerificationStatus(verificationResponse);
      },
      prefill: {
        name: 'Test User',
        email: 'testuser@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Razorpay Payment Integration</h2>
      <button onClick={handlePayment}>Pay with Razorpay</button>
      {verificationStatus && (
        <div>
          <h3>Payment Verification Status</h3>
          <pre>{JSON.stringify(verificationStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RazorpayPayment;
