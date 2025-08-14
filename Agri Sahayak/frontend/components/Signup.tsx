"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function Signup({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signup(username, password);
    if (success) {
      alert('Signup successful! Please log in.');
      onSwitchToLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img src="/logo.png" alt="Agri Sahayak Logo" className="w-24 h-24 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-green-600">{t('createAccount')}</h1>
          <p className="mt-2 text-sm text-gray-500">{t('assistantDescription')}</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              {t('username')}
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {t('signup')}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-green-600 hover:underline">
            {t('login')}
          </button>
        </p>
      </div>
    </div>
  );
}