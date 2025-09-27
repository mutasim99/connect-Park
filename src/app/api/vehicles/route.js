'use server'
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

/* post a vehicle */
export const POST = async (req) => {
    try {
        const { vehicleType, licensePlate, name, number, email } = await req.json();

        if (!vehicleType || !licensePlate) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const slots = await (await dbConnect(collectionNameObj.settingsCollection)).findOne({ _id: 'slots-info' });
        const rates = await (await dbConnect(collectionNameObj.ratesCollection)).findOne({ vehicleType });
        if (!rates) {
            return NextResponse.json({ error: "Invalid vehicle type" }, { status: 400 });
        }

        let token = ""
        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);

        while (true) {
            token = Math.floor(100000 + Math.random() * 900000).toString();
            const isExits = await vehicleCollection.findOne({ token });
            if (!isExits) {
                break;
            }
        }

        let status = 'parked';
        if (slots.availableSlots <= 0) {
            status = 'waiting'
        };
        const vehicleData = {
            vehicleType,
            licensePlate,
            name,
            email,
            number,
            token,
            entryTime: new Date(),
            parkedTime: status === "parked" ? new Date() : null,
            exitTime: null,
            status,
            chargesPerHour: rates.rate
        };


        const result = await vehicleCollection.insertOne(vehicleData)
        if (status === 'parked') {
            await (await dbConnect(collectionNameObj.settingsCollection)).updateOne(
                { _id: "slots-info" },
                { $inc: { availableSlots: - 1 } })
        }

        return NextResponse.json({
            success: true,
            status,
            insertedId: result.insertedId,
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};
/* get all vehicle */
export const GET = async () => {
    try {
        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);

        const vehicle = await vehicleCollection
            .find({ exitTime: null })
            .sort({ entryTime: -1 })
            .toArray();
        return NextResponse.json(vehicle)
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
};

/* Update vehicle status */

export const PATCH = async (req) => {
    try {
        const { token } = await req.json();
        if (!token) {
            NextResponse.json({ error: 'Missing token' }, { status: 400 })
        }

        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);
        const settingsCollection = await dbConnect(collectionNameObj.vehiclesCollection);

        const vehicle = await vehicleCollection.findOne({ token });
        if (!vehicle) {
            NextResponse.json({ error: 'Vehicle is not found' }, { status: 404 })
        }

        if (vehicle.status !== 'waiting') {
            NextResponse.json({ error: 'You can not update this' }, { status: 400 })
        }

        const slots = await settingsCollection.findOne({ _id: 'slots-info' })

        if (slots.availableSlots <= 0) {
            NextResponse.json({ error: 'No available slots at this moments' }, { status: 400 })
        }

        await vehicleCollection.updateOne(
            { token },
            {
                $set: {
                    status: "parked",
                    parkedTime: new Date()
                }
            }
        );

        /* decrement available slots */
        await settingsCollection.updateOne(
            { _id: "slots-info" },
            { $inc: { availableSlots: -1 } }

        )
        return NextResponse.json({ success: true, newStatus: 'parked' })
    } catch (error) {
        console.log(error);
    }
}