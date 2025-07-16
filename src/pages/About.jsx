// src/pages/About.jsx

import React from "react";
import shipBackground from "../assets/container-ship.jpg";

export default function About() {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${shipBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    padding: "2rem",
    color: "#c9d1d9",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    overflowX: "hidden" // ✅ Prevent horizontal scroll
  };

  const sectionStyle = {
    backgroundColor: "rgba(22, 27, 34, 0.6)",
    padding: "1.5rem",
    borderRadius: "10px",
    marginBottom: "2rem",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
    boxSizing: "border-box" // ✅ Prevent overflow
  };

  return (
    <main style={backgroundStyle}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "900",
          marginBottom: "0.5rem",
          color: "#ffffff"
        }}>
          Worldwide Seafarers Recruitment Network
        </h1>
        <p style={{
          color: "#cce0ff",
          fontWeight: "600"
        }}>
          Your Voyage, Our Mission
        </p>
        <p style={{
          fontStyle: "italic",
          color: "#58a6ff",
          marginTop: "0.5rem"
        }}>
          Portugal is our harbor—but the world is our ocean.
        </p>
      </header>

      {/* Section Blocks */}
      {[
        {
          title: "Founder & Visionary",
          content: [
            "Although I was born in Curaçao, in the Dutch Caribbean, and have spent most of my life in the Netherlands, I am now proud to reside in Portugal, where I have lived for the past three years.",
            "Guided by a spiritual perspective that emphasizes integrity, service, and positive engagement, I believe that success is rooted in purpose and ethical action."
          ]
        },
        {
          title: "Spiritual Values & Motivation",
          content: [
            "My spirituality provides the foundation for building a trustworthy, impactful, and sustainable business.",
            "This platform reflects my personal values and divine task: to bridge the material and spiritual worlds through work that honors integrity, respects law, and supports global unity."
          ]
        },
        {
          title: "Company Mission",
          content: [
            "My goal with WSRN is to establish an innovative, responsible, and sustainable platform that strengthens Portugal’s role in the global maritime industry.",
            "With a firm belief in the transformative power of technology and AI, my vision is to streamline recruitment, legal procedures, and payroll management for global shipping."
          ]
        },
        {
          title: "Compliance & Integration",
          content: [
            "WSRN is built with full compliance to Portuguese law and international seafarer regulations.",
            "I aim to support foreign seafarers through automated visa, NIF, SEF, and payroll workflows."
          ]
        },
        {
          title: "A Word for Those Who Serve the Sea",
          content: [
            "The shipping industry is one of the oldest and most essential global networks.",
            "As the world evolves, we grow stronger, serve better, and help humanity thrive.",
            "Through WSRN, I serve a higher calling: to unite people, restore integrity, and ensure no soul at sea feels unseen or unsupported."
          ]
        },
        {
          title: "A Final Word to Agencies & Shipping Companies",
          content: [
            "WSRN empowers agencies to find experienced crew through smart matching tools.",
            "But every seasoned seafarer once started as a learner — and we must nurture the next generation.",
            "This is more than staffing. It is stewardship. It is sustainability. It is the spirit of innovation — rooted in compassion."
          ]
        }
      ].map(({ title, content }, index) => (
        <section key={index} style={sectionStyle}>
          <h2 style={{
            fontSize: "1.8rem",
            color: "#58a6ff",
            marginBottom: "1rem"
          }}>{title}</h2>
          {content.map((para, i) => (
            <p key={i} style={{ marginBottom: "1rem" }}>{para}</p>
          ))}
        </section>
      ))}

      {/* Back Button */}
      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <a href="/" style={{
          display: "inline-block",
          backgroundColor: "#238636",
          color: "white",
          padding: "0.75rem 1.2rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#2ea043"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#238636"}>
          ← Back to Homepage
        </a>
      </div>
    </main>
  );
}
