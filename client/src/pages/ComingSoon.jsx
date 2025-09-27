import React, { useEffect } from "react";

const ComingSoonPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Main Title */}
        <h1 className="font-orbitron text-6xl md:text-8xl font-bold mb-8">
          <span className="bg-gradient-to-r from-cyber-blue via-purple-400 to-cyan-300 bg-clip-text text-transparent">
            COMING SOON
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-rajdhani text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
          We're working on something amazing. Our registration platform will be available soon.
        </p>

        {/* Status Indicator */}
        <div className="inline-flex items-center space-x-3 bg-black/40 border border-cyber-blue/30 rounded-lg px-6 py-3 backdrop-blur-sm mb-8">
          <div className="w-3 h-3 bg-cyber-blue rounded-full animate-pulse"></div>
          <span className="font-orbitron text-sm text-cyber-blue font-semibold">
            SYSTEM IN DEVELOPMENT
          </span>
        </div>

        {/* Return Button */}
        <div>
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-cyber-blue text-black font-orbitron font-bold rounded-lg hover:bg-cyber-blue/80 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;