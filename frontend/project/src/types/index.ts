export type Language = 'English' | 'Hindi' | 'Tamil' | 'Telugu' | 'Kannada' | 'Bengali';

export interface LanguageConfig {
  name: Language;
  background: string;
  text: string;
}

export interface Document {
  id: string;
  filename: string;
  uploadDate: string;
  pageCount: number;
  summary?: Summary;
}

export interface Summary {
  id: string;
  documentId: string;
  content: string;
  language: Language;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  documentId: string;
  role: 'user' | 'assistant';
  content: string;
  language?: Language;
  citations?: Citation[];
  createdAt: string;
}

export interface Citation {
  pageNumber: number;
  excerpt?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  code?: string;
}
