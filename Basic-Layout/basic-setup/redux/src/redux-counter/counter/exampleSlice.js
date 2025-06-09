import { createSlice } from "@reduxjs/toolkit";


const data =  typeof window !== "undefined" ? Number(localStorage.getItem("count")) || 0 : 0 
const initialState = {
  value: data,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      localStorage.setItem('count',state.value)
    },
    decrement: (state) => {
      state.value -= 1;
      if(state.value < 0)
      {
        alert('Hello')
      }
      localStorage.setItem('count',state.value)
    },
    setValue: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('count',state.value)
    },
  },
});

export const { increment, decrement, setValue } = exampleSlice.actions;
export default exampleSlice.reducer;
