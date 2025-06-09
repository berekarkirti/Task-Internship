"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "./UserContext";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import profile2 from "../../public/profile2.png";

const Header = () => 
{
  const { user, logout } = useUser();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => 
  {
    setIsClient(true);
  }, []);

  let pageTitle = "Dashboard";
  let subTitle = "XYZ Textile Admin Dashboard";

  switch (pathname) 
  {
    case "/dashboard":
      pageTitle = "Dashboard";
      subTitle = "XYZ Textile Admin Dashboard";
      break;
    case "/profile":
      pageTitle = "Profile";
      subTitle = "XYZ Textile Admin Profile";
      break;
    case "/product":
      pageTitle = "Products";
      subTitle = "XYZ Textile Products Management";
      break;
    case "/category":
      pageTitle = "Category";
      subTitle = "XYZ Textile Category Management";
      break;
    default:
      pageTitle = "Dashboard";
      subTitle = "XYZ Textile Admin Dashboard";
  }

  const profileImageUrl = user?.photoURL || "";

  return (
    <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-50 to-gray-100 p-4 rounded-b-lg shadow-lg">

      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 drop-shadow-md">{pageTitle}</h1>
        <p className="text-lg text-gray-600">{subTitle}</p>
      </div>

      {isClient && user && (
        <div className="flex items-center space-x-4">
          <Image src={profile2} alt={user.displayName || "User Profile"} width={48} height={48} className="rounded-full border-2 border-blue-200 shadow-md transition-transform duration-300 hover:scale-110" />
          <div className="relative">

            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">{user.displayName}</span>
              <FaCaretDown className="text-gray-600 group-hover:text-blue-700 transition-colors duration-300" />
            </div>

            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
              <ul className="py-2">
                <li>
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                </li>
                <li>
                  <Link href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100" >Logout</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
};

export default Header;