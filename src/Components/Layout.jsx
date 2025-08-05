import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingLogo from './FloatingLogo';
import ChatAgentWidget from './ChatAgentWidget';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isTrackingPage = location.pathname === "/tracking";

  return (
    <div className="layout-wrapper">
      {/* ✅ Conditional header */}
      {!isTrackingPage ? (
        <header className="header-global">
          <div className="title-line">Worldwide Seafarers Recruitment Network</div>
          <div className="subtitle-line">Your Voyage, Our Mission</div>
        </header>
      ) : (
        <div className="black-bar">
          <h2>📋 Task Tracking Dashboard</h2>
        </div>
      )}

      <Navbar />
      <FloatingLogo />

      <div className="content-area">
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>

      <ChatAgentWidget />
    </div>
  );
}

