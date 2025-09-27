'use server'
import { collectionNameObj, dbConnect } from "@/lib/dbConnect"
import bcrypt from 'bcryptjs'


export const registerUser = async (payload) => {
    const userCollection = await dbConnect(collectionNameObj.userCollection);

    const { email, password, name, image } = payload
    if (!email || !password) {
        return null
    }
    const user = await userCollection.findOne({ email })
    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        payload.password = hashedPassword;
        const newUser = {
            name,
            email,
            image: image || null,
            password: hashedPassword,
            role: "user"
        }
        const result = await userCollection.insertOne(newUser);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString()
        }
    }
    return null
}