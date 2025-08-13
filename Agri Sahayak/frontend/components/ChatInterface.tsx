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

    // 1. Add user's original message to UI
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text };
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
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">{t('assistantTitle')}</h2>
        <p className="text-xs text-gray-500">{t('assistantDescription')}</p>
      </div>
      <MessageList messages={messages} />
      {isLoading && (
        <div className="px-4 pb-2 text-xs text-gray-500">{t('generatingResponse')}</div>
      )}
      <ChatInput onSend={handleSend} />
    </div>
  );
}

