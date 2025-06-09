import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: 
  {
    isAuthenticated: false,
    user: null,
  },
  reducers:
  {
    signup: (state, action) => 
    {
      const { email, password, city } = action.payload;
      localStorage.setItem('user', JSON.stringify({ email, password, city }));
    },

    login: (state, action) => 
    {
      const { email, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser && storedUser.email === email && storedUser.password === password ) 
      {
        state.isAuthenticated = true;
        state.user = storedUser;
      } 
      else 
      {
        throw new Error('Invalid credentials or user not found.');
      }
    },
    logout: (state) => 
    {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
