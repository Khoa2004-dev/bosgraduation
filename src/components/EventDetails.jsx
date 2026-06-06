import React from 'react';
import { Calendar, Clock, MapPin, Plus } from 'lucide-react';
import './EventDetails.css';

const EventDetails = () => {
  const title = encodeURIComponent('Graduation Ceremony - Team AI So Mot BOS');
  const details = encodeURIComponent('You are cordially invited to our graduation ceremony!');
  const location = encodeURIComponent('University of Information Technology, Quarter 34, Linh Xuan Ward, Ho Chi Minh City');
  
  // 11:00 to 12:30 in ICT (UTC+7) is 04:00 to 05:30 in UTC
  const dates = '20260609T040000Z/20260609T053000Z';
  
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

  return (
    <section className="event-details-section">
      <div className="container">
        <h2 className="section-title text-center text-gold">When & Where</h2>
        
        <div className="details-grid">
          <div className="detail-card">
            <div className="icon-wrapper">
              <Calendar size={32} />
            </div>
            <h3>Date</h3>
            <p>Tuesday</p>
            <p className="highlight">June 09, 2026</p>
          </div>
          
          <div className="detail-card">
            <div className="icon-wrapper">
              <Clock size={32} />
            </div>
            <h3>Time</h3>
            <p>From: <span className="highlight">11h00</span></p>
            <p>To: <span className="highlight">12h30</span></p>
          </div>
          
          <div className="detail-card">
            <div className="icon-wrapper">
              <MapPin size={32} />
            </div>
            <h3>Location</h3>
            <p>UIT Campus</p>
            <p className="highlight">Quarter 34, Linh Xuan Ward</p>
            <p>Ho Chi Minh City</p>
          </div>
        </div>
        
        <div className="calendar-action text-center">
          <a 
            className="btn-primary" 
            href={googleCalendarUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add to Calendar
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
