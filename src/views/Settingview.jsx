import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';

export default function SettingsView({ settings, setSettings, user, setUser, teachers, setTeachers, showNotification }) {
    const [formData, setFormData] = useState({
        schoolName: settings.schoolName,
        schoolLogo: settings.schoolLogo,
        teacherName: user.name,
        password: user.password
    });

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setSettings({
            ...settings,
            schoolName: formData.schoolName,
            schoolLogo: formData.schoolLogo
        });

        const updatedUser = { ...user, name: formData.teacherName, password: formData.password };
        setUser(updatedUser);

        const updatedTeachers = teachers.map(t => t.id === user.id ? updatedUser : t);
        setTeachers(updatedTeachers);

        showNotification('Pengaturan berhasil disimpan!');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Settings size={20} className="text-indigo-600" /> Pengaturan Sistem & Profil
                </h3>
            </div>

            <form onSubmit={handleSaveSettings} className="p-6 space-y-6">
                <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Informasi Sekolah</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.schoolName} onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Logo Sekolah</label>
                        <div className="flex gap-4 items-center">
                            <img src={formData.schoolLogo} alt="Preview" className="w-12 h-12 rounded border border-gray-200 bg-gray-50" />
                            <input type="url" required className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.schoolLogo} onChange={(e) => setFormData({ ...formData, schoolLogo: e.target.value })} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Masukkan URL gambar (JPG/PNG/SVG). Contoh: https://link-gambar.com/logo.png</p>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Profil Guru (Anda)</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap & Gelar</label>
                        <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.teacherName} onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password Login</label>
                        <input type="password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username (Tidak bisa diubah)</label>
                        <input type="text" disabled className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg text-gray-500" value={user.username} />
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                        <Save size={20} /> Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}