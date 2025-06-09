import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Set in .env.local
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db("product-gemini"); // Replace with your DB name
  return { db, client };
}