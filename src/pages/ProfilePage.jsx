import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaSave, FaSignOutAlt, FaBookmark, FaHistory } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, logout, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to log out');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    if (promises.length === 0) {
      return setError('No changes to update');
    }

    try {
      setLoading(true);
      await Promise.all(promises);
      setSuccess('Account updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Failed to update account: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-neutral/50 rounded-xl p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mb-4">
              <FaUser className="text-4xl text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{currentUser.email}</h2>
          </div>
          
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'account' 
                  ? 'bg-accent text-primary font-medium' 
                  : 'text-gray-300 hover:bg-neutral/70'
              }`}
            >
              Account Settings
            </button>
            
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'watchlist' 
                  ? 'bg-accent text-primary font-medium' 
                  : 'text-gray-300 hover:bg-neutral/70'
              }`}
            >
              My Watchlist
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                activeTab === 'history' 
                  ? 'bg-accent text-primary font-medium' 
                  : 'text-gray-300 hover:bg-neutral/70'
              }`}
            >
              Viewing History
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/30 hover:text-red-400 transition flex items-center gap-2"
            >
              <FaSignOutAlt /> Log Out
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="w-full md:w-3/4 bg-neutral/50 rounded-xl p-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}
          
          {/* Account Settings */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaUser /> Account Settings
              </h2>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    ref={emailRef}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary border border-secondary/30 text-white"
                    required
                  />
                </div>
                
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="New Password (leave blank to keep current)"
                    ref={passwordRef}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary border border-secondary/30 text-white"
                  />
                </div>
                
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    ref={passwordConfirmRef}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-primary border border-secondary/30 text-white"
                  />
                </div>
                
                <button
                  disabled={loading}
                  type="submit"
                  className="px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent/90 transition disabled:opacity-50 flex items-center gap-2"
                >
                  <FaSave /> Update Account
                </button>
              </form>
            </div>
          )}
          
          {/* Watchlist */}
          {activeTab === 'watchlist' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaBookmark /> My Watchlist
              </h2>
              
              <div className="text-center py-12 text-gray-400">
                <FaBookmark className="mx-auto text-4xl mb-4" />
                <p className="mb-4">Your watchlist is currently empty</p>
                <Link 
                  to="/" 
                  className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                >
                  Browse Movies
                </Link>
              </div>
              
              {/* Watchlist items would be displayed here */}
            </div>
          )}
          
          {/* Viewing History */}
          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaHistory /> Viewing History
              </h2>
              
              <div className="text-center py-12 text-gray-400">
                <FaHistory className="mx-auto text-4xl mb-4" />
                <p>Your viewing history will appear here</p>
              </div>
              
              {/* Viewing history items would be displayed here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;