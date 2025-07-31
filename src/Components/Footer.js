import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <p>&copy; {new Date().getFullYear()} Glenn's Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

