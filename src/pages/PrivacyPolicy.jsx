import React from "react";
import './PolicyProcedures.css';
import backgroundImage from "../assets/maersk-container-ship.png";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      content: "This Privacy Policy explains how Worldwide Seafarers Recruitment Network (WSRN) collects, uses, and protects personal information of seafarers, agencies, shipping companies, and training centers."
    },
    {
      title: "GDPR Compliance",
      content: [
        "Users have the right to access, correct, or delete their personal data.",
        "All data processing complies with EU General Data Protection Regulation (GDPR).",
        "Data is stored securely using Firebase/Firestore encryption and access rules.",
        "Cookies used are strictly functional and non-tracking unless consented by user.",
        "We do not share user data with third parties without explicit permission."
      ]
    },
    {
      title: "User Rights",
      content: [
        "Access: Request a copy of your stored data.",
        "Rectification: Update or correct your profile.",
        "Erasure: Request deletion of your account and data.",
        "Restrict Processing: Pause visibility in job searches.",
        "Object: Opt out of marketing communications.",
        "Data Portability: Export your application history and documents."
      ]
    },
    {
      title: "Security Measures",
      content: [
        "All user data is encrypted in Firebase Firestore.",
        "Passwords are hashed and stored securely using Firebase Auth.",
        "2-step authentication available for admin and agency users.",
        "File uploads are scanned and restricted to PDF/images only.",
        "Login attempts are monitored and logged.",
        "No automated decision-making outside of AI match suggestions."
      ]
    },
    {
      title: "Cookie Policy",
      content: [
        "Authentication tokens – to keep you logged in.",
        "Language preferences – to display content in your preferred language.",
        "Analytics cookies – to improve site performance (Google Analytics).",
        "No tracking or advertising cookies are used unless explicitly enabled via user consent."
      ]
    },
    {
      title: "Legal Compliance",
      content: [
        "Lei da Proteção de Dados Pessoais (GDPR Portugal Implementation).",
        "Regime Geral das Entradas em Portugal (SEF / Visa compliance).",
        "Finanças Tax Authority Integration.",
        "Segurança Social (Social Security) Reporting."
      ]
    },
    {
      title: "Data Retention",
      content: "We retain user data as long as necessary to provide our services. Seafarers who resign or retire from the platform may request full data erasure. Agencies and shipping companies can manage data retention through their dashboard settings."
    },
    {
      title: "Anti-Fraud & Verification",
      content: [
        "Seafarers upload passport, seaman book, certificates.",
        "Agencies must provide official business registration details.",
        "Shipping companies must verify ownership of listed vessels.",
        "All sensitive data is reviewed manually before approval."
      ]
    }
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        paddingTop: "6rem",
        paddingBottom: "60px",
        boxSizing: "border-box",
      }}
      className="text-white text-left"
    >
      <div className="text-center mb-3">
        <h1 className="page-title">Privacy Policy & GDPR Compliance</h1>
        <p className="page-date">Effective Date: April 5, 2025</p>
      </div>

      <div className="policy-grid">
        {sections.map(({ title, content }, index) => (
          <div key={index} className="policy-box">
            <div className="policy-title">{title}</div>
            <div className="policy-text">
              {Array.isArray(content)
                ? content.map((item, i) => <p key={i}>{item}</p>)
                : <p>{content}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

