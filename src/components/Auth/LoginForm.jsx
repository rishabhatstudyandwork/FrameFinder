// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral/80 text-white"
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />
      </div>
      
      <div className="relative">
        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral/80 text-white"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full py-2 bg-accent text-primary font-bold rounded-full hover:bg-accent/90 transition"
      >
        Sign In
      </button>
    </form>
  );
};