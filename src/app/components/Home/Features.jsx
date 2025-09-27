import { Car } from 'lucide-react'
import React from 'react'
import { FaCreditCard } from "react-icons/fa";
import { CiLock } from "react-icons/ci";



export default function Features() {
    return (
        <div className='mt-28 max-w-11/12 mx-auto bg-gray-100 rounded-lg shadow-lg py-16 md:py-24 sm:px-8'>
            <div className='flex flex-col text-center items-center'>
                <h2 className='text-2xl font-bold'>Why Choose us!!</h2>
                <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
                    <div className='flex flex-col items-center shadow-2xl p-6 rounded-lg hover:transition hover:scale-105 duration-300'>
                        <div className='w-16 h-16 flex justify-center items-center font-bold text-red-600 bg-gray-200 rounded-full mb-4'>
                            <Car></Car>
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>Real-time Slot Tracking</h3>
                        <p>see available & occupied slots instantly.</p>
                    </div>
                    <div className='flex flex-col items-center shadow-2xl p-6 rounded-lg hover:transition hover:scale-105 duration-300'>
                        <div className='w-16 h-16 flex justify-center items-center font-bold text-2xl bg-gray-200 text-yellow-500 rounded-full mb-4'>
                            <FaCreditCard></FaCreditCard>
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>Automated Billing</h3>
                        <p>charges per minute/hour, no hassle.</p>
                    </div>
                    <div className='flex flex-col items-center shadow-2xl p-6 rounded-lg hover:transition hover:scale-105 duration-300'>
                        <div className='w-16 h-16 flex justify-center items-center text-2xl font-bold text-green-600 bg-gray-200 rounded-full mb-4'>
                            <CiLock />
                        </div>
                        <h3 className='text-xl font-semibold mb-2'>Secure & Reliable</h3>
                        <p>We ensure maximum security.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
