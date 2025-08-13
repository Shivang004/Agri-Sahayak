"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  fetchCommodities, 
  fetchGeographies, 
  fetchPrices, 
  fetchQuantities,
  type Commodity,
  type Geography,
  type MarketDataResponse
} from '@/lib/marketApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { format, subMonths } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MarketData() {
  const { t } = useLanguage();
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [geographies, setGeographies] = useState<Geography[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>(format(subMonths(new Date(), 3), 'yyyy-MM-dd'));
  const [toDate, setToDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [priceData, setPriceData] = useState<MarketDataResponse | null>(null);
  const [quantityData, setQuantityData] = useState<MarketDataResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [commoditiesData, geographiesData] = await Promise.all([
        fetchCommodities(),
        fetchGeographies()
      ]);
      setCommodities(commoditiesData);
      setGeographies(geographiesData);
      if (commoditiesData.length > 0) {
        setSelectedCommodity(commoditiesData[0].id);
      }
    } catch (err) {
      setError('Failed to load initial data');
    }
  };

  const loadMarketData = async () => {
    if (!selectedCommodity) return;

    setLoading(true);
    setError('');

    try {
      const params = {
        commodity: selectedCommodity,
        state: selectedState || undefined,
        district: selectedDistrict || undefined,
        fromDate,
        toDate
      };

      const [priceResponse, quantityResponse] = await Promise.all([
        fetchPrices(params),
        fetchQuantities(params)
      ]);

      setPriceData(priceResponse);
      setQuantityData(quantityResponse);
    } catch (err) {
      setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  const { language } = useLanguage();
  
  const getCommodityName = (commodityId: string) => {
    const commodity = commodities.find(c => c.id === commodityId);
    if (!commodity) return commodityId;
    
    // Return localized name based on current language
    switch (language) {
      case 'hi': return commodity.nameHindi || commodity.name;
      case 'pa': return commodity.namePunjabi || commodity.name;
      case 'mr': return commodity.nameMarathi || commodity.name;
      case 'te': return commodity.nameTelugu || commodity.name;
      case 'ta': return commodity.nameTamil || commodity.name;
      default: return commodity.name;
    }
  };

  const getStateName = (stateId: string) => {
    const state = geographies.find(g => g.id === stateId && g.type === 'state');
    return state?.name || stateId;
  };

  const getDistrictName = (districtId: string) => {
    const district = geographies.find(g => g.id === districtId && g.type === 'district');
    return district?.name || districtId;
  };

  const states = geographies.filter(g => g.type === 'state');
  const districts = geographies.filter(g => g.type === 'district' && 
    (!selectedState || g.parentId === selectedState));

  const priceChartData = priceData ? {
    labels: priceData.data.map(d => format(new Date(d.date), 'MMM dd')),
    datasets: [
      {
        label: `${t('price')} (₹/kg)`,
        data: priceData.data.map(d => d.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1
      }
    ]
  } : null;

  const quantityChartData = quantityData ? {
    labels: quantityData.data.map(d => format(new Date(d.date), 'MMM dd')),
    datasets: [
      {
        label: `${t('quantity')} (tons)`,
        data: quantityData.data.map(d => d.quantity),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  } : null;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">{t('marketPrices')}</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('selectCommodity')}
            </label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('selectCommodity')}</option>
              {commodities.map(commodity => (
                <option key={commodity.id} value={commodity.id}>
                  {getCommodityName(commodity.id)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('selectState')}
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">{t('selectState')}</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('selectDistrict')}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={!selectedState}
            >
              <option value="">{t('selectDistrict')}</option>
              {districts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('dateRange')}
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <button
          onClick={loadMarketData}
          disabled={!selectedCommodity || loading}
          className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('loading') : t('loadData')}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Charts */}
      {priceData && quantityData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{t('priceChart')}</h3>
            {priceChartData && (
              <Line 
                data={priceChartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true },
                    title: {
                      display: true,
                      text: `${getCommodityName(selectedCommodity)} - ${t('price')}`
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: '₹/kg'
                      }
                    }
                  }
                }}
              />
            )}
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">{t('quantityChart')}</h3>
            {quantityChartData && (
              <Bar 
                data={quantityChartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true },
                    title: {
                      display: true,
                      text: `${getCommodityName(selectedCommodity)} - ${t('quantity')}`
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Tons'
                      }
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Data Summary */}
      {priceData && quantityData && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">{t('dataSummary')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ₹{Math.round(priceData.data.reduce((sum, d) => sum + d.price, 0) / priceData.data.length * 100) / 100}
            </div>
            <div className="text-sm text-gray-600">{t('averagePrice')}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(quantityData.data.reduce((sum, d) => sum + d.quantity, 0) / quantityData.data.length)}
            </div>
            <div className="text-sm text-gray-600">{t('averageQuantity')}</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {priceData.data.length}
            </div>
            <div className="text-sm text-gray-600">{t('dataPoints')}</div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
