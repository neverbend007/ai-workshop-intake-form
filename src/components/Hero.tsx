
import React from 'react';

const Hero = () => {
  return (
    <div className="text-white w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://aiworkshop.me/wp-content/uploads/2024/11/cropped-AI-Workshop-Logo-3-90x89.png" 
              alt="AI Workshop Logo" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join AI Workshop Lite</h1>
          <p className="text-xl md:text-2xl opacity-90">
            Connect with a community of technical enthusiasts building with AI tools
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
