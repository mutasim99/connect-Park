import React from 'react'
import registerBg from '../../../../public/assets/LogInImage/registerbg.jpg'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-cover bg-center'
            style={{
                backgroundImage: `url(${registerBg.src})`,
                backgroundPosition: 'center',
                backgroundSize:'cover',
            }}
        >
            <RegisterForm></RegisterForm>
        </div>
    )
}
