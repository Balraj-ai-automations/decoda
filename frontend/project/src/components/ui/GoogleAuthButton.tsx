import { Chrome } from 'lucide-react';
import React from 'react';
interface GoogleAuthButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export function GoogleAuthButton({ onClick, isLoading = false }: GoogleAuthButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full btn bg-white border-2 border-gray-200 text-brand-dark hover:bg-surface hover:border-gray-300 gap-3 py-4"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
      ) : (
        <Chrome className="w-5 h-5" />
      )}
      <span className="font-medium">Continue with Google</span>
    </button>
  );
}
