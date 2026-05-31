import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, FileText, Calendar, File, ArrowLeft, Trash2 } from 'lucide-react';
import type {
  Language,
  ChatMessage as ChatMessageType,
  Document,
  Summary,
} from '../types';
import { Sidebar } from '../components/layout/Sidebar';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { SummaryCard } from '../components/ui/SummaryCard';
import { ChatMessage } from '../components/ui/ChatMessage';
import { ChatInput } from '../components/ui/ChatInput';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorBanner } from '../components/ui/ErrorBanner';
import {
  fetchDocuments,
  deleteDocument,
} from '../services/api/documentService';
import { generateSummary } from '../services/api/summaryService';
import { askQuestion } from '../services/api/chatService';

export function DocumentViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [document, setDocument] = useState<Document | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // declared first — loadDocument calls this below
  const loadSummary = async (
    documentId: string,
    language: Language
  ) => {
    try {
      setError(null);
      setIsSummaryLoading(true);
      const result = await generateSummary({ documentId, language });
      if (result.success && result.data) {
        setSummary(result.data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load summary');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  // language passed as param — selectedLanguage NOT in deps, no loop
  const loadDocument = useCallback(async (language: Language) => {
    try {
      setIsLoading(true);
      const result = await fetchDocuments();

      if (!result.success || !result.data) {
        setError('Failed to load documents');
        return;
      }

      setDocuments(result.data);

      const selectedDocument = result.data.find(
        (doc) => doc.id === id
      );

      if (!selectedDocument) {
        setError('Document not found');
        return;
      }

      setDocument(selectedDocument);
      await loadSummary(selectedDocument.id, language);
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDocument(selectedLanguage);
  }, [loadDocument]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading document..." />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-brand-dark mb-4">
            Document Not Found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleLanguageChange = async (language: Language) => {
    setSelectedLanguage(language);
    if (!document) return;
    await loadSummary(document.id, language);
  };

  const handleSendMessage = async (question: string) => {
    if (!document) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      documentId: document.id,
      role: 'user',
      content: question,
      createdAt: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      const result = await askQuestion({
        documentId: document.id,
        question,
        language: selectedLanguage,
      });

      if (result.success && result.data) {
        const assistantMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          documentId: document.id,
          role: 'assistant',
          content: result.data.answer,
          citations: result.data.citations,
          createdAt: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, assistantMessage]);
      } else {
        setError(result.error?.message || 'Failed to get answer');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleDeleteDocument = async () => {
    if (!document) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this document?'
    );

    if (!confirmed) return;

    const result = await deleteDocument(document.id);

    if (!result.success) {
      alert(result.error?.message || 'Delete failed');
      return;
    }

    alert('Document deleted successfully');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar
        documents={documents}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onUploadClick={() => {}}
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

        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate('/dashboard')}
              className="lg:hidden flex items-center gap-2 text-brand-dark hover:text-brand-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </button>

            <div className="mb-6">
              <h1 className="font-heading font-bold text-xl sm:text-2xl text-brand-dark mb-2 truncate">
                {document.filename}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{document.uploadDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <File className="w-4 h-4" />
                  <span>{document.pageCount} pages</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleDeleteDocument}
                  className="btn btn-outline flex items-center gap-2 text-error hover:bg-red-50 border-error"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Document
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <label className="block text-sm font-medium text-brand-dark mb-2">
                    Select Language
                  </label>
                  <LanguageSelector
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                  />
                </div>

                {error && (
                  <ErrorBanner
                    message={error}
                    onDismiss={() => setError(null)}
                    onRetry={() => handleLanguageChange(selectedLanguage)}
                  />
                )}

                <SummaryCard
                  summary={summary}
                  language={selectedLanguage}
                  isLoading={isSummaryLoading}
                  onCopy={() => {
                    navigator.clipboard.writeText(summary?.content || '');
                  }}
                  onDownload={() => {
                    console.log('Download summary');
                  }}
                />
              </div>

              <div className="flex flex-col h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 shrink-0">
                  <h2 className="font-heading font-semibold text-lg text-brand-dark">
                    Ask Questions About This Document
                  </h2>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
                >
                  {chatMessages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      language={
                        message.role === 'assistant'
                          ? selectedLanguage
                          : undefined
                      }
                    />
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <LoadingSpinner size="sm" message="Thinking..." />
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 shrink-0">
                  <ChatInput
                    onSend={handleSendMessage}
                    disabled={isChatLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}