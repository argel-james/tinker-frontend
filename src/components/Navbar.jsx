import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import paxedsvg from '../assets/img/paxedsvg.svg';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const location = useLocation();  // Get the current location object

  return (
    <nav className="bg-white text-black dark:bg-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <a href="/kennito" className="flex items-center space-x-3">
          <img src={paxedsvg} className="h-8 rounded-full" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold">paxed</span>
        </a>

        {/* Dark Mode Toggle Button and Hamburger for Mobile */}
        <div className="flex items-center md:order-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M21 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"></path>
                <circle cx="12" cy="12" r="5"></circle>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21.5 12.5A9 9 0 0112 3.06a9 9 0 100 17.88 9 9 0 019-8.44z"></path>
              </svg>
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-gray-400 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${isDropdownOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`} id="navbar-dropdown">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 bg-gray-50 dark:bg-gray-800 md:bg-transparent dark:md:bg-transparent rounded-lg md:rounded-none">
            <li>
              <Link
                to="/kennito"
                className={`block py-2 px-3  ${
                  location.pathname === '/kennito'
                    ? 'text-blue-700 dark:text-blue-500'
                    : 'text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-500'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/busstops"
                className={`block py-2 px-3  ${
                  location.pathname === '/busstops'
                    ? 'text-blue-700 dark:text-blue-500'
                    : 'text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-500'
                }`}
              >
                Bus stops
              </Link>
            </li>
            <li>
            <Link
                to="/ntumap"
                className={`block py-2 px-3  ${
                  location.pathname === '/ntumap'
                    ? 'text-blue-700 dark:text-blue-500'
                    : 'text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-500'
                }`}
              >
                NTU Map
              </Link>
            </li>
            <li>
            <Link
                to="/search"
                className={`block py-2 px-3  ${
                  location.pathname === '/search'
                    ? 'text-blue-700 dark:text-blue-500'
                    : 'text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-500'
                }`}
              >
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
