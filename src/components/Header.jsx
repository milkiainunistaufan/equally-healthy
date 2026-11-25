// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon, LogOut, Menu, User, Settings } from 'lucide-react';

function Header({ user, onLogout, onToggleSidebar }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/80">
      
      {/* Kiri: Informasi Petugas Aktif */}
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={onToggleSidebar}
          aria-label="Buka Menu"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Kanan: Tombol Tema & Keluar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          title={isDark ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode'}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-150 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        <details className="relative inline-block text-left group">
          <summary className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md cursor-pointer list-none hover:bg-blue-700 focus:outline-none">
            {user.name}
            <svg className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-open:rotate-180" xmlns="http://w3.org" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </summary>

          <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white dark:bg-gray-950 rounded-md shadow-lg">
            <div className="p-4 text-gray-700 dark:text-slate-100" role="menu">
              <a href="" className="block mb-1 rounded-md px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-800"><User className="inline mr-2" />Profil Saya</a>
              <a href="" className="block mb-1 rounded-md px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-800"><Settings className="inline mr-2" />Pengaturan</a>
              <hr className="my-2 border-t border-gray-200" />
              <button onClick={onLogout} className="flex gap-1 w-full px-4 py-2 text-sm text-white rounded-md bg-red-800 hover:bg-red-900">
                <LogOut className="h-6 w-6" />
                <span>Log Out</span>
                </button>
            </div>
          </div>
        </details>
      </div>

    </header>
  );
}

export default Header;