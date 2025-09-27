import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest text-white font-rajdhani flex items-center justify-center">
      <div className="text-center px-6 max-w-lg">
        {/* Error Code */}
        <h1 className="font-orbitron text-8xl md:text-9xl font-bold text-cyber-blue mb-6 animate-pulse">
          404
        </h1>

        {/* Error Message */}
        <h2 className="font-orbitron text-xl md:text-2xl font-bold mb-4 text-white">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="px-6 py-3 bg-cyber-blue text-black font-orbitron font-bold rounded-lg hover:bg-cyber-blue/80 transition-colors duration-300"
          >
            Back to Home
          </Link>
          
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-cyber-blue text-cyber-blue font-orbitron font-bold rounded-lg hover:bg-cyber-blue hover:text-black transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;