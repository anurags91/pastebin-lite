'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PasteViewProps {
  paste: {
    content: string;
    remaining_views: number | null;
    expires_at: string | null;
  };
  pasteId: string;
}

export default function PasteView({ paste, pasteId }: PasteViewProps) {
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Update countdown timer
  useEffect(() => {
    if (!paste.expires_at) return;

    const updateTimer = () => {
      const now = new Date();
      const expires = new Date(paste.expires_at!);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours % 24}h ${minutes % 60}m`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes % 60}m ${seconds % 60}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds % 60}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [paste.expires_at]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(paste.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative z-10">
      {/* Floating decoration */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-elegant-purple-500/10 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <Link
            href="/"
            className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Create New Paste</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Paste ID:</span>
            <code className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-elegant-purple-400 font-mono text-sm">
              {pasteId}
            </code>
          </div>
        </div>

        {/* Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Views Card */}
          {paste.remaining_views !== null && (
            <div className="card-elegant-fixed animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-elegant-blue-500/20 to-elegant-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-elegant-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Views Remaining</p>
                  <p className="text-2xl font-bold text-elegant-blue-400">
                    {paste.remaining_views}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Time Card */}
          {paste.expires_at && (
            <div className="card-elegant-fixed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-elegant-purple-500/20 to-elegant-pink-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-elegant-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Expires In</p>
                  <p className={`text-2xl font-bold ${timeRemaining === 'Expired' ? 'text-red-400' : 'text-elegant-purple-400'}`}>
                    {timeRemaining || 'Calculating...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Status Card */}
          {paste.remaining_views === null && !paste.expires_at && (
            <div className="card-elegant-fixed animate-fade-in col-span-full md:col-span-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-elegant-green-500/20 to-elegant-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-lg font-bold text-green-400">
                    ∞ Unlimited
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="card-elegant-fixed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gradient flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Paste Content
            </h2>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl font-semibold bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-elegant-purple-500 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-elegant-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Content
                </>
              )}
            </button>
          </div>

          {/* Content Display - XSS Safe */}
          <div className="code-block-elegant">
            <pre className="whitespace-pre-wrap break-words text-gray-200 leading-relaxed font-mono text-sm">
              {paste.content}
            </pre>
          </div>
        </div>

        {/* Warning Message */}
        {(paste.remaining_views !== null || paste.expires_at) && (
          <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">Limited Availability</h3>
                <p className="text-yellow-200/80 text-sm">
                  This paste has constraints and will become unavailable once{' '}
                  {paste.remaining_views !== null && paste.expires_at && 'either the view limit is reached or it expires'}
                  {paste.remaining_views !== null && !paste.expires_at && 'the view limit is reached'}
                  {!paste.remaining_views && paste.expires_at && 'it expires'}
                  . Make sure to save any important content!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
