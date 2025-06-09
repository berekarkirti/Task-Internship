import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri)
{
    throw new Error('Please define MONGODB_URI in your .env file');
}

const client = new MongoClient(mongoUri,
{
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    authSource: 'admin',
});

const clientPromise = client.connect()
    .then(() => 
    {
        console.log('Connected to MongoDB');
        return client;
    })
    .catch((err) => 
    {
        console.error('Failed to connect to MongoDB:', err.message);
        throw new Error(`MongoDB connection failed: ${err.message}`);
    });

export default clientPromise;