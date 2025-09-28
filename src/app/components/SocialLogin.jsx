'use client'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa6'

export default function SocialLogin() {
    const session = useSession();
    const router = useRouter();

    const handleSocialLogin = (providerName) => {
        signIn(providerName)
    }

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/')
        }
    }, [session?.status])

    return (
        <div className='flex flex-col md:flex-row justify-center gap-6'>
            <button onClick={() => handleSocialLogin('google')} className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg cursor-pointer'>
                <FaGoogle className='text-blue-500' /> LogIn With Google
            </button>
            <button onClick={() => handleSocialLogin('github')} className='flex items-center gap-2 p-2 bg-gray-100 rounded-lg cursor-pointer'>
                <FaGithub className='text-red-500' /> LogIn With Github
            </button>
        </div>
    )
}
