import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const zelleEmail = "iit@torrancemasjid.org";

  const copyToClipboard = () => {
    // Try the modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(zelleEmail).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback for mobile browsers
      const textArea = document.createElement('textarea');
      textArea.value = zelleEmail;
      textArea.style.position = 'fixed';  // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="container mx-auto text-center text-white">
      <p className="text-4xl font-light  mb-8">Donate</p>
      <div className="text-center pl-4 pr-4 my-8">
        <p className="text-md italic font-light text-white">
          {"Those who in charity spend of their goods by night and by day, in secret and in public, have their reward with their Lord: on them shall be no fear, nor shall they grieve."}
        </p>
        <p className="text-l font-light text-white mt-2">
          - Quran (2:274)
        </p>
      </div>
      {/* <br /> */}
      <div className="flex flex-col items-center gap-4 mb-10">
   

        <div>Links provided below</div>

        <div className="w-full max-w-md relative">
          <a
            href="https://venmo.com/u/IITMasjid"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="w-full py-4 mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
            >
              <img src="images/v.png" alt="Venmo" className="mx-auto h-6" />
            </button>
          </a>

          <button
            onClick={copyToClipboard}
            className="w-full py-4 mb-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-center gap-2">
              <img src="images/zelle.png" alt="zelle" className="h-6" />
              <p className="text-xs opacity-75">{zelleEmail}</p>
              <FontAwesomeIcon 
                icon={faCopy} 
                className={`h-4 w-4 ml-2 ${copied ? 'text-green-300' : 'text-white'}`}
              />
            </div>
            {copied && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded">
                Email copied!
              </div>
            )}
          </button>

          <a href="https://www.paypal.com/paypalme/torrancemasjid" target="_blank" rel="noopener noreferrer">
            <button className="w-full py-4 mb-2 bg-yellow-100 hover:bg-yellow-200 text-white rounded-lg transition-transform transform hover:scale-105">
              <img src="images/paypal.png" alt="PayPal" className="mx-auto h-6" />
            </button>
          </a>
        </div>
      </div>
      <div className="text-white text-center mb-4">
          <p className="mb-2">Donate through</p>
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-semibold">Venmo:</span> @IITMasjid
            </p>
            <p>
              <span className="font-semibold">Zelle:</span> iit@torrancemasjid.org
            </p>
            <p>
              <span className="font-semibold">PayPal:</span> torrancemasjid
            </p>
          </div>
        </div>
      {/* <p className="text-lg leading-relaxed mb-8 text-white">
        Donations through mail & check at:
      </p>
      <p className="text-lg font-md mb-4 text-white">
        Islamic Institute of Torrance <br />
        18103, Prairie Ave, Torrance, CA 90503
      </p> */}
    </div>
  );
};

export default Donate;
