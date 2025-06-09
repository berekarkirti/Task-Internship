"use client";

import { addTodo, removeTodo, toggleComplete } from '@/redux-counter/todo/todoSlice';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home2 = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useSelector((state) => state.todos || []); 
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo(''); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="px-4 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleAddTodo}
          className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition"
        >
          Add
        </button>
      </div>
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
                className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
              />
              <span
                className={`${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-red-500 hover:text-red-700 transition"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home2;
