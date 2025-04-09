'use client';

import React, { useState, useEffect } from 'react';
import HidePanel from './HidePanel';
import RevealPanel from './RevealPanel';
import InfoSection from './InfoSection';

type TabType = 'hide' | 'reveal' | 'info';

const NavLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('hide');
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to allow for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle tab clicks
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  // If not mounted yet, render a skeleton to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-800"></div>
          <div className="max-w-7xl mx-auto">
            <div className="h-96 bg-gray-800 mt-4 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="flex items-center">
              <svg 
                className="h-8 w-8 text-purple-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
              <h1 className="text-2xl font-bold ml-2 text-white">StegCloak</h1>
            </div>
            <p className="hidden sm:block text-sm text-gray-400 ml-4">Hide Messages in Plain Text</p>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex">
            <TabButton 
              isActive={activeTab === 'hide'} 
              onClick={() => handleTabClick('hide')}
              icon={
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              }
            >
              Hide
            </TabButton>
            
            <TabButton 
              isActive={activeTab === 'reveal'} 
              onClick={() => handleTabClick('reveal')}
              icon={
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            >
              Reveal
            </TabButton>
            
            <TabButton 
              isActive={activeTab === 'info'} 
              onClick={() => handleTabClick('info')}
              icon={
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            >
              Info
            </TabButton>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-10">
        {activeTab === 'hide' && <HidePanel />}
        {activeTab === 'reveal' && <RevealPanel />}
        {activeTab === 'info' && <InfoSection />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 px-6 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} StegCloak Frontend. Secure message hiding using invisible characters.</p>
          <div className="mt-2">
            <a 
              href="https://github.com/KuroLabs/stegcloak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Tab Button Component
interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 mx-1 rounded-md transition-colors ${
        isActive 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default NavLayout;

