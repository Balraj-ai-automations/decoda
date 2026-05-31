import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-dark rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-brand-dark">Decoda</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/auth" className="btn btn-ghost">
              Sign In
            </Link>
            <Link to="/auth" className="btn btn-primary hidden sm:inline-flex">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
