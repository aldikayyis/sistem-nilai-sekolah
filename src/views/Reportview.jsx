import React, { useState } from 'react';
import { Search, Printer, FileText, User, ChevronRight } from 'lucide-react';

// Menambahkan default empty arrays [] untuk mencegah error "undefined" pada .filter() atau .map()
export default function ReportView({
    classes = [],
    students = [],
    subjects = [],
    grades = [],
    showNotification = () => { }
}) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Pastikan data students adalah array sebelum melakukan filter
    const safeStudents = Array.isArray(students) ? students : [];
    const safeClasses = Array.isArray(classes) ? classes : [];
    const safeSubjects = Array.isArray(subjects) ? subjects : [];
    const safeGrades = Array.isArray(grades) ? grades : [];

    // Filter siswa berdasarkan kelas dan pencarian
    const filteredStudents = safeStudents.filter(s => {
        const matchClass = selectedClass ? s.classId === parseInt(selectedClass) : true;
        const matchSearch = (s.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.nis || "").includes(searchTerm);
        return matchClass && matchSearch;
    });

    // Ambil nilai untuk siswa yang dipilih
    const getStudentGrades = (studentId) => {
        return safeSubjects.map(subject => {
            const gradeEntry = safeGrades.find(g => g.studentId === studentId && g.subjectId === subject.id);
            return {
                ...subject,
                score: gradeEntry ? gradeEntry.score : '-'
            };
        });
    };

    // FUNGSI UTAMA: Cetak ke PDF
    const handlePrint = () => {
        if (!selectedStudent) {
            showNotification('Pilih siswa terlebih dahulu!', 'error');
            return;
        }
        // Menjalankan perintah print browser
        window.print();
    };

    const studentGrades = selectedStudent ? getStudentGrades(selectedStudent.id) : [];

    // Hitung rata-rata dengan memastikan score adalah angka
    const numericGrades = studentGrades.filter(g => typeof g.score === 'number');
    const averageGrade = numericGrades.length > 0
        ? (numericGrades.reduce((acc, curr) => acc + curr.score, 0) / numericGrades.length).toFixed(2)
        : "0.00";

    return (
        <div className="space-y-6">
            {/* Bagian Filter - Sembunyi saat diprint */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100 print:hidden">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kelas</label>
                    <select
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={selectedClass}
                        onChange={(e) => {
                            setSelectedClass(e.target.value);
                            setSelectedStudent(null);
                        }}
                    >
                        <option value="">Semua Kelas</option>
                        {safeClasses.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-[2] relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cari Nama Siswa</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Masukkan nama atau NIS..."
                            className="w-full pl-10 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List Siswa - Sembunyi saat diprint */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden print:hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            <User size={18} className="text-indigo-600" />
                            Daftar Siswa
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map(student => (
                                <button
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`w-full p-4 flex items-center justify-between hover:bg-indigo-50 transition-colors ${selectedStudent?.id === student.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''}`}
                                >
                                    <div className="text-left">
                                        <p className="font-bold text-gray-800">{student.name}</p>
                                        <p className="text-xs text-gray-500">
                                            NIS: {student.nis} • {safeClasses.find(c => c.id === student.classId)?.name || 'Tanpa Kelas'}
                                        </p>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </button>
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-400 text-sm">Siswa tidak ditemukan</div>
                        )}
                    </div>
                </div>

                {/* Preview Rapor & Tombol Print */}
                <div className="lg:col-span-2 space-y-6">
                    {selectedStudent ? (
                        <>
                            {/* Tombol Aksi - Sembunyi saat diprint */}
                            <div className="flex justify-end print:hidden">
                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-all active:scale-95"
                                >
                                    <Printer size={20} />
                                    Cetak Rapor (PDF)
                                </button>
                            </div>

                            {/* AREA RAPOR YANG AKAN DIPRINT */}
                            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
                                {/* Header Rapor */}
                                <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
                                    <h2 className="text-2xl font-bold uppercase tracking-widest">Laporan Hasil Belajar Siswa</h2>
                                    <h3 className="text-lg font-medium text-gray-600">SMK Negeri Teknologi Informasi</h3>
                                    <p className="text-sm text-gray-500">Jl. Pendidikan No. 45, Jakarta Selatan</p>
                                </div>

                                {/* Info Siswa */}
                                <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                                    <div className="space-y-1">
                                        <p><span className="w-32 inline-block font-medium">Nama Siswa</span>: <span className="font-bold">{selectedStudent.name}</span></p>
                                        <p><span className="w-32 inline-block font-medium">Nomor Induk (NIS)</span>: {selectedStudent.nis}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p><span className="w-32 inline-block font-medium text-left">Kelas</span>: {safeClasses.find(c => c.id === selectedStudent.classId)?.name || '-'}</p>
                                        <p><span className="w-32 inline-block font-medium text-left">Tahun Ajaran</span>: 2023/2024</p>
                                    </div>
                                </div>

                                {/* Tabel Nilai */}
                                <table className="w-full border-collapse border border-gray-800 mb-8">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-800 px-4 py-2 text-left w-12">No</th>
                                            <th className="border border-gray-800 px-4 py-2 text-left">Mata Pelajaran</th>
                                            <th className="border border-gray-800 px-4 py-2 text-center w-24">KKM</th>
                                            <th className="border border-gray-800 px-4 py-2 text-center w-24">Nilai</th>
                                            <th className="border border-gray-800 px-4 py-2 text-center w-32">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentGrades.map((g, idx) => (
                                            <tr key={idx}>
                                                <td className="border border-gray-800 px-4 py-2 text-center">{idx + 1}</td>
                                                <td className="border border-gray-800 px-4 py-2">{g.name || 'N/A'}</td>
                                                <td className="border border-gray-800 px-4 py-2 text-center">75</td>
                                                <td className="border border-gray-800 px-4 py-2 text-center font-bold">
                                                    {typeof g.score === 'object' ? 'Err' : g.score}
                                                </td>
                                                <td className="border border-gray-800 px-4 py-2 text-center text-xs">
                                                    {typeof g.score === 'number' ? (g.score >= 75 ? 'Tuntas' : 'Belum Tuntas') : '-'}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50 font-bold">
                                            <td colSpan="3" className="border border-gray-800 px-4 py-2 text-right uppercase">Rata-rata Nilai</td>
                                            <td className="border border-gray-800 px-4 py-2 text-center text-indigo-600">{averageGrade}</td>
                                            <td className="border border-gray-800 px-4 py-2"></td>
                                        </tr>
                                    </tbody>
                                </table>

                                {/* Tanda Tangan */}
                                <div className="grid grid-cols-2 mt-16 text-sm">
                                    <div className="text-center">
                                        <p>Mengetahui,</p>
                                        <p className="mb-20">Orang Tua/Wali</p>
                                        <p className="font-bold border-b border-gray-800 inline-block px-8">( ............................ )</p>
                                    </div>
                                    <div className="text-center">
                                        <p>Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <p className="mb-20">Wali Kelas</p>
                                        <p className="font-bold border-b border-gray-800 inline-block px-8">Budi Santoso, S.Pd</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white p-20 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-gray-400">
                            <FileText size={64} className="mb-4 opacity-20" />
                            <p className="text-lg">Pilih siswa di sebelah kiri untuk melihat laporan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}