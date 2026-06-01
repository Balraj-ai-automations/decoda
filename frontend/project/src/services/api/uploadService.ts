import type { UploadProgress, ApiError } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Upload Service
 * Handles PDF file uploads
 */

interface UploadResponse {
  documentId: string;
  filename: string;
  pageCount: number;
}

interface UploadResult {
  success: boolean;
  data?: UploadResponse;
  error?: ApiError;
}

/**
 * Uploads a PDF document
 */
export async function uploadDocument(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (onProgress) {
      onProgress({ loaded: 0, total: 100, percentage: 0 });
    }

    const response = await fetch(
      `${API_URL}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: { message: errorText || 'Upload failed' } as ApiError,
      };
    }

    const data = await response.json();

    if (onProgress) {
      onProgress({ loaded: 100, total: 100, percentage: 100 });
    }

    return {
      success: true,
      data: {
        documentId: data.document_id,
        filename: file.name,
        pageCount: 0,
      },
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: { message: 'Unable to connect to backend server' } as ApiError,
    };
  }
}

/**
 * Validates a PDF file before upload
 */
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['application/pdf'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only PDF files are allowed' };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }

  return { valid: true };
}