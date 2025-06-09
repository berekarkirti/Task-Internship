import { createSlice } from '@reduxjs/toolkit';

const initialState = 
{
  cartItems: [],
  total: 0,
  discountAmount: 0,
};

const cartSlice = createSlice(
{
  name: 'cart',
  initialState,
  reducers: 
  {
    addToCart: (state, action) => 
    {
      const existing = state.cartItems.find((item) => item.id === action.payload.id);
      if (existing) 
      {
        existing.quantity = existing.quantity + 1;
      } 
      else 
      {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.total + action.payload.price;
      state.discountAmount = state.total > 100 ? state.total * 0.1 : 0;
    },

    removeFromCart: (state, action) => 
    {
      const index = state.cartItems.findIndex((item) => item.id === action.payload);
      if (index !== -1) 
      {
        const item = state.cartItems[index];
        state.total = state.total - (item.price * item.quantity);
        state.cartItems.splice(index, 1);
      }
      state.discountAmount = state.total > 100 ? state.total * 0.1 : 0;
    },
  },
});

export const { addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
