import React from "react";

export default function About() {
  return (
    <div style={{
      backgroundColor: "#0d1117",
      color: "#c9d1d9",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      padding: "2rem"
    }}>

      {/* Header */}
      <header style={{
        textAlign: "center",
        marginBottom: "2rem"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "0.5rem"
        }}>Worldwide Seafarers Recruitment Network</h1>
        <p style={{ color: "#8b949d" }}>Your Voyage, Our Mission</p>
      </header>

      {/* Founder & Background */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#161b22",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>Founder & Visionary</h2>
        <p>
          Although I was born in Curaçao, in the Dutch Caribbean, and have spent most of my life in the Netherlands, I am now proud to reside in Portugal, where I have lived for the past three years. My journey has been driven by a strong desire to contribute positively to Portugal’s economy and social development.
        </p>
        <br />
        <p>
          Guided by a spiritual perspective that emphasizes integrity, service, and positive engagement, I believe that success is rooted in purpose and ethical action. WSRN reflects this commitment — combining innovation with responsibility to serve a growing global maritime industry.
        </p>
      </section>

      {/* Spiritual Values */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#161b22",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>Spiritual Values & Motivation</h2>
        <p>
          My spirituality provides the foundation for my commitment to building a trustworthy, impactful, and sustainable business. I see this venture not only as a professional pursuit but also as a calling to serve and uplift the community, aligning my personal values with my business goals.
        </p>
        <br />
        <p>
          This platform reflects my personal values and divine task: to bridge the material and spiritual worlds through work that honors integrity, respects law, and supports global unity.
        </p>
      </section>

      {/* Company Mission */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#161b22",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>Company Mission</h2>
        <p>
          My goal with WSRN - Worldwide Seafarers Recruitment Network is to establish an innovative, responsible, and sustainable platform that strengthens Portugal’s role in the global maritime industry. With a firm belief in the transformative potential of technology and AI, my vision is to streamline recruitment, legal procedures, and payroll management for seafarers and shipping companies worldwide.
        </p>
        <br />
        <p>
          My dedication, grounded in my spiritual values, fuels my unwavering commitment to uphold Portuguese laws, contribute to the local economy, and help Portugal become a leader in maritime staffing and innovation.
        </p>
      </section>

      {/* Compliance & Integration */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#161b22",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>Compliance & Integration</h2>
        <p>
          WSRN is being built with full compliance to Portuguese law and international social security regulations for seafarers. It will provide a structured, secure, and transparent environment for seafarers, agencies, and shipping companies alike.
        </p>
        <br />
        <p>
          Portugal has offered me the opportunity to rebuild and reshape my vision for a better maritime staffing network. I aim to support foreign seafarers who wish to work under Portuguese law, offering them access to visa processing, NIF registration, and SEF application tracking through WSRN’s automated system.
        </p>
      </section>

      {/* A Word for Those Who Serve the Sea */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#1e252f",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>A Word for Those Who Serve the Sea</h2>
        <p>
          The Shipping Industry is one of the oldest and most essential global networks — silently carrying the lifeblood of modern society across oceans.
        </p>
        <br />
        <p>
          Each seafarer and every shipping corporation contributes to the most important demands in the present and future — ensuring daily necessities reach households and technologies support corporations around the world.
        </p>
        <br />
        <p>
          We are still the pride of the transition from traditional to modernized transportation. As the world evolves, so do we — growing stronger, serving better, and helping humanity live the improved way of life they truly deserve.
        </p>
        <br />
        <p style={{ fontStyle: "italic", color: "#795e26" }}>
          Through WSRN, I serve a higher calling: to unite people, restore integrity, and ensure that even in the vastness of the sea, no soul feels unseen or unsupported.
        </p>
      </section>

      {/* Final Note: Encouragement to Nurture New Talent */}
      <section style={{
        maxWidth: "800px",
        margin: "0 auto 3rem",
        padding: "1.5rem",
        backgroundColor: "#161b22",
        borderRadius: "10px"
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#58a6ff",
          marginBottom: "1rem"
        }}>A Final Word to Agencies & Shipping Companies</h2>
        <p>
          While WSRN empowers you to find certified, experienced crew members through our AI-powered matching system, I also encourage agencies and shipping companies to remember that every seasoned seafarer once began their journey at sea.
        </p>
        <br />
        <p>
          The industry grows not just by maintaining high standards, but by nurturing new talent — by offering entry-level crew the chance to learn, serve, and rise.
        </p>
        <br />
        <p className="italic" style={{ color: "#795e26" }}>
          By opening your onboard positions to both certified and entry-level candidates, you help shape the next generation of skilled, dedicated mariners who will carry forward the legacy of safe, responsible, and human-centered global trade.
        </p>
        <br />
        <p style={{ color: "#58a6ff" }}>
          This is more than staffing.  
          It is stewardship.  
          It is sustainability.  
          It is the spirit of innovation — rooted in compassion.
        </p>
      </section>

      {/* Back to Homepage Button */}
      <div style={{
        textAlign: "center",
        marginTop: "3rem"
      }}>
        <a href="/" style={{
          display: "inline-block",
          backgroundColor: "#238636",
          color: "white",
          padding: "0.75rem 1.2rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          transition: "background 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#2ea043"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#238636"}>
          ← Back to Homepage
        </a>
      </div>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        marginTop: "5rem",
        color: "#7d8590",
        fontSize: "0.9rem",
        borderTop: "1px solid #30363d",
        paddingTop: "2rem"
      }}>
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
        <p>For global maritime staffing and legal compliance under Portuguese Law</p>
      </footer>
    </div>
  );
}