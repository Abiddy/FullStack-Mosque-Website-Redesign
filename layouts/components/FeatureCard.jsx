import React, { useState } from 'react';
import activities from './activities.json';
import { motion } from 'framer-motion';

const Modal = ({ title, body, handleClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4" onClick={handleClose}>
      <div className="bg-white p-10 rounded-2xl max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-3xl font-light mb-6 text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-600 leading-relaxed font-light mb-8">{body}</p>
        <button 
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors uppercase tracking-widest text-xs" 
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const FeatureCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleExpand = (item) => {
    setModalContent({ title: item.name, body: item.readmore });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent({ title: '', body: '' });
  };

  return (
    <div className="px-4 md:px-6">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-6xl font-light text-white tracking-tight">Our Activities</h2>
      </div>
      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {activities.map((item, i) => (
          <div key={`feature-${i}`} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:bg-white/20 hover:-translate-y-2 group">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {item.icon && (
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 flex items-center justify-center p-3 md:p-4 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain transition-all duration-500"
                    />
                  </div>
                </div>
              )}
              <div className="flex-grow text-center md:text-left">
                <h5 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 group-hover:text-orange-500 transition-colors">{item.name}</h5>
                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-3 md:mb-4 line-clamp-2">{item.content}</p>
                <button
                  className="inline-flex items-center text-orange-500 font-medium text-xs md:text-sm uppercase tracking-widest hover:gap-2 transition-all duration-300"
                  onClick={() => handleExpand(item)}
                >
                  Read more <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
        <Modal
          title={modalContent.title}
          body={modalContent.body}
          handleClose={handleCloseModal}
        />
        </motion.div>
      )}
    </div>
  );
};


export default FeatureCard;
