"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ChatInterface from '@/components/ChatInterface';
import FertilizerTool from '@/components/FertilizerTool';
import MarketData from '@/components/MarketData';
import WeatherForecast from '@/components/WeatherForecast';
import LanguageSelector from '@/components/LanguageSelector';

export default function Page() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'chat' | 'market' | 'weather' | 'fertilizer'>('chat');

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
          <div className="flex h-full gap-6">
            <div className="flex w-full flex-col md:w-2/3">
              <ChatInterface />
            </div>
            {/* Sidebar for desktop view */}
            <div className="hidden w-1/3 overflow-y-auto md:block">
              <aside className="flex flex-col space-y-6">
                <FertilizerTool />
              </aside>
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
            <LanguageSelector />
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
              className={`py-4 px-1 border-b-2 font-medium text-sm md:hidden ${
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