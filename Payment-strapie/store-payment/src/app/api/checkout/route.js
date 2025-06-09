import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, 
{
  apiVersion: '2024-06-20',
});

export async function POST(request) 
{
  try 
  {
    const formData = await request.formData();
    const productId = formData.get('productId');
    const price = parseFloat(formData.get('price'));
    const title = formData.get('title');

    if (!productId || !price || !title) 
    {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: 
          {
            currency: 'usd',
            product_data: 
            {
              name: title,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/products/${productId}`,
    });

    return NextResponse.json({ url: session.url });
  } 
  catch (error) 
  {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}