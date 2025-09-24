import React, { useEffect } from 'react';

const EventModal = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Handle ESC key press
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to check if URL is a YouTube embed
  const isYouTubeEmbed = (url) => {
    return url && url.includes('youtube.com/embed/');
  };

  // Helper function to render gallery item (image or video)
  const renderGalleryItem = (item, index) => {
    if (isYouTubeEmbed(item.url)) {
      return (
        <div key={index} className="group relative overflow-hidden rounded-lg border border-cyber-blue/20 hover:border-cyan-400/40 transition-colors duration-300">
          <div className="relative w-full h-40">
            <iframe
              src={item.url}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.caption || `Video ${index + 1}`}
            ></iframe>
          </div>
          {item.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
              <p className="font-rajdhani text-white font-medium text-sm">{item.caption}</p>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div key={index} className="group relative overflow-hidden rounded-lg border border-cyber-blue/20 hover:border-cyan-400/40 transition-colors duration-300">
          <img 
            src={item.url} 
            alt={item.alt || `Gallery image ${index + 1}`}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-rajdhani text-white font-medium text-sm">{item.caption}</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-cyber-dark to-cyber-darker border border-cyan-400/30 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl shadow-cyan-400/20 animate-in fade-in-50 scale-in-95 duration-300 mt-20">
        
        {/* Header with Event Image */}
        <div className="relative">
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <img 
              src={event.image} 
              alt={event.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/90 via-cyber-dark/30 to-transparent"></div>
            
            {/* Event Type Badge */}
            <div className="absolute top-4 left-4">
              <span className={`font-fira text-sm px-4 py-2 rounded-full bg-gradient-to-r ${event.color} text-white font-semibold tracking-wider shadow-lg`}>
                {event.type}
              </span>
            </div>

            {/* Past Event Indicator */}
            {event.isOldEvent && (
              <div className="absolute top-4 right-16">
                <span className="bg-orange-600/80 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-semibold border border-orange-400/40">
                  PAST EVENT
                </span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black/60 transition-all duration-200 group"
              aria-label="Fermer la modal"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-1">
                {event.name}
              </h2>
              <div className="flex items-center gap-4">
                <span className={`font-rajdhani text-base font-semibold ${event.isOldEvent ? 'text-orange-400' : 'text-cyan-400'}`}>
                  {event.date}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Detailed Description */}
          <div>
            <h3 className="font-orbitron text-lg font-semibold text-cyan-400 mb-3 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2"></div>
              About the Event
            </h3>
            <p className="font-rajdhani text-gray-300 leading-relaxed text-base">
              {event.detailedDescription || event.description}
            </p>
          </div>

          {/* Event Highlights */}
          {event.highlights && (
            <div>
              <h3 className="font-orbitron text-lg font-semibold text-cyan-400 mb-3 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2"></div>
                Event Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="bg-black/30 border border-cyber-blue/20 rounded-lg p-3 hover:border-cyan-400/40 transition-colors duration-300">
                    <div className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="font-rajdhani text-gray-300 leading-relaxed text-sm">{highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Gallery */}
          <div>
            <h3 className="font-orbitron text-lg font-semibold text-cyan-400 mb-3 flex items-center">
              <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full mr-2"></div>
              Event Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.galleryImages && event.galleryImages.length > 0 ? (
                event.galleryImages
                  .filter(item => item.url) // Filter out items without URL
                  .map((item, index) => renderGalleryItem(item, index))
              ) : (
                // Default fallback - show main event image
                <div className="col-span-full">
                  <div className="relative overflow-hidden rounded-lg border border-cyber-blue/20">
                    <img 
                      src={event.image} 
                      alt={event.alt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="font-rajdhani text-white text-base">{event.name} Event Poster</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-3">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-cyber-blue to-cyan-400 text-cyber-dark font-orbitron font-semibold px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:-translate-y-1"
            >
              Close
            </button>
            
            {/* Conditional Register Button - Only shows for future events */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;