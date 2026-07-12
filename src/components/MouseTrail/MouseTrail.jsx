import React, { useEffect, useRef } from 'react';
import './MouseTrail.css';

/**
 * MouseTrail — Uses HTML5 Canvas and requestAnimationFrame to draw
 * a subtle, elegant trail of glowing stars and moonlight dust as the mouse moves.
 */
function MouseTrail({ subscribe }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = -Math.random() * 0.6 - 0.2; // float upwards
        this.opacity = 1;
        this.fadeSpeed = 0.015 + Math.random() * 0.01;
        this.color = Math.random() < 0.3 ? '#7ba4cc' : '#ffffff';
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.02;
        this.isStar = Math.random() < 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;
        this.angle += this.spin;
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;

        if (this.isStar) {
          // Draw a small 4-point star
          ctx.beginPath();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -this.size * 2.2);
            ctx.rotate(Math.PI / 2);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw standard circular dust
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Subscribe to mouse position updates from the hook
    const unsubscribe = subscribe((pos) => {
      // Spawn 1-2 particles per mouse move event
      const spawnCount = Math.random() < 0.6 ? 1 : 2;
      for (let i = 0; i < spawnCount; i++) {
        // Add tiny offset around cursor
        const ox = (Math.random() - 0.5) * 6;
        const oy = (Math.random() - 0.5) * 6;
        particlesRef.current.push(new Particle(pos.x + ox, pos.y + oy));
      }

      // Limit particle count to avoid lag
      if (particlesRef.current.length > 60) {
        particlesRef.current.shift();
      }
    });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeParticles = [];
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.update();
        if (p.opacity > 0) {
          p.draw();
          activeParticles.push(p);
        }
      }
      particlesRef.current = activeParticles;

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [subscribe]);

  return <canvas ref={canvasRef} className="mouse-trail-canvas" aria-hidden="true" />;
}

export default MouseTrail;
