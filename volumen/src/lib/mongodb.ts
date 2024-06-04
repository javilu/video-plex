import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI)
    throw new Error("Por favor, añade tu URI de MongoDB a .env.local");

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let client = new MongoClient(uri, options);
const clientPromise = client.connect();

async function getDb() {
    await clientPromise;
    return client.db();
}

export { getDb as default, clientPromise };
