import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Globe, MessageSquare, Users, Briefcase, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-brand-dark pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-brand-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-40 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Understand Any Document in Your Language
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Upload legal contracts, medical reports, government notices, scholarship documents, and official paperwork. Get simple explanations, translations, and answers instantly.
            </p>
            <Link
              to="/auth"
              className="btn btn-primary text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-dark mb-4">
              How Decoda Helps You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three powerful features to make any document easy to understand
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Simplify */}
            <div className="card hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <Sparkles className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-brand-dark mb-3">
                Simplify
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Convert difficult legal, medical, and government language into plain language that anyone can understand.
              </p>
            </div>

            {/* Translate */}
            <div className="card hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <Globe className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-brand-dark mb-3">
                Translate
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Translate summaries into Indian regional languages including Hindi, Tamil, Telugu, Kannada, and Bengali.
              </p>
            </div>

            {/* Answer */}
            <div className="card hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary transition-colors">
                <MessageSquare className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-brand-dark mb-3">
                Answer
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ask questions and receive grounded answers from your documents with page citations and source references.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-brand-dark mb-4">
              Who Is This For?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Decoda helps everyday people understand important documents
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Farmer */}
            <div className="card hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
                Farmer
              </h3>
              <p className="text-sm text-gray-600">
                Understand government notices and schemes
              </p>
            </div>

            {/* Patient */}
            <div className="card hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-error" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
                Patient
              </h3>
              <p className="text-sm text-gray-600">
                Understand medical reports and discharge summaries
              </p>
            </div>

            {/* Student */}
            <div className="card hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
                Student
              </h3>
              <p className="text-sm text-gray-600">
                Understand scholarship and education documents
              </p>
            </div>

            {/* Business Owner */}
            <div className="card hover:shadow-lg transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">
                Business Owner
              </h3>
              <p className="text-sm text-gray-600">
                Understand contracts and agreements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-6">
            Start Understanding Your Documents Today
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are saving time and understanding important documents in their own language.
          </p>
          <Link
            to="/auth"
            className="btn btn-primary text-lg px-8 py-4 rounded-2xl inline-flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-dark rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-brand-dark">Decoda</span>
            </div>
            <p className="text-sm text-gray-500">
              Upload any document. Understand it instantly.
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Decoda. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
