import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Discover from "./pages/Discover";
import MovieDetail from "./pages/MovieDetail";
import ShowDetail from "./pages/ShowDetail";
import Search from "./pages/Search";
import VisualDiscovery from "./components/VisualDiscovery";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import SignupPage from "./pages/SignupPage";
import CastPage from './pages/CastPage';
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary to-neutral">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Discover />} />
            <Route path="/movie/:id/cast" element={<CastPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TVShows />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<ShowDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/visual-discovery" element={<VisualDiscovery />} />
            
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/tv/:id" element={<ShowDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
