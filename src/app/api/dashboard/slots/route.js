import { collectionNameObj, dbConnect } from "@/lib/dbConnect"
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const settingsCollection = await dbConnect(collectionNameObj.settingsCollection);
        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);

        const slotsInfo = await settingsCollection.findOne({ _id: 'slots-info' });

        const inService = await vehicleCollection.countDocuments({ status: 'parked' });
        const waiting = await vehicleCollection.countDocuments({ status: 'waiting' });

        return NextResponse.json({
            totalSlots: slotsInfo?.totalSlots || 0,
            availableSlots: slotsInfo?.availableSlots,
            inService,
            waiting

        })
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({
            error: 'server error'
        }, { status: 500 })
    }
}