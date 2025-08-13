"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import FertilizerTool from '@/components/FertilizerTool';
import MarketData from '@/components/MarketData';
import WeatherForecast from '@/components/WeatherForecast';
import LanguageSelector from '@/components/LanguageSelector';
import LanguageChangeNotification from '@/components/LanguageChangeNotification';

export default function Page() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'chat' | 'market' | 'weather'>('chat');

  const weatherData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [34, 35, 33, 36, 34, 32, 31]
  };

  const marketData = {
    labels: ['Wheat', 'Rice', 'Maize', 'Pulses', 'Soybean'],
    values: [24, 28, 20, 35, 40]
  };

  return (
    <main className="flex h-screen flex-col bg-gray-50">
      
      {/* Header */}
      <header className="flex-shrink-0 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-600">{t('title')}</h1>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Restore the Navigation Tabs */}
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
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow overflow-hidden p-6">
        <div className="mx-auto h-full max-w-7xl">
          {activeTab === 'chat' ? (
            // If 'chat' is active, show the split-screen layout
            <div className="flex h-full gap-6">
              <div className="flex w-2/3 flex-col">
                <ChatInterface />
              </div>
              <div className="w-1/3 overflow-y-auto">
                <aside className="flex flex-col space-y-6">
                  <Dashboard weatherData={weatherData} marketData={marketData} />
                  <FertilizerTool />
                </aside>
              </div>
            </div>
          ) : (
            // Otherwise, show the full-width scrollable layout for other tabs
            <div className="h-full overflow-y-auto">
              {activeTab === 'market' && <MarketData />}
              {activeTab === 'weather' && <WeatherForecast />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
