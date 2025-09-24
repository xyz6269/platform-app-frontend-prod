import React, { useEffect, useRef, useState } from "react";

const ComingSoonPage = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 8,
    minutes: 23,
    seconds: 45
  });
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

  // Animation d'observation des éléments
  useEffect(() => {
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

    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Compteur temporel simulé
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds > 0 ? prev.seconds - 1 : 59;
        const newMinutes = prev.seconds === 0 && prev.minutes > 0 ? prev.minutes - 1 : 
                          prev.seconds === 0 && prev.minutes === 0 ? 59 : prev.minutes;
        const newHours = prev.seconds === 0 && prev.minutes === 0 && prev.hours > 0 ? prev.hours - 1 :
                        prev.seconds === 0 && prev.minutes === 0 && prev.hours === 0 ? 23 : prev.hours;
        const newDays = prev.seconds === 0 && prev.minutes === 0 && prev.hours === 0 && prev.days > 0 ? 
                       prev.days - 1 : prev.days;

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Express Registration",
      description: "Lightning-fast signup process with instant confirmation"
    },
    {
      icon: "🔐",
      title: "Secure Platform",
      description: "Advanced encryption and data protection protocols"
    },
    {
      icon: "🎯",
      title: "Smart Matching",
      description: "AI-powered event recommendations based on your interests"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Seamless experience across all devices and platforms"
    }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden">
      {/* Éléments d'arrière-plan animés */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-40 h-40 border-2 border-cyber-blue/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 border border-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-purple-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full animate-ping"></div>
      </div>

      {/* Grille matricielle d'arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-20 grid-rows-20 h-full">
          {[...Array(400)].map((_, i) => (
            <div key={i} className="border border-cyan-400/10"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header principal */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleElements.has('header') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          ref={el => elementsRef.current[0] = el}
          data-index="header"
        >
          <div className="inline-block mb-6">
            <span className="font-fira text-sm text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30 animate-pulse">
              [SYSTEM_INITIALIZING]
            </span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              COMING
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              SOON
            </span>
          </h1>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-8"></div>
          
          <p className="font-rajdhani text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get ready for the ultimate registration experience. Our platform is being fine-tuned to deliver 
            <span className="text-cyan-400 font-semibold"> seamless event registration</span> like never before.
          </p>
        </div>

        {/* Compteur temporel */}
        <div 
          className={`max-w-4xl mx-auto mb-16 transform transition-all duration-1000 ${
            visibleElements.has('countdown')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
          ref={el => elementsRef.current[1] = el}
          data-index="countdown"
        >
          <div className="text-center mb-8">
            <h2 className="font-orbitron text-2xl md:text-3xl text-white mb-4">
              Registration Opens In
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="group">
                <div className="bg-black/40 border border-cyber-blue/30 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-500">
                  <div className="font-orbitron text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="font-fira text-xs text-gray-400 tracking-wider">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message principal SOON */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleElements.has('soon-message')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
          ref={el => elementsRef.current[2] = el}
          data-index="soon-message"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-8 border border-cyan-400/30 backdrop-blur-sm">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-fira text-xs px-4 py-1 rounded-full font-bold">
                  PRIORITY ACCESS
                </span>
              </div>
              
              <div className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  SOON
                </span>
              </div>
              
              <p className="font-rajdhani text-gray-300 text-lg leading-relaxed">
                L'inscription sera bientôt disponible sur notre plateforme. Préparez-vous à rejoindre une communauté 
                de passionnés de technologie et d'innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalités à venir */}
        <div 
          className={`max-w-6xl mx-auto mb-16 transform transition-all duration-1000 ${
            visibleElements.has('features')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
          ref={el => elementsRef.current[3] = el}
          data-index="features"
        >
          <div className="text-center mb-12">
            <h3 className="font-orbitron text-2xl md:text-3xl text-white mb-4">
              What's Coming
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group bg-black/30 border border-cyber-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-500 hover:-translate-y-2 transform ${
                  visibleElements.has(`feature-${index}`)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${1200 + index * 100}ms` }}
                ref={el => elementsRef.current[4 + index] = el}
                data-index={`feature-${index}`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-orbitron text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="font-rajdhani text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div 
          className={`text-center transform transition-all duration-1000 ${
            visibleElements.has('cta')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1600ms' }}
          ref={el => elementsRef.current[8] = el}
          data-index="cta"
        >
          <div className="inline-flex items-center space-x-4 bg-black/40 border border-cyan-400/30 rounded-full px-8 py-4 backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-fira text-sm text-cyan-400">
              STATUS: <span className="text-green-400 font-semibold">REGISTRATION_SYSTEM_LOADING</span>
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Grille personnalisée */
        .grid-cols-20 {
          grid-template-columns: repeat(20, minmax(0, 1fr));
        }
        .grid-rows-20 {
          grid-template-rows: repeat(20, minmax(0, 1fr));
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;