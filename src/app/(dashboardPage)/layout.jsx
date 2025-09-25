import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'

export default function DashboardLayout({ children }) {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3 md:col-end-2 h-screen bg-slate-600'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-span-9 md:col-span-10 '>
                {children}
            </div>
        </div>
    )
}
