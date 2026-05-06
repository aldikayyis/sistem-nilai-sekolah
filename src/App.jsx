import React, { useState } from 'react';
import { LayoutDashboard, School, Users, BookOpen, PenTool, FileText, Settings, LogOut, UserCircle, CheckCircle2, AlertCircle } from 'lucide-react';

// Import Views
import LoginView from './views/Loginview';
import DashboardView from './views/Dashboardview';
import ClassesView from './views/Classesview';
import StudentsView from './views/Studentview';
import SubjectsView from './views/Subjectsview';
import GradesView from './views/Gradesview';
import ReportView from './views/Reportview';
import SettingsView from './views/Settingview';

// --- MOCK DATA AWAL ---
const initialTeachers = [
  { id: 1, username: 'guru1', password: '123', name: 'Budi Santoso, S.Pd' },
  { id: 2, username: 'guru2', password: '123', name: 'Siti Aminah, M.Pd' }
];
const initialClasses = [
  { id: 1, name: 'X IPA 1' },
  { id: 2, name: 'X IPS 1' }
];
const initialStudents = [
  { id: 1, nis: '1001', name: 'Ahmad Dahlan', classId: 1 },
  { id: 2, nis: '1002', name: 'Rina Melati', classId: 1 },
  { id: 3, nis: '1003', name: 'Joko Anwar', classId: 2 }
];
const initialSubjects = [
  { id: 1, code: 'MTK', name: 'Matematika' },
  { id: 2, code: 'BIN', name: 'Bahasa Indonesia' },
  { id: 3, code: 'ING', name: 'Bahasa Inggris' }
];
const initialGrades = [
  { studentId: 1, subjectId: 1, score: 85 },
  { studentId: 1, subjectId: 2, score: 90 },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [students, setStudents] = useState(initialStudents);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [grades, setGrades] = useState(initialGrades);

  const [settings, setSettings] = useState({
    schoolName: 'SMA Negeri 1 Nusantara',
    schoolLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=school&backgroundColor=e2e8f0'
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  if (!user) {
    return <LoginView teachers={teachers} onLogin={(u) => setUser(u)} showNotification={showNotification} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 print:bg-white print:h-auto print:block print:overflow-visible print:w-full">
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl print:hidden">
        <div className="p-6 flex items-center gap-3 border-b border-indigo-800">
          <img src={settings.schoolLogo} alt="Logo" className="w-10 h-10 rounded bg-white p-1" />
          <div>
            <h1 className="font-bold text-sm leading-tight">{settings.schoolName}</h1>
            <p className="text-indigo-300 text-xs mt-1">Sistem Nilai</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<School size={20} />} label="Data Kelas" isActive={activeTab === 'kelas'} onClick={() => setActiveTab('kelas')} />
          <NavItem icon={<Users size={20} />} label="Data Siswa" isActive={activeTab === 'siswa'} onClick={() => setActiveTab('siswa')} />
          <NavItem icon={<BookOpen size={20} />} label="Mata Pelajaran" isActive={activeTab === 'mapel'} onClick={() => setActiveTab('mapel')} />
          <NavItem icon={<PenTool size={20} />} label="Input Nilai" isActive={activeTab === 'nilai'} onClick={() => setActiveTab('nilai')} />
          <NavItem icon={<FileText size={20} />} label="Laporan (Rapor)" isActive={activeTab === 'laporan'} onClick={() => setActiveTab('laporan')} />
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <NavItem icon={<Settings size={20} />} label="Pengaturan" isActive={activeTab === 'pengaturan'} onClick={() => setActiveTab('pengaturan')} />
          <button onClick={() => setUser(null)} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-left text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors mt-2">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative print:overflow-visible print:block print:h-auto print:flex-none print:w-full">
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 shadow-sm print:hidden">
          <h2 className="text-xl font-semibold capitalize text-gray-700">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">Guru / Pengajar</p>
            </div>
            <UserCircle size={36} className="text-indigo-600" />
          </div>
        </header>

        {notification.show && (
          <div className={`absolute top-4 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded shadow-lg text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} animate-fade-in-down print:hidden`}>
            {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{notification.message}</span>
          </div>
        )}

        <div className="flex-1 overflow-auto p-8 print:p-0 print:overflow-visible print:block print:h-auto print:flex-none print:w-full">
          {activeTab === 'dashboard' && <DashboardView stats={{ kelas: classes.length, siswa: students.length, mapel: subjects.length, nilai: grades.length }} classes={classes} students={students} setActiveTab={setActiveTab} user={user} />}
          {activeTab === 'kelas' && <ClassesView classes={classes} setClasses={setClasses} showNotification={showNotification} />}
          {activeTab === 'siswa' && <StudentsView students={students} setStudents={setStudents} classes={classes} showNotification={showNotification} />}
          {activeTab === 'mapel' && <SubjectsView subjects={subjects} setSubjects={setSubjects} showNotification={showNotification} />}
          {activeTab === 'nilai' && <GradesView classes={classes} subjects={subjects} students={students} grades={grades} setGrades={setGrades} showNotification={showNotification} />}
          {activeTab === 'laporan' && <ReportView classes={classes} students={students} subjects={subjects} grades={grades} showNotification={showNotification} />}
          {activeTab === 'pengaturan' && <SettingsView settings={settings} setSettings={setSettings} user={user} setUser={setUser} teachers={teachers} setTeachers={setTeachers} showNotification={showNotification} />}
        </div>
      </main>
    </div>
  );
}

// Komponen Pembantu Sidebar Navigasi
function NavItem({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-indigo-800 text-white border-l-4 border-white' : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white border-l-4 border-transparent'}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}