import React, { useRef, useState, useEffect, useCallback } from "react";
import ScrollIndicator from "../components/ScrollIndicator";
import ImageSlideshow from "../components/ImageSlideshow";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Music, Linkedin, Github  } from "lucide-react";



const SocialLinks = ({ social }) => (
  <div className="flex justify-center space-x-3 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
    <a href={social.instagram} target="_blank" className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
      <Instagram/>
    </a>
    <a href={social.linkedin} target="_blank" className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
      <Linkedin/>
    </a>
    <a href={social.github} target="_blank" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white hover:scale-110 transition-all duration-300">
      <Github/>
    </a>
  </div>
);

const AboutSection = () => {
  const teamScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const teamSectionRef = useRef(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
 


  // Animation states
  const [isVisible, setIsVisible] = useState({
    leftPanel: false,
    rightPanel: false,
    teamSection: false,
    teamHeader: false,
    teamMembers: Array(8).fill(false)
  });
  
  const momentumRef = useRef({
    lastScrollLeft: 0,
    velocity: 0,
    timestamp: Date.now(),
    animationId: null,
    isDragging: false,
    startX: 0,
    startScrollLeft: 0
  });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.3, 0.5, 0.7]
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const isIntersecting = entry.isIntersecting;
        const ratio = entry.intersectionRatio;

        if (target === leftPanelRef.current && ratio >= 0.3) {
          setIsVisible(prev => ({ ...prev, leftPanel: isIntersecting }));
        }
        
        if (target === rightPanelRef.current && ratio >= 0.2) {
          setIsVisible(prev => ({ ...prev, rightPanel: isIntersecting }));
        }
        
        if (target === teamSectionRef.current && ratio >= 0.1) {
          setIsVisible(prev => ({ ...prev, teamSection: isIntersecting }));
          
          if (isIntersecting) {
            // Animate team header first
            setTimeout(() => {
              setIsVisible(prev => ({ ...prev, teamHeader: true }));
            }, 300);
            
            // Then animate team members with staggered delay
            setTimeout(() => {
              const newTeamMembers = Array(8).fill(false);
              newTeamMembers.forEach((_, index) => {
                setTimeout(() => {
                  setIsVisible(prev => ({
                    ...prev,
                    teamMembers: prev.teamMembers.map((member, i) => 
                      i === index ? true : member
                    )
                  }));
                }, index * 150);
              });
            }, 600);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (leftPanelRef.current) observer.observe(leftPanelRef.current);
    if (rightPanelRef.current) observer.observe(rightPanelRef.current);
    if (teamSectionRef.current) observer.observe(teamSectionRef.current);

    return () => observer.disconnect();
  }, []);

 
    
  const checkScrollPosition = useCallback(() => {
    if (teamScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = teamScrollRef.current;
      const tolerance = 10;
      
      setCanScrollLeft(scrollLeft > tolerance);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - tolerance);
    }
  }, []);

  const scrollTeam = useCallback((direction) => {
    if (!teamScrollRef.current) return;

    const scrollAmount = 320;
    const currentScroll = teamScrollRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? Math.max(0, currentScroll - scrollAmount)
      : currentScroll + scrollAmount;
    
    const startScroll = currentScroll;
    const distance = targetScroll - startScroll;
    const startTime = Date.now();
    const duration = 800;
    
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      const currentPosition = startScroll + (distance * easedProgress);
      teamScrollRef.current.scrollLeft = currentPosition;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        checkScrollPosition();
      }
    };
    
    setIsScrolling(true);
    requestAnimationFrame(animateScroll);
  }, [checkScrollPosition]);

  const handleMouseMove = useCallback((e) => {
    const rect = teamScrollRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (!teamScrollRef.current) return;
    
    momentumRef.current.isDragging = true;
    momentumRef.current.startX = e.pageX - teamScrollRef.current.offsetLeft;
    momentumRef.current.startScrollLeft = teamScrollRef.current.scrollLeft;
    
    teamScrollRef.current.style.cursor = 'grabbing';
    teamScrollRef.current.style.scrollBehavior = 'auto';
    
    e.preventDefault();
  }, []);

  const handleMouseMove2 = useCallback((e) => {
    if (!momentumRef.current.isDragging || !teamScrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - teamScrollRef.current.offsetLeft;
    const walk = (x - momentumRef.current.startX) * 2;
    
    const newScrollLeft = momentumRef.current.startScrollLeft - walk;
    teamScrollRef.current.scrollLeft = newScrollLeft;
    
    const currentTime = Date.now();
    const deltaTime = currentTime - momentumRef.current.timestamp;
    const deltaScroll = newScrollLeft - momentumRef.current.lastScrollLeft;
    
    if (deltaTime > 0) {
      momentumRef.current.velocity = deltaScroll / deltaTime;
    }
    
    momentumRef.current.lastScrollLeft = newScrollLeft;
    momentumRef.current.timestamp = currentTime;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!momentumRef.current.isDragging || !teamScrollRef.current) return;
    
    momentumRef.current.isDragging = false;
    teamScrollRef.current.style.cursor = 'grab';
    teamScrollRef.current.style.scrollBehavior = 'smooth';
    
    const velocity = momentumRef.current.velocity;
    const friction = 0.95;
    const threshold = 0.1;
    
    const applyMomentum = () => {
      if (Math.abs(momentumRef.current.velocity) > threshold && teamScrollRef.current) {
        momentumRef.current.velocity *= friction;
        teamScrollRef.current.scrollLeft -= momentumRef.current.velocity * 10;
        momentumRef.current.animationId = requestAnimationFrame(applyMomentum);
      } else {
        momentumRef.current.velocity = 0;
        if (momentumRef.current.animationId) {
          cancelAnimationFrame(momentumRef.current.animationId);
        }
        checkScrollPosition();
      }
    };
    
    if (Math.abs(velocity) > threshold) {
      applyMomentum();
    }
  }, [checkScrollPosition]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft' && canScrollLeft) {
      e.preventDefault();
      scrollTeam('left');
    } else if (e.key === 'ArrowRight' && canScrollRight) {
      e.preventDefault();
      scrollTeam('right');
    }
  }, [canScrollLeft, canScrollRight, scrollTeam]);

  const snapToNearestMember = useCallback(() => {
    if (!teamScrollRef.current) return;
    
    const scrollContainer = teamScrollRef.current;
    const memberWidth = 320;
    const scrollLeft = scrollContainer.scrollLeft;
    const containerWidth = scrollContainer.clientWidth;
    const centerPosition = scrollLeft + containerWidth / 2;
    
    const nearestMemberIndex = Math.round(centerPosition / memberWidth);
    const targetScroll = nearestMemberIndex * memberWidth - containerWidth / 2 + memberWidth / 2;
    
    scrollContainer.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: 'smooth'
    });
  }, []);

  const handleScroll2 = useCallback(() => {
    checkScrollPosition();
    
    clearTimeout(window.snapTimeout);
    window.snapTimeout = setTimeout(() => {
      if (!momentumRef.current.isDragging && !isScrolling) {
        snapToNearestMember();
      }
    }, 150);
  }, [checkScrollPosition, snapToNearestMember, isScrolling]);

  useEffect(() => {
    const scrollElement = teamScrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll2);
      scrollElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove2);
      document.addEventListener('mouseup', handleMouseUp);
      scrollElement.addEventListener('mousemove', handleMouseMove);
      scrollElement.addEventListener('keydown', handleKeyDown);
      scrollElement.setAttribute('tabindex', '0');
      
      checkScrollPosition();
      
      scrollElement.style.cursor = 'grab';
      scrollElement.style.userSelect = 'none';
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll2);
        scrollElement.removeEventListener('mousedown', handleMouseDown);
        scrollElement.removeEventListener('mousemove', handleMouseMove);
        scrollElement.removeEventListener('keydown', handleKeyDown);
      }

      document.removeEventListener('mousemove', handleMouseMove2);
      document.removeEventListener('mouseup', handleMouseUp);

      const m = momentumRef.current;
      if (m && m.animationId) {
        cancelAnimationFrame(m.animationId);
      }

      clearTimeout(window.snapTimeout);
    };
  }, [handleScroll2, handleMouseDown, handleMouseMove2, handleMouseUp, handleMouseMove, handleKeyDown, checkScrollPosition]);

  return (
    <div className="
      min-h-screen relative
      bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest
      overflow-hidden
    " id="about" ref={sectionRef}>
      {/* Enhanced Cyber Grid Background */}
      <div className="
        absolute inset-0 opacity-20
        bg-[linear-gradient(90deg,rgba(0,170,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(0,170,255,0.1)_1px,transparent_1px)]
        bg-[size:50px_50px]
        animate-grid-move
      "></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/15 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/20 rounded-full animate-ping"></div>
      </div>
      
      <div className="
        relative z-10 min-h-screen
        flex flex-col lg:flex-row items-center justify-center
        px-6 md:px-12 py-12 lg:py-24
        gap-12 lg:gap-16
      ">
        {/* Left side - Enhanced Terminal with scroll animation */}
        <div 
          ref={leftPanelRef}
          className={`
            w-full max-w-lg lg:max-w-xl
          bg-gradient-to-br from-gray-900/95 to-black/95
          border border-cyan-500/40
          rounded-xl overflow-hidden
          backdrop-blur-lg
          shadow-2xl shadow-cyan-500/30
          transform hover:scale-[1.02] transition-all duration-500
          hover:shadow-cyan-500/50
          hover:border-cyan-400/60
            ${isVisible.leftPanel 
              ? 'opacity-100 translate-x-0 translate-y-0' 
              : 'opacity-0 -translate-x-20 translate-y-10'
            }
            transition-all duration-1000 ease-out
          `}
          style={{
            transitionDelay: isVisible.leftPanel ? '0ms' : '0ms'
          }}
        >
          {/* Enhanced Terminal Header */}
          <div className="
            flex items-center justify-between
            bg-gradient-to-r from-gray-800/90 to-gray-900/90
            px-4 py-3 border-b border-cyan-500/30
            backdrop-blur-sm
          ">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '0.4s'}}></div>
            </div>
            <div className="
              font-mono text-xs text-cyan-400
              bg-black/70 px-4 py-2 rounded-md
              border border-cyan-400/40
              shadow-lg shadow-cyan-400/20
            ">
              &gt; VISUAL_FEED_01.exe
            </div>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-cyber-blue/60 rounded-full animate-pulse" style={{animationDelay: `${i * 0.3}s`}}></div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Image Container */}
          <ImageSlideshow />
          
          {/* Enhanced Terminal Footer */}
          <div className="
            bg-gradient-to-r from-gray-800/90 to-gray-900/90
            px-4 py-3 border-t border-cyber-blue/30
            backdrop-blur-sm
          ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="
                  font-fira text-xs text-green-400
                  bg-black/60 px-3 py-1 rounded-md
                  border border-green-400/30
                ">
                  STATUS: CONNECTED
                </span>
                <span className="font-fira text-xs text-gray-400">
                  PROTOCOL: <span className="text-cyber-blue">AIS_v2.0</span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1 h-4 bg-gradient-to-t from-cyber-blue to-cyan-400 rounded-full
                      animate-pulse
                    `}
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      opacity: 1 - (i * 0.15)
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Enhanced Data Panel with scroll animation */}
        <div 
          ref={rightPanelRef}
          className={`
            w-full max-w-2xl
            relative
            bg-gradient-to-br from-gray-900/85 to-black/95
            border border-cyber-blue/50
            rounded-xl p-6 md:p-8
            backdrop-blur-lg
            shadow-2xl shadow-cyber-blue/30
            hover:shadow-cyber-blue/50 hover:border-cyan-400/60
            transform transition-all duration-1200 ease-out
            ${isVisible.rightPanel 
              ? 'opacity-100 translate-x-0 translate-y-0' 
              : 'opacity-0 translate-x-20 translate-y-10'
            }
          `}
          style={{
            transitionDelay: isVisible.rightPanel ? '100ms' : '0ms'
          }}
        >
          {/* Enhanced Panel Frame Effects */}
          <div className="absolute top-0 left-4 w-20 h-1 bg-gradient-to-r from-cyber-blue via-cyan-400 to-transparent rounded-full"></div>
          <div className="absolute top-4 left-0 w-1 h-20 bg-gradient-to-b from-cyber-blue via-cyan-400 to-transparent rounded-full"></div>
          <div className="absolute bottom-0 right-4 w-20 h-1 bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent rounded-full"></div>
          <div className="absolute bottom-4 right-0 w-1 h-20 bg-gradient-to-t from-cyan-400 via-purple-400 to-transparent rounded-full"></div>

          {/* Enhanced Header */}
          <div className="mb-10">
            <div className="relative mb-6">
              <h2 className="
                font-orbitron font-black text-2xl md:text-3xl lg:text-4xl
                bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
                bg-clip-text text-transparent
                mb-4
                relative
                after:content-['APPINSCIENCES_PROTOCOL']
                after:absolute after:top-0 after:left-0
                after:text-cyber-blue/15 after:animate-pulse
                after:transform after:translate-x-1 after:translate-y-1
                filter drop-shadow-lg
              "
              style={{
                textShadow: '0 0 30px rgba(0, 170, 255, 0.5)',
                filter: 'drop-shadow(0 0 20px rgba(0, 170, 255, 0.3))'
              }}>
                APPINSCIENCES_PROTOCOL
              </h2>
            </div>
            
            {/* Enhanced Data Stream */}
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-cyber-blue via-cyan-400 to-transparent"></div>
              <div className="flex space-x-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-cyber-blue to-cyan-400 animate-pulse"
                    style={{animationDelay: `${i * 0.1}s`}}
                  ></div>
                ))}
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-cyan-400 via-purple-400 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced Data Content with staggered animation */}
          <div className="space-y-8">
            {/* Foundation Block */}
            <div className={`
              bg-black/40 border border-cyan-500/30
              rounded-xl p-6
              hover:border-cyan-500/50 hover:bg-black/50
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '200ms' : '0ms'
            }}>
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-mono text-xs text-yellow-400
                  bg-yellow-400/10 px-3 py-1 rounded-full
                  border border-yellow-400/30
                ">
                  [2013.INIT]
                </span>
                <span className="
                  font-mono text-xs text-cyber-blue
                  bg-cyber-blue/10 px-3 py-1 rounded-full
                  border border-cyber-blue/30
                ">
                  FOUNDATION_PROTOCOL
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                ESTABLISHED IN 2013 AT ENSA EL JADIDA, APP IN 
                SCIENCES REPRESENTS A{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">BOLD COMMITMENT</span>{' '}
                TO INNOVATION, CREATIVITY, AND STUDENT EMPOWERMENT.
              </p>
            </div>

            {/* Evolution Block */}
            <div className={`
              bg-black/40 border border-purple-400/30
              rounded-xl p-6
              hover:border-purple-400/50 hover:bg-black/50
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-400/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '300ms' : '0ms'
            }}>
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-purple-400
                  bg-purple-400/10 px-3 py-1 rounded-full
                  border border-purple-400/30
                ">
                  [EVOLUTION.LOG]
                </span>
                <span className="
                  font-fira text-xs text-purple-300
                  bg-purple-300/10 px-3 py-1 rounded-full
                  border border-purple-300/30
                ">
                  GROWTH_MATRIX
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                WHAT STARTED AS A{' '}
                <span className="text-pink-400 font-semibold bg-pink-400/10 px-1 rounded">SHARED DESIRE</span>{' '}
                TO MAKE STUDENT LIFE MORE DYNAMIC HAS GROWN INTO A POWERHOUSE OF 
                PASSIONATE ENGINEERS DEDICATED TO{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">TURNING IDEAS INTO 
                REAL-WORLD IMPACT</span> THROUGH TECHNOLOGY.
              </p>
            </div>

            {/* Core System Block */}
            <div className={`
              bg-black/40 border border-green-400/30
              rounded-xl p-6
              hover:border-green-400/50 hover:bg-black/50
              transition-all duration-500
              hover:-translate-y-1 hover:shadow-xl hover:shadow-green-400/20
              group
              ${isVisible.rightPanel 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
              }
            `}
            style={{
              transitionDelay: isVisible.rightPanel ? '800ms' : '0ms'
            }}>
              <div className="flex items-center justify-between mb-4">
                <span className="
                  font-fira text-xs text-green-400
                  bg-green-400/10 px-3 py-1 rounded-full
                  border border-green-400/30
                ">
                  [CORE.SYSTEM]
                </span>
                <span className="
                  font-fira text-xs text-green-300
                  bg-green-300/10 px-3 py-1 rounded-full
                  border border-green-300/30
                ">
                  PRIMARY_DIRECTIVES
                </span>
              </div>
              <p className="
                font-rajdhani text-gray-300 leading-relaxed
                text-sm md:text-base
                group-hover:text-gray-200 transition-colors duration-300
              ">
                AT THE HEART OF OUR CLUB ARE{' '}
                <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-1 rounded">CREATIVE MINDS</span>{' '}
                AND COLLABORATIVE SPIRITS—DRIVING{' '}
                <span className="text-cyan-400 font-semibold bg-cyan-400/10 px-1 rounded">IMPACTFUL 
                PROJECTS</span>, ORGANIZING NATIONAL-SCALE EVENTS, AND 
                DELIVERING VALUE BEYOND THE CLASSROOM.
              </p>
            </div>
          </div>

          {/* Enhanced Footer with system info - animated */}
          <div className={`
            mt-10 pt-6 border-t border-cyber-blue/30
            transition-all duration-500
            ${isVisible.rightPanel 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
          style={{
            transitionDelay: isVisible.rightPanel ? '1000ms' : '0ms'
          }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">SYS_VER</div>
                <div className="font-orbitron text-sm text-cyber-blue font-bold">11.2.3</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">UPTIME</div>
                <div className="font-orbitron text-sm text-green-400 font-bold">∞</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">STATUS</div>
                <div className="font-orbitron text-sm text-green-400 font-bold">ACTIVE</div>
              </div>
              <div className="text-center">
                <div className="font-fira text-xs text-gray-400">MISSION</div>
                <div className="font-orbitron text-sm text-cyan-400 font-bold">∞</div>
              </div>
            </div>
            
            {/* Enhanced Progress bar */}
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div className="
                h-full bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300
                w-full animate-pulse
                shadow-lg shadow-cyber-blue/60
                relative
              ">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Executive Team Section */}
      <div ref={teamSectionRef} className={`relative z-10 py-16 md:py-24 px-6 md:px-12 transition-all duration-1000 ease-out ${isVisible.teamSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        {/* Team Header */}
        <div className={`text-center mb-20 transition-all duration-800 ease-out ${isVisible.teamHeader ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6">
            <span className="
              font-mono text-sm text-cyan-400
              bg-cyan-400/10 px-6 py-3 rounded-full
              border border-cyan-400/30
              shadow-lg shadow-cyan-400/20
            ">
              [AIS_KERNEL_OF.2025-2026]
            </span>
          </div>
          <h2 className="
            font-bold text-3xl md:text-4xl lg:text-5xl
            bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-300
            bg-clip-text text-transparent
            mb-6
            filter drop-shadow-lg
          "
          style={{
            textShadow: '0 0 40px rgba(0, 170, 255, 0.4)'
          }}>
            MEET OUR TEAM
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Enhanced Horizontal Scroll Container */}
        <div className="relative">
          <div className="
            relative overflow-hidden
            pb-8
          " 
          ref={teamScrollRef}
          style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`
          }}>
            <div className="flex space-x-8 min-w-max px-8">
              {[
                { role: "President", img: "/rim.png", name: "RIME ZOUHAIR", color: "from-red-500 to-pink-500", social: {
      instagram: "https://instagram.com/reem_kiim",
      linkedin: "https://linkedin.com/search/results/people/?q=Rime%20Zouhair", 
      github: "https://github.com/z-r125"
    }},
    { role: "Vice President", img: "/salah.png", name: "SALAH-EDDINE E-ZZAIME", color: "from-blue-500 to-cyan-500", social: {
      instagram: "https://instagram.com/salahzaim666",
      linkedin: "https://www.linkedin.com/in/salah-eddine-e-zzaime-2a0342268/", 
      github: "https://github.com/salahzaim330"
    }},
    { role: "Treasurer", img: "/zakaria.png", name: "ZAKARIA REBBAH", color: "from-green-500 to-teal-500", social: {
      instagram: "https://instagram.com/zakaria_rebbah_",
      linkedin: "https://www.linkedin.com/in/zakaria-rebbah-9bb004264", 
      github: "https://github.com/Zakaria-reb"
    }},
    { role: "General Secretary", img: "/aya.png", name: "AYA SADOQ", color: "from-blue-500 to-cyan-500", social: {
      instagram: "https://instagram.com/rime_zouhair",
      linkedin: "https://linkedin.com/search/results/people/?q=Aya%20Sadoq", 
      github: "https://github.com/ayasadoq"
    }},
    { role: "Head of Media", img: "lina.png", name: "LINA BOURDAOUI", color: "from-purple-500 to-pink-500", social: {
      instagram: "https://instagram.com/lina_bourdaoui",
      linkedin: "https://linkedin.com/search/results/people/?q=Lina%20Bourdaoui", 
      github: "https://github.com/rimezouhair"
    }},
    { role: "Head of Projects", img: "ali.png", name: "MOHAMED ALI BOULAAMAIL", color: "from-indigo-500 to-blue-500", social: {
      instagram: "https://instagram.com/ali_boulaamail",
      linkedin: "https://http://linkedin.com/in/mohamed-ali-boulaamail", 
      github: "https://github.com/xyz6269/"
    }},
    { role: "Sponsorship Manager", img: "m1.png", name: "HIBA ELMANSOURI", color: "from-orange-500 to-red-500", social: {
      instagram: "https://www.instagram.com/hi555_ba?igsh=MTF2OTdoZDVzN3Rxcg== ",
      linkedin: "https://www.linkedin.com/in/elmansouri-hiba-342a91288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", 
      github: "https://github.com/rimezouhair"
    }},
    { role: "Vice Sponsorship Manager", img: "m2.png", name: "AYA TAGHDA", color: "from-yellow-500 to-orange-500", social: {
      instagram: "https://instagram.com/rime_zouhair",
      linkedin: "https://linkedin.com/search/results/people/?q=Rime%20Zouhair", 
      github: "https://github.com/rimezouhair"
    }}
              ].map((member, index) => (
                <div 
                  key={index} 
                  className={`
                    flex-shrink-0 w-80
                    group cursor-pointer
                    transform transition-all duration-500
                    hover:scale-105 hover:-translate-y-4
                    ${isVisible.teamMembers[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-20'
                    }
                  `}
                  style={{
                    transitionDelay: isVisible.teamMembers[index] ? '0ms' : `${index * 150}ms`
                  }}
                >
                  <div className="
                    relative
                    bg-gradient-to-br from-gray-900/95 to-black/95
                    border border-cyan-500/40
                    rounded-xl p-8
                    backdrop-blur-lg
                    shadow-lg shadow-cyan-500/25
                    group-hover:shadow-2xl group-hover:shadow-cyan-400/40
                    group-hover:border-cyan-400/60
                    transition-all duration-500
                    overflow-hidden
                  ">
                    {/* Animated background gradient */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-10
                      bg-gradient-to-br ${member.color}
                      transition-opacity duration-500
                    `}></div>

                    {/* Enhanced Larger Image Container */}
                    <div className="relative mb-8 flex items-center justify-center">
                      {/* Outer Ring - Plus grand */}
                      <div className="
                        absolute inset-0 w-48 h-48 mx-auto
                        border-2 border-cyan-500/50 rounded-full
                        animate-spin
                        group-hover:border-cyan-400/70
                        transition-colors duration-300
                      "></div>
                      
                      {/* Middle Ring - Plus grand */}
                      <div className="
                        absolute inset-4 w-40 h-40 mx-auto
                        border border-cyan-500/40 rounded-full
                        animate-spin
                        group-hover:border-cyan-300/60
                        transition-colors duration-300
                      "></div>
                      
                      {/* Inner Ring - Plus grand */}
                      <div className="
                        absolute inset-8 w-32 h-32 mx-auto
                        border border-cyan-500/30 rounded-full
                        animate-spin
                        group-hover:border-cyan-200/50
                        transition-colors duration-300
                      "></div>
                      
                      {/* Enhanced Large Image Container */}
                      <div className="
                        relative w-36 h-36 mx-auto
                        rounded-full overflow-hidden
                        border-3 border-cyan-500/60
                        group-hover:border-cyan-400/80
                        transition-all duration-500
                        group-hover:scale-110
                        shadow-xl shadow-cyan-500/40
                        group-hover:shadow-2xl group-hover:shadow-cyan-400/60
                        bg-gradient-to-br from-gray-800/50 to-gray-900/80
                      ">
                        {/* Background pour images transparentes */}
                        <div className={`
                          absolute inset-0
                          bg-gradient-to-br ${member.color}
                          opacity-10 group-hover:opacity-20
                          transition-opacity duration-500
                        `}></div>
                        
                        {/* Image principale - Plus grande et mieux positionnée */}
                        <img 
                          src={`img/${member.img}`} 
                          alt={member.role} 
                          className="
                            w-full h-full object-cover object-center
                            filter contrast-110 brightness-110
                            group-hover:contrast-125 group-hover:brightness-110
                            transition-all duration-500
                            group-hover:scale-105
                            relative z-10
                          "
                          style={{
                            objectFit: 'cover',
                            objectPosition: 'center center'
                          }}
                          draggable="false"
                        />
                        
                        {/* Overlay pour améliorer le contraste */}
                        <div className="
                          absolute inset-0 z-20
                          bg-gradient-to-t from-black/20 via-transparent to-transparent
                          group-hover:from-black/10
                          transition-all duration-500
                        "></div>
                        
                        {/* Enhanced Glow Effect pour images transparentes */}
                        <div className={`
                          absolute inset-0 z-5
                          bg-gradient-to-r ${member.color} 
                          opacity-0 group-hover:opacity-30
                          blur-md
                          transition-opacity duration-500
                        `}></div>
                        
                        {/* Enhanced Scan Effect */}
                        <div className="
                          absolute inset-0 z-30
                          bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent
                          translate-x-full group-hover:animate-glitch-slide
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        "></div>
                        
                        {/* Border enhancement pour plus de clarté */}
                        <div className="
                          absolute inset-0 z-40
                          rounded-full
                          border-2 border-transparent
                          group-hover:border-cyan-400/30
                          transition-all duration-500
                        "></div>
                      </div>

                      {/* Orbital particles - Repositionnés pour la taille plus grande */}
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`
                            absolute w-3 h-3 rounded-full
                            bg-gradient-to-r ${member.color}
                            opacity-0 group-hover:opacity-80
                            transition-opacity duration-500
                            shadow-lg
                          `}
                          style={{
                            top: `${25 + Math.sin(i * 1.5) * 30}%`,
                            left: `${25 + Math.cos(i * 1.5) * 30}%`,
                            animation: `orbit ${4 + i}s linear infinite`,
                            animationPlayState: 'paused'
                          }}
                          onMouseEnter={(e) => e.target.style.animationPlayState = 'running'}
                          onMouseLeave={(e) => e.target.style.animationPlayState = 'paused'}
                        />
                      ))}
                      
                      {/* Glow effect autour de l'image */}
                      <div className={`
                        absolute inset-0 w-48 h-48 mx-auto
                        bg-gradient-to-r ${member.color}
                        opacity-0 group-hover:opacity-20
                        blur-2xl rounded-full
                        transition-opacity duration-700
                        -z-10
                      `}></div>
                    </div>
                    
                    {/* Enhanced Member Info */}
                    <div className="text-center space-y-4 relative z-10">
                      <div className="
                        font-orbitron font-bold text-lg md:text-xl
                        text-cyber-blue
                        group-hover:text-cyan-400
                        transition-colors duration-300
                        tracking-wide
                        drop-shadow-lg
                      ">
                        {member.role}
                      </div>
                      <div className="
                        font-fira font-medium text-sm md:text-base
                        text-gray-400
                        group-hover:text-gray-300
                        transition-colors duration-300
                        tracking-wider
                        bg-black/40 px-4 py-2 rounded-full
                        border border-gray-600/30
                        group-hover:border-cyan-400/40
                        group-hover:bg-black/60
                      ">
                        {member.name}
                      </div>
                      <SocialLinks social={member.social} />
                    </div>
                    
                    {/* Enhanced Hover Accent Lines */}
                    <div className="
                      absolute top-4 left-4 w-12 h-0.5
                      bg-gradient-to-r from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute top-4 left-4 w-0.5 h-12
                      bg-gradient-to-b from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-12 h-0.5
                      bg-gradient-to-l from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>
                    <div className="
                      absolute bottom-4 right-4 w-0.5 h-12
                      bg-gradient-to-t from-cyan-400 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "></div>

                    {/* Role badge */}
                    <div className="
                      absolute top-3 right-3
                      font-mono text-sm
                      bg-black/70 text-cyan-400
                      px-3 py-1 rounded-lg
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      border border-cyan-400/30
                      backdrop-blur-sm
                    ">
                      #{String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="flex items-center justify-center space-x-6 mt-12">
            <button 
              className={`
                flex items-center justify-center
                w-14 h-14 rounded-full
                border-2 transition-all duration-300
                ${!canScrollLeft || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-2xl hover:shadow-cyber-blue/60 hover:scale-110 hover:border-cyan-400'
                }
                backdrop-blur-sm
              `}
              onClick={() => scrollTeam('left')}
              disabled={!canScrollLeft || isScrolling}
              aria-label="Previous team members"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 18L9 12L15 6V18Z" />
              </svg>
            </button>
            
            <button 
              className={`
                flex items-center justify-center
                w-14 h-14 rounded-full
                border-2 transition-all duration-300
                ${!canScrollRight || isScrolling
                  ? 'border-gray-600 text-gray-600 cursor-not-allowed opacity-50'
                  : 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black hover:shadow-2xl hover:shadow-cyber-blue/60 hover:scale-110 hover:border-cyan-400'
                }
                backdrop-blur-sm
              `}
              onClick={() => scrollTeam('right')}
              disabled={!canScrollRight || isScrolling}
              aria-label="Next team members"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 18L15 12L9 6V18Z" />
              </svg>
            </button>
          </div>

          {/* Enhanced Instructions */}
          
        </div>
      </div>

      {/* CSS for orbital animation */}
      <style jsx>{`
        @keyframes orbit {
                0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
              }
              
              @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
                50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
              }
              
              @keyframes ring-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              @keyframes spin-reverse {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(-360deg); }
              }
      `}</style>
    </div>
  );
};

export default AboutSection;