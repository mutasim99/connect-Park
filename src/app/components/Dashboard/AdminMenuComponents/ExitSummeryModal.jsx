'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import thanksLottie from '../../../../../public/assets/LottieFiles/Thank you!.json'
import Lottie from 'lottie-react'

export default function ExitSummeryModal({ open, onClose, exitResult }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold text-center'>Exit Summery</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex-1'>
                        <Lottie animationData={thanksLottie}></Lottie>
                    </div>
                    <div className='flex-1'>
                        {
                            exitResult ? (
                                <div className='space-y-2'>
                                    <p className='text-lg font-semibold'>
                                        Total Time: {''}
                                        {exitResult.hours}h {exitResult.minutes}min
                                    </p>
                                    <p className='text-indigo-500 text-lg font-semibold'>Total cost: {exitResult.cost}</p>
                                </div>
                            ) : (
                                <p>No result found</p>
                            )
                        }
                    </div>
                    <div className='w-full'>
                        <button onClick={()=>onClose()} className='p-2 w-full cursor-pointer bg-green-500 rounded-lg mt-2'>Done</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
