'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

export default function MyProfile() {
    const session = useSession();
    const [vehicle, setVehicle] = useState(null);

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
    console.log(vehicle);
    return (
        <div className='max-w-11/12 mx-auto'>
            <h2 className='text-2xl font bold'>Welcome Back 🚀{session?.data?.user?.name}</h2>
        </div>
    )
}
