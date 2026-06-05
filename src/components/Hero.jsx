import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content animate-fade-in">
        <div className="image-wrapper">
          {/* We will load the poster image here. The user should place poster.jpg in the public folder */}
          <img 
            src="/poster.jpg" 
            alt="Graduation Ceremony Poster" 
            className="hero-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'; // fallback image
            }}
          />
          <div className="overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
