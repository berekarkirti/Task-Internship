import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) 
{
  try 
  {
    const client = await clientPromise;
    const db = client.db('nextapp');

    const { name, email } = await req.json();

    if (!name || !email) 
    {
      return NextResponse.json({ success: false, message: 'Please provide name and email' },{ status: 400 });
    }

    if (typeof name !== 'string' || typeof email !== 'string') 
    {
      return NextResponse.json({ success: false, message: 'Name and email must be strings' },{ status: 400 });
    }

    const result = await db.collection('users').insertOne({ name, email });

    return NextResponse.json({ success: true, data: result },{ status: 201 });
  } 

  catch (error) 
  {
    console.error('Error adding user:', error.message);
    if (error.name === 'MongoServerError' && error.code === 18) 
    {
      return NextResponse.json({ success: false, message: 'Authentication failed: Invalid MongoDB credentials' },{ status: 401 });
    }
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` },{ status: 500 });
  }

}

export async function GET() 
{
  try 
  {
    const client = await clientPromise;
    const db = client.db('nextapp');

    const users = await db.collection('users').find({}).limit(10).toArray();

    return NextResponse.json({ success: true, data: users });
  } 
  catch (error) 
  {
    console.error('Error fetching users:', error.message);
    if (error.name === 'MongoServerError' && error.code === 18) 
    {
      return NextResponse.json({ success: false, message: 'Authentication failed: Invalid MongoDB credentials' },{ status: 401 });
    }
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` },{ status: 500 });
  }
}