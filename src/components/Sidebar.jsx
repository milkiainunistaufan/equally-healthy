// src/components/Sidebar.jsx
import React from 'react';
import { Activity, LayoutDashboard, FileSpreadsheet, Users, X } from 'lucide-react';

function Sidebar({ user, activeMenu, setActiveMenu, isOpen, onClose }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, roles: ['admin', 'dokter', 'perawat', 'manajemen'] },
    { id: 'rekam-medis', label: 'Input RME (SOAP)', icon: FileSpreadsheet, roles: ['admin', 'dokter', 'perawat'] },
  ];

  const menuMaster = [
    { id: 'register-officer', label: 'Employee', icon: Users, roles: ['admin'] },
  ];

  const handleSelectMenu = (id) => {
    setActiveMenu(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop Gelap (Hanya tampil di bawah layar lg: saat sidebar terbuka) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-20 bg-slate-900/50 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

    <aside className={`fixed top-0 left-0 z-30 flex h-screen w-64 flex-col overflow-y-auto border-r border-slate-200 bg-white text-slate-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
      
      {/* Brand Logo */}
      <div className="px-6 pt-6 pb-2 text-left">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white dark:bg-sky-500">
            <Activity className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="m-0 text-xl font-semibold tracking-wide text-sky-600 dark:text-sky-400">
                EH-<span className="font-semibold text-teal-600 dark:text-teal-400">SIMRS</span>
            </h2>
            <small className="block font-light text-slate-400 dark:text-slate-200">
                Equally Healthy v1.0
            </small>
          </div>
        </div>
          <button
            onClick={onClose}
            aria-label="Tutup Menu"
            className="mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-1 px-4 py-5">
        <ul className="m-0 list-none space-y-1 p-0">
          {menuItems.map((item) => {
            if (!item.roles.includes(user.role)) return null;
            const isActive = activeMenu === item.id;
            const Icon = item.icon;
            
            return (
              <li
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-50 font-medium text-sky-600 dark:bg-sky-950/50 dark:text-sky-400'
                    : 'font-light text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.75} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        {/* Grup Menu Master Data */}
        {menuMaster.some((item) => item.roles.includes(user.role)) && (
          <ul className="mt-6 list-none space-y-1 border-t border-slate-200 pt-4 dark:border-slate-800">
            <li className="px-3.5 pb-1 text-[11px] font-medium tracking-wider text-slate-400 uppercase dark:text-slate-500">
              Master Data
            </li>
            {menuMaster.map((item) => {
              if (!item.roles.includes(user.role)) return null;
              const isActive = activeMenu === item.id;
              const Icon = item.icon;
              
              return (
                <li
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-sky-50 font-medium text-sky-600 dark:bg-sky-950/50 dark:text-sky-400'
                      : 'font-light text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.75} />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </aside>
    </>
  );
}

export default Sidebar;