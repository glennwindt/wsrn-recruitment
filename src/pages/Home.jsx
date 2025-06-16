import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Worldwide Seafarers Recruitment Network
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Your Voyage. Our Mission.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <a href="/register" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
              Register as Seafarer
            </a>
            <a href="/dashboard" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition border border-gray-600">
              Access Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold">A Calling Rooted in Service</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Although I was born in Curaçao, in the Dutch Caribbean, and have spent most of my life in the Netherlands, I am now proud to reside in Portugal, where I have lived for the past three years. My journey has been driven by a strong desire to contribute positively to Portugal’s economy and social development.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Guided by a spiritual perspective that emphasizes integrity, service, and positive engagement, I believe that success is rooted in purpose and ethical action. This project reflects not only my entrepreneurial spirit but also my sincere desire to make a meaningful contribution — driven by the conviction that work rooted in integrity can create lasting positive change for Portugal’s future.
          </p>
        </div>
      </section>

      {/* Platform Vision */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold">Our Mission</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                My goal with WSRN - Worldwide Seafarers Recruitment Network is to establish an innovative, responsible, and sustainable platform that strengthens Portugal’s role in the global maritime industry.
              </p>
              <p className="text-gray-300 text-lg">
                With a firm belief in the transformative potential of technology and AI, my vision is to streamline recruitment, legal procedures, and payroll management for seafarers and shipping companies worldwide.
              </p>
              <p className="text-gray-300 text-lg">
                My dedication, grounded in spiritual values, fuels my unwavering commitment to uphold Portuguese laws, contribute to the local economy, and help Portugal become a leader in maritime staffing and innovation.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="text-xl font-semibold">Platform Highlights</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <span><strong>AI-Powered Matching:</strong> Smart filtering based on vessel type, experience level, and boarding preferences.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <span><strong>Legal Processing:</strong> Integrated system for Visa, NIF, SEF, NISS, AIMA applications under Portuguese law.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <span><strong>Payroll System:</strong> Full compliance with Portuguese tax and social security reporting.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <span><strong>Video Interview Tool:</strong> Schedule interviews and onboard candidates remotely.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></span>
                  <span><strong>Training Center Integration:</strong> Global database of certified training centers for future seafarers.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services for */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Serving Maritime Stakeholders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Seafarers</h3>
              <p className="text-gray-300">
                Free registration. Profile creation. Boarding preference selection. Certification tracking. AI-powered job matching.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Agencies</h3>
              <p className="text-gray-300">
                Commission or membership-based access. Define vessel requirements. Match applicants using AI engine. View candidate profiles.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Shipping Companies</h3>
              <p className="text-gray-300">
                Post vessel positions. Define salaries and schedule. Get matched with qualified applicants. Manage payroll under Portuguese law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose WSRN */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Why Choose WSRN?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Spiritually Grounded</h3>
              <p className="text-gray-300">
                Built on values of integrity, service, and purpose. Every action taken aligns with divine calling and ethical responsibility.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Legally Compliant</h3>
              <p className="text-gray-300">
                Designed for full compliance with Portuguese immigration, taxation, and social security regulations.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">AI-Driven Recruitment</h3>
              <p className="text-gray-300">
                Matches applicants to opportunities using vessel type, experience level, and schedule preferences.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
              <p className="text-gray-300">
                Works with seafarers, agencies, and shipping companies worldwide — with special support for EU inland waterways and domestic operations in any country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center mt-16">
        <p>&copy; {new Date().getFullYear()} WSRN - Built with ❤️ in Portugal</p>
        <p className="mt-2 text-sm">For global maritime staffing and legal compliance under Portuguese Law</p>
        <div className="mt-6 flex justify-center gap-6">
          <a href="/about" className="hover:text-blue-400">About Us</a>
          <a href="/legal" className="hover:text-blue-400">Legal Process</a>
          <a href="/dashboard" className="hover:text-blue-400">Admin Dashboard</a>
        </div>
      </footer>
    </div>
  );
}