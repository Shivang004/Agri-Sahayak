// export interface WeatherData {
//   latitude: number;
//   longitude: number;
//   elevation: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   current: {
//     time: string;
//     temperature_2m: number;
//     relative_humidity_2m: number;
//     apparent_temperature: number;
//     precipitation: number;
//     rain: number;
//     showers: number;
//     snowfall: number;
//     weather_code: number;
//     cloud_cover: number;
//     pressure_msl: number;
//     surface_pressure: number;
//     wind_speed_10m: number;
//     wind_direction_10m: number;
//     wind_gusts_10m: number;
//     visibility: number;
//     uv_index: number;
//     is_day: number;
//     sunshine_duration: number;
//     evapotranspiration: number;
//     vapour_pressure_deficit: number;
//     soil_temperature_0cm: number;
//     soil_moisture_0_1cm: number;
//   };
//   hourly: {
//     time: string[];
//     temperature_2m: number[];
//     relative_humidity_2m: number[];
//     apparent_temperature: number[];
//     precipitation_probability: number[];
//     precipitation: number[];
//     rain: number[];
//     showers: number[];
//     snowfall: number[];
//     weather_code: number[];
//     pressure_msl: number[];
//     surface_pressure: number[];
//     cloud_cover: number[];
//     visibility: number[];
//     evapotranspiration: number[];
//     vapour_pressure_deficit: number[];
//     wind_speed_10m: number[];
//     wind_direction_10m: number[];
//     wind_gusts_10m: number[];
//     soil_temperature_0cm: number[];
//     soil_moisture_0_1cm: number[];
//     uv_index: number[];
//     sunshine_duration: number[];
//   };
//   daily: {
//     time: string[];
//     weather_code: number[];
//     temperature_2m_max: number[];
//     temperature_2m_min: number[];
//     apparent_temperature_max: number[];
//     apparent_temperature_min: number[];
//     precipitation_sum: number[];
//     rain_sum: number[];
//     showers_sum: number[];
//     snowfall_sum: number[];
//     precipitation_hours: number[];
//     precipitation_probability_max: number[];
//     wind_speed_10m_max: number[];
//     wind_gusts_10m_max: number[];
//     wind_direction_10m_dominant: number[];
//     sunshine_duration: number[];
//     uv_index_max: number[];
//     uv_index_clear_sky_max: number[];
//     et0_fao_evapotranspiration: number[];
//   };
//   hourly_units: Record<string, string>;
//   daily_units: Record<string, string>;
// }

// export interface LocationData {
//   latitude: number;
//   longitude: number;
//   name?: string;
// }

// // Get user's current location
// export async function getCurrentLocation(): Promise<LocationData> {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation is not supported by this browser.'));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude
//         });
//       },
//       (error) => {
//         reject(new Error(`Unable to retrieve your location: ${error.message}`));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 60000
//       }
//     );
//   });
// }

