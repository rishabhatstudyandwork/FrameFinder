# 🎬 FrameFinder - Movie Discovery Platform

[![Visit Site](https://img.shields.io/badge/FrameFinder-red)](https://framefinderformovies.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12.2-orange)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

<img width="1024" height="1024" alt="logo" src="https://github.com/user-attachments/assets/9ec4dc3a-a4fe-4bce-9d27-9f95afe0679f" />

A **modern movie and TV show discovery platform** with **personalized recommendations**, **visual search**, and **Firebase-powered authentication**.  
Designed with a **vintage cinematic feel** using **Tailwind CSS** and **React**.

---

## Visit Site:
https://framefinderformovies.vercel.app

## ✨ Features

- 🎥 **Discover Movies & TV Shows** — Browse trending, popular, and recommended titles.
- 🔍 **Advanced Search** — Search by title, actor, or visual similarity.
- 🎬 **Trailer Integration** — Watch official trailers directly in-app.
- 🖼 **Visual Discovery** — Explore content based on screenshots and visuals.
- ❤️ **Favorites & Watchlist** — Save titles for later (stored in Firebase Firestore).
- 👤 **User Profiles** — Create accounts via Firebase Auth (Email & Google OAuth).
- 🎭 **Actor Exploration** — Click cast to explore their filmography.
- 📱 **Responsive** — Works seamlessly across devices.

---

## 🚀 Quick Start

### 1️⃣ Clone the repo
git clone [https://github.com/your-username/framefinder](https://github.com/rishabhatstudyandwork/FrameFinder)
cd framefinder

### 2️⃣ Install dependencies
npm install

### 3️⃣ Set up environment variables
cp .env.example .env.local

### .env.local:
VITE_TMDB_API_KEY=your_tmdb_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456

### 4️⃣ Start development server
npm run dev

## 🏗️ Project Structure
src/
├── components/         # Reusable components
│   ├── layout/         # Navbar, Footer, Sidebar
│   ├── ui/             # Buttons, Cards, Loaders
├── pages/              # Home, MovieDetails, Login, Signup, Favorites
├── services/           # API calls, Firebase setup
├── context/            # AuthContext for managing user state
├── assets/             # Images, icons
├── App.jsx             # Main app component
└── main.jsx            # Entry point

## 🛠️ Tech Stack
### Frontend
React — Component-based UI library
Tailwind CSS — Utility-first styling
React Router DOM — Navigation & protected routes
React Icons — Icon library
Swiper — Carousel/slider integration

## Backend & Services
Firebase Authentication — Email/Password & Google sign-in
Firebase Firestore — NoSQL database for storing favorites
TMDb API — Movie & TV data

## Build & Deploy
Vite — Fast build tool
GitHub Pages — Deployment
gh-pages — Auto-deploy script

### 📦 Deployment on GitHub Pages
Add homepage in package.json:
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"

### Install GitHub Pages:
npm install gh-pages --save-dev

###Add deploy scripts:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

### Deploy:
npm run deploy

Enable GitHub Pages in repository settings.

## 📸 Screenshots
Home Page
<img width="1919" height="928" alt="image" src="https://github.com/user-attachments/assets/98745b39-c5ec-4f57-aa0b-3af377eabc1d" />

Movie Details
<img width="1919" height="942" alt="image" src="https://github.com/user-attachments/assets/612f998e-a1a9-4d6a-a5e1-622e1eb48552" />

Login Page
<img width="959" height="472" alt="image" src="https://github.com/user-attachments/assets/b1b0f88a-fb0a-42af-a5a0-a61d03251b42" />

## 📄 License
This project is licensed under the MIT License — see the LICENSE file for details.

## 🙏 Acknowledgments
TMDb API for providing movie & TV data.

Firebase for authentication and database services.

React community for excellent tools.

All open-source contributors who make web development better ❤️
