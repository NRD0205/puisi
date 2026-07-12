import React, { useMemo } from 'react';
import './Fireflies.css';

/**
 * Fireflies — Small glowing dots that wander organically near the
 * lower portion of the screen, creating a magical atmosphere.
 * CSS-only animations with random paths.
 */
const Fireflies = React.memo(function Fireflies() {
  const fireflies = useMemo(() => {
    const count = window.innerWidth < 768 ? 12 : 20;
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        top: `${40 + Math.random() * 50}%`,
        size: 3 + Math.random() * 3,
        delay: `${Math.random() * 8}s`,
        driftDuration: `${6 + Math.random() * 8}s`,
        glowDuration: `${2 + Math.random() * 3}s`,
        // Random drift offsets via CSS custom properties
        driftX: `${-30 + Math.random() * 60}px`,
        driftY: `${-20 + Math.random() * 40}px`,
        driftX2: `${-40 + Math.random() * 80}px`,
        driftY2: `${-30 + Math.random() * 60}px`,
      });
    }
    return result;
  }, []);

  return (
    <div className="fireflies-container" aria-hidden="true">
      {fireflies.map((ff) => (
        <div
          key={ff.id}
          className="firefly"
          style={{
            left: ff.left,
            top: ff.top,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
            animationDelay: ff.delay,
            '--drift-duration': ff.driftDuration,
            '--glow-duration': ff.glowDuration,
            '--drift-x': ff.driftX,
            '--drift-y': ff.driftY,
            '--drift-x2': ff.driftX2,
            '--drift-y2': ff.driftY2,
          }}
        />
      ))}
    </div>
  );
});

export default Fireflies;
