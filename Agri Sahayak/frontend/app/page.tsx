"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import FertilizerTool from '@/components/FertilizerTool';
import MarketData from '@/components/MarketData';
import WeatherForecast from '@/components/WeatherForecast';
import LanguageSelector from '@/components/LanguageSelector';

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
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-green-600">Agri Sahayak</h1>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <section className="md:col-span-2 flex min-h-[70vh] flex-col">
              <ChatInterface />
            </section>
            <aside className="flex flex-col gap-4">
              <Dashboard weatherData={weatherData} marketData={marketData} />
              <FertilizerTool />
            </aside>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <MarketData />
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-6">
            <WeatherForecast />
          </div>
        )}
      </div>
    </main>
  );
}

