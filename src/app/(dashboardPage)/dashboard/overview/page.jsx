import OverviewComponents from '@/app/components/Dashboard/AdminMenuComponents/OverviewComponents'
import VehicleTable from '@/app/components/Dashboard/AdminMenuComponents/VehicleTable'



export default function Dashboard() {

    return (
        <div>
            <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center justify-between transition-all duration-300 w-full md:max-w-11/12 mx-auto '>
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
            <div>
                <OverviewComponents></OverviewComponents>
            </div>
            <div className='mt-10'>
                <VehicleTable></VehicleTable>
            </div>
        </div>
    )
}
