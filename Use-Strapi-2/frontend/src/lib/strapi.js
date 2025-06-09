import axios from 'axios';

const API_URL = 'http://localhost:1337/api';


export const registerUser = async ({ username, email, password }) => 
{
  try 
  {
    const res = await axios.post(`${API_URL}/auth/local/register`, {username,email,password,});
    return { success: true, data: res.data };
  } 
  catch (err) 
  {
    const message = err?.response?.data?.error?.message || 'Registration failed';
    return { success: false, message };
  }
};

export const loginUser = async ({ identifier, password }) => {
  try 
  {
    const res = await axios.post(`${API_URL}/auth/local`, {identifier,password,});
    return { success: true, data: res.data };
  } 
  catch (err) 
  {
    const message = err?.response?.data?.error?.message || 'Login failed';
    return { success: false, message };
  }
};



