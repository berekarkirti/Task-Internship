
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() 
{
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchUsers() 
    {
      try 
      {
        const response = await axios.get('/api/users');

        if (response.data.success) 
        {
          setUsers(response.data.data);
        } 
        else 
        {
          setError(response.data.error);
        }
      } 
      catch (err) 
      {
        setError('Failed to fetch users');
      } 
      finally 
      {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const response = await axios.post('/api/users', { name, email });
      if (response.data.success) 
      {
        setUsers([...users, { name, email, _id: response.data.data.insertedId }]);
        setName('');
        setEmail('');
      } 
      else 
      {
        setError(response.data.error);
      }
    } catch (err) {
      setError('Failed to add user');
    }
  };

  if (loading) 
  {
    return (
    <div>Loading...</div>
    )
  }
  if (error) 
  {
    return (
    <div>Error: {error}</div>
    )
  }

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col gap-2 max-w-md">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" required />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
        </div>
      </form>
      
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}