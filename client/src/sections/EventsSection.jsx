import React, { useEffect, useRef, useState } from "react";
import ScrollIndicator from "../components/ScrollIndicator";
import EventModal from "../components/EventModal";

const EventsSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const events = [
    {
      name: "HACKATHON",
      description: "48-hour intensive coding challenge where students build innovative solutions",
      detailedDescription: "Join us for the ultimate coding marathon! Over 48 hours, teams of passionate developers, designers, and innovators will collaborate to build groundbreaking solutions to real-world problems. With mentors from leading tech companies, unlimited coffee, and exciting prizes, this hackathon promises to push the boundaries of creativity and technical excellence.",
      date: "March 2025",
      type: "COMPETITION",
      color: "from-green-600 to-emerald-600",
      image: "/events/hack.jpg",
      alt: "Hackathon event poster",
      isOldEvent: false,
      highlights: [
        "48-hour intensive coding marathon",
        "Teams of 4-6 participants",
        "Mentorship from industry experts",
        "Prizes worth $10,000+",
        "Free meals and swag for all participants"
      ],
      galleryImages: [
        {
          url: "/events/hack2.jpg",
          alt: "Participants coding during hackathon",
          caption: "Teams working late into the night"
        },
        {
          url: "/events/hack1.jpg",
          alt: "Winners celebrating",
          caption: "Last year's winning team"
        }
      ]
    },
    {
      name: "CyberQuest 3.0",
      description: "Cybersecurity competition and workshop series",
      detailedDescription: "CyberQuest 3.0 is our flagship cybersecurity event featuring hands-on workshops, capture-the-flag competitions, and expert talks from industry leaders. Participants will learn about ethical hacking, digital forensics, network security, and emerging cyber threats through practical challenges and real-world scenarios.",
      date: "June 2025", 
      type: "CONFERENCE",
      color: "from-purple-600 to-pink-600",
      image: "/events/Cq.jpg",
      alt: "CyberQuest 3.0 event poster",
      isOldEvent: false,
      highlights: [
        "Capture The Flag (CTF) competitions",
        "Workshops on ethical hacking",
        "Keynotes from cybersecurity experts",
        "Networking with security professionals",
        "Certificates for all participants"
      ],
      galleryImages: [
        {
          url: "/about_us.jpg",
          alt: "CTF competition in progress",
          caption: "Intense CTF competition moments"
        }
      ]
    },
    {
      name: "Era's Exchange",
      description: "International student and professional exchange program",
      detailedDescription: "Era's Exchange is a unique international program that connects students and professionals across continents. Participants engage in cultural exchange, collaborative projects, and knowledge sharing sessions. This program aims to build global networks and foster cross-cultural understanding in the tech community.",
      date: "September 2024",
      type: "EXCHANGE",
      color: "from-blue-600 to-cyan-600",
      image: "/events/era.jpg",
      alt: "Era's Exchange event poster",
      isOldEvent: true,
      highlights: [
        "Connect with international peers",
        "Cultural exchange programs",
        "Collaborative tech projects",
        "Virtual and in-person sessions",
        "Global networking opportunities"
      ],
      galleryImages: [
        {
          url: "/events/p16.png",
          alt: "International participants meeting",
          caption: "Global connections being made"
        }
      ]
    },
    {
      name: "RACKATHON",
      description: "Annual cybersecurity awareness and training summit",
      detailedDescription: "RACKATHON is our premier cybersecurity awareness event combining competitive elements with educational workshops. Participants tackle real-world security challenges while learning about the latest threats, defense strategies, and security tools used by professionals in the field.",
      date: "December 2024",
      type: "SUMMIT",
      color: "from-red-600 to-orange-600",
      image: "/img/im3.jpg",
      alt: "Cyber Security Summit poster",
      isOldEvent: true,
      highlights: [
        "Real-world security challenges",
        "Industry expert presentations",
        "Hands-on security tools training",
        "Career guidance in cybersecurity",
        "Networking with security professionals"
      ],
      galleryImages: [
        {
          url: "/events/rack1.jpg",
          alt: "International participants meeting",
          caption: "Global connections being made"
        },
        {
          url: "/events/rack2.jpg",
          alt: "Cultural presentation",
          caption: "Sharing diverse tech cultures"
        },
        {
          url: "https://www.youtube.com/embed/Ox519uHvvAs",
          
        }
      ]
    },
    {
      name: "DevFest",
      description: "Technology talks and networking event with industry experts",
      detailedDescription: "DevFest is our annual developer-focused conference featuring cutting-edge technology talks, live coding sessions, and extensive networking opportunities. Join industry leaders, startup founders, and fellow developers for a day of learning, sharing, and connecting in the ever-evolving world of software development.",
      date: "February 2024",
      type: "CONFERENCE",
      color: "from-teal-600 to-green-600",
      image: "/events/dv.jpg",
      alt: "DevFest poster",
      isOldEvent: true,
      highlights: [
        "Tech talks by industry leaders",
        "Live coding demonstrations",
        "Startup pitch sessions",
        "Developer tool exhibitions",
        "Networking lunch and coffee breaks"
      ],
      galleryImages: [
        {
          url: "/events/devfest.jpg",
          alt: "International participants meeting",
          caption: "Global connections being made"
        },
        {
          url: "https://www.youtube.com/embed/Gou_5qTPzwI",
          alt: "Cultural presentation",
          caption: "Sharing diverse tech cultures"
        }
      ]
    }
  ];

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Fonction pour faire défiler vers la gauche
  const scrollLeft = () => {
    const container = document.getElementById('events-container');
    container.scrollBy({ left: -400, behavior: 'smooth' });
  };

  // Fonction pour faire défiler vers la droite
  const scrollRight = () => {
    const container = document.getElementById('events-container');
    container.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest overflow-hidden" id="events-section">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 right-20 w-40 h-40 border-2 border-cyber-blue/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 border border-cyan-400/30 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-24">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-300 ${
            visibleElements.has('header') 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
          ref={el => elementsRef.current[0] = el}
          data-index="header"
        >
          <div className="inline-block mb-4">
            <span className="font-fira text-sm text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/30">
              [EVENT_MATRIX]
            </span>
          </div>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SIGNATURE EVENTS
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>

        {/* Horizontal Scrolling Events Display */}
        <div className="max-w-full mx-auto mb-16 relative">
          {/* Left Arrow - Flèche de navigation gauche */}
          <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-cyan-400/30 text-cyan-400 hover:text-white hover:border-cyan-400 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

          {/* Right Arrow - Flèche de navigation droite */}
          <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 border border-cyan-400/30 text-cyan-400 hover:text-white hover:border-cyan-400 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

          {/* Scrolling Container */}
          <div 
            id="events-container"
            className={`overflow-x-auto scrollbar-hide px-12 transform transition-all duration-300 ${
              visibleElements.has('events-grid')
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            ref={el => elementsRef.current[1] = el}
            data-index="events-grid"
            style={{ 
              transitionDelay: visibleElements.has('events-grid') ? '150ms' : '0ms',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex gap-6 pb-4">
              {events.map((event, index) => (
                <div 
                  key={index}
                  className={`group bg-black/40 border border-cyber-blue/20 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-400/20 cursor-pointer flex-shrink-0 w-80 transform ${
                    visibleElements.has(`event-${index}`)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: visibleElements.has(`event-${index}`) ? `${200 + index * 50}ms` : '0ms'
                  }}
                  ref={el => elementsRef.current[index + 2] = el}
                  data-index={`event-${index}`}
                  onClick={() => openModal(event)}
                >
                  {/* Event Poster Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Event Type Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <span className={`font-fira text-xs px-3 py-1 rounded-full bg-gradient-to-r ${event.color} text-white font-semibold tracking-wider shadow-lg`}>
                        {event.type}
                      </span>
                    </div>

                    {/* Badge "PAST EVENT" - Indicateur d'événements passés */}
                    {event.isOldEvent && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange-600/80 text-white text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm border border-orange-400/40">
                          PAST EVENT
                        </span>
                      </div>
                    )}

                    {/* Click to view indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/40 rounded-full p-2">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-2">
                      <div className={`text-sm font-fira mb-1 ${event.isOldEvent ? 'text-orange-400' : 'text-cyber-blue'}`}>
                        {event.date}
                      </div>
                    </div>
                    
                    <h3 className="font-orbitron text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      {event.name}
                    </h3>
                    
                    <p className="font-rajdhani text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
                      {event.description}
                    </p>

                    {/* Call to action */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-fira text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View event details
                      </span>
                      <div className="w-6 h-6 border-2 border-cyan-400/30 rounded-full group-hover:border-cyan-400 transition-colors duration-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400/30 rounded-full group-hover:bg-cyan-400 transition-colors duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Style pour cacher la scrollbar */}
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Description */}
        <div 
          className={`text-center max-w-4xl mx-auto transform transition-all duration-300 ${
            visibleElements.has('description')
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: visibleElements.has('description') ? '400ms' : '0ms' }}
          ref={el => elementsRef.current[7] = el}
          data-index="description"
        >
          
          <div className="flex justify-center">
            <div className="bg-black/30 border border-cyan-400/20 rounded-lg px-6 py-3">
              <span className="font-fira text-sm text-cyan-400">
                NEXT_EVENT: <span className="text-green-400">LOADING</span>
              </span>
            </div>
          </div>
        </div>
      </div>
     
      <div className="relative z-10 flex justify-center pb-16">
        <ScrollIndicator
          targetSection="membership"
          text="Join Our Community"
        />
      </div>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default EventsSection;