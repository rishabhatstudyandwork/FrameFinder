import React from 'react';
import { Link } from 'react-router-dom';

const CastCard = ({ person }) => {
  return (
    <Link 
      to={`/search?query=${encodeURIComponent(person.name)}`}
      className="block bg-neutral/50 rounded-lg p-3 hover:bg-neutral/70 transition transform hover:-translate-y-1 group"
    >
      {person.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
          alt={person.name}
          className="w-full h-48 object-cover rounded-lg mb-2"
          loading="lazy"
        />
      ) : (
        <div className="bg-gray-700 w-full h-48 rounded-lg mb-2 flex items-center justify-center">
          <span className="text-gray-400">No image</span>
        </div>
      )}
      <div className="group-hover:text-accent transition-colors">
        <h3 className="font-semibold truncate">{person.name}</h3>
        <p className="text-gray-400 text-sm truncate group-hover:text-secondary">
          {person.character}
        </p>
      </div>
      <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-1">
        {person.known_for_department && (
          <span className="bg-primary/20 px-2 py-1 rounded">
            {person.known_for_department}
          </span>
        )}
        {person.popularity && (
          <span className="bg-secondary/20 px-2 py-1 rounded">
            ★ {person.popularity.toFixed(1)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CastCard;