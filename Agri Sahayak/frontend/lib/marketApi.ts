export interface Commodity {
  id: string;
  name: string;
  nameHindi?: string;
  namePunjabi?: string;
  nameMarathi?: string;
  nameTelugu?: string;
  nameTamil?: string;
}

export interface Geography {
  id: string;
  name: string;
  type: 'state' | 'district';
  parentId?: string;
}

export interface MarketDataPoint {
  date: string;
  price: number;
  quantity: number;
  commodity: string;
  state?: string;
  district?: string;
}

export interface MarketDataResponse {
  data: MarketDataPoint[];
  commodity: string;
  state?: string;
  district?: string;
  dateRange: {
    from: string;
    to: string;
  };
}

// Mock data for development - replace with actual API calls
export async function fetchCommodities(): Promise<Commodity[]> {
  // TODO: Replace with actual API call to /api/commodities
  return [
    { id: 'wheat', name: 'Wheat', nameHindi: 'गेहूं', namePunjabi: 'ਕਣਕ', nameMarathi: 'गहू', nameTelugu: 'గోధుమ', nameTamil: 'கோதுமை' },
    { id: 'rice', name: 'Rice', nameHindi: 'चावल', namePunjabi: 'ਚਾਵਲ', nameMarathi: 'भात', nameTelugu: 'బియ్యం', nameTamil: 'அரிசி' },
    { id: 'maize', name: 'Maize', nameHindi: 'मक्का', namePunjabi: 'ਮੱਕੀ', nameMarathi: 'मका', nameTelugu: 'మొక్కజొన్న', nameTamil: 'சோளம்' },
    { id: 'pulses', name: 'Pulses', nameHindi: 'दालें', namePunjabi: 'ਦਾਲਾਂ', nameMarathi: 'डाळी', nameTelugu: 'పప్పులు', nameTamil: 'பருப்பு' },
    { id: 'soybean', name: 'Soybean', nameHindi: 'सोयाबीन', namePunjabi: 'ਸੋਇਆਬੀਨ', nameMarathi: 'सोयाबीन', nameTelugu: 'సోయాబీన్', nameTamil: 'சோயாபீன்' },
    { id: 'cotton', name: 'Cotton', nameHindi: 'कपास', namePunjabi: 'ਕਪਾਹ', nameMarathi: 'कापूस', nameTelugu: 'పత్తి', nameTamil: 'பருத்தி' },
    { id: 'sugarcane', name: 'Sugarcane', nameHindi: 'गन्ना', namePunjabi: 'ਗੰਨਾ', nameMarathi: 'ऊस', nameTelugu: 'చెరకు', nameTamil: 'கரும்பு' }
  ];
}

export async function fetchGeographies(): Promise<Geography[]> {
  // TODO: Replace with actual API call to /api/geographies
  return [
    { id: 'mh', name: 'Maharashtra', type: 'state' },
    { id: 'mh-mumbai', name: 'Mumbai', type: 'district', parentId: 'mh' },
    { id: 'mh-pune', name: 'Pune', type: 'district', parentId: 'mh' },
    { id: 'mh-nagpur', name: 'Nagpur', type: 'district', parentId: 'mh' },
    { id: 'up', name: 'Uttar Pradesh', type: 'state' },
    { id: 'up-lucknow', name: 'Lucknow', type: 'district', parentId: 'up' },
    { id: 'up-kanpur', name: 'Kanpur', type: 'district', parentId: 'up' },
    { id: 'pb', name: 'Punjab', type: 'state' },
    { id: 'pb-amritsar', name: 'Amritsar', type: 'district', parentId: 'pb' },
    { id: 'pb-ludhiana', name: 'Ludhiana', type: 'district', parentId: 'pb' },
    { id: 'ap', name: 'Andhra Pradesh', type: 'state' },
    { id: 'ap-hyderabad', name: 'Hyderabad', type: 'district', parentId: 'ap' },
    { id: 'tn', name: 'Tamil Nadu', type: 'state' },
    { id: 'tn-chennai', name: 'Chennai', type: 'district', parentId: 'tn' },
    { id: 'tn-coimbatore', name: 'Coimbatore', type: 'district', parentId: 'tn' }
  ];
}

export async function fetchPrices(params: {
  commodity: string;
  state?: string;
  district?: string;
  fromDate: string;
  toDate: string;
}): Promise<MarketDataResponse> {
  // TODO: Replace with actual API call to /api/prices
  const { commodity, state, district, fromDate, toDate } = params;
  
  // Generate mock data
  const data: MarketDataPoint[] = [];
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const basePrice = Math.random() * 50 + 20; // Random price between 20-70
    const variation = Math.sin(d.getTime() / (1000 * 60 * 60 * 24)) * 5; // Daily variation
    
    data.push({
      date: d.toISOString().split('T')[0],
      price: Math.round((basePrice + variation) * 100) / 100,
      quantity: Math.floor(Math.random() * 1000) + 100,
      commodity,
      state,
      district
    });
  }
  
  return {
    data,
    commodity,
    state,
    district,
    dateRange: { from: fromDate, to: toDate }
  };
}

export async function fetchQuantities(params: {
  commodity: string;
  state?: string;
  district?: string;
  fromDate: string;
  toDate: string;
}): Promise<MarketDataResponse> {
  // TODO: Replace with actual API call to /api/quantity
  const { commodity, state, district, fromDate, toDate } = params;
  
  // Generate mock data
  const data: MarketDataPoint[] = [];
  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const baseQuantity = Math.random() * 500 + 200; // Random quantity between 200-700
    const variation = Math.cos(d.getTime() / (1000 * 60 * 60 * 24)) * 50; // Daily variation
    
    data.push({
      date: d.toISOString().split('T')[0],
      price: Math.round((Math.random() * 50 + 20) * 100) / 100,
      quantity: Math.floor(baseQuantity + variation),
      commodity,
      state,
      district
    });
  }
  
  return {
    data,
    commodity,
    state,
    district,
    dateRange: { from: fromDate, to: toDate }
  };
}
