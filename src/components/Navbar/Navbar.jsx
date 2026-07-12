import React, { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Navbar — Minimal, elegant navigation bar.
 * Left: "Moonlit Poetry" logo in Cinzel font.
 * Right: Navigation links with smooth scroll.
 * Background blurs on scroll.
 */
function Navbar({ onToggleMusic, isMusicPlaying }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      {/* Logo */}
      <a
        href="#home"
        className="navbar__logo"
        onClick={(e) => handleNavClick(e, 'home')}
      >
        <span className="navbar__logo-icon">☽</span>
        <span className="navbar__logo-text">Moonlit Poetry</span>
      </a>

      {/* Mobile hamburger */}
      <button
        className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Navigation links */}
      <div className={`navbar__links ${isMobileMenuOpen ? 'navbar__links--open' : ''}`}>
        <a
          href="#home"
          className="navbar__link"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          Home
        </a>
        <a
          href="#poem"
          className="navbar__link"
          onClick={(e) => handleNavClick(e, 'poem')}
        >
          Poem
        </a>
        <a
          href="#about"
          className="navbar__link"
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About
        </a>
        <button
          className={`navbar__link navbar__link--music ${isMusicPlaying ? 'navbar__link--active' : ''}`}
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
        >
          <span className="navbar__music-icon">{isMusicPlaying ? '♫' : '♪'}</span>
          Music
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
