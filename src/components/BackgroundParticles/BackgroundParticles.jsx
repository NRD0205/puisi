import React, { useMemo } from 'react';
import './BackgroundParticles.css';

/**
 * BackgroundParticles — Tiny white dots that slowly drift upward
 * and fade, creating a magical sparkle atmosphere.
 */
const BackgroundParticles = React.memo(function BackgroundParticles() {
  const particles = useMemo(() => {
    const count = window.innerWidth < 768 ? 25 : 40;
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        delay: `${Math.random() * 15}s`,
        duration: `${10 + Math.random() * 15}s`,
        opacity: 0.2 + Math.random() * 0.5,
        startY: `${60 + Math.random() * 40}vh`,
      });
    }
    return result;
  }, []);

  return (
    <div className="bg-particles-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="bg-particle"
          style={{
            left: p.left,
            bottom: '0',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--particle-opacity': p.opacity,
          }}
        />
      ))}
    </div>
  );
});

export default BackgroundParticles;
