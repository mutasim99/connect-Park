import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
    userCollection: 'userCollection'
}

export const dbConnect = async (collectionName) => {
    const client = new MongoClient(process.env.MOGODB_URL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.db(process.env.DB_NAME).collection(collectionName)
}