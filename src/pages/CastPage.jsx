import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieCredits } from '../services/tmdb';
import { FaArrowLeft } from 'react-icons/fa';

const CastPage = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const credits = await getMovieCredits(id);
        setCast(credits.cast || []);
        setMovieTitle(credits.title || '');
      } catch (error) {
        console.error('Error fetching cast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [id]);

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      <p className="mt-4">Loading cast information...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link 
          to={`/movie/${id}`} 
          className="inline-flex items-center text-accent hover:underline"
        >
          <FaArrowLeft className="mr-2" />
          Back to Movie
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">
        Full Cast for {movieTitle}
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {cast.map(person => (
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
            <p className="text-gray-400 text-sm truncate">
              {person.character || 'Character not specified'}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              {person.known_for_department || 'Actor'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastPage;