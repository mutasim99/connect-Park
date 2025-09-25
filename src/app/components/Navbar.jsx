'use client'
import { usePathname } from 'next/navigation'
import logoImg from '../../../public/assets/image/logo.png'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
    const session = useSession();
    const pathname = usePathname();
    if (!pathname.includes('/register') && !pathname.includes('/login') && !pathname.includes('/dashboard')) {
        return (
            <div className='w-full flex justify-between items-center px-6 py-2 bg-neutral-50/30 fixed z-30'>
                <div className='flex items-center gap-2'>
                    <Image
                        src={logoImg}
                        width={60}
                        height={60}
                        alt='logImg'
                        className='rounded-lg shadow-2xl'
                    ></Image>
                    <h3 className='text-lg font-bold'>Connect park</h3>
                </div>
                <div>
                    <ul className='flex justify-center items-center gap-4'>
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/services'>Services</Link></li>
                        <li><Link href='/dashboard'>Dashboard</Link></li>
                        <li><Link href='/about'>About</Link></li>
                    </ul>
                </div>
                <div className='flex items-center gap-2.5 justify-end'>
                    <Link href='/login' className='px-3 py-2 rounded-lg bg-gray-400'>Login</Link>
                    <Link href='/register' className='px-3 py-2 rounded-lg bg-gray-400'>Register</Link>
                </div>
            </div>
        )
    } else {
        return <></>
    }

}
