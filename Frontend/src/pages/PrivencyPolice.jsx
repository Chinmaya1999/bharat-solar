// src/components/PrivencyPolice.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivencyPolice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Helmet>
        <title>Privacy Policy - Bharat Solar Solution</title>
        <meta name="description" content="Read Bharat Solar Solution's privacy policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
      
      {/* Header with solar theme */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">Your privacy is important to us at Bharat Solar Solution. Learn how we protect your information.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-12">
          <div className="flex items-center mb-8">
            <div className="bg-emerald-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Our Commitment to Your Privacy</h2>
          </div>
          
          <p className="mb-6 text-gray-700">
            At Bharat Solar Solution, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website, use our services, 
            or interact with us regarding our solar energy solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Solar-Focused Data Protection</h3>
              <p className="text-gray-700">
                We understand that solar solutions involve significant investments. We protect your project data, energy usage information, 
                and financial details with industry-standard security measures.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
              <h3 className="text-lg font-semibold text-emerald-800 mb-3">Transparency in Energy</h3>
              <p className="text-gray-700">
                Just as we provide transparent information about solar panel performance and energy savings, we're transparent about how we 
                handle your personal information.
              </p>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-10">
            <Section 
              title="Information We Collect" 
              icon="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            >
              <p className="mb-4">We collect information to provide better solar solutions and services to you. This includes:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-medium">Personal Information:</span> Name, email, phone number, address when you request a solar consultation or quote</li>
                <li><span className="font-medium">Project Details:</span> Information about your property, energy consumption, and solar requirements</li>
                <li><span className="font-medium">Technical Data:</span> Details about your roof structure, shading analysis, and electrical system</li>
                <li><span className="font-medium">Usage Information:</span> How you interact with our website and solar resources</li>
                <li><span className="font-medium">Financial Information:</span> Payment details for solar system purchases or installations</li>
              </ul>
            </Section>

            <Section 
              title="How We Use Your Information" 
              icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            >
              <p className="mb-4">Your information helps us deliver the best solar solutions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Designing customized solar energy systems for your property</li>
                <li>Processing orders and installations of solar panels and equipment</li>
                <li>Providing accurate solar energy production estimates and savings calculations</li>
                <li>Communicating about your solar project, maintenance, and performance monitoring</li>
                <li>Improving our solar products, services, and educational resources</li>
                <li>Compliance with renewable energy regulations and standards</li>
                <li>Marketing relevant solar solutions and promotions (with your consent)</li>
              </ul>
            </Section>

            <Section 
              title="Data Sharing and Disclosure" 
              icon="M8 11h3v10h2V11h3l-4-4-4 4zm-4 8v2h16v-2H4z"
            >
              <p className="mb-4">Bharat Solar Solution values your privacy and shares information only when necessary:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Installation Partners:</span> With certified solar installers for project execution</li>
                <li><span className="font-medium">Equipment Manufacturers:</span> For warranty registration of solar panels and inverters</li>
                <li><span className="font-medium">Financial Institutions:</span> For processing solar loans or financing options</li>
                <li><span className="font-medium">Government Agencies:</span> For renewable energy incentive programs and certifications</li>
                <li><span className="font-medium">Service Providers:</span> Companies that support our operations (e.g., CRM, monitoring systems)</li>
                <li><span className="font-medium">Legal Requirements:</span> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4 text-gray-700">
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </Section>

            <Section 
              title="Data Security" 
              icon="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            >
              <p className="mb-4">We implement robust security measures to protect your solar project information:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Encryption of sensitive data during transmission and storage</li>
                <li>Secure access controls to solar project databases</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Employee training on data protection and privacy</li>
                <li>Physical security measures at our solar facilities</li>
              </ul>
              <p className="text-gray-700">
                While we strive to protect your information, no security system is impenetrable. We cannot guarantee absolute security 
                but we commit to implementing industry best practices for solar businesses.
              </p>
            </Section>

            <Section 
              title="Your Privacy Rights" 
              icon="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            >
              <p className="mb-4">As a valued customer of Bharat Solar Solution, you have rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-medium">Access:</span> Request details about the solar-related information we hold about you</li>
                <li><span className="font-medium">Correction:</span> Update inaccurate or incomplete solar project information</li>
                <li><span className="font-medium">Deletion:</span> Request deletion of your personal data under certain circumstances</li>
                <li><span className="font-medium">Opt-out:</span> Unsubscribe from solar marketing communications</li>
                <li><span className="font-medium">Data Portability:</span> Request a copy of your solar project data in a machine-readable format</li>
              </ul>
              <p className="mt-4 text-gray-700">
                To exercise these rights, please contact our Data Protection Officer at privacy@bharatsolarsolution.com. We may require 
                verification of your identity before processing your request.
              </p>
            </Section>

            <Section 
              title="Solar-Specific Data Retention" 
              icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            >
              <p className="mb-4">We retain your solar-related information for as long as necessary:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><span className="font-medium">Active Customers:</span> For the duration of your solar system's lifecycle (typically 25+ years)</li>
                <li><span className="font-medium">Prospective Customers:</span> Up to 3 years from last contact, unless you request deletion</li>
                <li><span className="font-medium">Financial Records:</span> As required by tax and accounting regulations (typically 7 years)</li>
                <li><span className="font-medium">Warranty Information:</span> For the warranty period of your solar equipment</li>
              </ul>
              <p className="text-gray-700">
                We securely archive solar project data that may be needed for future maintenance, warranty claims, or system upgrades.
              </p>
            </Section>

            <Section 
              title="Changes to This Policy" 
              icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            >
              <p className="mb-4">
                As solar technology evolves, we may update this Privacy Policy. The latest version will always be available on our website.
              </p>
              <p className="text-gray-700">
                We will notify you of significant changes through email or prominent notices on our website, especially if they affect 
                how we handle your solar project information.
              </p>
            </Section>

            <Section 
              title="Contact Us" 
              icon="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            >
              <p className="mb-4">
                For questions about this Privacy Policy or your solar project data, please contact our Privacy Officer:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-medium">Bharat Solar Solution</p>
                <p className="mt-2">Email: saiadityabehera@bharatsolarsolution.com</p>
                <p>Phone: 7377899573</p>
                <p className="mt-4">Mailing Address:</p>
                <p>Data Protection Officer</p>
                <p>Bharat Solar Solution</p>
                <p>7Q39+8X9, Shreekhetra Vihar, Khandagiri, Bhubaneswar</p>
                <p>Shankarpur, Odisha 751019</p>
              </div>
              <p className="mt-4 text-gray-700">
                Last Updated: July 26, 2025
              </p>
            </Section>
          </div>
        </div>
        
        <div className="bg-emerald-700 text-white rounded-xl p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-2xl font-bold mb-4">Committed to Sustainable and Secure Practices</h3>
            <p className="text-lg mb-6">
              At Bharat Solar Solution, we believe in harnessing the power of the sun responsibly. 
              Just as we protect the environment with clean energy, we protect your personal information with rigorous privacy practices.
            </p>
            <div className="flex justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Reusable section component
const Section = ({ title, children, icon }) => {
  return (
    <section className="border-l-4 border-emerald-500 pl-6 py-2">
      <div className="flex items-center mb-4">
        <div className="bg-emerald-100 p-2 rounded-lg mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="ml-10">
        {children}
      </div>
    </section>
  );
};

export default PrivencyPolice;