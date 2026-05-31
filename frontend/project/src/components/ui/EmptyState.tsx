import type { ReactNode } from 'react';
import React from 'react';
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
        {title}
      </h3>
      <p className="text-gray-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
