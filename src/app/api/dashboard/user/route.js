'use server'

import { authOptions } from "@/lib/authOptions";
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const session = await getServerSession();
        const user = session?.user;
        const email = user?.email
        const vehicleCollection = await dbConnect(collectionNameObj.vehiclesCollection);
        if (!email) {
            return NextResponse.json({ error: "No user found" }, { status: 404 })
        }
        const vehicle = await vehicleCollection.findOne({ email: email });
        
        const objectId = new ObjectId(session?.user?.id);
        const createdAt = objectId.getTimestamp().toLocaleDateString();
        return NextResponse.json({ vehicle, createdAt })
    } catch (error) {
        NextResponse.json({ error: "server error" }, { status: 500 })
    }
}