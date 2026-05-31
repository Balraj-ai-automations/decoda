import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { GoogleAuthButton } from '../components/ui/GoogleAuthButton';
import React from 'react';
export function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate auth - in production, this would connect to actual auth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-dark rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading font-bold text-2xl text-brand-dark mb-2">
              Welcome to Decoda
            </h1>
            <p className="text-gray-500">
              Sign in to start understanding your documents
            </p>
          </div>

          <GoogleAuthButton onClick={handleGoogleSignIn} isLoading={isLoading} />

          <p className="text-xs text-center text-gray-400 mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
