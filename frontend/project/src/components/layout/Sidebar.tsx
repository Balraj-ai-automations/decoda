import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Home, Upload, X } from 'lucide-react';
import type { Document } from '../../types';

interface SidebarProps {
  documents: Document[];
  isOpen: boolean;
  onClose: () => void;
  onUploadClick: () => void;
}

export function Sidebar({ documents, isOpen, onClose, onUploadClick }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-dark rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-brand-dark">Decoda</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-surface rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="p-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-dark hover:bg-surface transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </nav>

          <div className="px-4 py-2">
            <button
              onClick={onUploadClick}
              className="w-full btn btn-primary gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload PDF
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Documents
            </h3>
            <div className="space-y-2">
              {documents.length === 0 ? (
                <p className="text-sm text-gray-500 px-2 py-4">No documents yet</p>
              ) : (
                documents.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/document/${doc.id}`}
                    className="block p-3 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-brand-dark truncate">
                          {doc.filename}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{doc.uploadDate}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
