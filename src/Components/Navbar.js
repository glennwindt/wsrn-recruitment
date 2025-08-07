import React from 'react';
import './Header.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="logo">WSRN</h1>
      </div>

      <div className="navbar-center">
        <h2 className="title">Worldwide Seafarers Recruitment Network</h2>
        <p className="subtitle">Your Voyage, Our Mission</p>
      </div>

      <div className="navbar-right">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/policy">Policy & Procedures</a>

        <div className="dropdown">
          <button className="dropbtn">Login</button>
          <div className="dropdown-content">
            <a href="/login/seafarer">Seafarer</a>
            <a href="/login/agency">Agency</a>
            <a href="/login/company">Shipping Company</a>
            <a href="/login/training">Training Center</a>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropbtn">Register</button>
          <div className="dropdown-content">
            <a href="/register/seafarer">Seafarer</a>
            <a href="/register/agency">Agency</a>
            <a href="/register/company">Shipping Company</a>
            <a href="/register/training">Training Center</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

