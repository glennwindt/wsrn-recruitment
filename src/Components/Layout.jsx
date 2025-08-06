// src/components/Layout.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
// import FloatingLogo from './FloatingLogo'; // ⛔️ Already commented out
import ChatAgentWidget from './ChatAgentWidget';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isTrackingPage = location.pathname === "/tracking";

  return (
    <div className="layout-wrapper">
      {/* 🔹 Global Header (hidden on /tracking) */}
      {/* {!isTrackingPage && (
        <header className="header-global">
          <div className="title-line">Worldwide Seafarers Recruitment Network</div>
          <div className="subtitle-line">Your Voyage, Our Mission</div>
        </header>
      )} */}

      {/* 🔹 Tracking Dashboard Header */}
      {isTrackingPage && (
        <header className="header-dashboard">
          <h2>📋 Task Tracking Dashboard</h2>
        </header>
      )}

      {/* 🔹 Global Navigation */}
      <Navbar />
      {/* <FloatingLogo /> */}

      {/* 🔹 Main Content */}
      <div className="content-area">
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* 🔹 Chat Widget */}
      <ChatAgentWidget />
    </div>
  );
}

