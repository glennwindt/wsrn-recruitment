import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0a1a2f] text-white py-2 px-3">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-2">
        <h1 className="text-2xl font-bold">Privacy Policy & GDPR Compliance</h1>
        <p className="text-xs text-gray-300">Effective Date: April 5, 2025</p>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto mb-2 text-center">
        <h2 className="text-sm font-semibold">Jump to Section</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-xs mt-1">
          <a href="#introduction" className="underline hover:text-blue-400">Introduction</a>
          <a href="#gdpr" className="underline hover:text-blue-400">GDPR Compliance</a>
          <a href="#rights" className="underline hover:text-blue-400">User Rights</a>
          <a href="#security" className="underline hover:text-blue-400">Security Measures</a>
          <a href="#cookies" className="underline hover:text-blue-400">Cookie Policy</a>
          <a href="#legal" className="underline hover:text-blue-400">Legal Compliance</a>
          <a href="#retention" className="underline hover:text-blue-400">Data Retention</a>
          <a href="#verification" className="underline hover:text-blue-400">Anti-Fraud & Verification</a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-1 text-xs leading-tight">
        <section id="introduction">
          <h3 className="font-semibold">Introduction</h3>
          <p className="text-gray-200">
            This Privacy Policy explains how Worldwide Seafarers Recruitment Network (WSRN) collects, uses, and protects personal information of seafarers, agencies, shipping companies, and training centers.
          </p>
        </section>

        <section id="gdpr">
          <h3 className="font-semibold">GDPR Compliance</h3>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li>Users have the right to access, correct, or delete their personal data.</li>
            <li>All data processing complies with EU General Data Protection Regulation (GDPR).</li>
            <li>Data is stored securely using Firebase/Firestore encryption and access rules.</li>
            <li>Cookies used are strictly functional and non-tracking unless consented by user.</li>
            <li>We do not share user data with third parties without explicit permission.</li>
          </ul>
        </section>

        <section id="rights">
          <h3 className="font-semibold">User Rights</h3>
          <p className="text-gray-200">
            As a user of WSRN, you have the following rights:
          </p>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li><strong>Access:</strong> Request a copy of your stored data.</li>
            <li><strong>Rectification:</strong> Update or correct your profile.</li>
            <li><strong>Erasure:</strong> Request deletion of your account and data.</li>
            <li><strong>Restrict Processing:</strong> Pause visibility in job searches.</li>
            <li><strong>Object:</strong> Opt out of marketing communications.</li>
            <li><strong>Data Portability:</strong> Export your application history and documents.</li>
          </ul>
        </section>

        <section id="security">
          <h3 className="font-semibold">Security Measures</h3>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li>All user data is encrypted in Firebase Firestore.</li>
            <li>Passwords are hashed and stored securely using Firebase Auth.</li>
            <li>2-step authentication available for admin and agency users.</li>
            <li>File uploads are scanned and restricted to PDF/images only.</li>
            <li>Login attempts are monitored and logged.</li>
            <li>No automated decision-making outside of AI match suggestions.</li>
          </ul>
        </section>

        <section id="cookies">
          <h3 className="font-semibold">Cookie Policy</h3>
          <p className="text-gray-200">
            WSRN uses minimal cookies to enhance user experience:
          </p>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li><strong>Authentication tokens</strong> – to keep you logged in</li>
            <li><strong>Language preferences</strong> – to display content in your preferred language</li>
            <li><strong>Analytics cookies</strong> – to improve site performance (Google Analytics)</li>
          </ul>
          <p className="text-gray-400 italic">
            No tracking or advertising cookies are used unless explicitly enabled via user consent.
          </p>
        </section>

        <section id="legal">
          <h3 className="font-semibold">Legal Compliance</h3>
          <p className="text-gray-200">
            WSRN operates under Portuguese legal frameworks including:
          </p>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li>Lei da Proteção de Dados Pessoais (GDPR Portugal Implementation)</li>
            <li>Regime Geral das Entradas em Portugal (SEF / Visa compliance)</li>
            <li>Finanças Tax Authority Integration</li>
            <li>Segurança Social (Social Security) Reporting</li>
          </ul>
        </section>

        <section id="retention">
          <h3 className="font-semibold">Data Retention</h3>
          <p className="text-gray-200">
            We retain user data as long as necessary to provide our services. Seafarers who resign or retire from the platform may request full data erasure. Agencies and shipping companies can manage data retention through their dashboard settings.
          </p>
        </section>

        <section id="verification">
          <h3 className="font-semibold">Anti-Fraud & Verification</h3>
          <p className="text-gray-200">
            All seafarers and companies must verify their identity:
          </p>
          <ul className="list-disc list-inside space-y-0 text-gray-200">
            <li>Seafarers upload passport, seaman book, certificates</li>
            <li>Agencies must provide official business registration details</li>
            <li>Shipping companies must verify ownership of listed vessels</li>
            <li>All sensitive data is reviewed manually before approval</li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center text-[10px] text-gray-400">
        <p>&copy; {new Date().getFullYear()} WSRN. All rights reserved.</p>
        <p>Powered by oceans of opportunity</p>
      </footer>
    </div>
  );
}

