import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      © {year} WSRN. All rights reserved. | Powered by oceans of opportunity
    </footer>
  );
};

export default Footer;

