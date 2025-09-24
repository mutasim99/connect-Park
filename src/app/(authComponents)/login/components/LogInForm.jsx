'use client'
import React, { useState } from 'react'
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useRouter } from 'next/navigation'

export default function LogInForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const response = await signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/',
                redirect: false
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className='w-full max-w-md'
        >
            <Card className='relative backdrop-blur-md bg-white/10 dark:bg-black/20 border border-slate-400/30 shadow-xl rounded-2xl'>
                <CardHeader>
                    <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-white'>
                        LogIn now!!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-200">
                                Email
                            </Label>
                            <Input
                                {...register('email', { required: true })}
                                name='email'
                                type='email'
                                placeholder="Enter your Email address"
                                className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-900 dark:text-gray-200">
                                Password
                            </Label>
                            <Input
                                {...register('password', { required: true })}
                                name='password'
                                type="password"
                                placeholder="Enter your Password"
                                className="rounded-full border border-purple-300/50 bg-white/50 dark:bg-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        </div>
                        <div className='mt-4'>
                            <Button
                                type="submit"
                                className="w-full rounded-full bg-gradient-to-r from-[#084350] to-[#2F6260] hover:from-[#2F6260] hover:to-[#084350] text-white font-semibold shadow-lg cursor-pointer"
                            >
                                {loading ? <LoadingSpinner></LoadingSpinner> : 'LogIn'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
