'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

export default function ExitSummeryModal({ open, onClose, exitResult }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Exit Summery</DialogTitle>
                </DialogHeader>
                {
                    exitResult ? (
                        <div className='space-y-2'>
                            <p>
                                Total Time:{''}
                                {exitResult.hours}h {exitResult.minutes}min
                            </p>
                            <p>Total cost:{exitResult.cost}</p>
                        </div>
                    ) : (
                        <p>No result found</p>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
