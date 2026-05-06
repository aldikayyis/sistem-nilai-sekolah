import React, { useState } from 'react';
import { School, AlertCircle } from 'lucide-react';

export default function LoginView({ teachers, onLogin, showNotification }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg('');
        const foundUser = teachers.find(t => t.username === username && t.password === password);
        if (foundUser) {
            onLogin(foundUser);
            showNotification('Berhasil login!');
        } else {
            setErrorMsg('Username atau password yang Anda masukkan salah!');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <School size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Sistem Akademik</h1>
                    <p className="text-gray-500 text-sm mt-2">Silakan login untuk mengelola nilai siswa</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm animate-fade-in-down">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Contoh: guru1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="Contoh: 123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        Masuk Sistem
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Info Demo: username <strong className="text-gray-600">guru1</strong>, password <strong className="text-gray-600">123</strong></p>
                </div>
            </div>
        </div>
    );
}