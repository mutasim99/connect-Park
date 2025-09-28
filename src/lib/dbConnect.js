import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNameObj = {
  userCollection: 'userCollection',
  settingsCollection: "settingsCollection",
  ratesCollection: "ratesCollection",
  vehiclesCollection: 'vehiclesCollection'
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export const dbConnect = async (collectionName) => {
  const client = await clientPromise;
  return client.db(process.env.DB_NAME).collection(collectionName);
};
