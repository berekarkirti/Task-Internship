'use client';

import { useEffect } from 'react';

export default function CheckoutForm({ productId, price, title }) 
{
  useEffect(() => 
  {
    const handleSubmit = async () => 
    {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('price', price);
      formData.append('title', title);

      try
      {
        const response = await fetch('/api/checkout', 
        {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) 
        {
          window.location.href = data.url;
        } 
        else
        {
          console.error('Error:', data.error);
        }
      } 
      catch (error) 
      {
        console.error('Error initiating checkout:', error);
      }
    };

    handleSubmit();
  }, [productId, price, title]);

  return null;
}