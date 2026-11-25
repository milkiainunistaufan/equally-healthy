// src/views/admin/OfficerRegister.jsx
import React, { useState } from 'react';

function OfficerRegister({ onSelesai }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'dokter',
    nik: '',
    str: '',
    sip: '',
    specialization: '',
    phone_number: '',
    address: '',
  });
  const [pesan, setPesan] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPesan('');
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register-officer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setPesan(result.message);
        // Reset seluruh form termasuk 'name'
        setFormData({
          name: '',
          username: '',
          password: '',
          role: 'dokter',
          nik: '',
          str: '',
          sip: '',
          specialization: '',
          phone_number: '',
          address: '',
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Gagal terhubung ke server');
    } finally {
      setLoading(false);
    }
  };

  // Kelas utilitas seragam untuk semua kotak input agar kode bersih
  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-sky-400';

  const labelClass =
    'mb-1.5 block text-xs font-medium tracking-wide text-slate-600 dark:text-slate-300';

  return (
    <div className=" max-w-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 sm:p-8 dark:border-slate-800 dark:bg-slate-900">

      {/* Notifikasi Alert Sukses / Error */}
      {pesan && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-400">
          ✅ {pesan}
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400">
          ❌ {error}
        </div>
      )}

      {/* Grid Form Responsif (1 kolom di HP, 2 kolom di iPad/Desktop) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2">
        
        {/* Nama Lengkap (Lebar Penuh) */}
        <div className="md:col-span-2">
          <label className={labelClass}>Nama Lengkap Petugas (Sesuai Gelar) *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Contoh: dr. Budi Santoso, Sp.A"
            className={inputClass}
            required
          />
        </div>

        {/* Username */}
        <div>
          <label className={labelClass}>Username Akun Login *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Contoh: dr.budi"
            className={inputClass}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>Password Akun *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimal 6 karakter"
            className={inputClass}
            required
          />
        </div>

        {/* Role / Otoritas */}
        <div>
          <label className={labelClass}>Role / Otoritas Unit *</label>
          <select name="role" value={formData.role} onChange={handleChange} className={inputClass}>
            <option value="pendaftaran">Pendaftaran</option>
            <option value="kasir">Kasir</option>
            <option value="dokter">Dokter</option>
            <option value="perawat">Perawat</option>
            <option value="bidan">Bidan</option>
            <option value="farmasi">Farmasi</option>
            <option value="laboratorium">Laboratorium</option>
            <option value="radiologi">Radiologi</option>
            <option value="manajemen">Manajemen</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* NIK KTP */}
        <div>
          <label className={labelClass}>NIK KTP (16 Digit)</label>
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            placeholder="3507xxxxxxxxxxxx"
            maxLength="16"
            className={inputClass}
          />
        </div>

        {/* No. STR */}
        <div>
          <label className={labelClass}>No. STR (Jika Tenaga Medis)</label>
          <input
            type="text"
            name="str"
            value={formData.str}
            onChange={handleChange}
            placeholder="Nomor Surat Tanda Registrasi"
            className={inputClass}
          />
        </div>

        {/* No. SIP */}
        <div>
          <label className={labelClass}>No. SIP (Surat Izin Praktik)</label>
          <input
            type="text"
            name="sip"
            value={formData.sip}
            onChange={handleChange}
            placeholder="Nomor Surat Izin Praktik"
            className={inputClass}
          />
        </div>

        {/* Spesialisasi */}
        <div>
          <label className={labelClass}>Spesialisasi / Poli</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Contoh: Umum / Gigi / Anak"
            className={inputClass}
          />
        </div>

        {/* No. HP */}
        <div>
          <label className={labelClass}>No. HP / WhatsApp</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="0812xxxxxxxx"
            className={inputClass}
          />
        </div>

        {/* Alamat Rumah (Lebar Penuh) */}
        <div className="md:col-span-2">
          <label className={labelClass}>Alamat Lengkap</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            placeholder="Alamat domisili petugas..."
            className={inputClass}
          />
        </div>

        {/* Tombol Aksi */}
        <div className="mt-2 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5 md:col-span-2 dark:border-slate-800">
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-sky-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-sky-500 dark:hover:bg-sky-600"
          >
            {loading ? 'Menyimpan...' : '💾 Simpan Data Petugas'}
          </button>
          <button
            type="button"
            onClick={onSelesai}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Kembali
          </button>
        </div>

      </form>
    </div>
  );
}

export default OfficerRegister;