// src/views/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import OfficerRegister from './admin/OfficerRegister';

function Dashboard({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mt-0 mb-2 text-lg font-medium text-slate-800 dark:text-slate-100">
              📊 Ringkasan Operasional Klinik
            </h3>
            <p className="m-0 font-light text-slate-500 dark:text-slate-400">
              Selamat datang di panel EH-SIMRS. Silakan pilih menu navigasi di sisi kiri untuk mulai mengelola modul klinik.
            </p>
          </div>
        );
      case 'register-officer':
        return <OfficerRegister onSelesai={() => setActiveMenu('overview')} />;
      case 'rekam-medis':
        return (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mt-0 mb-2 text-lg font-medium text-slate-800 dark:text-slate-100">
              📝 Rekam Medis Elektronik (RME)
            </h3>
            <p className="m-0 font-light text-slate-500 dark:text-slate-400">
              Modul penginputan rekam medis berbasis SOAP dokter.
            </p>
          </div>
        );
      default:
        return (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
            Halaman tidak ditemukan.
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* 1. Sisi Kiri: Sidebar (Lebar w-64) */}
      <Sidebar user={user} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />

      {/* 2. Sisi Kanan: Area Utama (Tambahkan flex-1 dan ml-64 agar sejajar & penuh) */}
      <div className="lg:ml-64 flex flex-1 flex-col">
        {/* Atas: Header */}
        <Header user={user} onLogout={onLogout} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Bawah: Konten Dinamis */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;