// src/components/WatchlistButton.jsx
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const WatchlistButton = ({ mediaId, mediaType }) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    // Save to localStorage or database
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <button 
      onClick={toggleWatchlist}
      className={`p-2 rounded-full ${isInWatchlist ? 'text-accent' : 'text-gray-300'}`}
      aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isInWatchlist ? <FaBookmark size={24} /> : <FaRegBookmark size={24} />}
    </button>
  );
};