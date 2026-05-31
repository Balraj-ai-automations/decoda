import React from 'react';
import type { UploadProgress, ApiError } from '../../types';

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
 * @param file - The PDF file to upload
 * @param onProgress - Callback for upload progress
 * @returns Promise with upload result
 */
export async function uploadDocument(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<UploadResult> {
  try {
    // Create form data for FastAPI
    const formData = new FormData();

    // Backend expects field name = "file"
    formData.append('file', file);

    // Optional progress update
    if (onProgress) {
      onProgress({
        loaded: 0,
        total: 100,
        percentage: 0,
      });
    }

    // Call FastAPI backend
    const response = await fetch(
      'http://localhost:8000/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    // Handle failed request
    if (!response.ok) {
      const errorText = await response.text();

      return {
        success: false,
        error: {
          message: errorText || 'Upload failed',
        } as ApiError,
      };
    }

    // Parse response
    const data = await response.json();

    // Complete progress
    if (onProgress) {
      onProgress({
        loaded: 100,
        total: 100,
        percentage: 100,
      });
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
      error: {
        message: 'Unable to connect to backend server',
      } as ApiError,
    };
  }
}

/**
 * Validates a PDF file before upload
 * @param file - The file to validate
 * @returns Validation result
 */
export function validatePdfFile(
  file: File
): {
  valid: boolean;
  error?: string;
} {
  const MAX_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['application/pdf'];

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Only PDF files are allowed',
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'File size must be less than 10MB',
    };
  }

  return {
    valid: true,
  };
}