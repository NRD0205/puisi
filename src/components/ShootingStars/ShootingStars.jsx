import React, { useState, useEffect, useCallback } from 'react';
import './ShootingStars.css';

/**
 * ShootingStars — Periodically spawns shooting stars that streak across
 * the sky every 8-15 seconds. Each shooting star has a random position
 * and angle.
 */
const ShootingStars = React.memo(function ShootingStars() {
  const [shootingStars, setShootingStars] = useState([]);

  const spawnShootingStar = useCallback(() => {
    const id = Date.now() + Math.random();
    const star = {
      id,
      left: `${10 + Math.random() * 60}%`,
      top: `${5 + Math.random() * 30}%`,
      angle: 15 + Math.random() * 30,
      duration: 0.6 + Math.random() * 0.4,
      length: 80 + Math.random() * 120,
    };

    setShootingStars((prev) => [...prev, star]);

    // Remove after animation completes
    setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== id));
    }, star.duration * 1000 + 500);
  }, []);

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 7000; // 8-15 seconds
      return setTimeout(() => {
        spawnShootingStar();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();

    return () => clearTimeout(timerId);
  }, [spawnShootingStar]);

  return (
    <div className="shooting-stars-container" aria-hidden="true">
      {shootingStars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.left,
            top: star.top,
            '--angle': `${star.angle}deg`,
            '--duration': `${star.duration}s`,
            '--length': `${star.length}px`,
          }}
        />
      ))}
    </div>
  );
});

export default ShootingStars;
