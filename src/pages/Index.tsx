
import React from 'react';
import IntakeForm from '../components/IntakeForm';
import Hero from '../components/Hero';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <div className="relative z-10">
        <Hero />
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-75 backdrop-blur-sm rounded-xl shadow-lg">
              <IntakeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
