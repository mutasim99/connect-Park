'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { LuBadgeCheck } from "react-icons/lu";
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator';

export default function MyProfile() {
    const session = useSession();
    const [vehicle, setVehicle] = useState(null);

    const parkedTime = new Date(vehicle?.vehicle?.parkedTime);
    const localTIme = parkedTime.toLocaleString()
        useEffect(() => {
            const fetchData = async () => {
                if (!session?.data?.user?.email) return;
                try {
                    const res = await axios.get('/api/dashboard/user')
                    setVehicle(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
        }, [session]);
    return (
        <div className='max-w-5xl mx-auto space-y-10 p-6'>
            <Card className='relative overflow-hidden rounded-2xl shadow-lg border-0 bg-gradient-to-r from-[#2F6260] to-[#084350] text-white'>
                <CardContent className="flex flex-col md:flex-row gap-4 md:gap-10 items-center  p-8">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage
                            src={session?.data?.user?.image}
                            className='object-cover'
                        ></AvatarImage>
                        <AvatarFallback className="bg-white text-[#2F6260] font-bold">
                            {session?.data?.user?.name[0] || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-bold'>{session?.data?.user?.name}</h2>
                        <p className='text-gray-200'>{session?.data?.user?.email}</p>
                        {session?.data?.user?.role === 'employee' && <p>{session?.data?.user?.role}</p>}
                    </div>
                </CardContent>
            </Card>

            {
                session?.data?.user?.role === 'user' ?
                    <div className='space-y-5 md:space-y-10'>
                        <Card className="rounded-2xl shadow-md">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold text-[#2F6260]">Profile Details</h3>
                                <Separator />
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                                    <div>
                                        <p className='font-medium text-gray-500'>Name: {vehicle?.vehicle?.name || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>Email: {vehicle?.vehicle?.email || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>Contact no: {vehicle?.vehicle?.number || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>member since: {vehicle?.createdAt || "N/A"}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* active vehicle section */}
                        <Card className='rounded-xl shadow-md'>
                            <CardContent className='p-6 space-y-4'>
                                <h3 className='text-xl font-semibold text-[#2F6260]'>Active vehicle</h3>
                                <Separator />
                                <div className='flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
                                    <div>
                                        <p className='font-medium text-gray-500'>License Plate: {vehicle?.vehicle?.licensePlate || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>status: {vehicle?.vehicle?.status || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>Parked Token: {vehicle?.vehicle?.token || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className='font-medium text-gray-500'>
                                            parkedTime: {localTIme || "N/A"}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>



                    :
                    <></>
            }
        </div>
    )
}
