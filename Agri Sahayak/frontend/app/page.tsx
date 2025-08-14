"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ChatInterface from '@/components/ChatInterface';
import FertilizerTool from '@/components/FertilizerTool';
import MarketData from '@/components/MarketData';
import WeatherForecast from '@/components/WeatherForecast';
import LanguageSelector from '@/components/LanguageSelector';
import { useAuth } from '@/lib/AuthContext';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

type AuthView = 'login' | 'signup';

export default function Page() {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'chat' | 'market' | 'weather' | 'fertilizer'>('chat');
  const [authView, setAuthView] = useState<AuthView>('login');

  if (!isAuthenticated) {
    if (authView === 'signup') {
      return <Signup onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToSignup={() => setAuthView('signup')} />;
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'market':
        return <MarketData />;
      case 'weather':
        return <WeatherForecast />;
      case 'fertilizer':
        // This view is for mobile when the fertilizer tab is selected
        return <FertilizerTool />;
        case 'chat':
          default:
            return (
              <div className="flex h-full"> {/* <-- Simplified container */}
                <div className="flex w-full flex-col"> {/* <-- Takes full width now */}
                  <ChatInterface />
                </div>
              </div>
            );
    }
  };

  return (
    <main className="flex h-screen flex-col bg-gray-50">
      
      {/* Header */}
      <header className="flex-shrink-0 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Image Logo */}
              <img 
                src="/logo.png" 
                alt="Agri Sahayak Logo" 
                className="h-12 w-12"
              />
              <h1 className="text-2xl font-bold text-green-600">{t('title')}</h1>
              </div>
            {/* START: ADD THIS SECTION */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                {t('logout')}
              </button>
            </div>
            {/* END: ADD THIS SECTION */}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex-shrink-0 border-b bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chat'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('chat')}
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'market'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('marketPrices')}
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'weather'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('weatherForecast')}
            </button>
            {/* Fertilizer Tool tab - visible only on mobile */}
            <button
              onClick={() => setActiveTab('fertilizer')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fertilizer'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('fertilizerTool')}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-hidden p-6">
        <div className="mx-auto h-full max-w-7xl">
          <div className="h-full overflow-y-auto">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </main>
  );
}