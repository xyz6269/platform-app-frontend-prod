import React, { useState } from "react";

const Navigation = ({ showHeaderLogo, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT US", id: "about" },
    { label: "ACTIVITIES", id: "activities" },
    { label: "EVENTS", id: "events" },
    { label: "MEMBERSHIP", id: "membership" },
    { label: "CONTACT", id: "contact" }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Account for fixed navigation height
      const elementTop = element.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleJoinRedirect = () => {
    window.location.href = '/soon';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavMenu = ({ className = "" }) => (
    <ul className={`flex justify-center gap-4 xl:gap-6 list-none ${className}`}>
      {menuItems.map((item, index) => (
        <li
          key={item.id}
          className={`relative group font-orbitron text-xs font-semibold tracking-[1.5px] xl:tracking-[2px] cursor-pointer transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:scale-105 ${
            activeSection === item.id 
              ? 'text-cyber-blue scale-105' 
              : 'text-white/85 hover:text-white'
          }`}
          style={{
            textShadow: activeSection === item.id 
              ? '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
              : '0 0 8px rgba(0, 170, 255, 0.15)',
            animationDelay: `${index * 0.08}s`
          }}
          onClick={() => scrollToSection(item.id)}
        >
          <span className="relative z-10 px-1 xl:px-2 py-1">{item.label}</span>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -mx-1 xl:-mx-2 -my-1"></div>
          
          {/* Active indicator */}
          {activeSection === item.id && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-6 xl:w-8 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-pulse"
                   style={{ boxShadow: '0 0 12px rgba(0, 170, 255, 0.6)' }}>
              </div>
              <div className="absolute top-0 -left-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                   style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
              <div className="absolute top-0 -right-1 w-0.5 h-0.5 bg-cyber-blue rounded-full"
                   style={{ boxShadow: '0 0 6px rgba(0, 170, 255, 0.5)' }}></div>
            </div>
          )}
          
          {/* Side dots */}
          <div className="absolute top-1/2 -left-3 xl:-left-4 w-0.5 h-0.5 bg-cyber-blue/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ transform: 'translateY(-50%)', boxShadow: '0 0 4px rgba(0, 170, 255, 0.3)' }}></div>
        </li>
      ))}
    </ul>
  );

  const JoinButton = ({ className = "" }) => (
    <div className={className}>
      <div 
        onClick={handleJoinRedirect}
        className="relative group cursor-pointer"
      >
        {/* Animated borders */}
        <div className="absolute -inset-2 border border-cyan-400/30 rounded-lg animate-pulse opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -inset-1 border border-purple-400/20 rounded-md animate-spin-slow opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Main button */}
        <div className="relative bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-lg px-4 py-2 group-hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)' }}></div>
            
            <span className="font-orbitron text-xs font-bold tracking-wider text-cyan-400 group-hover:text-white transition-colors duration-300"
                  style={{ textShadow: '0 0 12px rgba(0, 255, 255, 0.8)' }}>
              JOIN US
            </span>
            
            <div className="flex space-x-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              {[0, 0.2, 0.4].map((delay, i) => (
                <div 
                  key={i}
                  className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" 
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileMenuButton = ({ className = "" }) => (
    <div className={className}>
      <button
        onClick={toggleMobileMenu}
        className="relative w-8 h-8 flex flex-col justify-center items-center group"
        aria-label="Toggle mobile menu"
      >
        {[0, 1, 2].map((index) => (
          <div 
            key={index}
            className={`w-6 h-0.5 bg-cyber-blue transition-all duration-300 transform ${
              index === 1 ? 'mt-1' : index === 2 ? 'mt-1' : ''
            } ${
              isMobileMenuOpen 
                ? index === 0 
                  ? 'rotate-45 translate-y-1.5' 
                  : index === 1 
                    ? 'opacity-0' 
                    : '-rotate-45 -translate-y-1.5'
                : ''
            }`}
            style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}
          />
        ))}
      </button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 pt-4 pb-3 z-[100] transition-all duration-500 ease-out"
         style={{
           background: showHeaderLogo 
             ? 'linear-gradient(135deg, rgba(2, 2, 8, 0.95) 0%, rgba(10, 15, 28, 0.92) 50%, rgba(5, 5, 16, 0.95) 100%)'
             : 'transparent',
           backdropFilter: showHeaderLogo ? 'blur(16px) saturate(180%)' : 'none',
           borderBottom: showHeaderLogo ? '1px solid rgba(0, 170, 255, 0.15)' : 'none',
           boxShadow: showHeaderLogo 
             ? '0 4px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 170, 255, 0.08)'
             : 'none'
         }}>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeaderLogo ? (
          // Layout with logo when scrolled
          <div className="flex items-center justify-between">
            <a className="transition-all duration-500 ease-out opacity-100 visible scale-100 translate-x-0" href="/">
              <div className="relative flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <img 
                    src="ais_web.png" 
                    alt="AppinSciences Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain relative z-10 transition-all duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(0, 170, 255, 0.6)) drop-shadow(0 0 24px rgba(0, 170, 255, 0.3))'
                    }}
                  />
                  <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyber-blue/25 animate-spin-slow"></div>
                </div>
                
                <div className="font-orbitron text-xs sm:text-sm font-bold tracking-wider text-cyber-blue"
                     style={{
                       textShadow: '0 0 12px rgba(0, 170, 255, 0.8), 0 0 24px rgba(0, 170, 255, 0.4)'
                     }}>
                  AppInSciences
                </div>
              </div>
            </a>
            
            <NavMenu className="hidden lg:flex" />
            <JoinButton className="hidden lg:block" />
            <MobileMenuButton className="lg:hidden" />
          </div>
        ) : (
          // Centered layout when not scrolled
          <div className="flex items-center justify-center relative">
            <NavMenu className="hidden lg:flex" />
            <JoinButton className="hidden lg:block absolute right-0" />
            <MobileMenuButton className="lg:hidden absolute right-0" />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 transition-all duration-300 ease-out ${
        isMobileMenuOpen 
          ? 'opacity-100 visible pointer-events-auto' 
          : 'opacity-0 invisible pointer-events-none'
      }`}
           style={{ top: '70px' }}>
        
        {/* Background identique à la nav */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isMobileMenuOpen ? 'backdrop-blur-md' : ''
          }`}
          style={{
            background: isMobileMenuOpen 
              ? 'linear-gradient(135deg, rgba(2, 2, 8, 0.95) 0%, rgba(10, 15, 28, 0.92) 50%, rgba(5, 5, 16, 0.95) 100%)'
              : 'transparent'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className={`relative z-10 transition-all duration-300 transform ${
          isMobileMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-4 opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(2, 2, 8, 0.95) 0%, rgba(10, 15, 28, 0.92) 50%, rgba(5, 5, 16, 0.95) 100%)',
          backdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 170, 255, 0.15)',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 170, 255, 0.08)'
        }}>
          
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`relative group cursor-pointer transition-all duration-300 ease-out transform hover:scale-105 ${
                    activeSection === item.id 
                      ? 'text-cyber-blue' 
                      : 'text-white/85 hover:text-white'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animation: isMobileMenuOpen ? `slideInFromRight 0.3s ease-out ${index * 0.05}s both` : 'none'
                  }}
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="bg-black/20 border border-cyber-blue/20 rounded-lg p-4 backdrop-blur-sm hover:border-cyber-blue/40 hover:bg-black/30 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-orbitron text-sm font-semibold tracking-[2px]"
                            style={{
                              textShadow: activeSection === item.id 
                                ? '0 0 12px rgba(0, 170, 255, 0.8)' 
                                : '0 0 8px rgba(0, 170, 255, 0.2)'
                            }}>
                        {item.label}
                      </span>
                      
                      {activeSection === item.id && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"
                               style={{ boxShadow: '0 0 8px rgba(0, 170, 255, 0.6)' }}></div>
                          <span className="font-fira text-xs text-cyber-blue/70 tracking-wider">
                            ACTIVE
                          </span>
                        </div>
                      )}
                      
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyber-blue opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile Join Button */}
            <div className="mt-6">
              <div 
                onClick={handleJoinRedirect}
                className="relative group cursor-pointer"
              >
                <div className="bg-black/30 border-2 border-cyan-400/40 rounded-xl p-4 backdrop-blur-sm hover:border-purple-400/60 hover:bg-black/40 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 border-2 border-cyan-400/60 rounded-lg flex items-center justify-center group-hover:border-purple-400/80 transition-colors duration-300">
                        <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"
                             style={{ boxShadow: '0 0 12px rgba(0, 255, 255, 0.8)' }}></div>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="font-orbitron text-sm font-bold tracking-widest text-cyan-400 group-hover:text-purple-400 transition-colors duration-300"
                              style={{ textShadow: '0 0 12px rgba(0, 255, 255, 0.8)' }}>
                          JOIN COMMUNITY
                        </span>
                        <span className="font-fira text-xs text-cyan-400/60 group-hover:text-purple-400/60 transition-colors duration-300">
                          [INITIALIZE_ACCESS]
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[0, 0.2].map((delay, i) => (
                        <div 
                          key={i}
                          className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" 
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Footer */}
          <div className="px-4 pb-6">
            <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-4 text-xs font-fira">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-cyber-blue">STATUS: <span className="text-green-400">ONLINE</span></span>
                </div>
                <div className="w-px h-4 bg-cyber-blue/30"></div>
                <span className="text-cyber-blue/70">
                  SECTION: <span className="text-cyber-blue">{activeSection.toUpperCase()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      {showHeaderLogo && (
        <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyber-blue rounded-full animate-pulse"
              style={{ 
                left: `${25 + (i * 15)}%`,
                top: `${40 + Math.sin(i) * 20}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
                boxShadow: '0 0 8px rgba(0, 170, 255, 0.4)',
                opacity: 0.2 + (i * 0.1)
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-8px) scale(1.1); 
            opacity: 0.6;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(20px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .text-cyber-blue {
          color: #00aaff;
        }
        
        .border-cyber-blue {
          border-color: #00aaff;
        }
        
        .bg-cyber-blue {
          background-color: #00aaff;
        }
        
        .font-orbitron {
          font-family: 'Orbitron', monospace;
        }
        
        .font-fira {
          font-family: 'Fira Code', monospace;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;