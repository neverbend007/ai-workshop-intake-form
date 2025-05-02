
import React from 'react';
import IntakeForm from '../components/IntakeForm';
import Hero from '../components/Hero';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Hero />
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <IntakeForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
