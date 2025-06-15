import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, translations, setLanguage } = useLanguage();

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
              <Link to="/assistant" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.personalAssistant.title}
              </Link>
              <Link to="/hospital-call" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.hospitalCall}
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                {translations.profile}
              </Link>
              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="bn">বাংলা</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="mr">मराठी</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ml">മലയാളം</option>
                  <option value="pa">ਪੰਜਾਬੀ</option>
                  <option value="ur">اردو</option>
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
              <Link to="/assistant" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.personalAssistant.title}
              </Link>
              <Link to="/hospital-call" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.hospitalCall}
              </Link>
              <Link to="/profile" className="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">
                {translations.profile}
              </Link>
              {/* Mobile Language Selector */}
              <div className="px-3 py-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="bn">বাংলা</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                  <option value="mr">मराठी</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ml">മലയാളം</option>
                  <option value="pa">ਪੰਜਾਬੀ</option>
                  <option value="ur">اردو</option>
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
            <div className="mt-3 sm:mt-0">
              <Link
                to="/offlineChat"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                {translations.viewOfflineChat}
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

            {/* Feature 4 - Hospital Call */}
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{translations.hospitalCallFeature}</h3>
              <p className="mt-2 text-base text-gray-500">
                {translations.hospitalCallDesc}
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
            <div>
              <h3 className="text-lg font-semibold mb-4">{translations.aboutUs}</h3>
              <p className="text-gray-400">
                {translations.copyright}
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{translations.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white">
                    {translations.privacyPolicy}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    {translations.termsOfUse}
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white">
                    {translations.help}
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{translations.contactUs}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{translations.tollFree}: 1800-XXX-XXXX</li>
                <li>{translations.email}: support@arogyai.com</li>
                <li>{translations.address}: {translations.newDelhi}</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

