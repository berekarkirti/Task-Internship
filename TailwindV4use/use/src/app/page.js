"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [flip, setFlip] = useState(false);

  return (
    <div>
      <div className="container mx-auto">

        <div className="min-h-screen flex items-center justify-center container-query">
          <h1 className="custom-text">Tailwind v4 in Next.js 🎨</h1>
          <h1 className="text-primary">Hello Developers!</h1>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 container-query">
          <h1 className="text-4xl font-bold custom-text">Tailwind v4 CSS Theme Variables 🚀</h1>
          <button className="custom-button text-primary mt-4">Click Me</button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-6">
          <button data-theme="dark" className="bg-gray-300 p-4 data-[theme=dark]:bg-gray-900 data-[theme=dark]:text-white">
            Tailwind v4 Dynamic Variant 🎨
          </button>
          <button data-theme="dark" className="bg-gray-300 p-4 data-[theme=light]:bg-gray-900 data-[theme=dark]:text-white">
            Tailwind v4 Dynamic Variant 🎨
          </button>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 container-query">
          <h1 className="text-4xl font-bold text-sky-500">Tailwind v4 P3 Colors 🌈</h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-md">Click Me</button>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md">Click Me</button>
            <button className="px-4 py-2 bg-sky-500 text-white rounded-md">Click Me</button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-md">Click Me</button>
            <button className="px-4 py-2 bg-amber-500 text-white rounded-md">Click Me</button>
            <button className="px-4 py-2 bg-lime-500 text-white rounded-md">Click Me</button>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-64 h-64 perspective-1000" onClick={() => setFlip(!flip)} >

          <div className={`absolute w-full h-full transition-transform duration-700 transform ${flip ? "rotate-y-180" : ""}`}>

            <div className="absolute w-full h-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold backface-invisible">
              Front
            </div>

            <div className="absolute w-full h-full bg-rose-400 flex items-center justify-center text-white text-2xl font-bold rotate-y-180 backface-invisible">
              Hey !!
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-evenly items-center pb-10">
        <div className="bg-linear-45 bg-gradient-radial from-purple-500 to-indigo-500 h-48 w-48 mx-auto">
          box-1
        </div>
        <div className="bg-linear-45 bg-gradient-conic from-red-500 via-yellow-500 h-48 w-48 mx-auto">
          box-2
        </div>
        <div className="bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 h-48 w-48 mx-auto">
          box-3
        </div>
      </div>

      <div>
        <button popover-target="my-popover">Check for updates</button>
        <div className="opacity-0 transition-opacity duration-300 ease-in-out open:opacity-100">
          jdcnjndj
        </div>
      </div>

    </div>
  );
}
