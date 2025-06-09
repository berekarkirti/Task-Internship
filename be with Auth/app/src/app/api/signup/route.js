import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) 
{
  try 
  {

    const { name, email, password } = await req.json();

    if (!name || !email || !password) 
    {
      return NextResponse.json(
        { success: false, message: 'Fill all fields' },
        { status: 400 }
      );
    }


    if (typeof name != 'string' || typeof email != 'string' || typeof password != 'string') 
    {
      return NextResponse.json(
        { success: false, message: 'Use text for all fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('nextapp');


    const user = await db.collection('users').findOne({ email });
    if (user) 
    {
      return NextResponse.json(
        { success: false, message: 'Email already used' },
        { status: 400 }
      );
    }

    const safePassword = await bcrypt.hash(password, 10);


    await db.collection('users').insertOne({ name, email, password: safePassword, });


    return NextResponse.json(
      { success: true, message: 'Signed up!' },
      { status: 201 }
    );
  } 
  catch (error) 
  {
 
    console.log('Error:', error.message);
    
    return NextResponse.json(
      { success: false, message: 'Error: ' + error.message },
      { status: 500 }
    );
  }
}