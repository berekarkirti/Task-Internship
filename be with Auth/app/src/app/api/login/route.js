import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req) 
{

  const { email, password } = await req.json();

  if (!email || !password) 
  {
    return NextResponse.json(
      { success: false, message: 'Please enter email and password' },
      { status: 400 }
    );
  }

  const client = await clientPromise;
  const db = client.db('nextapp');
  const user = await db.collection('users').findOne({ email });

  if (!user) 
  {
    return NextResponse.json(
      { success: false, message: 'Wrong email or password' },
      { status: 401 }
    );
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) 
  {
    return NextResponse.json(
      { success: false, message: 'Wrong email or password' },
      { status: 401 }
    );
  }

  const response = NextResponse.json(
    { success: true, message: 'Login successful', data: { name: user.name } },
    { status: 200 }
  );
  
  response.cookies.set('user', JSON.stringify({ email, name: user.name }), {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
  });

  return response;
}