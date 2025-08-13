import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiSearch, HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePath, setActivePath] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);

      if (location.pathname === "/search") {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  const isActive = (path) => activePath === path;

  return (
    <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-secondary/15 min-h-[80px]">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="FrameFinder Logo"
            className="h-[70px] w-auto object-contain" // Increased height for better visibility
            style={{ maxWidth: "200px" }} // Constrain width to prevent overflow
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
            >
              Discover
            </Link>
            <Link
              to="/movies"
              className={`transition-colors ${
                isActive("/movies")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className={`transition-colors ${
                isActive("/tv-shows")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/visual-discovery"
              className={`transition-colors ${
                isActive("/visual-discovery")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
            >
              Visual Discovery
            </Link>
            <Link
              to="/profile"
              className={`transition-colors ${
                isActive("/profile")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
            >
              Profile
            </Link>
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search films and shows..."
              className="py-1.5 px-4 pr-10 rounded-full bg-neutral/80 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent w-64"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent"
              aria-label="Search"
            >
              <HiSearch size={20} />
            </button>
          </form>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-neutral border-t border-secondary/20 px-4 py-3 animate-scale-up mobile-menu">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search films and shows..."
              className="py-2 px-4 pr-10 rounded-full bg-primary/80 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent w-full"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-accent"
              aria-label="Search"
            >
              <HiSearch size={20} />
            </button>
          </form>

          <nav className="flex flex-col space-y-3">
            <Link
              to="/profile"
              className={`py-2 transition-colors ${
                isActive("/profile")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/"
              className={`py-2 border-b border-secondary/10 transition-colors ${
                isActive("/")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Discover
            </Link>
            <Link
              to="/movies"
              className={`py-2 border-b border-secondary/10 transition-colors ${
                isActive("/movies")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/tv-shows"
              className={`py-2 border-b border-secondary/10 transition-colors ${
                isActive("/tv-shows")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              to="/visual-discovery"
              className={`py-2 transition-colors ${
                isActive("/visual-discovery")
                  ? "text-accent font-medium"
                  : "text-gray-300 hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Visual Discovery
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
