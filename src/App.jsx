import React from 'react';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Map from './components/Map';
import RSVPForm from './components/RSVPForm';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/bos_logo.png" alt="BOS Logo" className="app-logo" />
            <span className="brand-name">Team AI So Mot BOS</span>
          </div>
          <nav className="nav-menu">
            <a href="#details">Details</a>
            <a href="#location">Location</a>
            <a href="#rsvp" className="nav-rsvp-btn">RSVP</a>
          </nav>
        </div>
      </header>

      <Hero />
      <div id="details"><EventDetails /></div>
      <div id="location"><Map /></div>
      <div id="rsvp"><RSVPForm /></div>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        backgroundColor: 'var(--primary-color)', 
        color: 'white',
        fontSize: '0.9rem'
      }}>
        <p>&copy; 2026 Team AI So Mot BOS. All rights reserved.</p>
        <p style={{ color: 'var(--secondary-color)', marginTop: '5px' }}>Class of 2022</p>
      </footer>
    </div>
  );
}

export default App;
