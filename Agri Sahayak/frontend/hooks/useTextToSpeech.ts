import { useCallback, useEffect, useRef, useState } from 'react';

// Language code mapping for speech synthesis
const getSpeechLanguageCode = (lang: string): string => {
  const languageMap: { [key: string]: string } = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'pa': 'pa-IN',
    'mr': 'mr-IN',
    'te': 'te-IN',
    'ta': 'ta-IN'
  };
  return languageMap[lang] || 'en-US';
};

export function useTextToSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text: string, lang: string = 'en') => {
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLanguageCode(lang);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Cancel any ongoing speech before starting new one
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  }, []);

  return { isSupported, speak };
}

