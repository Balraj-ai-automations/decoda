import React from 'react';
import { User, Bot } from 'lucide-react';
import { LanguagePill } from './LanguagePill';
import { CitationList } from './CitationList';
import type { ChatMessage as ChatMessageType, Language } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  language?: Language;
}

export function ChatMessage({ message, language }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl p-4 ${
            isUser
              ? 'bg-brand-primary text-white rounded-tr-sm'
              : 'bg-white border border-gray-200 rounded-tl-sm'
          }`}
        >
          <p className={`leading-relaxed ${isUser ? '' : 'text-gray-700'}`}>
            {message.content}
          </p>
        </div>

        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-2">
            <CitationList citations={message.citations} />
          </div>
        )}

        {!isUser && language && (
          <div className="mt-2">
            <LanguagePill language={language} size="sm" />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
}
