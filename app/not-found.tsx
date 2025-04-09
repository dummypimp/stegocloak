import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-indigo-900/20 p-4 mb-5">
            <svg 
              className="h-12 w-12 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">404 - Page Not Found</h1>
          
          <p className="text-gray-300 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="w-full mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">Looking for one of these?</h2>
            <ul className="space-y-2 text-left">
              <li>
                <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/?tab=hide" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Hide Messages
                </Link>
              </li>
              <li>
                <Link href="/?tab=reveal" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Reveal Messages
                </Link>
              </li>
              <li>
                <Link href="/?tab=info" className="text-purple-400 hover:text-purple-300 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About StegCloak
                </Link>
              </li>
            </ul>
          </div>
          
          <Link 
            href="/" 
            className="btn-primary w-full flex items-center justify-center"
          >
            <svg 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        StegCloak Frontend
      </p>
    </div>
  );
}

