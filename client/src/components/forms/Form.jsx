import React from 'react';
import { VscReferences } from "react-icons/vsc";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';



function Form({ type }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const submit = async (data) => {
        if (type === 'login') {
            let config = {
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify(data),
            };

            let res = await fetch("/api/access", config);
            res = await res.json();
            if (res?.status === 200) {
            }
        }
        if (type === 'signup') {
            try {
                let config = {
                    method: "PUT",
                    contentType: "application/json",
                    body: JSON.stringify(data),
                };
                let res = await fetch("/api/access", config);
                res = await res.json();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const sendotp = async() =>{
        let res = await fetch(`api.testbuddy.live/v1/auth/verifyotp`);
        res = res.json();
        console.log(res);
    }

    return (
        <div className='h-full backdrop:blur-sm flex flex-col items-center justify-center pt-[2rem] overflow-hidden ' >
            <h1 className='flex justify-start mt-3  text-2xl w-[92%] text-white ' ><p className='pl-1 pr-4 font-semibold ' >Welcome Back</p></h1>
            <div className=' h-[95%] w-[95%] rounded-lg'>
                {
                    type == "sign-in" ?
                        <div className='h-[80%]   flex flex-col  justify-center  ' >
                            <form className='mt-2' onSubmit={handleSubmit(submit)} >
                                <div className='p-2  '>
                                    <label htmlFor="number" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8]0e8] mb-1 ' >Number</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-centertext-[gray] font-[500]   '>
                                        <img src="/assets/signup/profile.svg" alt="" width={30} height={30} fill="#795fe8" className='ml-2 ' />
                                        <input type="number" placeholder='Eg. 9301230333' name='number' className='bg-transparent text-[gray] p-3  w-[90%] '
                                            {
                                            ...register('number', {
                                                required: "Please Fill The Number"
                                            })
                                            }
                                        />
                                        <button className='px-3 bg-[#461ed3] text-white' onClick={sendotp}  >send</button>
                                    </div>
                                </div>
                                {errors.number && (
                                    <p className="" style={{ color: "red" }} >{errors.number.message}</p>
                                )}

                                <div className='p-2' >
                                    <label htmlFor="otp" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8] mb-1 ' >Otp</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-center text-[gray] font-[500]   '>
                                        <img src="/assets/signup/password.svg" alt="" width={25} height={25} className='ml-2 ' />
                                        <input type="number" placeholder='Eg.abc123@' name='otp' className='bg-transparent  text-[gray]  p-3 w-[90%] '
                                            {
                                            ...register('otp', {
                                                required: "Please Fill The Password"
                                            })
                                            }
                                        />

                                    </div>
                                </div>
                                {errors.otp && (
                                    <p className="" style={{ color: "red" }} >{errors.otp.message}</p>
                                )}


                                <button type='submit' className='flex justify-center w-[98%] mr-auto ml-auto mt-4 p-[1rem] rounded-lg  bg-[#461ed3] text-white font-[500] hover:bg-[#765de9] ' >
                                    Login
                                </button>

                                <Link to={'/sign-up'} className='mt-3 text-center   cursor-pointer w-full block '>
                                    <h4 className='hover:[#765de9] '>If you have not created Account ? <p className='font-semibold text-red-500 ' >Sign Up</p> </h4>
                                </Link>

                            </form>
                        </div> :
                        <div>
                            <form className='mt-2' >
                                <div className='p-2  '>
                                    <label htmlFor="username" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8]0e8] mb-1 ' >username</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-centertext-[gray] font-[500]   '>
                                        <img src="/assets/signup/profile.svg" alt="" width={30} height={30} fill="#795fe8" className='ml-2 ' />
                                        <input type="text" placeholder='Eg.abc' name='UserName' className='bg-transparent text-[gray] p-3  w-[90%]  '
                                            {...register("UserName", {
                                                required: "Username is required",
                                                validate: (value) => {
                                                    if (value.length < 3) {
                                                        return "Username must be at least 3 characters";
                                                    }
                                                },
                                            })}
                                        />
                                    </div>
                                </div>
                                {errors.UserName && (
                                    <p className="" style={{ color: "red" }} >{errors.UserName.message}</p>
                                )}

                                <div className='p-2' >
                                    <label htmlFor="number" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8] mb-1 ' >Number</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-center text-[gray] font-[500]  '>
                                        <img src="/assets/signup/phone.svg" alt="" width={25} height={25} className='ml-2 ' />
                                        <input type="tel" name='Phone' placeholder='Eg.7892625927' className='bg-transparent  text-[gray] p-3 w-[90%]  '
                                            {
                                            ...register('Phone', {
                                                required: "Phone Number is Required",
                                                validate: (value) => {
                                                    if (value.length !== 10) {
                                                        return "Fill Correct Number";
                                                    }
                                                }
                                            })
                                            }
                                        />
                                    </div>
                                </div>
                                {errors.Phone && (
                                    <p className="" style={{ color: "red" }} >{errors.Phone.message}</p>
                                )}


                                <div className='p-2' >
                                    <label htmlFor="password" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8] mb-1 ' >Password</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-center text-[gray] font-[500]   '>
                                        <img src="/assets/signup/password.svg" alt="" width={25} height={25} className='ml-2 ' />
                                        <input type="password" name='Password' placeholder='Eg.abc123@' className='bg-transparent  text-[gray]  p-3 w-[90%]  '
                                            {
                                            ...register('Password', {
                                                required: "Password is required",
                                                validate: (value) => {
                                                    if (value.length < 3) {
                                                        return "password must be at least 3 characters";
                                                    }
                                                }
                                            })
                                            }
                                        />
                                    </div>
                                </div>
                                {errors.Password && (
                                    <p className="" style={{ color: "red" }} >{errors.Password.message}</p>
                                )}

                                <div className='p-2' >
                                    <label htmlFor="confirmPassword" className='line-clamp-1 ml-.5 font-semibold text-[0.9rem] text-[#000000e8] mb-1 ' >Confirm Password</label>
                                    <div style={{ border: "1px solid #4d26d7" }} className='flex justify-around items-center text-[gray] font-[500]  '>
                                        <img src="/assets/signup/password.svg" alt="" width={25} height={25} className='ml-2 ' />
                                        <input type="password" name='ConfPassword' placeholder='Eg.abc123@' className='bg-transparent   p-3 w-[90%]'
                                            {
                                            ...register('ConfPassword', {
                                                required: "Confirm password is required",
                                            })
                                            }
                                        />
                                    </div>
                                </div>
                                {errors.ConfPassword && (
                                    <p className="" style={{ color: "red" }} >{errors.ConfPassword.message}</p>
                                )}



                                <button className='flex justify-center w-[98%] mr-auto ml-auto mt-4 p-[1rem] rounded-lg  bg-[#461ed3] text-white font-[500] hover:bg-[#765de9] ' >
                                    Register
                                </button>


                                <Link to={'/sign-in'} className='mt-3 text-center font-semibold text-[2xl] cursor-pointer w-full block '>
                                    <p className='hover:[#765de9] '>LOGIN</p>
                                </Link>

                            </form>
                        </div>
                }
            </div>
        </div>
    )
}

export default Form