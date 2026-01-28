import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Floating decoration */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-elegant-purple-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-elegant-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="text-center max-w-2xl relative z-10">
        <div className="animate-fade-in">
          {/* 404 Number with gradient */}
          <div className="relative inline-block mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-gradient leading-none">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-elegant-purple-500 to-elegant-blue-500 blur-3xl opacity-20"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Paste Not Found
            </h2>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              This paste doesn't exist, has expired, or the view limit has been exceeded
            </p>
          </div>

          {/* Error Card */}
          <div className="card-elegant-fixed mb-8 inline-block">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-red-400">Resource Unavailable</p>
                <p className="text-sm text-gray-400">Error code: 404</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="btn-elegant px-8 py-4 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return Home
            </Link>
            <Link
              href="/"
              className="btn-elegant-secondary px-8 py-4 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Paste
            </Link>
          </div>

          {/* Possible Reasons */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Possible Reasons
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-elegant-purple-500 rounded-full"></div>
                Invalid paste ID or URL
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-elegant-blue-500 rounded-full"></div>
                Time-to-live (TTL) has expired
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-elegant-pink-500 rounded-full"></div>
                Maximum view count reached
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-elegant-purple-500 rounded-full"></div>
                Paste was manually deleted
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
