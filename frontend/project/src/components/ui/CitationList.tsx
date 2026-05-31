import React from 'react';
import { FileText } from 'lucide-react';
import type { Citation } from '../../types';

interface CitationListProps {
  citations: Citation[];
}

export function CitationList({ citations }: CitationListProps) {
  return (
    <div className="bg-surface rounded-xl p-3 mt-2">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Sources
      </p>
      <div className="flex flex-wrap gap-2">
        {citations.map((citation, idx) => (
          <button
            key={idx}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-brand-dark hover:bg-brand-light transition-colors"
          >
            <FileText className="w-3 h-3" />
            Page {citation.pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
