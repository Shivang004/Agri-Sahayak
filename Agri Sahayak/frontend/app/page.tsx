import ChatInterface from '@/components/ChatInterface';
import Dashboard from '@/components/Dashboard';
import FertilizerTool from '@/components/FertilizerTool';

export default function Page() {
  const weatherData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [34, 35, 33, 36, 34, 32, 31]
  };

  const marketData = {
    labels: ['Wheat', 'Rice', 'Maize', 'Pulses', 'Soybean'],
    values: [24, 28, 20, 35, 40]
  };

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <section className="md:col-span-2 flex min-h-[70vh] flex-col">
        <ChatInterface />
      </section>
      <aside className="flex flex-col gap-4">
        <Dashboard weatherData={weatherData} marketData={marketData} />
        <FertilizerTool />
      </aside>
    </main>
  );
}

