
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiEmoji from '../components/ConfettiEmoji';

const Thanks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user came from the form submission
    // If not, redirect to the form
    if (!sessionStorage.getItem('formSubmitted')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0">
            <ConfettiEmoji />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
            Welcome to the Workshop 👋
          </h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Thanks for joining AI Workshop Lite! While you wait for your invite email, 
            did you know we also run <strong>AI Workshop</strong>—a private community 
            where members get premium workflows, live build-along sessions, and personalised feedback?
          </p>
          
          <a 
            href="https://www.skool.com/aiworkshop" 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-transform duration-150 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            See What PRO Includes →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
