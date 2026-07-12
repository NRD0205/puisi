import React, { useMemo } from 'react';
import './Clouds.css';

/**
 * Clouds — Slow-drifting semi-transparent clouds that cross the sky.
 * Each cloud is a CSS blob shape with different speed and position.
 */
const Clouds = React.memo(function Clouds() {
  const clouds = useMemo(() => [
    { id: 1, className: 'cloud cloud--1', style: { top: '8%', animationDuration: '90s' } },
    { id: 2, className: 'cloud cloud--2', style: { top: '14%', animationDuration: '120s', animationDelay: '-30s' } },
    { id: 3, className: 'cloud cloud--3', style: { top: '20%', animationDuration: '100s', animationDelay: '-60s' } },
    { id: 4, className: 'cloud cloud--4', style: { top: '6%', animationDuration: '110s', animationDelay: '-45s' } },
    { id: 5, className: 'cloud cloud--5', style: { top: '25%', animationDuration: '80s', animationDelay: '-20s' } },
  ], []);

  return (
    <div className="clouds-container" aria-hidden="true">
      {clouds.map((cloud) => (
        <div key={cloud.id} className={cloud.className} style={cloud.style}>
          <div className="cloud-blob cloud-blob--main" />
          <div className="cloud-blob cloud-blob--left" />
          <div className="cloud-blob cloud-blob--right" />
        </div>
      ))}
    </div>
  );
});

export default Clouds;
