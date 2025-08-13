"use client";

import { useEffect, useRef } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  const { speak } = useTextToSpeech();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 p-4">
      {messages.map((msg) => (
        <div key={msg.id} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
          <div
            className={`inline-flex max-w-[80%] items-start rounded-2xl px-4 py-3 text-sm shadow ${
              msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-900'
            }`}
          >
            <span className="whitespace-pre-wrap break-words">{msg.content}</span>
            {msg.role === 'assistant' && (
              <button
                aria-label="Speak message"
                className="ml-2 text-gray-500 hover:text-gray-800"
                onClick={() => speak(msg.content)}
                title="Read aloud"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M3 10v4a1 1 0 001 1h3l3.293 3.293A1 1 0 0011 18v-12a1 1 0 00-1.707-.707L7 8H4a1 1 0 00-1 1z" />
                  <path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

