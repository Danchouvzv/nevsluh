"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Проверяем предпочтения пользователя по теме
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark-theme', savedTheme === 'dark');
      document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
    } else {
      setIsDarkTheme(darkModePreference);
      document.documentElement.classList.toggle('dark-theme', darkModePreference);
      document.documentElement.classList.toggle('light-theme', !darkModePreference);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.documentElement.classList.toggle('dark-theme', newTheme);
    document.documentElement.classList.toggle('light-theme', !newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Предотвращаем мерцание при загрузке страницы
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
    >
      <div 
        className={`theme-switch ${isDarkTheme ? 'dark' : ''}`} 
        onClick={toggleTheme}
        aria-label="Переключить тему"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleTheme();
          }
        }}
      >
        <motion.div
          initial={false}
          animate={{ 
            x: isDarkTheme ? 30 : 0,
            backgroundColor: isDarkTheme ? '#E83E8C' : '#FFFFFF'
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-6 h-6 rounded-full top-[3px] left-[3px] shadow-md z-10"
        />
        
        <div className="absolute inset-0 flex justify-between items-center px-[7px]">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-opacity ${isDarkTheme ? 'opacity-0' : 'opacity-100'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" 
            />
          </svg>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 text-white transition-opacity ${isDarkTheme ? 'opacity-100' : 'opacity-0'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
} 