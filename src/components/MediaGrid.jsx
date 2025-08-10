import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCalendarAlt, FaTv, FaFilm } from 'react-icons/fa';

const MediaCard = ({ item }) => {
  const mediaType = item.media_type || 'movie';

  return (
    <Link to={`/${mediaType}/${item.id}`} className="group">
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
        
        {/* Poster Image */}
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className="w-full aspect-[1.3/2] object-cover"
          />
        ) : item.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
            alt={item.title || item.name}
            className="w-full aspect-video object-cover"
          />
        ) : (
          <div className="bg-gray-200 dark:bg-gray-700 w-full aspect-[1.2/2] flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}

        {/* Details Overlay - Always Visible */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent transform translate-y-0 group-hover:translate-y-[-2px] transition-transform duration-300">
          <h3 className="font-bold text-white truncate">
            {item.title || item.name}
          </h3>

          {/* Rating & Year */}
          <div className="flex items-center mt-1 text-sm text-gray-300">
            <FaStar className="text-yellow-400 mr-1" />
            <span>{item.vote_average?.toFixed(1) || 'N/A'}</span>
            <span className="mx-2">•</span>
            <FaCalendarAlt className="mr-1" />
            <span>
              {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'N/A'}
            </span>
          </div>

          {/* Media Type */}
          {mediaType === 'tv' && (
            <div className="flex items-center mt-1 text-sm text-gray-300">
              <FaTv className="mr-1" />
              <span>TV Series</span>
            </div>
          )}
          {mediaType === 'movie' && (
            <div className="flex items-center mt-1 text-sm text-gray-300">
              <FaFilm className="mr-1" />
              <span>Movie</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

const MediaGrid = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-xl aspect-[2/3]" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mt-1 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-xl">No results found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <MediaCard key={`${item.id}-${item.media_type}`} item={item} />
      ))}
    </div>
  );
};

export default MediaGrid;