import { Copy, Download } from 'lucide-react';
import { LanguagePill } from './LanguagePill';
import type { Summary, Language } from '../../types';
import React from 'react';
interface SummaryCardProps {
  summary: Summary | null;
  language: Language;
  isLoading?: boolean;
  onCopy?: () => void;
  onDownload?: () => void;
}

export function SummaryCard({ summary, language, isLoading, onCopy, onDownload }: SummaryCardProps) {
  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="card bg-surface border-dashed border-2 border-gray-300">
        <p className="text-center text-gray-500">
          No summary available yet. Upload a document to generate a summary.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-brand-dark">Summary</h3>
        <LanguagePill language={language} size="md" />
      </div>

      <div className="prose prose-sm max-w-none mb-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary.content}</p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={onCopy}
          className="btn btn-ghost text-sm gap-2 px-4 py-2"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={onDownload}
          className="btn btn-ghost text-sm gap-2 px-4 py-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
