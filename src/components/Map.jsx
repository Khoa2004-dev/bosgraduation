import React from 'react';
import './Map.css';

const Map = () => {
  return (
    <section className="map-section">
      <div className="container">
        <h2 className="section-title text-center text-gold">Location</h2>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.423351996515!2d106.8030541!3d10.8700089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20-%20VNUHCM!5e0!3m2!1sen!2s!4v1717592000000!5m2!1sen!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="UIT Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
