import React from 'react'
import Form from '../../components/forms/Form'

function SignUp() {
  return (
    <section className='bg-[url(/assets/signup/sign.jpg)] bg-center bg-no-repeat bg-cover w-screen h-screen lg:w-[340px] lg:h-[95%]  mr-auto ml-auto  shadow-md   ' >
      <Form type={'sign-up'} />
    </section>
  )
}

export default SignUp