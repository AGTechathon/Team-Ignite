import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const languages = {
  hindi: {
    name: 'हिंदी',
    code: 'hi',
    translations: {
      home: 'मुख्य पृष्ठ',
      governmentSchemes: 'सरकारी योजनाएं',
      voiceChat: 'आवाज़ चैट',
      profile: 'प्रोफ़ाइल',
      aboutUs: 'हमारे बारे में',
      quickLinks: 'त्वरित लिंक',
      contactUs: 'संपर्क करें',
      privacyPolicy: 'निजता नीति',
      termsOfUse: 'उपयोग की शर्तें',
      help: 'सहायता',
      startVoiceChat: 'आवाज़ से बात करें',
      viewSchemes: 'सरकारी योजनाएं देखें',
      yourHealthAssistant: 'आपका स्वास्थ्य सहायक',
      withAI: 'AI के साथ',
      getHealthAdvice: 'अपनी भाषा में स्वास्थ्य सलाह प्राप्त करें। बोलकर या लिखकर अपनी समस्या बताएं।',
      voiceChatFeature: 'आवाज़ से बात करें',
      voiceChatDesc: 'अपनी भाषा में बोलकर अपनी समस्या बताएं',
      schemesFeature: 'सरकारी योजनाएं',
      schemesDesc: 'सभी स्वास्थ्य योजनाओं की जानकारी प्राप्त करें',
      personalFeature: 'व्यक्तिगत सहायता',
      personalDesc: 'अपनी प्रोफ़ाइल बनाएं और व्यक्तिगत सहायता प्राप्त करें',
      copyright: '© 2024 स्वास्थ्य सहायक। सर्वाधिकार सुरक्षित।',
      tollFree: 'टोल फ्री',
      email: 'ईमेल',
      address: 'पता',
      newDelhi: 'नई दिल्ली, भारत',
      selectLanguage: 'भाषा चुनें'
    }
  },
  english: {
    name: 'English',
    code: 'en',
    translations: {
      home: 'Home',
      governmentSchemes: 'Government Schemes',
      voiceChat: 'Voice Chat',
      profile: 'Profile',
      aboutUs: 'About Us',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfUse: 'Terms of Use',
      help: 'Help',
      startVoiceChat: 'Start Voice Chat',
      viewSchemes: 'View Schemes',
      yourHealthAssistant: 'Your Health Assistant',
      withAI: 'with AI',
      getHealthAdvice: 'Get health advice in your language. Speak or type your symptoms.',
      voiceChatFeature: 'Voice Chat',
      voiceChatDesc: 'Speak your symptoms in your language',
      schemesFeature: 'Government Schemes',
      schemesDesc: 'Get information about all health schemes',
      personalFeature: 'Personal Assistance',
      personalDesc: 'Create your profile and get personalized help',
      copyright: '© 2024 Health Assistant. All rights reserved.',
      tollFree: 'Toll Free',
      email: 'Email',
      address: 'Address',
      newDelhi: 'New Delhi, India',
      selectLanguage: 'Select Language'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('hindi');

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, translations: languages[currentLanguage].translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 