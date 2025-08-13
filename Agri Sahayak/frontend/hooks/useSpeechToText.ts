import { useCallback, useEffect, useRef, useState } from 'react';

// Language code mapping for speech recognition
const getSpeechRecognitionLanguageCode = (lang: string): string => {
  const languageMap: { [key: string]: string } = {
    'en': 'en-IN',
    'hi': 'hi-IN',
    'pa': 'pa-IN',
    'mr': 'mr-IN',
    'te': 'te-IN',
    'ta': 'ta-IN'
  };
  return languageMap[lang] || 'en-IN';
};

type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T }
  ? T
  : any;

type WebkitSpeechRecognitionType = typeof window extends { webkitSpeechRecognition: infer T }
  ? T
  : any;

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export function useSpeechToText() {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const shouldBeListeningRef = useRef<boolean>(false);

  useEffect(() => {
    const RecognitionCtor =
      typeof window !== 'undefined'
        ? (window.SpeechRecognition || window.webkitSpeechRecognition)
        : undefined;
    if (RecognitionCtor) {
      setIsSupported(true);
      const recognition = new RecognitionCtor();
      recognition.lang = 'en-IN';
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          finalTranscript += result[0].transcript;
        }
        // Accumulate the transcript instead of replacing it
        accumulatedTranscriptRef.current = finalTranscript;
        setTranscript(accumulatedTranscriptRef.current);
      };

      recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
        // Don't auto-restart on errors, let user manually restart
        shouldBeListeningRef.current = false;
      };

      recognition.onend = () => {
        setIsListening(false);
        // Auto-restart if we're supposed to be listening (handles pauses)
        if (shouldBeListeningRef.current && recognitionRef.current) {
          setTimeout(() => {
            if (shouldBeListeningRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
                setIsListening(true);
              } catch {}
            }
          }, 100);
        }
      };



      recognitionRef.current = recognition as unknown as SpeechRecognition;
    } else {
      setIsSupported(false);
    }
  }, []);

  const startListening = useCallback((lang: string = 'en') => {
    if (!recognitionRef.current) return;
    try {
      // Don't clear transcript when starting - let it accumulate
      recognitionRef.current.lang = getSpeechRecognitionLanguageCode(lang);
      shouldBeListeningRef.current = true;
      recognitionRef.current.start();
      setIsListening(true);
    } catch {}
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      shouldBeListeningRef.current = false;
      recognitionRef.current.stop();
      setIsListening(false);
    } catch {}
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    accumulatedTranscriptRef.current = '';
  }, []);

  return { isSupported, isListening, transcript, startListening, stopListening, clearTranscript };
}