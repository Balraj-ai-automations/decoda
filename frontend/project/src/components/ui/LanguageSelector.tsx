import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { LanguagePill } from './LanguagePill';
import { LANGUAGES } from '../../data/languageConfig';
import type { Language } from '../../types';
import React from 'react';
interface LanguageSelectorProps {
  value: Language;
  onChange: (language: Language) => void;
  className?: string;
}

export function LanguageSelector({ value, onChange, className = '' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
      >
        <Globe className="w-4 h-4 text-brand-dark" />
        <LanguagePill language={value} size="sm" />
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onChange(lang);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-2.5 hover:bg-surface transition-colors ${lang === value ? 'bg-brand-light' : ''}`}
            >
              <LanguagePill language={lang} size="sm" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
