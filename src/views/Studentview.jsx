import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function StudentsView({ students, setStudents, classes, showNotification }) {
    const [filterClass, setFilterClass] = useState('all');
    const [formData, setFormData] = useState({ nis: '', name: '', classId: '' });

    const filteredStudents = filterClass === 'all'
        ? students
        : students.filter(s => s.classId === parseInt(filterClass));

    const handleAdd = (e) => {
        e.preventDefault();
        if (!formData.nis || !formData.name || !formData.classId) return;
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
        setStudents([...students, { id: newId, nis: formData.nis, name: formData.name, classId: parseInt(formData.classId) }]);
        setFormData({ nis: '', name: '', classId: '' });
        showNotification('Siswa berhasil ditambahkan!');
    };

    const handleDelete = (id) => {
        setStudents(students.filter(s => s.id !== id));
        showNotification('Siswa dihapus!', 'error');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[70vh]">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700">Daftar Siswa</h3>
                    <select
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500"
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                    >
                        <option value="all">Semua Kelas</option>
                        {classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="overflow-y-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 shadow-sm">
                            <tr className="text-sm text-gray-600">
                                <th className="p-4 font-semibold w-20">NIS</th>
                                <th className="p-4 font-semibold">Nama Siswa</th>
                                <th className="p-4 font-semibold">Kelas</th>
                                <th className="p-4 font-semibold text-right w-24">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.length === 0 && (
                                <tr><td colSpan="4" className="p-4 text-center text-gray-500">Tidak ada data siswa ditemukan.</td></tr>
                            )}
                            {filteredStudents.map((s) => (
                                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-4 text-gray-600">{s.nis}</td>
                                    <td className="p-4 font-medium text-gray-800">{s.name}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-medium">
                                            {classes.find(c => c.id === s.classId)?.name || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Plus size={20} className="text-indigo-600" /> Tambah Siswa Baru
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NIS (Nomor Induk)</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Contoh: 1056"
                                value={formData.nis}
                                onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Contoh: Siti Nurhaliza"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kelas</label>
                            <select
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={formData.classId}
                                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                            >
                                <option value="" disabled>-- Pilih Kelas --</option>
                                {classes.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition mt-2 flex items-center justify-center gap-2">
                            <Save size={18} /> Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}