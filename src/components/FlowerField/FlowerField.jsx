import React, { useMemo } from 'react';
import './FlowerField.css';

/**
 * FlowerField — A lush meadow of colorful flowers and swaying grass
 * at the bottom of the viewport. Creates the feeling of sitting in
 * a flower garden under the moonlight.
 */
const FlowerField = React.memo(function FlowerField() {
  // Generate grass blades
  const grassBlades = useMemo(() => {
    const count = window.innerWidth < 768 ? 60 : 100;
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: `grass-${i}`,
        left: `${(i / count) * 100}%`,
        height: 25 + Math.random() * 35,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
        skew: -5 + Math.random() * 10,
      });
    }
    return result;
  }, []);

  // Generate flowers
  const flowers = useMemo(() => {
    const count = window.innerWidth < 768 ? 20 : 35;
    const colors = [
      'var(--flower-white)',
      'var(--flower-pink)',
      'var(--flower-lavender)',
      'var(--flower-blue)',
      'var(--flower-rose)',
    ];
    const types = ['daisy', 'tulip', 'simple', 'bell', 'star'];
    const result = [];

    for (let i = 0; i < count; i++) {
      result.push({
        id: `flower-${i}`,
        left: `${2 + Math.random() * 96}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        stemHeight: 35 + Math.random() * 50,
        size: 8 + Math.random() * 10,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 2}s`,
      });
    }
    return result;
  }, []);

  return (
    <div className="flower-field" aria-hidden="true">
      {/* Ground fog */}
      <div className="flower-field__fog" />

      {/* Ground surface */}
      <div className="flower-field__ground" />

      {/* Grass layer */}
      <div className="flower-field__grass">
        {grassBlades.map((blade) => (
          <div
            key={blade.id}
            className="grass-blade"
            style={{
              left: blade.left,
              height: `${blade.height}px`,
              animationDelay: blade.delay,
              animationDuration: blade.duration,
              transform: `skewX(${blade.skew}deg)`,
            }}
          />
        ))}
      </div>

      {/* Flowers layer */}
      <div className="flower-field__flowers">
        {flowers.map((flower) => (
          <div
            key={flower.id}
            className={`flower flower--${flower.type}`}
            style={{
              left: flower.left,
              '--stem-height': `${flower.stemHeight}px`,
              '--flower-color': flower.color,
              '--flower-size': `${flower.size}px`,
              animationDelay: flower.delay,
              animationDuration: flower.duration,
            }}
          >
            <div className="flower__stem" />
            <div className="flower__head">
              {flower.type === 'daisy' && (
                <>
                  <div className="petal petal--1" />
                  <div className="petal petal--2" />
                  <div className="petal petal--3" />
                  <div className="petal petal--4" />
                  <div className="petal petal--5" />
                  <div className="flower__center" />
                </>
              )}
              {flower.type === 'tulip' && <div className="tulip-cup" />}
              {flower.type === 'simple' && (
                <>
                  <div className="simple-petal simple-petal--1" />
                  <div className="simple-petal simple-petal--2" />
                  <div className="simple-petal simple-petal--3" />
                  <div className="simple-petal simple-petal--4" />
                </>
              )}
              {flower.type === 'bell' && <div className="bell-shape" />}
              {flower.type === 'star' && <div className="star-shape" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FlowerField;