// // Fetch weather data from Open-Meteo API
// export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
//   const params = new URLSearchParams({
//     latitude: latitude.toString(),
//     longitude: longitude.toString(),
//     current: [
//       'temperature_2m',
//       'relative_humidity_2m',
//       'apparent_temperature',
//       'precipitation',
//       'rain',
//       'showers',
//       'snowfall',
//       'weather_code',
//       'cloud_cover',
//       'pressure_msl',
//       'surface_pressure',
//       'wind_speed_10m',
//       'wind_direction_10m',
//       'wind_gusts_10m',
//       'visibility',
//       'uv_index',
//       'is_day',
//       'sunshine_duration',
//       'evapotranspiration',
//       'vapour_pressure_deficit',
//       'soil_temperature_0cm',
//       'soil_moisture_0_1cm'
//     ].join(','),
//     hourly: [
//       'temperature_2m',
//       'relative_humidity_2m',
//       'apparent_temperature',
//       'precipitation_probability',
//       'precipitation',
//       'rain',
//       'showers',
//       'snowfall',
//       'weather_code',
//       'pressure_msl',
//       'surface_pressure',
//       'cloud_cover',
//       'visibility',
//       'evapotranspiration',
//       'vapour_pressure_deficit',
//       'wind_speed_10m',
//       'wind_direction_10m',
//       'wind_gusts_10m',
//       'soil_temperature_0cm',
//       'soil_moisture_0_1cm',
//       'uv_index',
//       'sunshine_duration'
//     ].join(','),
//     daily: [
//       'weather_code',
//       'temperature_2m_max',
//       'temperature_2m_min',
//       'apparent_temperature_max',
//       'apparent_temperature_min',
//       'precipitation_sum',
//       'rain_sum',
//       'showers_sum',
//       'snowfall_sum',
//       'precipitation_hours',
//       'precipitation_probability_max',
//       'wind_speed_10m_max',
//       'wind_gusts_10m_max',
//       'wind_direction_10m_dominant',
//       'sunshine_duration',
//       'uv_index_max',
//       'uv_index_clear_sky_max',
//       'et0_fao_evapotranspiration'
//     ].join(','),
//     timezone: 'auto',
//     forecast_days: '7'
//   });

//   const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  
//   if (!response.ok) {
//     throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
//   }

//   return response.json();
// }

// // Get weather description from weather code
// export function getWeatherDescription(code: number): string {
//   const weatherCodes: Record<number, string> = {
//     0: 'Clear sky',
//     1: 'Mainly clear',
//     2: 'Partly cloudy',
//     3: 'Overcast',
//     45: 'Foggy',
//     48: 'Depositing rime fog',
//     51: 'Light drizzle',
//     53: 'Moderate drizzle',
//     55: 'Dense drizzle',
//     56: 'Light freezing drizzle',
//     57: 'Dense freezing drizzle',
//     61: 'Slight rain',
//     63: 'Moderate rain',
//     65: 'Heavy rain',
//     66: 'Light freezing rain',
//     67: 'Heavy freezing rain',
//     71: 'Slight snow fall',
//     73: 'Moderate snow fall',
//     75: 'Heavy snow fall',
//     77: 'Snow grains',
//     80: 'Slight rain showers',
//     81: 'Moderate rain showers',
//     82: 'Violent rain showers',
//     85: 'Slight snow showers',
//     86: 'Heavy snow showers',
//     95: 'Thunderstorm',
//     96: 'Thunderstorm with slight hail',
//     99: 'Thunderstorm with heavy hail'
//   };
  
//   return weatherCodes[code] || 'Unknown';
// }

// // Get agriculture-relevant weather insights
// // export function getAgricultureInsights(weatherData: WeatherData): {
// //   irrigation: string;
// //   cropHealth: string;
// //   pestRisk: string;
// //   harvestTiming: string;
// // } {
// //   const current = weatherData.current;
// //   const daily = weatherData.daily;
  
// //   // Irrigation recommendation based on soil moisture and evapotranspiration
// //   let irrigation = 'Normal irrigation recommended';
// //   if (current.soil_moisture_0_1cm < 0.3) {
// //     irrigation = 'Irrigation needed - soil moisture is low';
// //   } else if (current.soil_moisture_0_1cm > 0.8) {
// //     irrigation = 'Reduce irrigation - soil is well saturated';
// //   }
  
// //   // Crop health based on temperature and humidity
// //   let cropHealth = 'Good conditions for crop growth';
// //   if (current.temperature_2m > 35) {
// //     cropHealth = 'High temperature stress - consider shade or cooling';
// //   } else if (current.temperature_2m < 10) {
// //     cropHealth = 'Low temperature - growth may be slowed';
// //   }
  
// //   if (current.relative_humidity_2m > 85) {
// //     cropHealth += ' - High humidity may promote fungal diseases';
// //   }
  
// //   // Pest risk assessment
// //   let pestRisk = 'Low pest risk';
// //   if (current.temperature_2m > 25 && current.relative_humidity_2m > 70) {
// //     pestRisk = 'Moderate pest risk - monitor for insects and diseases';
// //   } else if (current.temperature_2m > 30) {
// //     pestRisk = 'High pest risk - consider preventive measures';
// //   }
  
