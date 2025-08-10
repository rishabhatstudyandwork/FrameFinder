// src/components/TrailerPlayer.jsx
import React, { useState, useEffect } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

const TrailerPlayer = ({ youtubeKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && setIsOpen(false);
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  if (!youtubeKey) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        aria-label="Watch trailer"
      >
        <FaPlay className="text-sm" /> Watch Trailer
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-red-500 transition p-2"
            aria-label="Close trailer"
          >
            <FaTimes />
          </button>
          
          <div className="w-full max-w-4xl aspect-video relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
              onLoad={() => setIsLoading(false)}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerPlayer;