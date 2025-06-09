"use client";

import React,{ useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

const Dashboard = () => 
{
  const [dashboardData, setDashboardData] = useState({totalStock: 0,totalProducts: 0,totalCategories: 0,});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => 
  {
    const fetchDashboardData = async () => 
    {
      try 
      {
        const response = await axios.get("http://localhost:1337/api/combined-data");
        setDashboardData(response.data);
        setLoading(false);
      } 
      catch (err) 
      {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="p-6 rounded-lg mx-auto min-h-[calc(100vh-12rem)] flex flex-col justify-between bg-gradient-to-br from-gray-50 to-white text-center">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3 drop-shadow-md">Dashboard Overview</h1>
          <p className="text-lg text-gray-600">Your key statistics at a glance</p>
        </div>

        {loading ? (<div className="text-center text-gray-600">Loading...</div>) : error ? (
          <div className="text-center text-red-600">{error}</div>) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-6 h-[180px] rounded-xl shadow-lg border border-blue-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Total Stock</h2>
              <p className="text-5xl font-extrabold text-blue-700">{dashboardData.totalStock}</p>
            </div>
            <div className="bg-blue-50 p-6 h-[180px] rounded-xl shadow-lg border border-blue-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Total Products</h2>
              <p className="text-5xl font-extrabold text-blue-700">{dashboardData.totalProducts}</p>
            </div>
            <div className="bg-blue-50 p-6 h-[180px] rounded-xl shadow-lg border border-blue-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Total Categories</h2>
              <p className="text-5xl font-extrabold text-blue-700">{dashboardData.totalCategories}</p>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <p className="text-base text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;