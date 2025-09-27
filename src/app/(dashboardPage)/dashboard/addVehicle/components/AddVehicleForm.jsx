'use client'
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import vehicleLottie from '../../../../../../public/assets/LottieFiles/Shop Car.json'
import Lottie from 'lottie-react'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import axios from "axios"
import { CgSpinnerAlt } from "react-icons/cg";
import Swal from "sweetalert2"


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
            const result = res.data
            if (result.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Add a car successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
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
                <h1 className="text-3xl font-bold mb-4  bg-[radial-gradient(at_40%_80%,#34d399,#60a5fa,#8b5cf6_90%)] bg-clip-text text-transparent text-center">Add Vehicle</h1>
                <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    {/* customer name */}
                    <div className="space-y-2">
                        <Label>
                            customer Name
                        </Label>
                        <Input
                            type='text'
                            name='name'
                            {...register('name', { required: true })}
                            className='w-full rounded-lg p-2 bg-gray-300'
                            placeholder='please enter customer Name'
                        />
                    </div>
                    {/* customer email */}
                    <div className="space-y-2">
                        <Label>
                            customer email
                        </Label>
                        <Input
                            type='email'
                            name='email'
                            {...register('email')}
                            className='w-full rounded-lg p-2 bg-gray-300'
                            placeholder='please enter customer email'
                        />
                    </div>
                    {/* customer number */}
                    <div className="space-y-2">
                        <Label>
                            contact number
                        </Label>
                        <Input
                            type='number'
                            name='number'
                            {...register('number', { required: true })}
                            className='w-full rounded-lg p-2 bg-gray-300'
                            placeholder='please enter contact number'
                        />
                    </div>
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
