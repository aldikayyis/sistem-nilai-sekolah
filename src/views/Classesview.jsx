import React, { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';

export default function ClassesView({ classes, setClasses, showNotification }) {
    const [newClassName, setNewClassName] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newClassName.trim()) return;
        const newId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
        setClasses([...classes, { id: newId, name: newClassName }]);
        setNewClassName('');
        showNotification('Kelas berhasil ditambahkan!');
    };

    const handleDelete = (id) => {
        setClasses(classes.filter(c => c.id !== id));
        showNotification('Kelas dihapus!', 'error');
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                            <th className="p-4 font-semibold w-16">ID</th>
                            <th className="p-4 font-semibold">Nama Kelas</th>
                            <th className="p-4 font-semibold text-right w-24">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.length === 0 && (
                            <tr><td colSpan="3" className="p-4 text-center text-gray-500">Belum ada data kelas.</td></tr>
                        )}
                        {classes.map((cls, idx) => (
                            <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 text-gray-500">{idx + 1}</td>
                                <td className="p-4 font-medium text-gray-800">{cls.name}</td>
                                <td className="p-4 text-right">
                                    <button onClick={() => handleDelete(cls.id)} className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50">
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
                        <Plus size={20} className="text-indigo-600" /> Tambah Kelas Baru
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Contoh: XII IPA 1"
                                value={newClassName}
                                onChange={(e) => setNewClassName(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                            <Save size={18} /> Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}