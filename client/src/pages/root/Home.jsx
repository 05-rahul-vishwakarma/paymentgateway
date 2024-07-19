/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"


function Home() {

  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true)
      }

      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script);
    })
  }

  const createRazorPayOrder = async (amount) => {
    let data = {
      amount: amount * 100,
      currency: "INR"
    }

    try {
      let res = await axios.post('/orders', data);
      // console.log(res);
      handleRazorPayScreen(amount)
    } catch (error) {
      console.log(error);
    }

  }

  const handleRazorPayScreen = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")
    console.log(res);
    if (!res) alert("something error at razorpay api screen load")

    const options = {
      key: "rzp_test_PUhry8KkFfyGoo",
      amount: amount,
      currency: 'INR',
      name: "rv",
      description: "payment to rv pvt.Ltd",
      handler: function (res) {
        setResponseId(res)
      },
      prefill: {
        name: "rv pvt.",
        email: "abc@mail.com"
      },
      theme: {
        color: "purple"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  const paymentfetch = (e) => {
    e.preventDefault();
    try {
      const paymentId = e.target.paymentId.value;
      let res = axios.get(`/getPaymentDetails/${paymentId}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button onClick={() => createRazorPayOrder(10000)} > payment to 100</button>
    </div>
  )
}

export default Home