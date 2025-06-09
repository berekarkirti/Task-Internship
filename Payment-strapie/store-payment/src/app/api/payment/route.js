'use client';

import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() 
{
  useEffect(() => 
  {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) 
    {
      console.log('Payment session ID:', sessionId);
    }
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Payment Processing</h2>
      <p className="text-gray-600 mb-4">You will be redirected to Stripe for payment processing.</p>
      <p className="text-green-600">If not redirected, your payment is being processed or has been completed.</p>
    </div>
  );
}   