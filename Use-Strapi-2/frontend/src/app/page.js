'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () =>
{
  const router = useRouter();

  useEffect(() => 
  {
    const token = localStorage.getItem('token');

    if (token) 
    {
      router.push('/product'); 
    } 
    else 
    {
      router.push('/login');
    }
  }, []);

  return null;
}

export default Home;
