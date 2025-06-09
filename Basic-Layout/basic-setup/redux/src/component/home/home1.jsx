'use client';

import { decrement, increment } from '@/redux-counter/counter/exampleSlice';
import { useState  , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home1() {
  
  const [ hydrated , sethydrated ] = useState(false);
  const value = useSelector((state) => state.example.value);
  const dispatch = useDispatch();
 
  useEffect ( ()=>{
sethydrated(true)
  },[])
  
  if(!hydrated){
    return <p></p>
  }





  return (
    <div className="bg-yellow-400 min-h-screen flex flex-col items-center justify-center text-black">
      <div className="h-48 w-80 bg-white p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Counter: {value}</h1>
        <div className="space-x-4">
          <button
            // disabled={value}
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow transition duration-200"
          >
            Increment
          </button>
          <button
            // disabled={value <= 0}
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow transition duration-200"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}