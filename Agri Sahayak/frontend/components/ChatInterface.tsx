"use client";

import { useCallback, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { translateText } from '@/lib/translationApi';
import MessageList, { ChatMessage } from './MessageList';
import ChatInput from './ChatInput';
import { postQuery } from '@/lib/api';

export default function ChatInterface() {
  const { language, t } = useLanguage();
  const { speak } = useTextToSpeech();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async ({ text, imageUrl }: { text: string; imageUrl?: string | null }) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { 
      id: crypto.randomUUID(), 
      role: 'user', 
      content: text, 
      imageUrl: imageUrl || null // Include the imageUrl here
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 2. Translate user's message to English for the backend
      const translatedToEnglish = await translateText(text, language, 'en');

      // 3. Send translated message to your backend
      const data = await postQuery({ query: translatedToEnglish, imageUrl: imageUrl || undefined });
      const backendResponse = data.reply;

      // 4. Translate backend's English response back to user's language
      const translatedToUserLang = await translateText(backendResponse, 'en', language);

      // 5. Add final translated response to UI
      const aiMessage: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: translatedToUserLang };
      setMessages((prev) => [...prev, aiMessage]);

      // 6. Speak the final response aloud in the correct language
      speak(translatedToUserLang, language);

    } catch (err: any) {
      console.error("Failed to send message:", err);
      const errorMsg = t('sorryError');
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: errorMsg
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [language, speak, t]);

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white">
      <div className="border-b p-4 flex-shrink-0">
        <h2 className="text-lg font-semibold">{t('assistantTitle')}</h2>
        <p className="text-xs text-gray-500">{t('assistantDescription')}</p>
      </div>

      {/* START: Replace the old MessageList component with this block */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          // If there are no messages, show the welcome message
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-4" />
              <p className="text-lg text-gray-500">{t('welcomeMessage')}</p>
            </div>
          </div>
        ) : (
          // Otherwise, show the list of messages
          <MessageList messages={messages} />
        )}
      </div>
      {/* END: Replacement block */}

      {/* The input form remains fixed at the bottom */}
      {isLoading && (
        <div className="px-4 pb-2 text-xs text-gray-500 flex-shrink-0">{t('generatingResponse')}</div>
      )}
      <ChatInput onSend={handleSend} />
    </div>
  );
}
