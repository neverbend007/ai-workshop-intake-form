
import React from 'react';

const ParticleBackground: React.FC = () => {
  // Generate particles in a circular pattern
  const renderParticles = () => {
    const particles = [];
    const count = 80; // Number of particles
    const maxRadius = 45; // Maximum radius as percentage of container size
    
    for (let i = 0; i < count; i++) {
      // Use polar coordinates to create circular distribution
      const radius = Math.random() * maxRadius; // Random radius between 0 and maxRadius
      const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
      
      // Convert polar to cartesian coordinates (centered at 50%)
      const left = 50 + radius * Math.cos(angle); // Center at 50% plus offset
      const top = 50 + radius * Math.sin(angle); // Center at 50% plus offset
      
      // Random particle properties
      const size = Math.random() * 10 + 2; // Random size between 2-12px
      const delay = Math.random() * 10; // Random delay for animation
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
      {/* The container is now positioned at the center of the screen */}
      <div className="animate-spin-slow absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {renderParticles()}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-green-500 opacity-20 blur-3xl animate-pulse" />
      </div>
    </div>
  );
};

export default ParticleBackground;
