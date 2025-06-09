import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

if (!uri) 
{
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') 
{
  if (!global._mongoClientPromise) 
  {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} 
else 
{
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getProducts()
{
  const client = await clientPromise;
  const db = client.db('inventoryDB');
  const products = await db.collection('products').find({}).toArray();
  return products;
}

export async function addProduct(product) 
{
  const client = await clientPromise;
  const db = client.db('inventoryDB');
  const result = await db.collection('products').insertOne({...product,salesHistory: product.salesHistory || [],});
  return result;
}

export async function updateProduct(id, updates) 
{
  const client = await clientPromise;
  const db = client.db('inventoryDB');
  const result = await db.collection('products').updateOne({ _id: id },{ $set: updates });
  return result;
}

export async function deleteProduct(id) 
{
  const client = await clientPromise;
  const db = client.db('inventoryDB');
  const result = await db.collection('products').deleteOne({ _id: id });
  return result;
}