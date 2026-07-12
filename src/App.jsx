import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

// Custom Hooks
import useMousePosition from './hooks/useMousePosition';

// Background Components
import Stars from './components/Stars/Stars';
import ShootingStars from './components/ShootingStars/ShootingStars';
import Moon from './components/Moon/Moon';
import Clouds from './components/Clouds/Clouds';
import Fireflies from './components/Fireflies/Fireflies';
import BackgroundParticles from './components/BackgroundParticles/BackgroundParticles';

// Foreground & Content Components
import Navbar from './components/Navbar/Navbar';
import PoemCard from './components/PoemCard/PoemCard';
import FlowerField from './components/FlowerField/FlowerField';
import FloatingPetals from './components/FloatingPetals/FloatingPetals';
import MouseTrail from './components/MouseTrail/MouseTrail';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import Footer from './components/Footer/Footer';
import IntroOverlay from './components/IntroOverlay/IntroOverlay';

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [renderIntro, setRenderIntro] = useState(true);
  const { subscribe } = useMousePosition();

  const handleEnter = useCallback(() => {
    setIsIntroActive(false);
    setIsMusicPlaying(true);
    // Unmount overlay after the 1-second CSS fade animation completes
    setTimeout(() => {
      setRenderIntro(false);
    }, 1000);
  }, []);

  const handleToggleMusic = useCallback(() => {
    setIsMusicPlaying((prev) => !prev);
  }, []);

  return (
    <div className="app-shell" id="home">
      {/* 1. Celestial background layers */}
      <Stars />
      <ShootingStars />
      <Moon />
      <Clouds />
      <BackgroundParticles />
      <Fireflies />

      {/* 2. UI / Navigation Layer */}
      <div className={isIntroActive ? 'element--hidden' : 'element--visible'}>
        <Navbar
          onToggleMusic={handleToggleMusic}
          isMusicPlaying={isMusicPlaying}
        />
      </div>

      {/* 3. Main content (poem scroll) */}
      <main className={`main-content ${isIntroActive ? 'main-content--hidden' : 'main-content--visible'}`}>
        <PoemCard />
      </main>

      {/* 4. Foreground nature layer (anchored to bottom) */}
      <FlowerField />
      <FloatingPetals />

      {/* 5. Interactive controls & mouse feedback */}
      <MusicPlayer isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />
      <MouseTrail subscribe={subscribe} />

      {/* 6. Footer section */}
      <div className={isIntroActive ? 'element--hidden' : 'element--visible'}>
        <Footer />
      </div>

      {/* 7. Introductory Animation Screen */}
      {renderIntro && (
        <IntroOverlay onEnter={handleEnter} isActive={isIntroActive} />
      )}
    </div>
  );
}

export default App;
