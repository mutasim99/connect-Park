import { Car, Wrench } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Link href='/' className='cursor-pointer'>
                <h2 className='text-xl font-bold'>Connect park</h2>
            </Link>
            <div className='mt-4'>
                <ul className='space-y-4'>
                    <li><Link href='/dashboard/overview' className='flex items-center gap-2.5'><Wrench size={18} color='#329533'/>Overview</Link></li>
                    <li><Link href='/dashboard/addVehicle' className='flex items-center gap-2.5'><Car color='#d01616' size={18} />Add vehicle</Link></li>
                </ul>
            </div>
        </div>
    )
}
