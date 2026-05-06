import React, { useState, useEffect } from 'react';
import { PenTool, Save } from 'lucide-react';

export default function GradesView({ classes, subjects, students, grades, setGrades, showNotification }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [tempGrades, setTempGrades] = useState({});

    useEffect(() => {
        if (selectedClass && selectedSubject) {
            const classStudents = students.filter(s => s.classId === parseInt(selectedClass));
            const initialMap = {};
            classStudents.forEach(s => {
                const existingGrade = grades.find(g => g.studentId === s.id && g.subjectId === parseInt(selectedSubject));
                initialMap[s.id] = existingGrade ? existingGrade.score : '';
            });
            setTempGrades(initialMap);
        }
    }, [selectedClass, selectedSubject, students, grades]);

    const handleScoreChange = (studentId, value) => {
        const score = parseInt(value);
        setTempGrades(prev => ({
            ...prev,
            [studentId]: isNaN(score) ? '' : (score > 100 ? 100 : (score < 0 ? 0 : score))
        }));
    };

    const handleSaveGrades = () => {
        let newGrades = [...grades];
        let count = 0;

        Object.entries(tempGrades).forEach(([studentId, score]) => {
            if (score === '') return;

            const sId = parseInt(studentId);
            const subId = parseInt(selectedSubject);

            newGrades = newGrades.filter(g => !(g.studentId === sId && g.subjectId === subId));
            newGrades.push({ studentId: sId, subjectId: subId, score: parseInt(score) });
            count++;
        });

        setGrades(newGrades);
        showNotification(`${count} Nilai berhasil disimpan!`);
    };

    const currentStudents = students.filter(s => s.classId === parseInt(selectedClass));

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-6 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Kelas</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                        <option value="">-- Pilih Kelas --</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Mata Pelajaran</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedClass}>
                        <option value="">-- Pilih Mapel --</option>
                        {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
            </div>

            {selectedClass && selectedSubject ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-700">Form Input Nilai</h3>
                        <button onClick={handleSaveGrades} className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2">
                            <Save size={16} /> Simpan Semua Nilai
                        </button>
                    </div>
                    {currentStudents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">Belum ada siswa di kelas ini.</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
                                    <th className="p-4 font-semibold w-24">NIS</th>
                                    <th className="p-4 font-semibold">Nama Siswa</th>
                                    <th className="p-4 font-semibold w-40 text-center">Nilai (0-100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentStudents.map((student) => (
                                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="p-4 text-gray-600">{student.nis}</td>
                                        <td className="p-4 font-medium text-gray-800">{student.name}</td>
                                        <td className="p-4">
                                            <input type="number" min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="-" value={tempGrades[student.id] ?? ''} onChange={(e) => handleScoreChange(student.id, e.target.value)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (
                <div className="p-12 text-center border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
                    <PenTool size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Silakan pilih Kelas dan Mata Pelajaran terlebih dahulu untuk mulai input nilai.</p>
                </div>
            )}
        </div>
    );
}