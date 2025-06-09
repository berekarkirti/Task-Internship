"use client"
import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './counter/exampleSlice';
import todoReducer from './todo/todoSlice';
import productReducer from './curd/postSlice';
import themeReducer from './theme/themeSlice';

const store = configureStore({
  reducer: {
    example: exampleReducer, 
    todos:  todoReducer,
    product: productReducer,
    theme: themeReducer
  },
});

export default store;
