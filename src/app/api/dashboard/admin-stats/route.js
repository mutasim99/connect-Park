import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);

        /* today starts and end */
        const starOfToday = new Date();
        starOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        /* total parked vehicle */
        const totalParked = await vehicleCollection.countDocuments({ status: 'exited' });

        /* today's parked */
        const todaysParked = await vehicleCollection.countDocuments(
            {
                status: 'exited',
                exitTime: { $gte: starOfToday, $lte: endOfToday }
            }

        );

        /* total revenue */
        const totalRevenueAgg = await vehicleCollection.aggregate([
            { $match: { status: 'exited' } },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalCost" }
                }
            }
        ]).toArray();

        const totalRevenue = totalRevenueAgg[0]?.total?.toFixed(2) || 0;

        /* today's revenue */

        const todaysRevenueAgg = await vehicleCollection.aggregate([
            {
                $match: {
                    status: 'exited',
                    exitTime: { $gte: starOfToday, $lte: endOfToday }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalCost" }
                }
            }
        ]).toArray();
        const todaysRevenue = todaysRevenueAgg[0]?.total?.toFixed(2) || 0

        return NextResponse.json({
            totalParked,
            todaysParked,
            totalRevenue,
            todaysRevenue
        })


    } catch (error) {
        console.log(error);
    }
}