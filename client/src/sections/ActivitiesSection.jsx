import React, { useEffect, useRef, useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";

const ActivitiesSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  const [activePoint, setActivePoint] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);

  const missionPoints = [
    {
      id: "beyond-walls",
      description: "We believe that true engineering excellence extends far beyond the traditional curriculum. Our IT club empowers young engineering students to become self-directed learners, exploring cutting-edge technologies and industry practices that universities often can't keep pace with.",
      image: "/activities/p12.png",
      color: "cyber-blue"
    },
    {
      id: "personal-growth",
      description: "Through intensive workshops, hands-on projects, and collaborative challenges, students develop not just technical skills but also critical thinking, leadership abilities, and the confidence to tackle complex real-world problems independently.",
      image: "/activities/p13.png",
      color: "cyan-400"
    },
    {
      id: "community-building",
      description: "We foster a tight-knit community of passionate tech enthusiasts who support each other's growth. Our members form lasting professional relationships, collaborate on innovative projects, and create networks that extend well beyond their university years.",
      image: "/activities/p16.png",
      color: "purple-400"
    },
    {
      id: "practical-application",
      description: "Every workshop and project is designed with real-world application in mind. Students don't just learn theory—they build, create, and solve actual problems, developing portfolios that showcase their capabilities to future employers and collaborators.",
      image: "/activities/p14.png",
      color: "pink-400"
    }
  ];

   // Auto-cycle through mission points
  useEffect(() => {
    
    const startCycle = () => {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setActivePoint((prev) => (prev + 1) % missionPoints.length);
          setIsTransitioning(false);
        }, 300);
      }, 6000);
    };

    startCycle();


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px 0px -100px 0px'
      }

      
    );

    observerRef.current = observer;

    // Observer tous les éléments animables
    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [missionPoints.length]);

  const handlePointClick = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePoint(index);
      setIsTransitioning(false);
    }, 300);
    
    // Restart auto-cycle after 10 seconds
    setTimeout(() => {
      const startCycle = () => {
        intervalRef.current = setInterval(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setActivePoint((prev) => (prev + 1) % missionPoints.length);
            setIsTransitioning(false);
          }, 300);
        }, 6000);
      };
      startCycle();
    }, 10000);
  };

  const currentPoint = missionPoints[activePoint];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="activities-section">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyber-blue/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/25 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-blue-400/20 rounded-lg rotate-12 animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border border-pink-400/25 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="font-fira text-sm text-cyber-blue bg-cyber-blue/10 px-6 py-3 rounded-full border border-cyber-blue/30 shadow-lg shadow-cyber-blue/20">
              [EMPOWERMENT_INITIATIVE]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              BEYOND BOUNDARIES
            </span>
          </h2>
          <p className="font-rajdhani text-xl text-cyber-blue/80 max-w-3xl mx-auto mb-6">
            Empowering Engineering Minds Through Self-Directed Learning
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent mx-auto"></div>
        </div>

        {/* Dynamic Mission Statement with Images */}
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Mission Statement Card with Dynamic Content */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-black/80 via-cyber-darker/60 to-black/90 backdrop-blur-xl border border-cyber-blue/40 rounded-3xl overflow-hidden shadow-2xl shadow-cyber-blue/10">
              {/* Enhanced Corner Elements */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <div className="absolute top-4 left-4 w-6 h-6 border-t-3 border-l-3 border-cyber-blue animate-pulse"></div>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12">
                <div className="absolute top-4 right-4 w-6 h-6 border-t-3 border-r-3 border-cyan-400 animate-pulse"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12">
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-3 border-l-3 border-purple-400 animate-pulse"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12">
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-3 border-r-3 border-pink-400 animate-pulse"></div>
              </div>
              
              {/* Dynamic Border Animation */}
              <div className="absolute inset-0 rounded-3xl">
                <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyber-blue/60 to-transparent animate-pulse"></div>
                <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-pulse"></div>
                <div className="absolute left-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent animate-pulse"></div>
                <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-pink-400/60 to-transparent animate-pulse"></div>
              </div>
              
              {/* Content Header */}
              <div className="relative z-10 mb-8 p-10 pb-0">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-4 h-4 bg-cyber-blue rounded-full animate-ping"></div>
                  <span className="font-fira text-sm text-cyber-blue/90 tracking-[0.2em]">MISSION_STATEMENT</span>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
                <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-center mb-4">
                  <span className="bg-gradient-to-r from-cyber-blue via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                    Self-Directed Excellence
                  </span>
                </h3>
              </div>

              {/* Dynamic Content Section */}
              <div className="relative z-10 px-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Column - Current Point Image */}
                  <div className="relative">
                    <div className="relative group">
                      {/* Image Container with Cyber Frame */}
                      <div className="relative w-full h-80 overflow-hidden rounded-xl bg-black/50">
                        <img
                          src={currentPoint.image}
                          alt={currentPoint.title}
                          className={`w-full h-full object-cover transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
                        />
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                      </div>

                      {/* Cyber Effects Frame */}
                      <div className="absolute inset-0 pointer-events-none">
                        {/* Matrix-style scan lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_48%,rgba(0,255,255,0.08)_50%,transparent_52%)] bg-[size:100%_4px] opacity-60 animate-pulse"></div>
                        
                        {/* Digital sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-full animate-pulse" style={{animationDuration: '3s'}}></div>
                        
                        {/* Corner scan effects */}
                        <div className="absolute top-0 left-0 w-12 h-12">
                          <div className={`absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-${currentPoint.color}/60 animate-pulse`}></div>
                          <div className={`absolute top-1 left-1 w-3 h-3 bg-${currentPoint.color}/40 rounded-full animate-ping`}></div>
                        </div>
                        <div className="absolute top-0 right-0 w-12 h-12">
                          <div className={`absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-${currentPoint.color}/60 animate-pulse`}></div>
                          <div className={`absolute top-1 right-1 w-3 h-3 bg-${currentPoint.color}/40 rounded-full animate-ping`}></div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-12 h-12">
                          <div className={`absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-${currentPoint.color}/60 animate-pulse`}></div>
                          <div className={`absolute bottom-1 left-1 w-3 h-3 bg-${currentPoint.color}/40 rounded-full animate-ping`}></div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-12 h-12">
                          <div className={`absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-${currentPoint.color}/60 animate-pulse`}></div>
                          <div className={`absolute bottom-1 right-1 w-3 h-3 bg-${currentPoint.color}/40 rounded-full animate-ping`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="space-y-8">
                    {/* Active Point Content */}
                    <div className={`relative pl-6 border-l-3 border-${currentPoint.color}/40 transition-all duration-700 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                      <div className={`absolute left-0 top-0 w-3 h-3 bg-${currentPoint.color} rounded-full animate-pulse`}></div>
                      <h4 className={`font-orbitron text-2xl text-${currentPoint.color} mb-4`}>
                        {currentPoint.title}
                      </h4>
                      <p className="font-rajdhani text-lg text-white/90 leading-relaxed">
                        {currentPoint.description}
                      </p>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex items-center justify-center gap-4 pt-6">
                      {missionPoints.map((point, index) => (
                        <button
                          key={point.id}
                          onClick={() => handlePointClick(index)}
                          className={`
                            relative group
                            transition-all duration-300
                            ${index === activePoint ? 'scale-125' : 'hover:scale-110'}
                          `}
                          aria-label={`View ${point.title}`}
                        >
                          <div className={`
                            w-4 h-4 rounded-full transition-all duration-300
                            ${index === activePoint 
                              ? `bg-${point.color} shadow-lg shadow-${point.color}/60` 
                              : 'bg-gray-600 group-hover:bg-gray-400'
                            }
                          `}></div>
                          
                          {/* Progress ring for active item */}
                          {index === activePoint && (
                            <div className="absolute inset-0 -m-2">
                              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  className={`stroke-${point.color}/30`}
                                  strokeWidth="2"
                                />
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  className={`stroke-${point.color}`}
                                  strokeWidth="2"
                                  strokeDasharray="100.53"
                                  strokeDashoffset="100.53"
                                  strokeLinecap="round"
                                  style={{
                                    animation: 'progress-ring 6s linear infinite'
                                  }}
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Point Counter */}
                    <div className="text-center">
                      <span className={`font-fira text-sm text-${currentPoint.color}/80`}>
                        {String(activePoint + 1).padStart(2, '0')} / {String(missionPoints.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom padding */}
              <div className="p-10 pt-0"></div>

              {/* Floating Decorative Elements */}
              <div className="absolute top-8 right-8 w-20 h-20 border border-cyan-400/20 rounded-full animate-spin-slow opacity-30"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 border border-purple-400/30 rotate-45 animate-pulse opacity-40"></div>
              <div className="absolute top-1/2 right-12 w-8 h-8 bg-cyber-blue/10 rounded-full animate-bounce opacity-50"></div>
            </div>
          </div>

          {/* ENTIRE TRAINING PROGRAMS SLIDESHOW SECTION HAS BEEN REMOVED */}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-ring {
          0% {
            stroke-dashoffset: 100.53;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ActivitiesSection;