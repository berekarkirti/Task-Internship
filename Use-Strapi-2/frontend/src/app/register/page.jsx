'use client';

import React, { useState } from 'react';
// import { registerUser } from '@/lib/strapi';

const Register = () => 
{
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => 
  {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const res = await registerUser(formData);
      const username = res?.user?.username || res?.data?.user?.username || 'User';
      setMessage(`User ${username} registered successfully!`);
      setError('');
    } 
    catch (err) 
    {
      setError(err.message || 'Something went wrong');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-teal-600">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} autoComplete="username" required className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} autoComplete="email" required className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} autoComplete="current-password" required className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200">Register</button>
        </form>
        {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
