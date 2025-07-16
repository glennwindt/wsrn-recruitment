// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/wsrn-logo.png";

const heroImages = [
  "/images/lisbon-msc.jpg",
  "/images/rotterdam-harbor.jpg",
  "/images/cruiseship-rugged-shoreline.jpg",
  "/images/msc-at-sea.jpg",
  "/images/p&o-port.jpg"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterRedirect = (e) => {
    const role = e.target.value;
    if (role) {
      navigate(`/register/${role}`);
    }
  };

  return (
    <div className="homepage-container">
      <section
        className="homepage-hero"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
      >
        <div className="overlay">
          <div className="logo-emblem">
            <img src={logo} alt="WSRN Crest" />
          </div>
          <h1>WSRN: Connecting the Maritime World</h1>
          <p>
            Global recruitment for seafarers, shipping firms, agencies, and training centers.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <select
              onChange={handleRegisterRedirect}
              defaultValue=""
              className="register-dropdown"
            >
              <option value="" disabled>-- Register As --</option>
              <option value="seafarer">Seafarer</option>
              <option value="agency">Agency</option>
              <option value="shipping">Shipping Company</option>
              <option value="training">Training Center</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

