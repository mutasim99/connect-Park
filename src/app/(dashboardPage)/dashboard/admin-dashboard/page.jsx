'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTruck } from 'react-icons/fa';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import { IoBarChart } from "react-icons/io5";
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await axios.get('/api/dashboard/admin-stats')
            setStats(data)
        }
        fetchStats();
    }, [])

    const cards = [
        {
            title: 'Total parked vehicle',
            value: stats?.totalParked,
            icons: <FaTruck className='w-8 h-8 text-blue-500' />,
            gradient: 'from-blue-500 to-indigo-500'
        },
        {
            title: "Today's parked vehicle",
            value: stats?.todaysParked,
            icons: <FaCalendarDays className='w-8 h-8 text-green-500' />,
            gradient: 'from-green-500 to-emerald-500'
        },

        {
            title: "Today's Revenue",
            value: stats?.todaysRevenue,
            icons: <TbCurrencyTaka className='w-8 h-8 text-yellow-500' />,
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            title: 'Total Revenue',
            value: stats?.totalRevenue,
            icons: <IoBarChart className='w-8 h-8 text-purple-500' />,
            gradient: 'from-purple-500 to-pink-500'
        },
    ]

    return (
        
        <div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-6'>
                {
                    cards.map((card, i) => (
                        <motion.div key={i}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{duration:1, delay: i * 0.1 }}
                        >
                            <Card className='overflow-hidden shadow-lg rounded-lg'>
                                <div className={`h-2 bg-gradient-to-r ${card.gradient}`} />
                                <CardHeader className='flex flex-row justify-between items-center'>
                                    <CardTitle className='text-lg font-semibold text-gray-700'>
                                        {card.title}
                                    </CardTitle>
                                    {card.icons}
                                </CardHeader>
                                <CardContent>
                                    <p className='text-3xl font-semibold text-gray-900'>{card.value}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}
