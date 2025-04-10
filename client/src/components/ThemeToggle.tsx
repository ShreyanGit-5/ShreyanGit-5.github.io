import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-transparent transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <Sun
          className={`absolute inset-0 h-6 w-6 text-yellow-500 transition-all duration-500 ease-in-out transform ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        {/* Moon icon */}
        <Moon
          className={`absolute inset-0 h-6 w-6 text-blue-400 transition-all duration-500 ease-in-out transform ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      {/* Ripple effect */}
      <span
        className="absolute inset-0 rounded-full bg-blue-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-10 group-active:opacity-20"
      ></span>
      {/* Artistic hover effect */}
      <span
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-50 group-active:opacity-75"
      ></span>
    </button>
  );
};

export default ThemeToggle;