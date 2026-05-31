import { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import type { UploadProgress } from '../../types';
import React from 'react';
interface UploadCardProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
  progress?: UploadProgress;
}

export function UploadCard({ onUpload, isUploading = false, progress }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
    }
  }, [onUpload]);

  const handleClear = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
        isDragging
          ? 'border-brand-primary bg-brand-light'
          : 'border-gray-300 hover:border-brand-primary hover:bg-brand-light/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-brand-light rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-brand-primary animate-pulse" />
          </div>
          <div>
            <p className="font-medium text-brand-dark">{selectedFile?.name}</p>
            {progress && (
              <div className="mt-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">{progress.percentage}% uploaded</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-16 h-16 mx-auto bg-surface rounded-2xl flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-brand-primary" />
          </div>
          <p className="font-medium text-brand-dark mb-2">
            Drop your PDF here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports PDF files only, max 10MB
          </p>
        </>
      )}

      {selectedFile && !isUploading && (
        <button
          onClick={handleClear}
          className="absolute top-4 right-4 p-2 hover:bg-surface rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
