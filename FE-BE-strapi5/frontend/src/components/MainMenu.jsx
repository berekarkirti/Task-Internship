"use client";

import React from "react";
import Link from "next/link";
import { FaHome,FaUser,FaShoppingCart,FaList } from "react-icons/fa"


const MainMenu = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-50 to-gray-100 shadow-xl rounded-r-2xl overflow-hidden">
      <div className="p-6">

        <h2 className="text-xl font-extrabold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">MAIN MENU</h2>

        <ul className="space-y-4">

          <li className="mb-2">
            <Link href="/dashboard" className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-300 hover:text-blue-800 hover:shadow-md"><FaHome className="mr-3 text-xl" />Dashboard</Link>
          </li>

          <li className="mb-2">
            <Link href="/profile" className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-300 hover:text-blue-800 hover:shadow-md"><FaUser className="mr-3 text-xl" />Profile</Link>
          </li>

          <li className="mb-2">
            <Link href="/product" className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-300 hover:text-blue-800 hover:shadow-md"><FaShoppingCart className="mr-3 text-xl" />Products</Link>
          </li>

          <li className="mb-2">
            <Link href="/category" className="flex items-center p-3 text-gray-700 hover:bg-blue-100 rounded-lg transition-all duration-300 hover:text-blue-800 hover:shadow-md"><FaList className="mr-3 text-xl" />Category</Link>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default MainMenu;