'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTruck } from 'react-icons/fa';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaCalendarDays } from "react-icons/fa6";
import { IoBarChart } from "react-icons/io5";
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import Marquee from 'react-fast-marquee';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
}

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const session = useSession();

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
            <Marquee pauseOnHover={true}>
                🚀 Welcome, <span className='mx-2'>{session?.data?.user?.name}</span>  Total Vehicle Reports Updated in Real-Time | Track Revenue and Parking Stats Effortlessly | Keep Your Dashboard Fresh and Organized....
            </Marquee>
            <div className='max-w-11/12 mx-auto'>
                {/* Leaderboard */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 p-6'>
                    {
                        cards.map((card, i) => (
                            <motion.div key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: i * 0.1 }}
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
                {/* Chart */}
                <div className='flex flex-col md:flex-row mt-10 justify-between'>
                    <BarChart
                        width={500}
                        height={300}
                        data={[
                            { name: "Today's Revenue", value: stats?.todaysRevenue || 0 },
                            { name: "Total Revenue", value: stats?.totalRevenue || 0 }
                        ]}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: "top" }}>
                            {[
                                stats?.todaysRevenue,
                                stats?.totalRevenue
                            ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    )
}
