'use client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, Upload } from 'lucide-react'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className='w-full max-w-md'
        >
            <Card className='relative backdrop-blur-md bg-white/10 dark:bg-black/20 border border-[#254649]/50 shadow-xl rounded-2xl'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                        Register now!!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-200">
                                Username
                            </Label>
                            <Input
                                {...register('name', { required: true })}
                                name='name'
                                type='text'
                                placeholder="Enter your Username"
                                className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 "
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-200">
                                Email
                            </Label>
                            <Input
                                {...register('email', { required: true })}
                                name='email'
                                type='email'
                                placeholder="Enter your email"
                                className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 "
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label className="text-gray-900 dark:text-gray-200">
                                Password
                            </Label>
                            <Input
                                {...register('password', { required: true })}
                                name='password'
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your email"
                                className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 "
                            />
                            <button type='button' className='absolute right-3 bottom-4' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Eye size={18}></Eye> : <EyeClosed size={18}></EyeClosed>}
                            </button>
                        </div>
                        {/* Image upload */}
                        <div className='space-y-2'>
                            <Label className="text-gray-900 dark:text-gray-200">
                                Upload Profile Image
                            </Label>
                            <div className='flex items-center gap-2'>
                                <label
                                    htmlFor="image"
                                    className="cursor-pointer flex items-center gap-2 rounded-full border border-[#E38B8B]/50 bg-white/50 dark:bg-white/10 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-[#B54C4E]/20 transition"
                                >
                                    <Upload size={18} /> Choose File
                                </label>
                                <Input
                                    id="image"
                                    name="image"
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
