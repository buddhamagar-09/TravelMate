import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./components/frontend/Header.jsx";
import Footer from "./components/frontend/Footer.jsx";
import { ThemeProvider } from "./components/Theme/ThemeContext.jsx";
import { useState, useEffect } from "react";

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  const lightMode = () => {
    setThemeMode("light");
  };

  const darkMode = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    localStorage.setItem("themeMode", themeMode);
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ lightMode, darkMode, themeMode }}>
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
