import type { Document, ApiError } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Backend response shape for a document.
 */
interface BackendDocument {
  document_id: string;
  filename: string;
  uploaded_at: string;
  chunk_count: number;
  page_count?: number;
}

interface DocumentsResult {
  success: boolean;
  data?: Document[];
  error?: ApiError;
}

interface DeleteResult {
  success: boolean;
  error?: ApiError;
}

/**
 * Fetches all documents
 */
export async function fetchDocuments(): Promise<DocumentsResult> {
  try {
    const response = await fetch(
      `${API_URL}/documents`
    );

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to fetch documents' },
      };
    }

    const documents: BackendDocument[] = await response.json();

    const mappedDocuments: Document[] = documents.map((doc) => ({
      id: doc.document_id,
      filename: doc.filename,
      uploadDate: new Date(doc.uploaded_at).toLocaleDateString(),
      pageCount: doc.page_count ?? doc.chunk_count,
    }));

    return { success: true, data: mappedDocuments };
  } catch (error) {
    console.error('Fetch documents error:', error);
    return {
      success: false,
      error: { message: 'Unable to connect to backend' },
    };
  }
}

/**
 * Fetch a single document by ID
 */
export async function fetchDocumentById(
  documentId: string
): Promise<{ success: boolean; data?: Document; error?: ApiError }> {
  try {
    const documentsResult = await fetchDocuments();

    if (!documentsResult.success || !documentsResult.data) {
      return { success: false, error: { message: 'Document not found' } };
    }

    const document = documentsResult.data.find(
      (doc) => doc.id === documentId
    );

    if (!document) {
      return { success: false, error: { message: 'Document not found' } };
    }

    return { success: true, data: document };
  } catch (error) {
    console.error(error);
    return { success: false, error: { message: 'Failed to fetch document' } };
  }
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(
  documentId: string
): Promise<DeleteResult> {
  try {
    const response = await fetch(
      `${API_URL}/documents/${documentId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: { message: errorText || 'Delete failed' },
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: { message: 'Unable to connect to backend' },
    };
  }
}