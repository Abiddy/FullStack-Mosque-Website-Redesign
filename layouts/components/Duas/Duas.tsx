import React, { useState } from 'react';
import { motion } from 'framer-motion';
import duas from './duas.json'; // Assume the JSON data is saved in this file

const DuaComponent = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleButtonClick = (emotion: any) => {
    setSelectedEmotion(emotion);
  };

  return 
    // <div className="container mx-auto p-4">
    //                 <div className="flex items-center justify-center mb-8">
    //     <img src="/images/open-hands.png" alt="Logo" style={{ height: '4rem', width: 'auto' }} />
    //   </div>
    //   <div className="text-center">
    //   <h2 className=" font-light  mb-8">Duas</h2>
    //   </div>
    //   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    //     {Object.keys(duas)?.map((emotion) => (
    //       <motion.button
    //         key={emotion}
    //         whileHover={{ scale: 1.1 }}
    //         whileTap={{ scale: 0.9 }}
    //         onClick={() => handleButtonClick(emotion)}
    //         className="p-2 bg-blue-500 text-white rounded-lg shadow-lg"
    //       >
    //         {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
    //       </motion.button>
    //     ))}
    //   </div>
    //   {selectedEmotion && (
    //     <motion.div
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="mt-4 p-4 bg-white rounded-lg shadow-lg"
    //     >
    //       {duas[selectedEmotion].map((dua, index) => (
    //         <div key={index} className="mb-4">
    //           <p className="text-xl mb-2">{dua.arabic}</p>
    //           <p>{dua.translation}</p>
    //         </div>
    //       ))}
    //     </motion.div>
    //   )}
    // </div>
  
};

export default DuaComponent;
