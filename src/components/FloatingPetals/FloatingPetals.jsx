import React, { useMemo } from 'react';
import './FloatingPetals.css';

/**
 * FloatingPetals — Delicate flower petals that drift across the screen,
 * rotating and falling gently like wind-blown blossoms.
 */
const FloatingPetals = React.memo(function FloatingPetals() {
  const petals = useMemo(() => {
    const count = window.innerWidth < 768 ? 6 : 10;
    const colors = [
      'rgba(244, 160, 181, 0.6)',  // pink
      'rgba(240, 240, 240, 0.5)',  // white
      'rgba(196, 168, 224, 0.5)',  // lavender
      'rgba(160, 200, 240, 0.4)',  // light blue
      'rgba(232, 120, 138, 0.5)',  // rose
    ];
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        delay: `${Math.random() * 20}s`,
        duration: `${15 + Math.random() * 15}s`,
        driftX: `${-100 + Math.random() * 200}px`,
        rotateEnd: `${360 + Math.random() * 360}deg`,
      });
    }
    return result;
  }, []);

  return (
    <div className="floating-petals-container" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="floating-petal"
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            background: petal.color,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            '--drift-x': petal.driftX,
            '--rotate-end': petal.rotateEnd,
          }}
        />
      ))}
    </div>
  );
});

export default FloatingPetals;
