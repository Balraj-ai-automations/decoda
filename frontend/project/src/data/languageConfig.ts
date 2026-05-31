import type { Language, LanguageConfig } from '../types';

export const LANGUAGE_CONFIGS: Record<Language, LanguageConfig> = {
  English: {
    name: 'English',
    background: '#EEEDFE',
    text: '#1a0a4e',
  },
  Hindi: {
    name: 'Hindi',
    background: '#EEEDFE',
    text: '#3C3489',
  },
  Tamil: {
    name: 'Tamil',
    background: '#E1F5EE',
    text: '#085041',
  },
  Telugu: {
    name: 'Telugu',
    background: '#FAEEDA',
    text: '#633806',
  },
  Kannada: {
    name: 'Kannada',
    background: '#FAECE7',
    text: '#712B13',
  },
  Bengali: {
    name: 'Bengali',
    background: '#E6F1FB',
    text: '#0C447C',
  },
};

export const LANGUAGES: Language[] = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Bengali'];

export const getLanguageConfig = (language: Language): LanguageConfig => {
  return LANGUAGE_CONFIGS[language];
};
