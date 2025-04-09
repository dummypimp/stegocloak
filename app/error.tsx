'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// Error boundary for client-side errors
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-red-900/20 p-4 mb-5">
            <svg 
              className="h-10 w-10 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          
          <p className="text-gray-300 mb-6">
            We apologize for the inconvenience. An unexpected error occurred while processing your request.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-gray-900 border border-gray-700 rounded-md p-4 mb-6 w-full overflow-auto">
              <p className="text-red-400 font-mono text-sm break-all">
                {error.message}
                {error.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-gray-400 text-xs">
                      Stack trace
                    </summary>
                    <pre className="mt-2 text-xs whitespace-pre-wrap">
                      {error.stack.split('\n').slice(1).join('\n')}
                    </pre>
                  </details>
                )}
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={reset}
              className="btn-primary flex-1 flex items-center justify-center"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
              Try Again
            </button>
            
            <Link href="/" className="btn-secondary flex-1 flex items-center justify-center">
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
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        Error ID: {error.digest ?? 'unknown'}
      </p>
    </div>
  );
}