// //   // Harvest timing based on weather forecast
// //   let harvestTiming = 'Weather suitable for harvesting';
// //   const next3Days = daily.precipitation_sum.slice(0, 3);
// //   const totalRain = next3Days.reduce((sum, rain) => sum + rain, 0);
  
// //   if (totalRain > 20) {
// //     harvestTiming = 'Delay harvest - significant rain expected';
// //   } else if (totalRain > 5) {
// //     harvestTiming = 'Consider weather conditions for harvest timing';
// //   }
  
// //   return { irrigation, cropHealth, pestRisk, harvestTiming };
// // }
// export function getAgricultureInsights(weatherData: WeatherData, t: (key: string) => string): {
//   irrigation: string;
//   cropHealth: string;
//   pestRisk: string;
//   harvestTiming: string;
// } {
//   const { current, daily } = weatherData;

//   // Irrigation recommendation
//   let irrigation = t('normalIrrigation');
//   if (current.soil_moisture_0_1cm < 0.3) {
//     irrigation = t('irrigationNeeded');
//   } else if (current.soil_moisture_0_1cm > 0.8) {
//     irrigation = t('reduceIrrigation');
//   }

//   // Crop health
//   let cropHealth = t('goodCropConditions');
//   if (current.temperature_2m > 35) {
//     cropHealth = t('highTempStress');
//   } else if (current.temperature_2m < 10) {
//     cropHealth = t('lowTempSlowGrowth');
//   }
//   if (current.relative_humidity_2m > 85) {
//     cropHealth += t('highHumidityFungalRisk');
//   }

//   // Pest risk
//   let pestRisk = t('lowPestRisk');
//   if (current.temperature_2m > 25 && current.relative_humidity_2m > 70) {
//     pestRisk = t('moderatePestRisk');
//   } else if (current.temperature_2m > 30) {
//     pestRisk = t('highPestRisk');
//   }

//   // Harvest timing
//   let harvestTiming = t('harvestWeatherSuitable');
//   const totalRain = daily.precipitation_sum.slice(0, 3).reduce((sum, rain) => sum + rain, 0);
//   if (totalRain > 20) {
//     harvestTiming = t('delayHarvestRain');
//   } else if (totalRain > 5) {
//     harvestTiming = t('considerWeatherHarvest');
//   }

//   return { irrigation, cropHealth, pestRisk, harvestTiming };
// }
export interface WeatherData {
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
  timezone_abbreviation: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    cloud_cover: number;
    pressure_msl: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
    visibility: number;
    uv_index: number;
    is_day: number;
    sunshine_duration: number;
    evapotranspiration: number;
    vapour_pressure_deficit: number;
    soil_temperature_0cm: number;
    soil_moisture_0_1cm: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    precipitation: number[];
    rain: number[];
    showers: number[];
    snowfall: number[];
    weather_code: number[];
    pressure_msl: number[];
    surface_pressure: number[];
    cloud_cover: number[];
    visibility: number[];
    evapotranspiration: number[];
    vapour_pressure_deficit: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    soil_temperature_0cm: number[];
    soil_moisture_0_1cm: number[];
    uv_index: number[];
    sunshine_duration: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    precipitation_sum: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[];
    sunshine_duration: number[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
    et0_fao_evapotranspiration: number[];
  };
  hourly_units: Record<string, string>;
  daily_units: Record<string, string>;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name?: string;
}

