"use client";

import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profile2 from "../../public/profile2.png";

const Profile = () => 
{
  const { user, logout } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => 
  {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!storedToken || !storedUser) 
    {
      router.push("/login");
    } 
    else 
    {
      setIsLoading(false);
    }

  }, [router]);

  if (isLoading) 
  {
    return (
      <Layout>
        <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">

          <div className="flex items-center space-x-6">
            <Image
              src={profile2} 
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full border-4 border-purple-200 shadow-md"
              objectFit="cover" 
            />

            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-900">{user?.displayName}</h2>
              <p className="text-sm text-gray-600">Admin User</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={logout} > Logout </button>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 ">

          <div className="bg-gray-50 p-6 rounded-lg">

            <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>

            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {user?.email}
            </p>

            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-900">Joined:</span>{" "}
              {"April 1, 2025"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium text-gray-900">Role:</span> Administrator
            </p>

          </div>

        </div>
        
      </div>
    </Layout>
  );
};

export default Profile;