'use client';

import { useState, FormEvent } from 'react';

export default function HomePage() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPasteUrl('');
    setCopied(false);

    try {
      const body: {
        content: string;
        ttl_seconds?: number;
        max_views?: number;
      } = { content };

      if (ttlSeconds) {
        body.ttl_seconds = parseInt(ttlSeconds, 10);
      }
      if (maxViews) {
        body.max_views = parseInt(maxViews, 10);
      }

      const response = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create paste');
      }

      setPasteUrl(data.url);
      
      // Clear form
      setContent('');
      setTtlSeconds('');
      setMaxViews('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (pasteUrl) {
      await navigator.clipboard.writeText(pasteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setPasteUrl('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Floating decoration circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-elegant-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-elegant-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-3 h-3 bg-gradient-to-r from-elegant-purple-500 to-elegant-blue-500 rounded-full animate-pulse"></div>
              <h1 className="text-6xl md:text-7xl font-bold font-display text-gradient">
                PasteBin
              </h1>
              <div className="w-3 h-3 bg-gradient-to-r from-elegant-blue-500 to-elegant-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-elegant-purple-500 to-transparent rounded-full"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share your code and text snippets with <span className="text-elegant-purple-500 font-semibold">style</span> and <span className="text-elegant-blue-500 font-semibold">security</span>
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-elegant-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-elegant-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Time-Limited</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-elegant-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>View-Limited</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="card-elegant-fixed animate-slide-up">
          {!pasteUrl ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Input */}
              <div>
                <label htmlFor="content" className="block text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-gradient">Content</span>
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your code, notes, or any text here..."
                  className="textarea-elegant"
                  required
                  disabled={loading}
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    {content.length} characters
                  </span>
                  {content.length > 0 && (
                    <span className="text-elegant-purple-400">
                      Ready to share ✨
                    </span>
                  )}
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TTL Input */}
                <div className="relative">
                  <label htmlFor="ttl" className="block text-sm font-semibold mb-3 text-gray-200">
                    ⏱️ Time to Live (seconds)
                  </label>
                  <input
                    id="ttl"
                    type="number"
                    value={ttlSeconds}
                    onChange={(e) => setTtlSeconds(e.target.value)}
                    placeholder="e.g., 3600 (1 hour)"
                    min="1"
                    className="input-elegant"
                    disabled={loading}
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Optional: Auto-delete after specified time
                  </p>
                </div>

                {/* Max Views Input */}
                <div className="relative">
                  <label htmlFor="views" className="block text-sm font-semibold mb-3 text-gray-200">
                    👁️ Max Views
                  </label>
                  <input
                    id="views"
                    type="number"
                    value={maxViews}
                    onChange={(e) => setMaxViews(e.target.value)}
                    placeholder="e.g., 5 views"
                    min="1"
                    className="input-elegant"
                    disabled={loading}
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Optional: Auto-delete after X views
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-fade-in">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="btn-elegant w-full text-lg py-4 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating your paste...
                    </>
                  ) : (
                    <>
                      Create Paste
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          ) : (
            /* Success View */
            <div className="space-y-8 animate-fade-in">
              {/* Success Icon */}
              <div className="text-center">
                <div className="inline-block relative">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-elegant-purple-500 to-elegant-blue-500 rounded-full flex items-center justify-center glow-elegant">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-elegant-purple-500 to-elegant-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                </div>
                <h2 className="text-3xl font-bold mb-2 text-gradient">
                  Paste Created Successfully!
                </h2>
                <p className="text-gray-300">
                  Your content is ready to share with the world 🚀
                </p>
              </div>

              {/* URL Display */}
              <div className="relative">
                <label className="block text-sm font-semibold mb-3 text-gray-200">
                  📎 Shareable Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pasteUrl}
                    readOnly
                    className="input-elegant flex-1 font-mono text-sm"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={handleCopy}
                    className="px-6 py-3 rounded-xl font-semibold bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-elegant-purple-500 transition-all duration-300 flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg className="w-5 h-5 text-elegant-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={pasteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-elegant-secondary text-center py-4 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Paste
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={handleReset}
                  className="btn-elegant py-4 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Another Paste
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-elegant-purple-500 rounded-full animate-pulse"></span>
            <span>Powered by Next.js & Neon Postgres</span>
            <span className="w-2 h-2 bg-elegant-blue-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
