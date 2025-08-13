import { useCallback, useEffect, useRef, useState } from 'react';

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
        setTranscript(finalTranscript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition as unknown as SpeechRecognition;
    } else {
      setIsSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    } catch {}
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch {}
  }, []);

  return { isSupported, isListening, transcript, startListening, stopListening };
}

