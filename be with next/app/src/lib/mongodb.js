import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) 
{
  throw new Error('Please add MONGODB_URI in your .env.local file');
}

const client = new MongoClient(mongoUri);

const clientPromise = client.connect()
  .then(() => client)
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    throw err;
  });

export default clientPromise;

