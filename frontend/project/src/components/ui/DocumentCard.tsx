import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Trash2 } from 'lucide-react';
import type { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
}

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  return (
    <div className="card group hover:shadow-md transition-shadow">
      <Link to={`/document/${document.id}`} className="block">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-brand-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-brand-dark truncate group-hover:text-brand-primary transition-colors">
              {document.filename}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {document.pageCount} pages · {document.uploadDate}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <button
          onClick={() => onDelete(document.id)}
          className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition-all"
          aria-label="Delete document"
        >
          <Trash2 className="w-4 h-4 text-error" />
        </button>
      )}
    </div>
  );
}
