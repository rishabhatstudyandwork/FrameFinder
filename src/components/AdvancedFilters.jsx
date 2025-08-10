// src/components/AdvancedFilters.jsx
import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const AdvancedFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: '',
    language: 'en'
  });

  const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

  return (
    <div className="mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral rounded-full"
      >
        <FaFilter /> Advanced Filters
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-neutral/50 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Filter Options</h3>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => setFilters({...filters, genre: e.target.value})}
                className="w-full p-2 rounded bg-primary border border-secondary/30"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2">Release Year</label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
                placeholder="Year"
                className="w-full p-2 rounded bg-primary border border-secondary/30"
              />
            </div>
            
            <div>
              <label className="block mb-2">Minimum Rating</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={filters.rating}
                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                placeholder="0-10"
                className="w-full p-2 rounded bg-primary border border-secondary/30"
              />
            </div>
            
            <div>
              <label className="block mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => setFilters({...filters, language: e.target.value})}
                className="w-full p-2 rounded bg-primary border border-secondary/30"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
