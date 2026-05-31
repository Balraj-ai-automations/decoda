import { getLanguageConfig } from '../../data/languageConfig';
import type { Language } from '../../types';
import React from 'react';
interface LanguagePillProps {
  language: Language;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function LanguagePill({ language, size = 'md', className = '' }: LanguagePillProps) {
  const config = getLanguageConfig(language);

  return (
    <span
      className={`pill ${sizeClasses[size]} font-medium ${className}`}
      style={{
        backgroundColor: config.background,
        color: config.text,
      }}
    >
      {language}
    </span>
  );
}
