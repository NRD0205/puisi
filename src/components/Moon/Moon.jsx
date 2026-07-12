import React from 'react';
import './Moon.css';

/**
 * Moon — A large glowing moon with multiple glow layers, 
 * realistic gradients, and a gentle floating animation.
 * Positioned near the top of the viewport as the scene's focal point.
 */
const Moon = React.memo(function Moon() {
  return (
    <div className="moon-container" aria-hidden="true">
      {/* Outermost ambient glow */}
      <div className="moon-glow moon-glow--ambient" />
      {/* Mid glow ring */}
      <div className="moon-glow moon-glow--mid" />
      {/* Inner halo */}
      <div className="moon-glow moon-glow--inner" />
      {/* Moon surface */}
      <div className="moon-surface">
        {/* Surface details / craters */}
        <div className="moon-crater moon-crater--1" />
        <div className="moon-crater moon-crater--2" />
        <div className="moon-crater moon-crater--3" />
      </div>
    </div>
  );
});

export default Moon;
