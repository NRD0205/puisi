import React, { useMemo } from 'react';
import './Stars.css';

/**
 * Stars — Generates a field of twinkling stars across the viewport.
 * Uses CSS-only animations for performance. Each star has random
 * position, size, brightness, and animation delay.
 */
const Stars = React.memo(function Stars() {
  const stars = useMemo(() => {
    const result = [];
    const count = window.innerWidth < 768 ? 120 : 220;

    for (let i = 0; i < count; i++) {
      const size = Math.random() < 0.7 ? 1 : Math.random() < 0.9 ? 2 : 3;
      const isBlue = Math.random() < 0.2;

      result.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 75}%`, // Keep stars in upper 75%
        size,
        opacity: 0.3 + Math.random() * 0.7,
        delay: `${Math.random() * 5}s`,
        duration: `${2 + Math.random() * 3}s`,
        isBlue,
        isPulsing: Math.random() < 0.15,
      });
    }
    return result;
  }, []);

  return (
    <div className="stars-container" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.isBlue ? 'star--blue' : ''} ${star.isPulsing ? 'star--pulse' : 'star--twinkle'}`}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
});

export default Stars;
