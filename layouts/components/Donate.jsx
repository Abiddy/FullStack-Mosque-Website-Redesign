import React, { useState } from 'react';

const Donate = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = 'iit@torrancemasjid.org';
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Hide the message after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="container mx-auto text-center text-white">
      <p className="text-4xl font-light  mb-8">Donate</p>
      <div className="text-center pl-4 pr-4 my-8">
        <p className="text-md italic font-light text-white">
          {"Those who in charity spend of their goods by night and by day, in secret and in public, have their reward with their Lord: on them shall be no fear, nor shall they grieve."}
        </p>
        <p className="text-sm font-light text-white mt-2">
          - Quran (2:274)
        </p>
      </div>
      <br />
      <div className="flex flex-col items-center gap-4 mb-10">
        {/* <h2 className="text-xl font-semibold mb-2 text-white">Donate with</h2> */}

        <div className="w-full max-w-md relative">
          <button
            onClick={copyToClipboard}
            className="w-full py-4 mb-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            <img src="images/v.png" alt="Venmo" className="mx-auto h-6" />
          </button>
          {copied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded-lg shadow-lg">
              iit@torrancemasjid.org copied!
            </div>
          )}
          <button
            onClick={copyToClipboard}
            className="w-full py-4 mb-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-transform transform hover:scale-105"
          >
            <img src="images/zelle.png" alt="zelle" className="mx-auto h-6" />
          </button>
          {copied && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded-lg shadow-lg">
              iit@torrancemasjid.org copied!
            </div>
          )}

          {/* <button className="w-full py-4 mb-2 bg-blue-100 hover:bg-blue-200 text-white rounded-lg transition-transform transform hover:scale-105">
            eCheck
          </button> */}

          <a href="https://www.paypal.com/paypalme/torrancemasjid" target="_blank" rel="noopener noreferrer">
            <button className="w-full py-4 mb-2 bg-yellow-100 hover:bg-yellow-200 text-white rounded-lg transition-transform transform hover:scale-105">
              <img src="images/paypal.png" alt="PayPal" className="mx-auto h-6" />
            </button>
          </a>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-8 text-white">
        Donations through mail & check at:
      </p>
      <p className="text-lg font-md mb-4 text-white">
        Islamic Institute of Torrance <br />
        18103, Prairie Ave, Torrance, CA 90503
      </p>
    </div>
  );
};

export default Donate;
