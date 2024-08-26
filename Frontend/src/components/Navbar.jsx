import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useToken } from '../store/tokenDistributor.jsx';

export const Navbar = () => {
  const { isLoggedIn, showAdmin } = useToken();
  const [accent, setAccent] = useState('orange'); // Default accent
  const [theme, setTheme] = useState('dark'); // Default theme
  const [showAccentDropdown, setShowAccentDropdown] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const accentRef = useRef(null);
  const themeRef = useRef(null);

  const handleAccentChange = (color) => {
    document.documentElement.classList.remove('orange', 'blue', 'red', 'green');
    document.documentElement.classList.add(color);
    setAccent(color);
    setShowAccentDropdown(false);
  };

  const handleThemeChange = (theme) => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    setTheme(theme);
    // handleAccentChange('orange'); // Reset accent color when theme changes
    setShowThemeDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (accentRef.current && !accentRef.current.contains(event.target)) {
      setShowAccentDropdown(false);
    }
    if (themeRef.current && !themeRef.current.contains(event.target)) {
      setShowThemeDropdown(false);
    }
  };

  useEffect(() => {
    console.log("navbar show admin : ", showAdmin);
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);//for cleanup, it is the only thing the useEffect hook can return
  }, []);


  

  
  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/" id='logo' aria-label='Homepage'>Gaurav Made This Website</NavLink>
        </div>

        <nav>
          <ul>
            <li><NavLink to="/" aria-label='home' className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
            {/* {
              
            ( isLoggedIn && showAdmin)?
            (<li><NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>):""
            } */}
            {isLoggedIn && showAdmin && (
                            <li><NavLink to="/admin" aria-label="Admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>
                        )}
            <li><NavLink to="/about" aria-label='About' className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink></li>
            <li><NavLink to="/service" aria-label='Services' className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink></li>
            <li><NavLink to="/contact" aria-label='Contact' className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
            {!isLoggedIn ? (
              <>
                <li><NavLink to="/register" aria-label='Register' className={({ isActive }) => (isActive ? 'active' : '')}>Register</NavLink></li>
                <li><NavLink to="/login" aria-label='Login' className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
              </>
            ) : (
              <li><NavLink to="/logout" aria-label='Logout' className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink></li>
            )}
          </ul>
        </nav>

        <div className="theme-controls">
          <div className="color-dropdown" ref={accentRef}>
            <div
              className={`dropdown-link ${showAccentDropdown ? 'open' : ''}`}
              onClick={() => setShowAccentDropdown(!showAccentDropdown)}
              aria-haspopup="true"
              aria-expanded={showAccentDropdown}
            >
              Accent Color
            </div>
            <div className={`dropdown-content color-palette ${showAccentDropdown ? 'show' : ''}`}>
              <div
                className="color-option orange"
                title="Orange"
                onClick={() => handleAccentChange('orange')}
                aria-label="Orange accent"
              />
              <div
                className="color-option blue"
                title="Blue"
                onClick={() => handleAccentChange('blue')}
                aria-label="Blue accent"
              />
              <div
                className="color-option red"
                title="Red"
                onClick={() => handleAccentChange('red')}
                aria-label="Red accent"
              />
              <div
                className="color-option green"
                title="Green"
                onClick={() => handleAccentChange('green')}
                aria-label="Green accent"

              />
            </div>
          </div>

          <div className="theme-dropdown" ref={themeRef}>
            <div
              className={`dropdown-link ${showThemeDropdown ? 'open' : ''}`}
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              
              aria-haspopup="true"
              aria-expanded={showThemeDropdown}
            >
              Theme
            </div>
            <div className={`dropdown-content theme-picker ${showThemeDropdown ? 'show' : ''}`}>
              <div
                className="theme-option light"
                title="Light Theme"
                onClick={() => handleThemeChange('light')}
                aria-label="Light theme"
              >
                Light
              </div>
              <div
                className="theme-option dark"
                title="Dark Theme"
                onClick={() => handleThemeChange('dark')}
                aria-label="Dark theme"
              >
                Dark
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
