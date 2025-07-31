import React from "react";
import shipBackground from "../images/containership.jpg";
import "./About.css";
import DevTracker from "../components/DevTracker";

export default function About() {
  const sections = [
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
  ];

  return (
    <div
      className="about-background"
      style={{ backgroundImage: `url(${shipBackground})` }}
    >
      <header className="about-header">
        <h1 className="about-title">Worldwide Seafarers Recruitment Network</h1>
        <p className="about-subtitle">Your Voyage, Our Mission</p>
        <p className="about-tagline tagline-large">
          Portugal is our harbor—but the world is our ocean.
        </p>
      </header>

      <img
        src={shipBackground}
        alt="Container ship near shoreline"
        className="about-hero-image"
      />

      <div className="about-box unified">
        {sections.map(({ title, content }, idx) => (
          <section key={idx} className="section-block">
            <h2 className="about-box-title">{title}</h2>
            <div className="about-box-paragraphs">
              {content.map((para, i) => (
                <p key={i} className="about-box-text">{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="about-footer">
        <a href="/" className="back-button">← Back to Homepage</a>
      </footer>

      <div className="dev-tracker-container">
        <DevTracker />
      </div>
    </div>
  );
}

