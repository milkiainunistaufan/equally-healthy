// src/views/Login.jsx
import React, { useState, useEffect } from 'react';
import { Activity, LogIn, AlertCircle } from 'lucide-react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Pastikan tema Dark/Light dari localStorage tetap sinkron di halaman Login
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        onLoginSuccess(result.user);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Tidak dapat terhubung ke server backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 transition-colors duration-200 dark:bg-slate-950">
      
      {/* Kartu Login */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
        
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm dark:bg-sky-500">
            <Activity className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <h2 className="m-0 text-2xl font-semibold tracking-wide text-sky-600 dark:text-sky-400">
            EH-<span className="font-light text-teal-600 dark:text-teal-400">SIMRS</span>
          </h2>
          <p className="mt-1 mb-0 text-xs font-light text-slate-500 dark:text-slate-400">
            Sistem Informasi Manajemen Rumah Sakit & Klinik
          </p>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            ❌ {error}
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-600 dark:text-slate-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username petugas"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-400"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium tracking-wide text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-sky-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600">
            <LogIn className="h-4 w-4" />
            <span>{loading ? 'Memverifikasi...' : 'Masuk Sistem'}</span>
          </button>
        </form>

        {/* Footer Kecil */}
        <div className="mt-8 border-t border-slate-100 pt-4 text-center dark:border-slate-800">
          <small className="text-[11px] font-light text-slate-400 dark:text-slate-500">
            Equally Healthy v1.0 &copy; {new Date().getFullYear()}
          </small>
        </div>

      </div>
    </div>
  );
}

export default Login;