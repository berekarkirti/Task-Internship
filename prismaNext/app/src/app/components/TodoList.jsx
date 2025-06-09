'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TodoList({ todos, fetchTodos }) 
{
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleDelete = async (id) => 
  {
    try 
    {
      await axios.delete('/api/todos', { data: { id } });
      fetchTodos();
    } 
    catch (error) 
    {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggle = async (todo) => 
  {
    try 
    {
      await axios.put('/api/todos', {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
      });
      fetchTodos();
    } 
    catch (error) 
    {
      console.error('Error updating todo:', error);
    }
  };

  const handleEdit = (todo) => 
  {
    setEditingId(todo.id);
    setEditTitle(todo.title); 
  };

  const handleUpdate = async (id) => 
  {
    try 
    {
      await axios.put('/api/todos', { id, title: editTitle, completed: false });
      setEditingId(null);
      setEditTitle('');
      fetchTodos();
    } 
    catch (error)
    {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg" >
          {editingId === todo.id ? 
          (

            <div className="flex gap-2">
              <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="flex-1 p-2 border rounded-lg" />
              <button onClick={() => handleUpdate(todo.id)} className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600" >Save</button>
              <button onClick={() => setEditingId(null)} className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600" >Cancel</button>
            </div>

          ) 
          : 
          (

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)} className="h-5 w-5" />
              <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
              <div className="ml-auto flex gap-2">
                <button onClick={() => handleEdit(todo)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(todo.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600" >Delete</button>
              </div>
            </div>

          )}
        </li>
      ))}
    </ul>
  );
}