import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import BusStops from './components/BusStops';
import Search from './components/Search';
import NTUMap from './components/NTUMap';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if a dark mode preference is already saved in localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Save new preference to localStorage
      return newMode;
    });
  };

  useEffect(() => {
    // Apply dark mode class based on the state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>

      <BrowserRouter>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
        <Routes>
          <Route path='/kennito' element={<LandingPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path='/busstops' element={<BusStops />} />
          <Route path='/search' element={<Search />} />
          <Route path='/ntumap' element={<NTUMap /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
