/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"
import { useForm } from 'react-hook-form';


function Home() {

  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [paymentData, setPaymentData] = useState(null);
  const [message, setMessage] = useState('');


  // console.log(responseState);

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;

  //     script.onload = () => {
  //       resolve(true)
  //     }

  //     script.onerror = () => {
  //       resolve(false)
  //     }

  //     document.body.appendChild(script);
  //   })
  // }

  // const createRazorPayOrder = async (amount) => {
  //   let data = {
  //     amount: amount * 100,
  //     currency: "INR"
  //   }

  //   try {
  //     let res = await axios.post('/orders', data);
  //     handleRazorPayScreen(amount)
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  // const handleRazorPayScreen = async (amount) => {
  //   const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")
  //   console.log(res);
  //   if (!res) alert("something error at razorpay api screen load")

  //   const options = {
  //     key: "rzp_test_PUhry8KkFfyGoo",
  //     amount: amount,
  //     currency: 'INR',
  //     name: "rv",
  //     description: "payment to rv pvt.Ltd",
  //     handler: function (res) {
  //       setResponseId(res)
  //     },
  //     prefill: {
  //       name: "rv pvt.",
  //       email: "abc@mail.com"
  //     },
  //     theme: {
  //       color: "purple"
  //     }
  //   }

  //   const paymentObject = new window.Razorpay(options)
  //   paymentObject.open()
  // }

  // const paymentfetch = (e) => {
  //   e.preventDefault();
  //   try {
  //     const paymentId = e.target.paymentId.value;
  //     let res = axios.get(`/getPaymentDetails/${paymentId}`);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const paymenthandler = async (amount, e) => {
    try {
      console.log("yah works");
      let data = {
        amount: amount * 100,
        currency: "INR",
        recipt: "recipet#1"
      }

      const res = await axios.post('/orders', data);
      var options = {
        "key": "rzp_test_PUhry8KkFfyGoo", // Enter the Key ID generated from the Dashboard
        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": data.currency,
        "name": "Rv", //your business name
        "description": "Test Transaction",
        "order_id": res?.data?.response?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const body = {
            ...response,
          };
          const validateRes = await axios.post(`/orders/verify`, body)
          console.log(validateRes);
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Rahul kumar", //your customer's name
          "email": "rv@example.com",
          "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();

    } catch (error) {
      console.log(error);
    }
  }

  const fetchPaymentData = async (data) => {
    try {
      console.log(data);
      const response = await axios.get(`/getPaymentDetails/?id=${data.paymentId}`);
      setPaymentData(response?.data);
      setMessage('');
    } catch (error) {
      setMessage('Error fetching payment data');
      setPaymentData(null);
    }
  };

  console.log(paymentData);

  return (
    <div>
      <div style={styles.container}>
        <button style={styles.button} className="hover:bg-fuchsia-700 mb-4 " onClick={() => paymenthandler(10000)} > payment to 10000</button>
        <h1 style={styles.header}>Fetch Payment Data</h1>
        <form onSubmit={handleSubmit(fetchPaymentData)} style={styles.form}>
          <div style={styles.inputContainer} className=" " >
            <div className=" w-[90%] mr-auto ml-auto flex " >
              <input
                type="text"
                placeholder="Enter payment ID"
                name="paymentId"
                {...register('paymentId', { required: true })}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Fetch Payment</button>
            </div>
          </div>
          {errors.paymentId && <span style={styles.error}>Payment ID is required</span>}
        </form>
        {message && <p style={styles.message}>{message}</p>}
        {paymentData && (
          <div style={styles.paymentData}>
            <h2>Payment Data</h2>
            <div>
              <h1>Amount : {paymentData?.data?.amount}</h1>
              <p> order id : {paymentData?.data?.id} </p>
              <div>
                <p className="underline " >Receiver Bank details</p>
                <p>email: {paymentData?.data?.email} </p>
                <p>contact Number : {paymentData?.data?.contact
                } </p>
              </div>

            </div>

          </div>
        )}
      </div>

    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #4d26d7',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4d26d7',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  message: {
    color: 'red',
    marginTop: '10px',
  },
  paymentData: {
    marginTop: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};



export default Home