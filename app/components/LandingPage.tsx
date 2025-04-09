import * as React from 'react';

'use client';

import { useState } from 'react';
import HidePanel from './HidePanel';
import RevealPanel from './RevealPanel';
import InfoSection from './InfoSection';

// Define the available tabs
type TabType = 'hide' | 'reveal' | 'info';

const LandingPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabType>('hide');
  
  // Define tabs with their properties
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'hide',
      label: 'Hide Message',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: 'reveal',
      label: 'Reveal Message',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'info',
      label: 'About',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 px-4 py-6 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <svg 
                  className="w-8 h-8 mr-3 text-purple-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
                StegCloak
              </h1>
              <p className="text-gray-300 mt-1">
                Hide secret messages within ordinary text using steganography
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-t border-gray-700 shadow-sm">
        <div className="max-w-5xl mx-auto">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="flex-grow py-8">
        {activeTab === 'hide' && <HidePanel />}
        {activeTab === 'reveal' && <RevealPanel />}
        {activeTab === 'info' && <InfoSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-4 border-t border-gray-700">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between text-gray-400">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} StegCloak Dark Mode Frontend. All rights reserved.
            </p>
            <p className="text-xs mt-1">
              Built with Next.js and Tailwind CSS. Powered by the StegCloak library.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <a 
              href="https://en.wikipedia.org/wiki/Steganography" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              About Steganography
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

