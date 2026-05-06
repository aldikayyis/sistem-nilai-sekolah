import React from 'react';
import { School, Users, BookOpen, PenTool, Calendar, TrendingUp, Activity, ArrowRight, Plus, FileText } from 'lucide-react';

export default function DashboardView({ stats, classes, students, setActiveTab, user }) {
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const StatCard = ({ title, value, icon, color, trend }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-all duration-300 group">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{value}</p>
                {trend && (
                    <p className="text-xs text-emerald-500 font-medium mt-2 flex items-center gap-1">
                        <TrendingUp size={14} /> {trend}
                    </p>
                )}
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in-down">
            {/* Banner Utama */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-indigo-100 mb-2">
                        <Calendar size={18} />
                        <span className="text-sm font-medium">{today}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Selamat Datang, {user.name}!</h2>
                    <p className="text-indigo-100 max-w-2xl leading-relaxed">
                        Ini adalah ringkasan aktivitas akademik hari ini. Anda memiliki akses penuh untuk mengelola data kelas, siswa, hingga mencetak laporan hasil belajar.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-full opacity-10 pointer-events-none">
                    <Activity size={250} className="absolute -right-10 -top-10" />
                </div>
            </div>

            {/* Grid Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Kelas" value={stats.kelas} icon={<School size={28} className="text-blue-600" />} color="bg-blue-100" trend="Aktif" />
                <StatCard title="Total Siswa" value={stats.siswa} icon={<Users size={28} className="text-green-600" />} color="bg-green-100" trend="+ Data Terkini" />
                <StatCard title="Mata Pelajaran" value={stats.mapel} icon={<BookOpen size={28} className="text-purple-600" />} color="bg-purple-100" />
                <StatCard title="Nilai Diinput" value={stats.nilai} icon={<PenTool size={28} className="text-orange-600" />} color="bg-orange-100" />
            </div>

            {/* Grid Bawah */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Distribusi Siswa */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Users size={20} className="text-indigo-600" /> Distribusi Siswa per Kelas
                    </h3>
                    <div className="space-y-5">
                        {classes.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">Belum ada data kelas.</p>
                        ) : (
                            classes.map(c => {
                                const studentCount = students.filter(s => s.classId === c.id).length;
                                const percentage = Math.min((studentCount / 40) * 100, 100);
                                return (
                                    <div key={c.id}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="font-medium text-gray-700">{c.name}</span>
                                            <span className="text-gray-500">{studentCount} Siswa</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                            <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Aksi Cepat */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Activity size={20} className="text-indigo-600" /> Aksi Cepat
                    </h3>
                    <div className="space-y-3">
                        <button onClick={() => setActiveTab('nilai')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
                            <div className="flex items-center gap-3 text-gray-700 group-hover:text-indigo-700">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><PenTool size={18} /></div>
                                <span className="font-medium text-sm">Input Nilai Baru</span>
                            </div>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-indigo-600" />
                        </button>
                        <button onClick={() => setActiveTab('siswa')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group">
                            <div className="flex items-center gap-3 text-gray-700 group-hover:text-green-700">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600"><Plus size={18} /></div>
                                <span className="font-medium text-sm">Tambah Siswa</span>
                            </div>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-green-600" />
                        </button>
                        <button onClick={() => setActiveTab('laporan')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                            <div className="flex items-center gap-3 text-gray-700 group-hover:text-blue-700">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><FileText size={18} /></div>
                                <span className="font-medium text-sm">Cetak Rapor</span>
                            </div>
                            <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}