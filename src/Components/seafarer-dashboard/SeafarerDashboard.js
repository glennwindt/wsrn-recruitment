import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet";
import { fetchCrewProfile, checkCertificateExpiry } from "../../utils/seafarerUtils";
import "./SeafarerDashboard.css";

export default function SeafarerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [readinessScore, setReadinessScore] = useState(0);

  useEffect(() => {
    async function loadProfile() {
      const data = await fetchCrewProfile(user.uid);
      setProfile(data);

      const alertFlags = checkCertificateExpiry(data.certificates || []);
      setAlerts(alertFlags);

      const score = data.certificates?.length >= 3 ? 85 : 60;
      setReadinessScore(score);
    }

    if (user?.uid) {
      loadProfile();
    }
  }, [user?.uid]);

  return (
    <main className="seafarer-dashboard">
      <Helmet>
        <title>WSRN Seafarer Dashboard</title>
        <meta
          name="description"
          content="View your certification status, crew readiness score, and upcoming training alerts — all through WSRN’s secure seafarer dashboard."
        />
      </Helmet>

      <header className="dashboard-header">
        <h1>Welcome, {profile?.firstName || "Crew Member"}</h1>
        <p>Your nationality: {profile?.nationality || "—"}</p>
        <p>Experience Level: {profile?.experienceLevel || "—"}</p>
        <p>WSRN Readiness Score: <strong>{readinessScore}%</strong></p>
      </header>

      <section className="dashboard-alerts">
        <h2>📄 Document Status</h2>
        {alerts.length > 0 ? (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index} className="alert-item">{alert}</li>
            ))}
          </ul>
        ) : (
          <p>✅ All documents are valid. You're ready for deployment.</p>
        )}
      </section>

      <section className="dashboard-summary">
        <h2>🛳 Boarding Preferences</h2>
        <ul>
          {(profile?.boardingPreferences || []).map((pref, idx) => (
            <li key={idx}>{pref}</li>
          ))}
        </ul>
      </section>

      <section className="dashboard-actions">
        <button className="refresh-training-button">
          Request Refresher Training
        </button>
        <button className="update-documents-button">
          Upload / Update Documents
        </button>
      </section>

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} WSRN – Seafarer Empowerment via Global Navigation</p>
      </footer>
    </main>
  );
}

