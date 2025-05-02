
import React from 'react';

const ParticleBackground: React.FC = () => {
  // Generate multiple particles with different sizes and animation delays
  const renderParticles = () => {
    const particles = [];
    const count = 80; // Number of particles
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 2; // Random size between 2-12px
      const delay = Math.random() * 10; // Random delay for animation
      const left = Math.random() * 100; // Random horizontal position
      const top = Math.random() * 100; // Random vertical position
      const opacity = Math.random() * 0.8 + 0.2; // Random opacity between 0.2-1
      
      particles.push(
        <div
          key={i}
          className="absolute rounded-full bg-green-400 animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity: opacity,
            filter: `blur(${Math.random() * 2 + 1}px) brightness(${Math.random() + 0.8})`,
            animationDelay: `${delay}s`,
            animationDuration: `${Math.random() * 4 + 3}s`,
          }}
        />
      );
    }
    
    return particles;
  };

  return (
    <div className="particle-background fixed inset-0 -z-10 overflow-hidden bg-black bg-opacity-95">
      <div className="animate-spin-slow absolute inset-0">
        {renderParticles()}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default ParticleBackground;
