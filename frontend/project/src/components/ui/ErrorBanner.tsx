import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onDismiss, onRetry }: ErrorBannerProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-medium text-error">Something went wrong</p>
          <p className="text-sm text-red-700 mt-1">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm font-medium text-error hover:underline mt-2"
            >
              Try again
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-red-100 rounded transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4 text-error" />
          </button>
        )}
      </div>
    </div>
  );
}
