"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark =
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(dark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  // Always render the same structure — only the icon/label differ after mount
  return (
    <button
      onClick={mounted ? toggleTheme : undefined}
      className="flex items-center gap-3 p-4 w-full rounded-xl text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-slate-800/80 transition-all duration-300 group"
      aria-label="Toggle Dark Mode"
      suppressHydrationWarning
    >
      <span className="transition-transform duration-500 group-hover:rotate-180" suppressHydrationWarning>
        {mounted ? (isDark ? <Sun size={24} /> : <Moon size={24} />) : <Moon size={24} />}
      </span>
      <span className="p-16-semibold" suppressHydrationWarning>
        {mounted ? (isDark ? "Light Mode" : "Dark Mode") : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
