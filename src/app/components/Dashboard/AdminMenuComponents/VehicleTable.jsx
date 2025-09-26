'use client'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import axios from 'axios'
import React, { useState } from 'react'
import ExitSummeryModal from './ExitSummeryModal'

export default function VehicleTable() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [exitResult, setExitResult] = useState(null);
    const [open, setOpen] = useState(false)

    const { data: vehicle = [] } = useQuery({
        queryKey: ['vehicle'],
        queryFn: async () => {
            const { data } = await axios.get('/api/vehicles')
            return data
        }
    })

    /* exit mutation */
    const exitMutation = useMutation({
        mutationFn: async (vehicleId) => (await axios.post('/api/dashboard/exits', { vehicleId })).data,
        onSuccess: () => {
            queryClient.invalidateQueries(['vehicle']),
                queryClient.invalidateQueries(['slots'])
        }
    })

    const handleExit = async (vehicleId) => {
        setOpen(true)
        const res = await exitMutation.mutateAsync(vehicleId);
        setExitResult(res);
        selectedVehicle(vehicleId);
    }

    const columns = [
        {
            accessorKey: 'licensePlate',
            header: 'License'
        },
        {
            accessorKey: 'vehicleType',
            header: 'Type'
        },
        {
            accessorKey: 'status',
            header: 'Status'
        },
        {
            accessorKey: "entryTime",
            header: 'Entry Time',
            cell: ({ row }) => {
                const entry = new Date(row.original.entryTime);
                const formatted = entry.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Dhaka'
                });
                return <span>{formatted}</span>;
            }
        },
        {
            accessorKey: 'parkedTime',
            header: 'parked Time',
            cell: ({ row }) => {
                const parkedEntry = new Date(row.original.parkedTime);
                const formatted = parkedEntry.toLocaleString('en-GB', {
                    day: "2-digit",
                    month: '2-digit',
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: 'Asia/Dhaka'
                })
                return <span>{formatted}</span>
            }
        },
        {
            header: 'Action',
            cell: ({ row }) => (
                <div className='flex justify-center items-center'>
                    <Button
                        size='sm'
                        className='bg-red-500 cursor-pointer'
                        onClick={() => handleExit(row.original._id)}
                        disabled={exitMutation.isPending}
                    >
                        Exit
                    </Button>
                </div>
            )
        }

    ]



    const table = useReactTable({
        data: vehicle,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full md:max-w-11/12 mx-auto">
            {/* 🔍 Search bar */}
            <input
                type="text"
                placeholder="Search by license, type or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/3 border px-3 py-2 rounded-md shadow-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Table */}
            <table className='w-full border-2'>
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <th key={header.id} className='border-2 p-2'>
                                    {header.isPlaceholder ? null : header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className='border-2 p-2'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <ExitSummeryModal
                open={open}
                onClose={() => setOpen(false)}
                exitResult={exitResult}
            >

            </ExitSummeryModal>
        </div>
    )
}
