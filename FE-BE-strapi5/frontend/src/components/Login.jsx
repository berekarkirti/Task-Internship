"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/components/UserContext";

export default function Login() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser() || {};

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    if (!login) 
    {
      setError("Context not available. Please refresh the page.");
      return;
    }

    try 
    {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
        identifier: email,
        password,
      });
      // console.log("Login response:", response.data);
      const token = response.data.jwt;
      localStorage.setItem("token", token);
      await login(token, email); 
      router.push("/dashboard"); 
    } 
    catch (err) 
    {
      setError(err.response?.data?.error?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" required autoComplete="email" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" required autoComplete="current-password" />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" >Login</button>
        
      </form>

    </div>
  );
}