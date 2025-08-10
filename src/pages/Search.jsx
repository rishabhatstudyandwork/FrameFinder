import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MediaGrid from '../components/MediaGrid';
import { searchMedia } from '../services/tmdb';
import { FaArrowLeft, FaSearch, FaUser } from 'react-icons/fa'; // Added FaUser

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await searchMedia(query);
        setResults(data);
      } catch (err) {
        setError('Failed to load search results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  // Filter results by type
  const peopleResults = results.filter(item => item.media_type === 'person');
  const movieResults = results.filter(item => item.media_type === 'movie');
  const tvResults = results.filter(item => item.media_type === 'tv');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-300 hover:text-accent mr-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        
        <form 
          onSubmit={handleSearchSubmit}
          className="flex-grow flex items-center bg-neutral/80 rounded-full px-4 py-2"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search movies, shows, actors..."
            className="bg-transparent border-none focus:outline-none flex-grow text-white"
          />
          <button 
            type="submit"
            className="text-gray-400 hover:text-accent p-2"
          >
            <FaSearch size={20} />
          </button>
        </form>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search Results for: "${query}"` : 'Search Movies & Shows'}
      </h1>
      
      {!query && (
        <div className="text-center py-12 text-gray-400">
          <FaSearch className="mx-auto text-4xl mb-4" />
          <p>Enter a search term to find movies, shows, and actors</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {query && (
        <div className="space-y-8">
          {/* People Results */}
          {peopleResults.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <FaUser className="text-xl mr-2 text-accent" />
                <h2 className="text-2xl font-bold">Actors & Crew</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {peopleResults.map(person => (
                  <div 
                    key={person.id}
                    className="bg-neutral/50 rounded-lg p-3 hover:bg-neutral/70 transition cursor-pointer"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(person.name)}`)}
                  >
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                        alt={person.name}
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />
                    ) : (
                      <div className="bg-gray-700 w-full h-48 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <h3 className="font-semibold truncate">{person.name}</h3>
                    <p className="text-gray-400 text-sm">Known for: {person.known_for_department}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Movie Results */}
          {movieResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Movies</h2>
              <MediaGrid items={movieResults} isLoading={loading} />
            </div>
          )}
          
          {/* TV Show Results */}
          {tvResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
              <MediaGrid items={tvResults} isLoading={loading} />
            </div>
          )}
          
          {/* No Results */}
          {results.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-400">No results found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;