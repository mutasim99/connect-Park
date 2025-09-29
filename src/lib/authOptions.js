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
        async signIn({ user, account }) {
            const { providerAccountId, provider } = account;
            const { name, email: user_email, image } = user;
            // const payload = { name, email: user_email, image, providerAccountId, provider, role }
            const userCollection = await dbConnect(collectionNameObj.userCollection);
            const isExistingUser = await userCollection.findOne({ email: user_email });
            if (!isExistingUser) {
                const result = await userCollection.insertOne({
                    name,
                    email: user_email,
                    image,
                    providerAccountId,
                    provider,
                    role: 'user',
                })
            }
            return true
        },

        async jwt({ token, user }) {
            const userCollection = await dbConnect(collectionNameObj.userCollection);


            const email = user?.email || token?.email;


            const dbUser = await userCollection.findOne({ email });


            if (dbUser && !dbUser.role) {
                await userCollection.updateOne(
                    { email },
                    { $set: { role: 'user' } }
                );
                dbUser.role = 'user';
            }

            token.role = dbUser?.role || 'user';
            token.email = dbUser?.email || email;

            return token;
        },


        async session({ session, token }) {
            if (token) {
                session.user.role = token.role
            }
            return session
        }

    }
}