/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



function Form() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [otpSent, setOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const sendOtp = async (data) => {
        try {
            const response = await axios.post('/send-otp', { phoneNumber: data.phoneNumber });
            console.log(response);
            setMessage(response.data);
            setOtpSent(true);
            setPhoneNumber(data.phoneNumber);
            reset(); // Clear the input fields


        } catch (error) {
            setMessage('Error sending OTP');
        }
    };

    const verifyOtp = async (data) => {
        console.log(data);
        try {
            const response = await axios.post('/verify-otp', { phoneNumber: phoneNumber, otp: data.otp });
            console.log(response);
            setMessage(`Auth Token: ${response.data.authToken}`);
            setAuthToken(response.data.authToken);
            if(response?.data?.status === 200){
                navigate('/home')
            }
        } catch (error) {
            setMessage('Error verifying OTP');
        }
    };

    return (
        <div className='h-full backdrop:blur-sm flex flex-col items-center justify-center pt-[2rem] overflow-hidden ' >
            <h1 className='flex justify-start mt-3  text-2xl w-[92%] text-white ' ><p className='pl-1 pr-4 font-semibold ' >Welcome Back</p></h1>
            <div className=' h-[95%]  w-[95%] grid place-items-center rounded-lg'>
                <div className='border-2 border-[#4d26d7] ' >
                    {!otpSent ? (
                        <form onSubmit={handleSubmit(sendOtp)}>
                            <div className=' flex ' >
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    name='phoneNumber'
                                    {...register('phoneNumber', { required: true })}
                                    className='w-[90%]  p-2 bg-transparent '
                                />
                                {errors.phoneNumber && <span>Phone number is required</span>}
                                <button type="submit" className='border-2 text-[.8rem] ' >Send OTP</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit(verifyOtp)}>
                            <div className='flex ' >
                                <div className=' ' >
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        name='otp'
                                        {...register('otp', { required: true })}
                                        className='w-[90%]  p-2 bg-transparent '
                                    />
                                    {errors.otp && <span>OTP is required</span>}
                                </div>
                                <button className='border-2 text-[.8rem] ' type="submit">Verify OTP</button>
                            </div>
                        </form>
                    )}

                </div>


            </div>
        </div>
    )
}

export default Form