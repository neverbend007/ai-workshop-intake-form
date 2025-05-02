
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiEmoji from '../components/ConfettiEmoji';
import Hero from '../components/Hero';
import ParticleBackground from '../components/ParticleBackground';
import { ArrowLeft } from 'lucide-react';

const Thanks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user came from the form submission
    // If not, redirect to the form
    if (!sessionStorage.getItem('formSubmitted')) {
      navigate('/');
    }
  }, [navigate]);

  const handleStartOver = () => {
    // Clear the form submission status
    sessionStorage.removeItem('formSubmitted');
    // Navigate back to the form
    navigate('/');
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <div className="flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white/30 rounded-xl shadow-lg p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                <ConfettiEmoji />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center text-white">
                Welcome to the Workshop 👋
              </h1>
              
              <p className="text-xl font-medium text-white mb-8">
                Thanks for joining AI Workshop Lite! While you wait for your invite email, 
                did you know we also run <strong>AI Workshop</strong>—a private community 
                where members get premium workflows, live build-along sessions, and personalised feedback?
              </p>
              
              <div className="flex flex-col w-full">
                <a 
                  href="https://www.skool.com/aiworkshop" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-6 rounded-lg text-xl text-center transition-transform duration-150 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  See What PRO Includes →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Start Over button positioned at bottom left */}
      <button 
        onClick={handleStartOver}
        className="absolute bottom-6 left-6 flex items-center justify-center gap-2 bg-white/70 hover:bg-white/90 text-gray-800 py-2 px-4 rounded-lg transition-colors z-20"
      >
        <ArrowLeft size={16} /> Start Over
      </button>
    </div>
  );
};

export default Thanks;
