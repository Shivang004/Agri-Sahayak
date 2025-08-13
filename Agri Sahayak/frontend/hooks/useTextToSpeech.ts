import { useCallback, useEffect, useRef, useState } from 'react';

export function useTextToSpeech() {
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsSupported(true);
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1;
    utterance.pitch = 1;
    synthRef.current.cancel();
    synthRef.current.speak(utterance);
  }, []);

  return { isSupported, speak };
}

