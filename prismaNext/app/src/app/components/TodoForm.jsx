'use client';
import { useState } from 'react';
import axios from 'axios';

export default function TodoForm({ fetchTodos }) 
{
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    if (!title.trim()) 
    {
      return
    };

    try 
    {
      await axios.post('/api/todos', { title });
      setTitle('');
      fetchTodos();
    } 
    catch (error) 
    {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new todo" className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
      </div>
    </form>
  );
}