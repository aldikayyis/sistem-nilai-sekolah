import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function SubjectsView({ subjects, setSubjects, showNotification }) {
    const [formData, setFormData] = useState({ code: '', name: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!formData.code || !formData.name) return;
        const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
        setSubjects([...subjects, { id: newId, code: formData.code.toUpperCase(), name: formData.name }]);
        setFormData({ code: '', name: '' });
        showNotification('Mata pelajaran ditambahkan!');
    };

    const handleDelete = (id) => {
        setSubjects(subjects.filter(s => s.id !== id));
        showNotification('Mata pelajaran dihapus!', 'error');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                            <th className="p-4 font-semibold w-24">Kode</th>
                            <th className="p-4 font-semibold">Nama Mata Pelajaran</th>
                            <th className="p-4 font-semibold text-right w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.length === 0 && (
                            <tr><td colSpan="3" className="p-4 text-center text-gray-500">Belum ada data mata pelajaran.</td></tr>
                        )}
                        {subjects.map((sub) => (
                            <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 text-gray-600 font-medium">{sub.code}</td>
                                <td className="p-4 font-medium text-gray-800">{sub.name}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(sub.id)} className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Plus size={20} className="text-indigo-600" /> Tambah Mata Pelajaran
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mapel</label>
                            <input
                                type="text"
                                required
                                maxLength={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none uppercase"
                                placeholder="Contoh: FIS"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mata Pelajaran</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Contoh: Fisika Dasar"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 mt-2">
                            <Save size={18} /> Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}