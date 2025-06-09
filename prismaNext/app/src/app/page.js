'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() 
{
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => 
  {
    try 
    {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } 
    catch (error) 
    {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => 
  {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
        <TodoForm fetchTodos={fetchTodos} />
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      </div>
    </div>
  );
}