import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Upload, Menu } from 'lucide-react';

import { Sidebar } from '../components/layout/Sidebar';
import { DocumentCard } from '../components/ui/DocumentCard';
import { UploadCard } from '../components/ui/UploadCard';
import { EmptyState } from '../components/ui/EmptyState';

import type { Document } from '../types';

import { uploadDocument } from '../services/api/uploadService';
import { fetchDocuments } from '../services/api/documentService';

export function DashboardPage() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Document[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const result = await fetchDocuments();

      if (!result.success || !result.data) {
        console.error(result.error);
        return;
      }

      setDocuments(result.data);
    } catch (error) {
      console.error('Load documents error:', error);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);

      const result = await uploadDocument(file);

      if (!result.success) {
        alert(result.error?.message || 'Upload failed');
        return;
      }

      console.log('Upload Success:', result.data);

      setIsUploadOpen(false);

      await loadDocuments();

      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Upload Error:', error);

      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    console.log('Delete document:', id);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        documents={documents}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onUploadClick={() => setIsUploadOpen(true)}
      />

      <div className="lg:pl-72">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-dark rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>

            <span className="font-heading font-bold text-lg text-brand-dark">
              Decoda
            </span>
          </div>

          <div className="w-10" />
        </div>

        <main className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-brand-dark mb-2">
                Dashboard
              </h1>

              <p className="text-gray-500">
                Manage and understand your documents
              </p>
            </div>

            {isUploadOpen ? (
              <div className="mb-8">
                <UploadCard
                  onUpload={handleUpload}
                  isUploading={isUploading}
                />
              </div>
            ) : (
              <button
                onClick={() => setIsUploadOpen(true)}
                className="w-full mb-8 btn btn-primary gap-2 py-4 text-lg"
              >
                <Upload className="w-5 h-5" />
                Upload PDF
              </button>
            )}

            {documents.length === 0 ? (
              <EmptyState
                icon={<FileText className="w-8 h-8 text-gray-400" />}
                title="No documents uploaded"
                description="Upload your first PDF to begin understanding your documents."
                action={
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsUploadOpen(true)}
                  >
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </button>
                }
              />
            ) : (
              <>
                <h2 className="font-heading font-semibold text-lg text-brand-dark mb-4">
                  Your Documents
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}