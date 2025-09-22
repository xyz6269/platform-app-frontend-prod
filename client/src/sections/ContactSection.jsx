import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Facebook, Instagram, Music, Linkedin  } from "lucide-react";

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
      value: "contact@appinsciences.ma",
      description: "Send us your inquiries",
      color: "text-red-400",
      link: "mailto:contact@appinsciences.ma",
      isClickable: true
    },
    {
      icon: MessageCircle,
      label: "WHATSAPP",
      value: "+212 XX XX XX XX",
      description: "Chat with us instantly",
      color: "text-green-500",
      link: "https://wa.me/212XXXXXXXXX", // Replace with actual WhatsApp number
      isClickable: true
    },
    {
      icon: Facebook,
      label: "FACEBOOK",
      value: "@AppinSciences",
      description: "Follow our updates",
      color: "text-blue-600",
      link: "https://facebook.com/AppinSciences", // Replace with actual Facebook page
      isClickable: true
    },
    {
      icon: Instagram,
      label: "INSTAGRAM", 
      value: "@appinsciences",
      description: "See our visual stories",
      color: "text-pink-500",
      link: "https://instagram.com/appinsciences", // Replace with actual Instagram
      isClickable: true
    },
    {
      icon: Music,
      label: "TIKTOK",
      value: "@appinsciences",
      description: "Watch our creative content",
      color: "text-black",
      link: "https://tiktok.com/@appinsciences", // Replace with actual TikTok
      isClickable: true
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "AppinSciences ENSA",
      description: "Connect professionally",
      color: "text-blue-500",
      link: "https://linkedin.com/company/appinsciences-ensa", // Replace with actual LinkedIn
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
            style={{ transitionDelay: visibleElements.has('description') ? '300ms' : '0ms' }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className={`group bg-black/40 border border-cyber-blue/20 rounded-xl p-6 backdrop-blur-sm hover:border-blue-400/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-400/20 transform ${
                    visibleElements.has(`contact-${index}`)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  } ${method.isClickable ? 'cursor-pointer' : ''}`}
                  style={{ 
                    transitionDelay: visibleElements.has(`contact-${index}`) ? `${600 + index * 150}ms` : '0ms'
                  }}
                  ref={el => elementsRef.current[index + 2] = el}
                  data-index={`contact-${index}`}
                  onClick={() => handleContactClick(method)}
                >
                  {/* Icon */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300 group-hover:scale-110">
                      <IconComponent 
                        size={28} 
                        className={`${method.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-orbitron text-sm font-bold text-blue-400 mb-2 tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
                      {method.label}
                    </h3>
                    <p className="font-rajdhani text-white text-sm mb-2 group-hover:text-blue-100 transition-colors duration-300">
                      {method.value}
                    </p>
                    <p className="font-rajdhani text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                      {method.description}
                    </p>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute top-2 left-2 w-6 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-2 left-2 w-0.5 h-6 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-0.5 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-2 right-2 w-0.5 h-6 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Click indicator for clickable items */}
                  {method.isClickable && (
                    <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  )}
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
            style={{ transitionDelay: visibleElements.has('map') ? '900ms' : '0ms' }}
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.8234567890123!2d-8.5009!3d33.2547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaa2c4c4c4c4c4c4%3A0x1234567890abcdef!2sENSA%20El%20Jadida!5e0!3m2!1sen!2sma!4v1234567890123!5m2!1sen!2sma"
                width="100%"
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
            style={{ transitionDelay: visibleElements.has('status') ? '1200ms' : '0ms' }}
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
        <div 
          className={`text-center transform transition-all duration-1000 ${
            visibleElements.has('back-to-top')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: visibleElements.has('back-to-top') ? '1600ms' : '0ms' }}
          ref={el => elementsRef.current[10] = el}
          data-index="back-to-top"
        >
          <div
            className="inline-flex items-center justify-center gap-4 cursor-pointer p-6 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 transition-all duration-500 hover:bg-cyber-blue/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-cyber-blue/30 group"
            onClick={handleScrollToTop}
          >
            <span className="font-orbitron text-lg font-medium tracking-[2px] text-cyber-blue uppercase group-hover:text-cyan-400 transition-colors duration-300">
              Return to Base
            </span>
            <div className="flex flex-col items-center space-y-1">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-cyber-blue group-hover:border-b-cyan-400 transition-colors duration-300"
                   style={{ filter: 'drop-shadow(0 0 8px rgba(0, 170, 255, 0.6))' }}></div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyber-blue/70 group-hover:border-b-cyan-400/70 transition-colors duration-300 transform scale-75"
                   style={{ filter: 'drop-shadow(0 0 6px rgba(0, 170, 255, 0.4))' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;