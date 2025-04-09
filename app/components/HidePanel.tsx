'use client';

import { useState, useEffect } from 'react';
import stegCloakService from '../services/stegcloakService';
import { 
  ErrorCode, 
  handleError, 
  validateRequiredFields, 
  mapStegCloakError
} from '../utils/errorHandling';
const HidePanel = () => {
  // Form state
  const [secret, setSecret] = useState('');
  const [password, setPassword] = useState('');
  const [coverText, setCoverText] = useState('');
  
  // Option toggles
  const [useEncryption, setUseEncryption] = useState(true);
  const [useIntegrity, setUseIntegrity] = useState(true);
  
  // Result state
  const [stegoText, setStegoText] = useState('');
  const [copied, setCopied] = useState(false);
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset copied state after a delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setStegoText('');
    setLoading(true);
    
    try {
      // Validate inputs
      const validationError = validateRequiredFields({
        'Secret message': secret,
        'Password': password,
        'Cover text': coverText
      });
      
      if (validationError) {
        setError(validationError.message);
        return;
      }
      
      // Process with StegCloak service
      const result = stegCloakService.hide(
        secret,
        password,
        coverText,
        { encrypt: useEncryption, integrity: useIntegrity }
      );
      
      if (result.success && result.data) {
        setStegoText(result.data);
      } else {
        const errorCode = result.error ? mapStegCloakError(result.error) : ErrorCode.UNKNOWN_ERROR;
        setError(handleError({ code: errorCode, message: result.error || 'Failed to hide message' }));
      }
    } catch (err) {
      setError(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (stegoText) {
      navigator.clipboard.writeText(stegoText)
        .then(() => setCopied(true))
        .catch(() => setError('Failed to copy to clipboard.'));
    }
  };

  if (!isClient) {
    // Server-side or during initial render
    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <div className="w-full max-w-md">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-700 rounded"></div>
            <div className="h-32 bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Hide Secret Message</h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Secret Message Input */}
          <div>
            <label htmlFor="secret" className="block text-sm font-medium text-gray-300 mb-2">
              Secret Message
            </label>
            <textarea
              id="secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
              placeholder="Enter your secret message here..."
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
              placeholder="Enter password for encryption"
            />
          </div>
          
          {/* Cover Text Input */}
          <div>
            <label htmlFor="coverText" className="block text-sm font-medium text-gray-300 mb-2">
              Cover Text
            </label>
            <textarea
              id="coverText"
              value={coverText}
              onChange={(e) => setCoverText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-white"
              placeholder="Enter cover text where the secret will be hidden..."
            />
          </div>
          
          {/* Options */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="encryption"
                checked={useEncryption}
                onChange={(e) => setUseEncryption(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="encryption" className="ml-2 block text-sm text-gray-300">
                Use Encryption
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="integrity"
                checked={useIntegrity}
                onChange={(e) => setUseIntegrity(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
              />
              <label htmlFor="integrity" className="ml-2 block text-sm text-gray-300">
                Use HMAC (Integrity Check)
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Hide Message'}
            </button>
          </div>
        </form>
        
        {/* Result Section */}
        {stegoText && (
          <div className="mt-8 p-4 border border-gray-600 rounded-md bg-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-white">Result</h3>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-1 border border-gray-600 text-sm leading-5 font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-green-400 break-words" style={{ wordWrap: 'break-word' }}>
                {stegoText}
              </p>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Share this text. The hidden message can only be revealed with the correct password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HidePanel;

