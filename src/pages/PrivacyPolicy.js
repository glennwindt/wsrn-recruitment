import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="container mx-auto mb-10">
        <h1 className="text-3xl font-bold">Privacy Policy & GDPR Compliance</h1>
        <p className="mt-2 text-gray-400">Effective Date: April 5, 2025</p>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            This Privacy Policy explains how Worldwide Seafarers Recruitment Network (WSRN) collects, uses, and protects personal information of seafarers, agencies, shipping companies, and training centers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Protection & GDPR Compliance</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Users have the right to access, correct, or delete their personal data.</li>
            <li>All data processing complies with EU General Data Protection Regulation (GDPR).</li>
            <li>Data is stored securely using Firebase/Firestore encryption and access rules.</li>
            <li>Cookies used are strictly functional and non-tracking unless consented by user.</li>
            <li>We do not share user data with third parties without explicit permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">User Rights Under GDPR</h2>
          <p className="text-gray-300 mb-4">
            As a user of WSRN, you have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Right to Access:</strong> You can request a copy of your stored data at any time.</li>
            <li><strong>Right to Rectification:</strong> You can update or correct your profile information.</li>
            <li><strong>Right to Erasure:</strong> You can request deletion of your account and data.</li>
            <li><strong>Right to Restrict Processing:</strong> You can pause your visibility in job searches.</li>
            <li><strong>Right to Object:</strong> You can opt out of marketing communications.</li>
            <li><strong>Right to Data Portability:</strong> You can export your application history and documents.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Security Measures</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>All user data is encrypted in Firebase Firestore</li>
            <li>Passwords are hashed and stored securely using Firebase Auth</li>
            <li>2-step authentication available for admin and agency users</li>
            <li>File uploads are scanned and restricted to PDF/images only</li>
            <li>Login attempts are monitored and logged</li>
            <li>No automated decision-making outside of AI match suggestions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
          <p className="text-gray-300">
            WSRN uses minimal cookies to enhance user experience. These include:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
            <li><strong>Authentication tokens</strong> – to keep you logged in</li>
            <li><strong>Language preferences</strong> – to display content in your preferred language</li>
            <li><strong>Analytics cookies</strong> – to improve site performance (Google Analytics)</li>
          </ul>
          <p className="mt-4 text-gray-400 italic">
            No tracking or advertising cookies are used unless explicitly enabled via user consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Legal Compliance (Portugal & EU)</h2>
          <p className="text-gray-300 mb-4">
            WSRN operates under Portuguese legal frameworks including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Lei da Proteção de Dados Pessoais (GDPR Portugal Implementation)</li>
            <li>Regime Geral das Entradas em Portugal (SEF / Visa compliance)</li>
            <li>Finanças Tax Authority Integration</li>
            <li>Segurança Social (Social Security) Reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Retention Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            We retain user data as long as necessary to provide our services. Seafarers who resign or retire from the platform may request full data erasure. Agencies and shipping companies can manage data retention through their dashboard settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Anti-Fraud & Verification</h2>
          <p className="text-gray-300 leading-relaxed">
            All seafarers and companies must verify their identity:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-300">
            <li>Seafarers upload passport, seaman book, certificates</li>
            <li>Agencies must provide official business registration details</li>
            <li>Shipping companies must verify ownership of listed vessels</li>
            <li>All sensitive data is reviewed manually before approval</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} WSRN - Worldwide Seafarers Recruitment Network</p>
          <p className="mt-2 text-sm">Built with ❤️ for Portugal's future in global maritime</p>
        </div>
      </footer>
    </div>
  );
}