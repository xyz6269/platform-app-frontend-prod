import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Typewriter from "../components/Typewriter";

const HomeSection = ({ isScrolled }) => {
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [typewriterKey, setTypewriterKey] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      setScrollY(scrollPosition);
      
      // Détection plus rapide et directe des vues
      if (scrollPosition < viewportHeight * 0.8) {
        // Hero view
        if (currentView !== 0) {
          setCurrentView(0);
        }
      } else if (scrollPosition < viewportHeight * 1.6) {
        // About preview
        if (currentView !== 1) {
          setCurrentView(1);
        }
      } else {
        // Au-delà, on cache complètement la HomeSection
        if (currentView !== -1) {
          setCurrentView(-1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Appel initial pour définir l'état correct
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Effet pour relancer le typewriter cycliquement
  useEffect(() => {
    if (!isHovered && currentView === 0) {
      const interval = setInterval(() => {
        setTypewriterKey(prev => prev + 1);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isHovered, currentView]);

  const handleScrollToAbout = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight * 1.8,
      behavior: 'smooth'
    });
  };

  // Calcul de l'opacité basé sur le scroll pour des transitions plus fluides
  const getViewOpacity = (viewIndex) => {
    const viewportHeight = window.innerHeight;
    
    if (viewIndex === 0) {
      // Hero view: visible jusqu'à 80% de viewport
      if (scrollY < viewportHeight * 0.6) return 1;
      if (scrollY < viewportHeight * 0.8) {
        return 1 - ((scrollY - viewportHeight * 0.6) / (viewportHeight * 0.2));
      }
      return 0;
    } else if (viewIndex === 1) {
      // About preview: visible entre 80% et 160% de viewport
      if (scrollY < viewportHeight * 0.8) return 0;
      if (scrollY < viewportHeight * 1.0) {
        return (scrollY - viewportHeight * 0.8) / (viewportHeight * 0.2);
      }
      if (scrollY < viewportHeight * 1.4) return 1;
      if (scrollY < viewportHeight * 1.6) {
        return 1 - ((scrollY - viewportHeight * 1.4) / (viewportHeight * 0.2));
      }
      return 0;
    }
    
    return 0;
  };

  // Si on est au-delà de la section, on ne rend rien pour éviter les interférences
  if (currentView === -1 || scrollY > window.innerHeight * 1.8) {
    return <div className="relative min-h-[170vh]" id="home"></div>;
  }

  return (
    <div className="relative min-h-[170vh]" id="home">
      {/* Hero View */}
      <div 
        className={`
          fixed inset-0 w-full h-screen z-[5]
          flex flex-col items-center justify-center
          transition-opacity duration-300 ease-out
          ${getViewOpacity(0) > 0 ? 'visible' : 'invisible'}
        `}
        style={{ 
          opacity: getViewOpacity(0),
          transform: `translateY(${scrollY * 0.1}px)` // Parallax subtil
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-12 pt-16 md:pt-24">
          {/* Enhanced Logo with Cyber Effects - Smaller on mobile */}
          <div className="mb-4 md:mb-8 relative scale-75 md:scale-100">
            <Logo isScrolled={isScrolled} />
            
            {/* Orbital Rings - Smaller on mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-80 lg:h-80 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-[330px] h-[330px] md:w-[550px] md:h-[550px] lg:w-96 lg:h-96 border border-cyan-400/10 rounded-full animate-spin-reverse"></div>
            </div>
          </div>

          {/* Enhanced Main Content - Adjusted spacing and text sizes for mobile */}
          <div className="text-center space-y-4 md:space-y-8 max-w-5xl mx-auto relative z-10">
            <div className="relative">
              <h1 className="
                  font-orbitron font-bold text-xl md:text-3xl lg:text-4xl
                  bg-gradient-to-r from-white via-cyan-300 to-blue-400
                  bg-clip-text text-transparent
                  tracking-wider leading-snug
                  mb-3 md:mb-4
                  relative
                  text-center
                  animate-pulse
                "
                style={{
                  textShadow: '0 0 15px rgba(0, 200, 255, 0.6), 0 0 30px rgba(0, 200, 255, 0.3)',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 200, 255, 0.4))'
                }}>
                  INNOVATION × APPLICATION
                </h1>
              
              {/* Glitch overlay effect */}
              <div className="
                absolute inset-0 opacity-0 animate-pulse
                bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent
              "></div>
            </div>
            
            {/* Enhanced Typewriter Section - Adjusted for mobile */}
            <div 
              className="
                bg-black/20 backdrop-blur-sm
                border border-cyber-blue/20 rounded-xl
                p-4 md:p-8 mx-auto max-w-4xl
                hover:border-cyber-blue/40 transition-all duration-500
                hover:shadow-2xl hover:shadow-cyber-blue/20
              "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap mb-3 md:mb-4">
                <span className="
                  font-fira text-lg md:text-3xl font-bold text-cyber-blue
                  animate-pulse
                "
                style={{ textShadow: '0 0 10px rgba(0, 170, 255, 0.6)' }}>
                  &lt;/&gt;
                </span>
                
                <div className="flex-1 text-center min-h-[40px] md:min-h-[60px] flex items-center justify-center">
                  <Typewriter
                    key={typewriterKey}
                    text="A space for curious minds to compile ideas into reality."
                    speed={60}
                    startDelay={500}
                    loop={!isHovered}
                    eraseSpeed={30}
                    eraseDelay={200}
                  />
                </div>
                
                <span className="
                  font-fira text-lg md:text-3xl font-bold text-cyber-blue
                  animate-pulse
                "
                style={{ textShadow: '0 0 10px rgba(0, 170, 255, 0.6)' }}>
                  &lt;/&gt;
                </span>
              </div>
              
              {/* Status bar - Smaller text on mobile */}
              <div className="
                flex items-center justify-center space-x-2 md:space-x-4
                font-fira text-xs text-gray-400 mt-3 md:mt-4
                flex-wrap gap-1
              ">
                <span>STATUS: <span className="text-green-400">ACTIVE</span></span>
                <span className="hidden md:inline">|</span>
                <span>MEMBERS: <span className="text-cyber-blue">∞</span></span>
                <span className="hidden md:inline">|</span>
                <span>INNOVATION: <span className="text-yellow-400">∞</span></span>
              </div>
            </div>

            {/* Call to Action - Adjusted for mobile */}
            <div className="space-y-4 md:space-y-6">
              <div className="
                inline-flex items-center space-x-2 md:space-x-3
                bg-gradient-to-r from-cyber-blue/10 to-cyan-400/10
                border border-cyber-blue/30 rounded-full
                px-4 py-2 md:px-6 md:py-3
                hover:from-cyber-blue/20 hover:to-cyan-400/20
                hover:border-cyber-blue/50
                transition-all duration-300
                cursor-pointer group
              "
              onClick={handleScrollToAbout}>
                <span className="
                  font-orbitron text-xs md:text-sm font-semibold tracking-wider
                  text-cyber-blue group-hover:text-cyan-400
                  transition-colors duration-300
                ">
                  INITIALIZE EXPLORATION
                </span>
                <div className="
                  w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] md:border-l-[8px] md:border-r-[8px] md:border-t-[8px]
                  border-l-transparent border-r-transparent border-t-cyber-blue
                  group-hover:border-t-cyan-400 transition-colors duration-300
                  animate-bounce
                "></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Preview View */}
      <div 
        className={`
          fixed inset-0 w-full h-screen z-[5]
          flex flex-col items-center justify-center
          transition-opacity duration-300 ease-out
          ${getViewOpacity(1) > 0 ? 'visible' : 'invisible'}
        `}
        style={{ 
          opacity: getViewOpacity(1),
          transform: `translateY(${(scrollY - window.innerHeight) * 0.1}px)` // Parallax pour la deuxième vue
        }}
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-12">
          {/* Animated Background Grid - Smaller on mobile */}
          <div className="
            absolute inset-0 opacity-5
            bg-[linear-gradient(90deg,rgba(0,170,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.1)_1px,transparent_1px)]
            bg-[size:40px_40px] md:bg-[size:60px_60px]
            animate-grid-move
          "></div>
        </div>
      </div>

      {/* Spacer for scroll height */}
      <div className="h-[70vh]"></div>
    </div>
  );
};

export default HomeSection;