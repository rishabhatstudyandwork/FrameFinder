import React from 'react';

const MediaFilter = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full transition-all ${
            activeFilter === filter.id
              ? 'bg-accent text-primary font-medium'
              : 'bg-neutral hover:bg-neutral/80 text-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default MediaFilter;