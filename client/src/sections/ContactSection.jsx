import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Music, Linkedin  } from "lucide-react";
import { SiTiktok } from 'react-icons/si';

const ContactSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef(null);
  const elementsRef = useRef([]);

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

    // Observer tous les éléments animables
    elementsRef.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  

  const contactMethods = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "appinscience@gmail.com",
      description: "Send us your inquiries",
      color: "text-red-400",
      link: "mailto:appinscience@gmail.com",
      isClickable: true
    },
    {
      icon: Instagram,
      label: "INSTAGRAM", 
      value: "@appinsciences",
      description: "See our visual stories",
      color: "text-pink-500",
      link: "https://www.instagram.com/app_in_sciences/", // Replace with actual Instagram
      isClickable: true
    },
    {
      icon: SiTiktok,
      label: "TIKTOK",
      value: "@app.in.science",
      description: "Watch our creative content",
      color: "text-black",
      link: "https://www.tiktok.com/@app.in.science?_t=ZS-8zZFse4jn1k&_r=1", // Replace with actual TikTok
      isClickable: true
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "AppinSciences ENSA",
      description: "Connect professionally",
      color: "text-blue-500",
      link: "https://linkedin.com/in/app-in-sciences-987706239", // Replace with actual LinkedIn
      isClickable: true
    }
  ];

  const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

  const handleContactClick = (method) => {
    if (method.isClickable && method.link) {
      window.open(method.link, '_blank');
    }
  };
  

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="contact-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 right-24 w-28 h-28 border border-cyber-blue/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-32 left-20 w-36 h-36 border-2 border-cyan-400/15 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-purple-400/20 rounded-full animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            visibleElements.has('header') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          ref={el => elementsRef.current[0] = el}
          data-index="header"
        >
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/30">
              [COMMUNICATION_CHANNEL]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CONTACT US
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Description */}
          <div 
            className={`text-center max-w-4xl mx-auto mb-12 transform transition-all duration-1000 ${
              visibleElements.has('description')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('description') ? '150ms' : '0ms' }}
            ref={el => elementsRef.current[1] = el}
            data-index="description"
          >
            <p className="font-rajdhani text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              Ready to join our community of innovators? Have questions about our programs or want to 
              collaborate on a project? We'd love to hear from you.
            </p>
            <p className="font-rajdhani text-base md:text-lg text-white/70 leading-relaxed">
              Reach out through our channels, send us an email, or visit us on campus. 
              Our doors are always open to curious minds and passionate builders.
            </p>
          </div>

          {/* Contact Methods Grid */}
          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 justify-items-center">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-black/50 to-black/30 border border-cyber-blue/30 rounded-2xl p-8 backdrop-blur-lg hover:border-blue-400/60 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-400/30 transform max-w-xs w-full ${
                    visibleElements.has(`contact-${index}`)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  } ${method.isClickable ? 'cursor-pointer hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-cyan-500/10' : ''}`}
                  style={{ 
                    transitionDelay: visibleElements.has(`contact-${index}`) ? `${300 + index * 75}ms` : '0ms'
                  }}
                  ref={el => elementsRef.current[index + 2] = el}
                  data-index={`contact-${index}`}
                  onClick={() => handleContactClick(method)}
                >
                  {/* Icon */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-blue-500/20 border-2 border-blue-400/40 group-hover:border-blue-400/70 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-blue-400/20">
                      <IconComponent 
                        size={32} 
                        className={`${method.color} group-hover:scale-125 transition-transform duration-500 drop-shadow-lg`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-orbitron text-base font-bold text-blue-400 mb-3 tracking-wider group-hover:text-cyan-300 transition-colors duration-300">
                      {method.label}
                    </h3>
                    <p className="font-rajdhani text-white text-base mb-3 group-hover:text-blue-100 transition-colors duration-300 font-medium">
                      {method.value}
                    </p>
                    <p className="font-rajdhani text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {method.description}
                    </p>
                  </div>

                  {/* Enhanced Hover Effects */}
                  <div className="absolute top-3 left-3 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 left-3 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 right-3 w-8 h-0.5 bg-gradient-to-l from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 right-3 w-0.5 h-8 bg-gradient-to-t from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  
                  {/* Click indicator for clickable items */}
                  {method.isClickable && (
                    <div className="absolute top-4 right-4 flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}

                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>
              );
            })}
          </div>

          {/* Google Maps Embed for ENSA El Jadida */}
          <div 
            className={`mb-12 transform transition-all duration-1000 ${
              visibleElements.has('map')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('map') ? '450ms' : '0ms' }}
            ref={el => elementsRef.current[8] = el}
            data-index="map"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <MapPin size={24} className="text-red-500" />
                <h3 className="font-orbitron text-2xl font-bold text-white">
                  <span className="bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                    FIND US
                  </span>
                </h3>
              </div>
              <p className="font-rajdhani text-lg text-white/80 mb-2">ENSA El Jadida, Morocco</p>
              <p className="font-rajdhani text-sm text-white/60">Visit us on campus</p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden border border-cyber-blue/30 shadow-2xl shadow-blue-400/20 group hover:border-blue-400/50 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.5901263986248!2d-8.436686525298946!3d33.25103975961241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda91dc4c0413d23%3A0xc8dbb36f4b2d2cbc!2sENSA%20:%20%C3%89cole%20Nationale%20des%20Sciences%20Appliqu%C3%A9es%20El%20Jadida!5e0!3m2!1sfr!2sma!4v1758744554166!5m2!1sfr!2sma"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-80 md:h-96 lg:h-[400px] group-hover:scale-105 transition-transform duration-700"
                title="ENSA El Jadida Location"
              ></iframe>
              
              {/* Map overlay decoration */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/30 z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-fira text-xs text-white">LOCATION_MARKER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div 
            className={`text-center mt-8 transform transition-all duration-1000 ${
              visibleElements.has('status')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visibleElements.has('status') ? '600ms' : '0ms' }}
            ref={el => elementsRef.current[9] = el}
            data-index="status"
          >
            <div className="inline-flex items-center space-x-3 bg-black/30 border border-blue-400/20 rounded-lg px-6 py-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="font-fira text-sm text-blue-400">
                COMMUNICATION_STATUS: <span className="text-white">ONLINE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center">
          <div
            className="inline-block cursor-pointer group"
            onClick={handleScrollToTop}
          >
            {/* Outer Glow Ring */}
            <div className="relative w-24 h-24 mx-auto">
              {/* Rotating Border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest"></div>
              
              {/* Inner Circle with Animation */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-400/30 group-hover:border-cyan-400/50 transition-all duration-500 flex items-center justify-center group-hover:scale-110 backdrop-blur-sm">
                {/* Animated Arrow */}
                <div className="relative">
                  <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white group-hover:border-b-cyan-400 transition-all duration-300 transform group-hover:scale-125 group-hover:-translate-y-1 animate-bounce"
                       style={{ 
                         filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.5))',
                         animationDelay: '0.5s'
                       }}>
                  </div>
                  {/* Secondary arrow for depth */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-white/60 group-hover:border-b-cyan-400/60 transition-all duration-300"
                       style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.3))' }}>
                  </div>
                </div>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping opacity-0 group-hover:opacity-100"></div>
              </div>
              
              {/* Orbital dots */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 translate-y-1"></div>
                <div className="absolute left-0 top-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1 -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-1 h-1 bg-pink-400 rounded-full transform translate-x-1 -translate-y-1/2"></div>
              </div>
            </div>
            
            {/* Text below */}
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-2">
              <div className="font-fira text-xs text-purple-400 tracking-wider uppercase bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/20">
                [SCROLL_TO_TOP]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;