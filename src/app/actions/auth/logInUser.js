'use server'
import { collectionNameObj, dbConnect } from "@/lib/dbConnect"
import bcrypt from 'bcryptjs'


export const logInUser = async (payload) => {
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const { email, password } = payload;
    const user = await userCollection.findOne({ email })
    if (!user) {
        return null
    }
    const isPasswordOk = await bcrypt.compare( password, user.password);
    if (!isPasswordOk) {
        return null
    }
    return user
}