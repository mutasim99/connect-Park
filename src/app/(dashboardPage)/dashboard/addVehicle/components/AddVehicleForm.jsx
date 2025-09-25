'use client'
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import vehicleLottie from '../../../../../../public/assets/LottieFiles/Shop Car.json'
import Lottie from 'lottie-react'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { CgSpinnerAlt } from "react-icons/cg";

export default function AddVehicleForm() {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post('/api/vehicles', data)
            const result =  res.data
            console.log(result);
           
        } catch (error) {
            console.log(error);
        } finally {
            
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col-reverse justify-center items-center md:flex-row gap-8 rounded-lg h-screen'>
            <div className='flex-1 p-4'>
                <Lottie animationData={vehicleLottie}></Lottie>
            </div>
            <div className='flex-1 bg-white py-10 px-6 rounded shadow-lg'>
                <h1 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent text-center">Add Vehicle</h1>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    {/* vehicle types */}
                    <div className='space-y-2'>
                        <Label>
                            Vehicle Type
                        </Label>
                        <select
                            name="vehicleType"
                            {...register("vehicleType", { required: true })}
                            className='w-full rounded-lg p-2 bg-gray-300'
                            defaultValue='car'
                        >
                            <option value="Car">Car</option>
                            <option value="Bike">Bike</option>
                            <option value="Truck">Truck</option>
                        </select>
                    </div>
                    {/* license plate */}
                    <div className="space-y-2">
                        <Label>
                            License plate
                        </Label>
                        <Input
                            type='text'
                            name='licensePlate'
                            {...register('licensePlate', { required: true })}
                            className='w-full rounded-lg p-2 bg-gray-300'
                            placeholder='please input a license plate number'
                        />
                    </div>
                    <div className="">
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer flex justify-center items-center"
                            type="submit">
                            {loading ? <CgSpinnerAlt className='animate-spin' /> : 'submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
