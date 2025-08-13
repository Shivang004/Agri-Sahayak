"use client";

import { useCallback, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import MessageList, { ChatMessage } from './MessageList';
import ChatInput from './ChatInput';
import { postQuery } from '@/lib/api';

export default function ChatInterface() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async ({ text, imageUrl }: { text: string; imageUrl?: string | null }) => {
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const data = await postQuery({ query: text, imageUrl: imageUrl || undefined });
      const aiMessage: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: t('sorryError')
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

