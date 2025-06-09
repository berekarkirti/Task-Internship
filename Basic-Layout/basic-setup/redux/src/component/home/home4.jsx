"use client";

import { toggleTheme } from "@/redux-counter/theme/themeSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


const Home4 = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "light"
          ? "bg-light-background text-light-text"
          : "bg-dark-background text-dark-text"
      }`}
    >
      <button
        onClick={() => dispatch(toggleTheme())}
        className={`px-4 py-2 rounded ${
          theme === "light"
            ? "bg-light-accent text-white"
            : "bg-dark-accent text-black"
        } hover:opacity-80 transition`}
      >
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default Home4;
