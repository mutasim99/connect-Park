import { Button } from '@/components/ui/button'
import { Car, ParkingSquare, Wrench } from 'lucide-react'

export default function Dashboard() {
    return (
        <div>
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between transition-all duration-300 w-full md:max-w-11/12 mx-auto'>
                <div className='flex-1 text-center md:text-left mb-4 md:mb-0'>
                    <h2 className='text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2'>
                        welcome to connect park
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0">
                        Manage your garage, track vehicles, and streamline your operations with our intuitive system.
                    </p>
                </div>
                <button className="bg-blue-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-md">
                    Get a tour
                </button>
            </div>
            <div className='bg-white dark:bg-gray-800 rounded-3xl w-full md:max-w-11/12 mx-auto shadow-lg p-6 mb-8 transition-all duration-300'>
                <h2 className="text-xl md:text-3xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Dashboard Overview</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
                    <div className="bg-blue-50 dark:bg-blue-900 p-5 rounded-2xl shadow-sm border border-blue-200 dark:border-blue-700 flex flex-col items-center">
                        <Car size={32} className="text-blue-500 mb-2" />
                        <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">12</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Slots</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900 p-5 rounded-2xl shadow-sm border border-green-200 dark:border-green-700 flex flex-col items-center">
                        <Wrench size={32} className="text-green-500 mb-2" />
                        <span className="text-3xl font-bold text-green-700 dark:text-green-300">5</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">In Service</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900 p-5 rounded-2xl shadow-sm border border-yellow-200 dark:border-yellow-700 flex flex-col items-center">
                        <ParkingSquare size={32} className="text-yellow-500 mb-2" />
                        <span className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">7</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Available Slots</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900 p-5 rounded-2xl shadow-sm border border-red-200 dark:border-red-700 flex flex-col items-center">
                        <Car size={32} className="text-red-500 mb-2" />
                        <span className="text-3xl font-bold text-red-700 dark:text-red-300">3</span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Waiting for Parts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
