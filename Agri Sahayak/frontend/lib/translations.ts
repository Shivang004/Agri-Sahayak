export type Language = 'en' | 'hi' | 'pa' | 'mr' | 'te' | 'ta';

export const languages = {
  en: { name: 'English', nativeName: 'English' },
  hi: { name: 'Hindi', nativeName: 'हिंदी' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  mr: { name: 'Marathi', nativeName: 'मराठी' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' }
};

export const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    marketPrices: 'Market Prices',
    weatherForecast: 'Weather Forecast',
    chat: 'Chat',
    fertilizerTool: 'Fertilizer Tool',
    
    // Market Data
    selectCommodity: 'Select Commodity',
    selectState: 'Select State',
    selectDistrict: 'Select District',
    dateRange: 'Date Range',
    priceChart: 'Price Chart',
    quantityChart: 'Quantity Chart',
    price: 'Price',
    quantity: 'Quantity',
    date: 'Date',
    commodity: 'Commodity',
    state: 'State',
    district: 'District',
    fromDate: 'From Date',
    toDate: 'To Date',
    loadData: 'Load Data',
    noDataAvailable: 'No data available',
    
    // Weather
    currentWeather: 'Current Weather',
    temperature: 'Temperature',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    precipitation: 'Precipitation',
    forecast: 'Forecast',
    today: 'Today',
    tomorrow: 'Tomorrow',
    feelsLike: 'Feels Like',
    pressure: 'Pressure',
    visibility: 'Visibility',
    uvIndex: 'UV Index',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    
    // Language
    language: 'Language',
    selectLanguage: 'Select Language',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    location: 'Location',
    getLocation: 'Get My Location',
    
    // Chat
    assistantTitle: 'Dr. Fasal Assistant',
    assistantDescription: 'Ask questions about crops, pests, weather, and more.',
    generatingResponse: 'Generating response…',
    sorryError: 'Sorry, something went wrong while contacting the server.'
  },
  
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    marketPrices: 'बाजार मूल्य',
    weatherForecast: 'मौसम पूर्वानुमान',
    chat: 'चैट',
    fertilizerTool: 'उर्वरक उपकरण',
    
    // Market Data
    selectCommodity: 'फसल चुनें',
    selectState: 'राज्य चुनें',
    selectDistrict: 'जिला चुनें',
    dateRange: 'तिथि सीमा',
    priceChart: 'मूल्य चार्ट',
    quantityChart: 'मात्रा चार्ट',
    price: 'मूल्य',
    quantity: 'मात्रा',
    date: 'तिथि',
    commodity: 'फसल',
    state: 'राज्य',
    district: 'जिला',
    fromDate: 'प्रारंभ तिथि',
    toDate: 'समाप्ति तिथि',
    loadData: 'डेटा लोड करें',
    noDataAvailable: 'कोई डेटा उपलब्ध नहीं',
    
    // Weather
    currentWeather: 'वर्तमान मौसम',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'हवा की गति',
    precipitation: 'वर्षा',
    forecast: 'पूर्वानुमान',
    today: 'आज',
    tomorrow: 'कल',
    feelsLike: 'महसूस होता है',
    pressure: 'दबाव',
    visibility: 'दृश्यता',
    uvIndex: 'यूवी सूचकांक',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    
    // Language
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    retry: 'पुनः प्रयास करें',
    location: 'स्थान',
    getLocation: 'मेरा स्थान प्राप्त करें',
    
    // Chat
    assistantTitle: 'डॉ. फसल सहायक',
    assistantDescription: 'फसलों, कीटों, मौसम और अधिक के बारे में प्रश्न पूछें।',
    generatingResponse: 'प्रतिक्रिया तैयार हो रही है…',
    sorryError: 'क्षमा करें, सर्वर से संपर्क करते समय कुछ गलत हो गया।'
  },
  
  pa: {
    // Navigation
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    marketPrices: 'ਮਾਰਕੀਟ ਕੀਮਤਾਂ',
    weatherForecast: 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    chat: 'ਚੈਟ',
    fertilizerTool: 'ਖਾਦ ਟੂਲ',
    
    // Market Data
    selectCommodity: 'ਫਸਲ ਚੁਣੋ',
    selectState: 'ਰਾਜ ਚੁਣੋ',
    selectDistrict: 'ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ',
    dateRange: 'ਤਾਰੀਖ ਦੀ ਸੀਮਾ',
    priceChart: 'ਕੀਮਤ ਚਾਰਟ',
    quantityChart: 'ਮਾਤਰਾ ਚਾਰਟ',
    price: 'ਕੀਮਤ',
    quantity: 'ਮਾਤਰਾ',
    date: 'ਤਾਰੀਖ',
    commodity: 'ਫਸਲ',
    state: 'ਰਾਜ',
    district: 'ਜ਼ਿਲ੍ਹਾ',
    fromDate: 'ਤੋਂ ਤਾਰੀਖ',
    toDate: 'ਤੱਕ ਤਾਰੀਖ',
    loadData: 'ਡੇਟਾ ਲੋਡ ਕਰੋ',
    noDataAvailable: 'ਕੋਈ ਡੇਟਾ ਉਪਲਬਧ ਨਹੀਂ',
    
    // Weather
    currentWeather: 'ਮੌਜੂਦਾ ਮੌਸਮ',
    temperature: 'ਤਾਪਮਾਨ',
    humidity: 'ਨਮੀ',
    windSpeed: 'ਹਵਾ ਦੀ ਗਤੀ',
    precipitation: 'ਬਾਰਿਸ਼',
    forecast: 'ਭਵਿੱਖਬਾਣੀ',
    today: 'ਅੱਜ',
    tomorrow: 'ਕੱਲ੍ਹ',
    feelsLike: 'ਮਹਿਸੂਸ ਹੁੰਦਾ ਹੈ',
    pressure: 'ਦਬਾਅ',
    visibility: 'ਦ੍ਰਿਸ਼ਟੀ',
    uvIndex: 'ਯੂਵੀ ਇੰਡੈਕਸ',
    sunrise: 'ਸੂਰਜ ਚੜ੍ਹਨਾ',
    sunset: 'ਸੂਰਜ ਡੁੱਬਣਾ',
    
    // Language
    language: 'ਭਾਸ਼ਾ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    
    // Common
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    error: 'ਗਲਤੀ',
    retry: 'ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    location: 'ਟਿਕਾਣਾ',
    getLocation: 'ਮੇਰਾ ਟਿਕਾਣਾ ਪ੍ਰਾਪਤ ਕਰੋ',
    
    // Chat
    assistantTitle: 'ਡਾ. ਫਸਲ ਸਹਾਇਕ',
    assistantDescription: 'ਫਸਲਾਂ, ਕੀੜਿਆਂ, ਮੌਸਮ ਅਤੇ ਹੋਰ ਬਾਰੇ ਪ੍ਰਸ਼ਨ ਪੁੱਛੋ।',
    generatingResponse: 'ਜਵਾਬ ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ…',
    sorryError: 'ਮਾਫ਼ ਕਰੋ, ਸਰਵਰ ਨਾਲ ਸੰਪਰਕ ਕਰਦੇ ਸਮੇਂ ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ।'
  },
  
  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    marketPrices: 'बाजार भाव',
    weatherForecast: 'हवामान अंदाज',
    chat: 'चॅट',
    fertilizerTool: 'खते साधन',
    
    // Market Data
    selectCommodity: 'पीक निवडा',
    selectState: 'राज्य निवडा',
    selectDistrict: 'जिल्हा निवडा',
    dateRange: 'तारीख श्रेणी',
    priceChart: 'भाव चार्ट',
    quantityChart: 'प्रमाण चार्ट',
    price: 'भाव',
    quantity: 'प्रमाण',
    date: 'तारीख',
    commodity: 'पीक',
    state: 'राज्य',
    district: 'जिल्हा',
    fromDate: 'पासून तारीख',
    toDate: 'पर्यंत तारीख',
    loadData: 'डेटा लोड करा',
    noDataAvailable: 'कोणताही डेटा उपलब्ध नाही',
    
    // Weather
    currentWeather: 'सध्याचे हवामान',
    temperature: 'तापमान',
    humidity: 'आर्द्रता',
    windSpeed: 'वाऱ्याचा वेग',
    precipitation: 'पाऊस',
    forecast: 'अंदाज',
    today: 'आज',
    tomorrow: 'उद्या',
    feelsLike: 'वाटतं',
    pressure: 'दाब',
    visibility: 'दृश्यता',
    uvIndex: 'यूवी निर्देशांक',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    
    // Language
    language: 'भाषा',
    selectLanguage: 'भाषा निवडा',
    
    // Common
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    retry: 'पुन्हा प्रयत्न करा',
    location: 'स्थान',
    getLocation: 'माझे स्थान मिळवा',
    
    // Chat
    assistantTitle: 'डॉ. पीक सहाय्यक',
    assistantDescription: 'पिके, कीटक, हवामान आणि अधिक बद्दल प्रश्न विचारा।',
    generatingResponse: 'प्रतिसाद तयार होत आहे…',
    sorryError: 'माफ करा, सर्व्हरशी संपर्क साधताना काहीतरी चूक झाली।'
  },
  
  te: {
    // Navigation
    dashboard: 'డాష్‌బోర్డ్',
    marketPrices: 'మార్కెట్ ధరలు',
    weatherForecast: 'వాతావరణ అంచనా',
    chat: 'చాట్',
    fertilizerTool: 'ఎరువు సాధనం',
    
    // Market Data
    selectCommodity: 'పంటను ఎంచుకోండి',
    selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    selectDistrict: 'జిల్లాను ఎంచుకోండి',
    dateRange: 'తేదీ పరిధి',
    priceChart: 'ధర చార్ట్',
    quantityChart: 'పరిమాణం చార్ట్',
    price: 'ధర',
    quantity: 'పరిమాణం',
    date: 'తేదీ',
    commodity: 'పంట',
    state: 'రాష్ట్రం',
    district: 'జిల్లా',
    fromDate: 'నుండి తేదీ',
    toDate: 'వరకు తేదీ',
    loadData: 'డేటా లోడ్ చేయండి',
    noDataAvailable: 'డేటా అందుబాటులో లేదు',
    
    // Weather
    currentWeather: 'ప్రస్తుత వాతావరణం',
    temperature: 'ఉష్ణోగ్రత',
    humidity: 'తేమ',
    windSpeed: 'గాలి వేగం',
    precipitation: 'వర్షపాతం',
    forecast: 'అంచనా',
    today: 'నేడు',
    tomorrow: 'రేపు',
    feelsLike: 'అనుభవపడుతున్నది',
    pressure: 'పీడనం',
    visibility: 'దృశ్యత',
    uvIndex: 'యువి సూచిక',
    sunrise: 'సూర్యోదయం',
    sunset: 'సూర్యాస్తమయం',
    
    // Language
    language: 'భాష',
    selectLanguage: 'భాషను ఎంచుకోండి',
    
    // Common
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం',
    retry: 'మళ్లీ ప్రయత్నించండి',
    location: 'స్థానం',
    getLocation: 'నా స్థానాన్ని పొందండి',
    
    // Chat
    assistantTitle: 'డా. పంట సహాయకుడు',
    assistantDescription: 'పంటలు, కీటకాలు, వాతావరణం మరియు మరిన్ని గురించి ప్రశ్నలు అడగండి.',
    generatingResponse: 'సమాధానం తయారవుతోంది…',
    sorryError: 'క్షమించండి, సర్వర్‌తో సంప్రదించేటప్పుడు ఏదో తప్పు జరిగింది.'
  },
  
  ta: {
    // Navigation
    dashboard: 'டாஷ்போர்டு',
    marketPrices: 'சந்தை விலைகள்',
    weatherForecast: 'வானிலை முன்கணிப்பு',
    chat: 'அரட்டை',
    fertilizerTool: 'உர கருவி',
    
    // Market Data
    selectCommodity: 'பயிரைத் தேர்ந்தெடுக்கவும்',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
    selectDistrict: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
    dateRange: 'தேதி வரம்பு',
    priceChart: 'விலை வரைபடம்',
    quantityChart: 'அளவு வரைபடம்',
    price: 'விலை',
    quantity: 'அளவு',
    date: 'தேதி',
    commodity: 'பயிர்',
    state: 'மாநிலம்',
    district: 'மாவட்டம்',
    fromDate: 'இருந்து தேதி',
    toDate: 'வரை தேதி',
    loadData: 'தரவை ஏற்று',
    noDataAvailable: 'தரவு எதுவும் இல்லை',
    
    // Weather
    currentWeather: 'தற்போதைய வானிலை',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    windSpeed: 'காற்று வேகம்',
    precipitation: 'மழைப்பொழிவு',
    forecast: 'முன்கணிப்பு',
    today: 'இன்று',
    tomorrow: 'நாளை',
    feelsLike: 'உணரப்படுகிறது',
    pressure: 'அழுத்தம்',
    visibility: 'பார்வை',
    uvIndex: 'யூவி குறியீடு',
    sunrise: 'சூரிய உதயம்',
    sunset: 'சூரிய அஸ்தமனம்',
    
    // Language
    language: 'மொழி',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    
    // Common
    loading: 'ஏற்றப்படுகிறது...',
    error: 'பிழை',
    retry: 'மீண்டும் முயற்சிக்கவும்',
    location: 'இடம்',
    getLocation: 'என் இடத்தைப் பெறு',
    
    // Chat
    assistantTitle: 'டா. பயிர் உதவியாளர்',
    assistantDescription: 'பயிர்கள், பூச்சிகள், வானிலை மற்றும் பலவற்றைப் பற்றி கேள்விகள் கேள்வி.',
    generatingResponse: 'பதில் தயாராகிறது…',
    sorryError: 'மன்னிக்கவும், சர்வரை தொடர்பு கொள்ளும்போது ஏதோ தவறு நடந்தது.'
  }
};

export function getTranslation(lang: Language, key: string): string {
  return translations[lang][key as keyof typeof translations[typeof lang]] || key;
}
