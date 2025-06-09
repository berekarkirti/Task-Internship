import { getProducts , addProduct , updateProduct , deleteProduct } from "@/utills/mongoDB";

export async function GET(req)
{
  try 
  {
    const products = await getProducts();
    return new Response(JSON.stringify(products), 
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) 
  {
    console.error('API GET error:', error.message);
    return new Response(JSON.stringify({ error: 'Server error', details: error.message }), 
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) 
{
  try 
  {
    const newProduct = await req.json();
    await addProduct(newProduct);
    return new Response(JSON.stringify({ message: 'Product added' }), 
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) 
  {
    console.error('API POST error:', error.message);
    return new Response(JSON.stringify({ error: 'Server error', details: error.message }), 
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) 
{
  try 
  {
    const { id, ...updates } = await req.json();
    await updateProduct(id, updates);
    return new Response(JSON.stringify({ message: 'Product updated' }), 
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) 
  {
    console.error('API PUT error:', error.message);
    return new Response(JSON.stringify({ error: 'Server error', details: error.message }), 
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) 
{
  try 
  {
    const { id } = await req.json();
    await deleteProduct(id);
    return new Response(JSON.stringify({ message: 'Product deleted' }), 
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } 
  catch (error) 
  {
    console.error('API DELETE error:', error.message);
    return new Response(JSON.stringify({ error: 'Server error', details: error.message }), 
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}