'use server'
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";



export const POST = async (req) => {
    try {
        const { vehicleId } = await req.json();
        if (!vehicleId) {
            return NextResponse.json({ error: 'missing vehicleId' }, { status: 400 })
        }

        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);
        const settingCollection = await dbConnect(collectionNameObj.settingsCollection);

        const vehicle = await vehicleCollection.findOne({ _id: new ObjectId(vehicleId) });

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 })
        };

        const exitTime = new Date();

        let cost = 0;
        let hours = 0;
        let minutes = 0;

        if (vehicle.status === 'parked') {
            const startTime = vehicle.parkedTime ? new Date(vehicle.parkedTime) : new Date(vehicle.entryTime)
            const durationMs = exitTime - startTime;
            const totalMinutes = Math.floor(durationMs / (60 * 1000));
            hours = Math.floor(totalMinutes / 60);
            minutes = totalMinutes % 60;

            const ratePerMinute = vehicle.chargesPerHour / 60;
            cost = parseFloat((totalMinutes * ratePerMinute).toFixed(2));

            await settingCollection.updateOne(
                { _id: "slots-info" },
                { $inc: { availableSlots: 1 } })

        }

        await vehicleCollection.updateOne(
            { _id: new ObjectId(vehicleId) },
            { $set: { exitTime, status: "exited", totalCost: cost } }
        )
        return NextResponse.json({
            success: true,
            hours,
            minutes,
            cost,
            wasParked: vehicle.status === 'parked'
        })
    } catch (error) {
        console.log('exit api', error);
        NextResponse.json({ error: 'internal server error' }, { status: 500 })
    }
}