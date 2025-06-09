'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./themeSlice";


const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => 
  {

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) 
    {
      dispatch(setTheme(storedTheme));
    } 
    else 
    {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dispatch(setTheme(prefersDark ? "dark" : "light"));
    }
  }, [dispatch]);

  useEffect(() => 
  {

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
