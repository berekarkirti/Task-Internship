import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') 
{
  global.prisma = prisma;
}

export async function GET() 
{
  try 
  {
    const todos = await prisma.todo.findMany({ take: 10 });
    return NextResponse.json(todos, { status: 200 });
  } 
  catch (error) 
  {
    console.error('GET error:', error.message);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request) 
{
  try 
  {
    const body = await request.json();
    console.log('POST request body:', body);

    const { title } = body;

    if (!title || typeof title !== 'string') 
    {
      return NextResponse.json({ error: 'Title required' }, { status: 400 });
    }
    const todo = await prisma.todo.create({ data: { title, completed: false } });

    console.log(todo)
    return NextResponse.json(todo, { status: 201 });
  } 
  catch (error) 
  {
    console.error('POST error:', error.message);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}

export async function PUT(request) 
{
  try 
  {
    const { id, title, completed } = await request.json();

    if (!id) 
    {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    const todo = await prisma.todo.update({ where: { id }, data: { title, completed } });

    return (
      NextResponse.json(todo, { status: 200 })
    )
  } 
  catch (error) 
  {
    console.error('PUT error:', error.message);
    return (
      NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
    )
  }
}

export async function DELETE(request) 
{
  try 
  {
    const { id } = await request.json();

    if (!id) 
    {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    await prisma.todo.delete({ where: { id } });
    return (
      NextResponse.json({ message: 'Todo deleted' }, { status: 200 })
    )
  } 
  catch (error) 
  {
    console.error('DELETE error:', error.message);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}