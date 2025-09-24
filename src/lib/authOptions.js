import { logInUser } from "@/app/actions/auth/logInUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collectionNameObj, dbConnect } from "./dbConnect";



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials || {});
                const user = await logInUser(credentials)

                if (user) {
                    return user
                } else {

                    return null

                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const { providerAccountId, provider } = account;
            const { name, email: user_email, image } = user;
            const payload = { name, email: user_email, image, providerAccountId, provider }
            const userCollection = await dbConnect(collectionNameObj.userCollection);
            const isExistingUser = await userCollection.findOne({ providerAccountId });
            if (!isExistingUser) {
                const result = await userCollection.insertOne(payload)
            }
            return true
        }
    }
}