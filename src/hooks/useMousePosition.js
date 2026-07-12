import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to track mouse position with throttling for performance.
 * Returns current mouse position and provides a ref for the tracked element.
 * 
 * @param {number} throttleMs - Throttle interval in milliseconds
 * @returns {{ x: number, y: number, elementRef: React.RefObject }}
 */
export function useMousePosition(throttleMs = 16) {
  const position = useRef({ x: 0, y: 0 });
  const listeners = useRef(new Set());
  const lastUpdate = useRef(0);

  const subscribe = useCallback((callback) => {
    listeners.current.add(callback);
    return () => listeners.current.delete(callback);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttleMs) return;
      lastUpdate.current = now;

      position.current = { x: e.clientX, y: e.clientY };
      listeners.current.forEach((cb) => cb(position.current));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [throttleMs]);

  return { position, subscribe };
}

export default useMousePosition;
