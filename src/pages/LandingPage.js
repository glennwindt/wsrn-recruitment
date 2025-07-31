// src/pages/LandingPage.js

import React from 'react';
import './LandingPage.css';

// 📸 Image imports
import cruiseHero from '../assets/iona-cruise-ship.jpg';
import rotterdamGlobal from '../assets/rotterdam-river-vessel-skyline.jpg';
import dockedSailboats from '../assets/docked-marina-sailboats-city.jpg';

const LandingPage = () => {
  return (
    <main className="landing-page">

      {/* 🌅 Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${cruiseHero})` }}
        aria-label="Hero section with welcome message"
      >
        <div className="overlay">
          <h1>Welcome Aboard WSRN</h1>
          <p>Your digital harbor for maritime connection, purpose, and community.</p>
          <div className="cta-buttons">
            <button type="button">Join the Crew</button>
            <button type="button">Explore the Network</button>
          </div>
        </div>
      </section>

      {/* 🌉 How It Works Section */}
      <section
        className="how-it-works"
        style={{ backgroundImage: `url(${rotterdamGlobal})` }}
        aria-label="Description of how the network works"
      >
        <div className="overlay">
          <h2>How WSRN Works</h2>
          <ul>
            <li>Agencies and Seafarers connect with trust</li>
            <li>Shipping Companies find talent and stability</li>
            <li>Global ports meet spirit and systems</li>
          </ul>
        </div>
      </section>

      {/* ⛵ Who We Serve Section */}
      <section
        className="audience"
        style={{ backgroundImage: `url(${dockedSailboats})` }}
        aria-label="Target audience overview"
      >
        <div className="overlay">
          <h2>Who We Serve</h2>
          <div className="audience-cards">
            <div className="card">Seafarers seeking purpose</div>
            <div className="card">Agencies with heart</div>
            <div className="card">Shipping partners with soul</div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;

