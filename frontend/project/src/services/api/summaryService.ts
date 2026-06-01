import type { Summary, Language, ApiError } from '../../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Summary Service
 * Handles summary generation and translation
 */

interface SummaryRequest {
  documentId: string;
  language: Language;
}

interface SummaryResult {
  success: boolean;
  data?: Summary;
  error?: ApiError;
}

/**
 * Generate summary
 */
export async function generateSummary(
  request: SummaryRequest
): Promise<SummaryResult> {
  try {
    const response = await fetch(
      `${API_URL}/summarize`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: request.documentId,
          language: request.language,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: { message: errorText || 'Failed to generate summary' },
      };
    }

    const data = await response.json();

    return {
      success: true,
      data: {
        id: `summary-${Date.now()}`,
        documentId: request.documentId,
        content: data.summary,
        language: request.language,
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Generate summary error:', error);
    return {
      success: false,
      error: { message: 'Unable to connect to backend' },
    };
  }
}

/**
 * Translation uses same backend endpoint via generateSummary()
 */
export async function translateSummary(
  summaryId: string,
  targetLanguage: Language
): Promise<SummaryResult> {
  console.log('translateSummary placeholder:', summaryId, targetLanguage);
  return {
    success: false,
    error: { message: 'Translation is handled through generateSummary()' },
  };
}