import React from 'react';
import './IntroOverlay.css';

/**
 * IntroOverlay — An elegant introductory screen featuring a glowing message/letter icon.
 * Encourages the user to click to open the message.
 * This interaction triggers the poem display and un-mutes/plays the ambient music.
 */
function IntroOverlay({ onEnter, isActive }) {
  return (
    <div className={`intro-overlay ${!isActive ? 'intro-overlay--hidden' : ''}`}>
      <div className="intro-card">
        {/* Soft glowing ambient circle behind icon */}
        <div className="intro-card__glow" />

        {/* Floating Message Icon */}
        <button className="intro-button" onClick={onEnter} aria-label="Open message">
          <div className="intro-icon-wrapper">
            <svg
              className="message-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Envelope Design */}
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="icon-pulse-ring" />
          </div>
        </button>

        {/* Text descriptions */}
        <h2 className="intro-title">Sebuah Pesan Malam</h2>
        <p className="intro-subtitle">Ada pesan di bawah sinar bulan yang menantimu...</p>
        <span className="intro-prompt">Ketuk ikon untuk membuka</span>
      </div>
    </div>
  );
}

export default IntroOverlay;
