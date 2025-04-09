'use client';

import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, toggleOpen }) => {
  return (
    <div className="border border-gray-700 rounded-md mb-3 overflow-hidden">
      <button
        className="flex justify-between items-center w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-left transition-colors"
        onClick={toggleOpen}
      >
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <svg
          className={`w-5 h-5 text-purple-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-gray-850 text-gray-300">{children}</div>
      </div>
    </div>
  );
};

const InfoSection: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">About StegCloak</h2>
        
        <div className="space-y-2 mb-6">
          <p className="text-gray-300">
            StegCloak is a pure JavaScript steganography tool that helps you hide secret messages within ordinary text.
            It uses cutting-edge techniques to make your messages invisible and secure.
          </p>
        </div>

        <div className="space-y-4">
          <AccordionItem
            title="What is Steganography?"
            isOpen={openSection === 0}
            toggleOpen={() => toggleSection(0)}
          >
            <div className="space-y-3">
              <p>
                Steganography is the practice of concealing messages or information within other non-secret data or a physical object to avoid detection.
                Unlike encryption, which makes data unreadable, steganography hides the very existence of the secret message.
              </p>
              <p>
                Digital steganography commonly involves hiding information within:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Images (hiding data in pixel values)</li>
                <li>Audio files (embedding data in sound waves)</li>
                <li>Video files (concealing information in frames)</li>
                <li>Text (using invisible characters or formatting)</li>
              </ul>
              <p>
                StegCloak specializes in text steganography, using invisible Unicode characters to hide your messages within ordinary text.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            title="How StegCloak Works"
            isOpen={openSection === 1}
            toggleOpen={() => toggleSection(1)}
          >
            <div className="space-y-3">
              <p>
                StegCloak uses a three-layer approach to hide and secure your messages:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong className="text-purple-400">Invisible Characters</strong>: Your secret message is converted into binary and mapped to special Unicode characters that are invisible when rendered in browsers and messaging apps.
                </li>
                <li>
                  <strong className="text-purple-400">Encryption</strong>: Before embedding, your message can be encrypted using AES-256 algorithm with your password as the key, providing strong cryptographic security.
                </li>
                <li>
                  <strong className="text-purple-400">HMAC Integrity</strong>: An optional integrity check using HMAC ensures your message hasn't been tampered with during transmission.
                </li>
              </ol>
              <p>
                These invisible characters are then strategically inserted between the visible characters of your cover text, making the secret completely undetectable to the naked eye.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Security Features"
            isOpen={openSection === 2}
            toggleOpen={() => toggleSection(2)}
          >
            <div className="space-y-3">
              <p>
                StegCloak implements multiple layers of security to protect your hidden messages:
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="text-purple-400 font-medium">AES-256 Encryption</h4>
                  <p>
                    Your secret message is encrypted using the AES-256 algorithm, which is a military-grade encryption standard.
                    This ensures that even if someone discovers the hidden message, they cannot read it without the correct password.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium">HMAC Integrity Verification</h4>
                  <p>
                    When enabled, HMAC (Hash-based Message Authentication Code) adds an integrity check to verify that your message hasn't been modified or tampered with.
                    This provides authentication in addition to confidentiality.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-400 font-medium">Password Protection</h4>
                  <p>
                    Your password is used as the cryptographic key for both encryption and HMAC verification,
                    providing a simple yet secure way to protect your messages.
                  </p>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Usage Instructions"
            isOpen={openSection === 3}
            toggleOpen={() => toggleSection(3)}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-purple-400 font-medium">Hiding a Message</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Enter your secret message in the "Secret Message" field</li>
                  <li>Create a strong password (and remember it!)</li>
                  <li>Enter some normal text as your "Cover Text"</li>
                  <li>Choose security options (encryption and integrity)</li>
                  <li>Click "Hide Message" to generate your steganographic text</li>
                  <li>Copy the result and share it through any medium</li>
                </ol>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">Revealing a Message</h4>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Paste the steganographic text into the "Text with Hidden Message" field</li>
                  <li>Enter the password that was used to hide the message</li>
                  <li>Click "Reveal Message" to extract the hidden content</li>
                  <li>The secret message will be displayed in the result area</li>
                </ol>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Best Practices for Security"
            isOpen={openSection === 4}
            toggleOpen={() => toggleSection(4)}
          >
            <div className="space-y-3">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-purple-400">Use Strong Passwords</strong>: Choose a password that's at least 12 characters long, with a mix of letters, numbers, and symbols.
                </li>
                <li>
                  <strong className="text-purple-400">Enable Both Security Options</strong>: Always use both encryption and HMAC integrity for maximum security.
                </li>
                <li>
                  <strong className="text-purple-400">Choose Appropriate Cover Text</strong>: Use natural-sounding text that's substantially longer than your secret message.
                </li>
                <li>
                  <strong className="text-purple-400">Password Sharing</strong>: Never share the password in the same channel as the steganographic text.
                </li>
                <li>
                  <strong className="text-purple-400">Message Length</strong>: Keep your secret messages reasonably short to maintain better concealment.
                </li>
                <li>
                  <strong className="text-purple-400">Secure Environment</strong>: Ensure you're using the application in a private environment to prevent shoulder surfing.
                </li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Frequently Asked Questions"
            isOpen={openSection === 5}
            toggleOpen={() => toggleSection(5)}
          >
            <div className="space-y-4">
              <div>
                <h4 className="text-purple-400 font-medium">Is the hidden message really invisible?</h4>
                <p>
                  Yes, the message is hidden using zero-width Unicode characters that are invisible to the human eye but can be processed by computers.
                </p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">Can I use StegCloak for any text?</h4>
                <p>
                  Yes, you can hide messages in almost any text, but longer cover texts work better and provide more security.
                </p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">What happens if I forget my password?</h4>
                <p>
                  Unfortunately, there's no way to recover the hidden message without the correct password. The encryption is designed to be secure.
                </p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">Will the hidden message work in all applications?</h4>
                <p>
                  Most modern applications support Unicode characters, but some platforms might strip invisible characters or modify text formatting. Testing is recommended.
                </p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">How secure is StegCloak?</h4>
                <p>
                  With encryption and HMAC enabled, StegCloak provides strong security. However, no system is 100% secure, so consider your threat model.
                </p>
              </div>
              
              <div>
                <h4 className="text-purple-400 font-medium">Does StegCloak collect or store my messages?</h4>
                <p>
                  No, all processing happens locally in your browser. Your messages and passwords are never sent to any server.
                </p>
              </div>
            </div>
          </AccordionItem>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            StegCloak is an open-source project. Learn more by visiting the{' '}
            <a 
              href="https://github.com/KuroLabs/stegcloak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              official GitHub repository
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
