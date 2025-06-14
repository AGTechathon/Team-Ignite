import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, languages } from '../context/LanguageContext';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { translations, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="/health-logo.svg"
                  alt="Health Assistant Logo"
                />
                <span className="ml-2 text-xl font-bold text-gray-800">ArogyaAi</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.home}
              </Link>
              <Link to="/schemes" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.governmentSchemes}
              </Link>
              <Link to="/voice-chat" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.voiceChat}
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.profile}
              </Link>
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {Object.entries(languages).map(([key, lang]) => (
                    <option key={key} value={key}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.home}
              </Link>
              <Link to="/schemes" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.governmentSchemes}
              </Link>
              <Link to="/voice-chat" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.voiceChat}
              </Link>
              <Link to="/profile" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.profile}
              </Link>
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <select
                  value={currentLanguage}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  {Object.entries(languages).map(([key, lang]) => (
                    <option key={key} value={key}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">{translations.yourHealthAssistant}</span>
            <span className="block text-blue-500">{translations.withAI}</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {translations.getHealthAdvice}
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 space-x-4">
            <div className="rounded-md shadow">
              <Link
                to="/voice-chat"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                {translations.startVoiceChat}
              </Link>
            </div>
            <div className="mt-3 sm:mt-0">
              <Link
                to="/schemes"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                {translations.viewSchemes}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{translations.voiceChatFeature}</h3>
              <p className="mt-2 text-base text-gray-500">
                {translations.voiceChatDesc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{translations.schemesFeature}</h3>
              <p className="mt-2 text-base text-gray-500">
                {translations.schemesDesc}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{translations.personalFeature}</h3>
              <p className="mt-2 text-base text-gray-500">
                {translations.personalDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{translations.aboutUs}</h3>
              <p className="text-gray-400 text-sm">
                {translations.getHealthAdvice}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{translations.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/voice-chat" className="text-gray-400 hover:text-white text-sm">
                    {translations.voiceChat}
                  </Link>
                </li>
                <li>
                  <Link to="/schemes" className="text-gray-400 hover:text-white text-sm">
                    {translations.governmentSchemes}
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="text-gray-400 hover:text-white text-sm">
                    {translations.profile}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white text-sm">
                    {translations.help}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Government Schemes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{translations.governmentSchemes}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    आयुष्मान भारत
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    जननी सुरक्षा योजना
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    राष्ट्रीय स्वास्थ्य मिशन
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    और योजनाएं...
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{translations.contactUs}</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>{translations.tollFree}: 1800-XXX-XXXX</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>support@healthassistant.gov.in</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-400 text-sm">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{translations.newDelhi}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                {translations.copyright}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  {translations.privacyPolicy}
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  {translations.termsOfUse}
                </a>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  {translations.help}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