// Get user's current location
export async function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error(`Unable to retrieve your location: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
}

// Fetch weather data from Open-Meteo API
export async function fetchWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'precipitation',
      'rain', 'showers', 'snowfall', 'weather_code', 'cloud_cover', 'pressure_msl',
      'surface_pressure', 'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m',
      'visibility', 'uv_index', 'is_day', 'sunshine_duration', 'evapotranspiration',
      'vapour_pressure_deficit', 'soil_temperature_0cm', 'soil_moisture_0_1cm'
    ].join(','),
    hourly: [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'precipitation_probability',
      'precipitation', 'rain', 'showers', 'snowfall', 'weather_code', 'pressure_msl',
      'surface_pressure', 'cloud_cover', 'visibility', 'evapotranspiration',
      'vapour_pressure_deficit', 'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m',
      'soil_temperature_0cm', 'soil_moisture_0_1cm', 'uv_index', 'sunshine_duration'
    ].join(','),
    daily: [
      'weather_code', 'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max',
      'apparent_temperature_min', 'precipitation_sum', 'rain_sum', 'showers_sum',
      'snowfall_sum', 'precipitation_hours', 'precipitation_probability_max',
      'wind_speed_10m_max', 'wind_gusts_10m_max', 'wind_direction_10m_dominant',
      'sunshine_duration', 'uv_index_max', 'uv_index_clear_sky_max', 'et0_fao_evapotranspiration'
    ].join(','),
    timezone: 'auto',
    forecast_days: '7'
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get weather description from weather code, now using the translation function
export function getWeatherDescription(code: number, t: (key: string) => string): string {
  const weatherCodes: Record<number, string> = {
    0: t('clearSky'), 1: t('mainlyClear'), 2: t('partlyCloudy'), 3: t('overcast'),
    45: t('foggy'), 48: t('depositingRimeFog'), 51: t('lightDrizzle'),
    53: t('moderateDrizzle'), 55: t('denseDrizzle'), 56: t('lightFreezingDrizzle'),
    57: t('denseFreezingDrizzle'), 61: t('slightRain'), 63: t('moderateRain'),
    65: t('heavyRain'), 66: t('lightFreezingRain'), 67: t('heavyFreezingRain'),
    71: t('slightSnowFall'), 73: t('moderateSnowFall'), 75: t('heavySnowFall'),
    77: t('snowGrains'), 80: t('slightRainShowers'), 81: t('moderateRainShowers'),
    82: t('violentRainShowers'), 85: t('slightSnowShowers'), 86: t('heavySnowShowers'),
    95: t('thunderstorm'), 96: t('thunderstormSlightHail'), 99: t('thunderstormHeavyHail'),
  };
  return weatherCodes[code] || t('unknown');
}

// Get agriculture-relevant weather insights, now using the translation function
export function getAgricultureInsights(weatherData: WeatherData, t: (key: string) => string): {
  irrigation: string;
  cropHealth: string;
  pestRisk: string;
  harvestTiming: string;
} {
  const { current, daily } = weatherData;

  let irrigation = t('normalIrrigation');
  if (current.soil_moisture_0_1cm < 0.3) {
    irrigation = t('irrigationNeeded');
  } else if (current.soil_moisture_0_1cm > 0.8) {
    irrigation = t('reduceIrrigation');
  }

  let cropHealth = t('goodCropConditions');
  if (current.temperature_2m > 35) {
    cropHealth = t('highTempStress');
  } else if (current.temperature_2m < 10) {
    cropHealth = t('lowTempSlowGrowth');
  }
  if (current.relative_humidity_2m > 85) {
    cropHealth += t('highHumidityFungalRisk');
  }

  let pestRisk = t('lowPestRisk');
  if (current.temperature_2m > 25 && current.relative_humidity_2m > 70) {
    pestRisk = t('moderatePestRisk');
  } else if (current.temperature_2m > 30) {
    pestRisk = t('highPestRisk');
  }

  let harvestTiming = t('harvestWeatherSuitable');
  const totalRain = daily.precipitation_sum.slice(0, 3).reduce((sum, rain) => sum + rain, 0);
  if (totalRain > 20) {
    harvestTiming = t('delayHarvestRain');
  } else if (totalRain > 5) {
    harvestTiming = t('considerWeatherHarvest');
  }

  return { irrigation, cropHealth, pestRisk, harvestTiming };
}
