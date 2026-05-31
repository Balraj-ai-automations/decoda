import type {
  ChatMessage,
  Language,
  Citation,
  ApiError,
} from '../../types';

/**
 * Chat Service
 * Handles document question-answer interactions
 *
 * Endpoint:
 * POST http://localhost:8000/ask
 */

interface AskRequest {
  documentId: string;
  question: string;
  language: Language;
}

interface AskResponse {
  answer: string;
  citations: Citation[];
}

interface AskResult {
  success: boolean;
  data?: AskResponse;
  error?: ApiError;
}

/**
 * Ask a question about a document
 */
export async function askQuestion(
  request: AskRequest
): Promise<AskResult> {
  try {
    const response = await fetch(
      'http://localhost:8000/ask',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: request.question,
          language: request.language,
          document_id: request.documentId,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      return {
        success: false,
        error: {
          message: errorText || 'Failed to get answer',
        },
      };
    }

    const data = await response.json();

    const citations: Citation[] =
      data.sources?.map((source: any) => ({
        pageNumber: source.page,
      })) || [];

    return {
      success: true,
      data: {
        answer: data.answer,
        citations,
      },
    };
  } catch (error) {
    console.error('Ask question error:', error);

    return {
      success: false,
      error: {
        message: 'Unable to connect to backend',
      },
    };
  }
}

/**
 * Chat history placeholder
 * Future feature
 */
export async function fetchChatHistory(
  documentId: string
): Promise<{
  success: boolean;
  data?: ChatMessage[];
  error?: ApiError;
}> {
  console.log(
    'Chat history not implemented yet:',
    documentId
  );

  return {
    success: true,
    data: [],
  };
}