'use client'
import { Wrench } from 'lucide-react'
import { PiTruckFill } from "react-icons/pi";
import { ImStatsDots } from "react-icons/im";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    const session = useSession();
    return (
        <div className='flex pl-6 flex-col justify-center '>
            <Link href='/' className='cursor-pointer flex justify-center items-center w-full'>
                <h2 className='text-xl font-bold'>Connect park</h2>
            </Link>
            <div className='mt-4'>
                <div>
                    {
                        session?.data?.user?.role === 'employee' && (
                            <ul className='space-y-4'>

                                <li><Link href='/dashboard/overview' className='flex items-center gap-2.5'><Wrench size={18} color='#329533' />Overview</Link></li>

                                <li><Link href='/dashboard/addVehicle' className='flex items-center gap-2.5'><PiTruckFill className='text-red-500' />Add vehicle</Link></li>
                            </ul>
                        )
                    }
                </div>
                <div>
                    {
                        session?.data?.user?.role === 'admin' && (
                            <ul>

                                <li><Link href='/dashboard/overview' className='flex items-center gap-2.5'><Wrench size={18} color='#329533' />Overview</Link></li>

                                <li><Link href='/dashboard/addVehicle' className='flex items-center gap-2.5'><PiTruckFill className='text-red-500' />Add vehicle</Link></li>

                                <li><Link href='/dashboard/admin-dashboard' className='flex items-center gap-2.5'><ImStatsDots className='text-yellow-400' />  Admin stats</Link></li>
                                
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
