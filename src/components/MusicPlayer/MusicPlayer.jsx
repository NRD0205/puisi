import React, { useRef, useState, useEffect, useCallback } from 'react';
import './MusicPlayer.css';

/**
 * MusicPlayer — A floating ambient music controller.
 * Uses a royalty-free piano ambient track.
 * Features: play/pause, volume slider, glow when playing.
 * Respects browser autoplay policies by requiring user click.
 */
function MusicPlayer({ isPlaying, onToggle }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // A royalty-free ambient piano track
  const audioSrc = '/song.mp3';

  // Autoplay as muted, then unmute on first click/interaction anywhere
  useEffect(() => {
    const handleUnmute = () => {
      setIsMuted(false);
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleUnmute);
      window.removeEventListener('touchstart', handleUnmute);
      window.removeEventListener('keydown', handleUnmute);
    };

    window.addEventListener('click', handleUnmute);
    window.addEventListener('touchstart', handleUnmute);
    window.addEventListener('keydown', handleUnmute);

    return () => removeListeners();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    const handleCanPlay = () => setIsLoaded(true);
    audio.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // If play fails, toggle off state
        onToggle();
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, onToggle]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleVolumeChange = useCallback((e) => {
    setVolume(parseFloat(e.target.value));
  }, []);

  const handlePlayToggle = () => {
    setIsMuted(false); // Make sure it is unmuted when manually toggled
    onToggle();
  };

  return (
    <div
      className={`music-player ${isPlaying ? 'music-player--playing' : ''}`}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        autoPlay
        muted={isMuted}
      />

      {/* Volume slider (shows on hover) */}
      <div className={`music-player__volume ${showVolume ? 'music-player__volume--visible' : ''}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="music-player__slider"
          aria-label="Volume"
        />
      </div>

      {/* Play/Pause button */}
      <button
        className="music-player__btn"
        onClick={handlePlayToggle}
        aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-player__icon">
          {isPlaying ? (
            /* Pause icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>

        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <span className="music-player__ring music-player__ring--1" />
            <span className="music-player__ring music-player__ring--2" />
          </>
        )}
      </button>
    </div>
  );
}

export default MusicPlayer;
