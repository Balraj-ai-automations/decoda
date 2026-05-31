import React from 'react';
import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled = false, placeholder = 'Ask a question about this document...' }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 input"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="btn btn-primary px-4 py-3"
        aria-label="Send message"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}
