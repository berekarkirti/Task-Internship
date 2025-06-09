'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() 
{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post('/api/signup', { name, email, password });
      if (response.data.success) 
      {
        router.push('/login');
      } 
      else 
      {
        setError(response.data.message || 'Failed to sign up');
      }
    } 
    catch (err) 
    {
      setError('Failed to sign up: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Sign Up</button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
      
    </div>
  );
}