import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_CONFIG from '../api/config';

// Language translations
const translations = {
  en: {
    title: "Symptom Analyzer",
    describeSymptoms: "Describe Your Symptoms",
    speakSymptoms: "Speak Symptoms",
    stop: "Stop",
    listening: "Listening...",
    analyzeSymptoms: "Analyze Symptoms",
    analyzing: "Analyzing...",
    reset: "Reset",
    assessmentResult: "Assessment Result",
    riskLevel: "Risk Level",
    recommendedMedicines: "Recommended Medicines",
    recoveryAdvice: "Recovery Advice",
    foodRecommendations: "Food Recommendations",
    importantNotice: "Important Notice",
    noticeText: "This is not a substitute for professional medical advice. Consult a doctor if:",
    noticePoints: [
      "Symptoms worsen or persist beyond 3 days",
      "You experience severe pain or high fever",
      "You have pre-existing medical conditions"
    ],
    disclaimer: "This local AI analyzes 50+ common symptoms without internet connection.",
    emergency: "For emergencies, always contact local healthcare providers.",
    invalidInput: "Please enter valid symptoms",
    emptyInput: "Please enter your symptoms",
    unknownSymptoms: "Unknown symptoms detected",
    consultDoctor: "Consult a doctor",
    immediately: "Immediately",
    professionalAdvice: "Get professional medical advice",
    rest: "Get adequate rest",
    hydration: "Maintain hydration",
    monitorSymptoms: "Monitor symptoms closely",
    seekHelp: "Seek medical help if symptoms worsen",
    symptomNotRecognized: "Symptom not recognized. Please consult a doctor.",
    symptomAnalysis: "Based on your symptoms, medical attention is recommended.",
    painReliever: "Pain reliever (if needed)",
    asNeeded: "As needed",
    followInstructions: "Follow package instructions",
    avoidStrain: "Avoid physical strain"
  },
  hi: {
    title: "लक्षण विश्लेषक",
    describeSymptoms: "अपने लक्षणों का वर्णन करें",
    speakSymptoms: "लक्षण बोलें",
    stop: "रोकें",
    listening: "सुन रहा है...",
    analyzeSymptoms: "लक्षणों का विश्लेषण करें",
    analyzing: "विश्लेषण कर रहा है...",
    reset: "रीसेट",
    assessmentResult: "मूल्यांकन परिणाम",
    riskLevel: "जोखिम स्तर",
    recommendedMedicines: "अनुशंसित दवाएं",
    recoveryAdvice: "स्वास्थ्य लाभ सलाह",
    foodRecommendations: "भोजन सुझाव",
    importantNotice: "महत्वपूर्ण सूचना",
    noticeText: "यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। निम्नलिखित स्थितियों में डॉक्टर से संपर्क करें:",
    noticePoints: [
      "लक्षण 3 दिनों से अधिक काल तक बने रहें या बिगड़ें",
      "गंभीर दर्द या तेज बुखार हो",
      "पहले से कोई चिकित्सीय स्थिति हो"
    ],
    disclaimer: "यह स्थानीय AI इंटरनेट कनेक्शन के बिना 50+ सामान्य लक्षणों का विश्लेषण करता है।",
    emergency: "आपात स्थिति में, हमेशा स्थानीय स्वास्थ्य सेवा प्रदाताओं से संपर्क करें।",
    invalidInput: "कृपया वैद्यकीय लक्षणों का विश्लेषण करें",
    emptyInput: "कृपया अपने लक्षणों का वर्णन करें",
    unknownSymptoms: "अज्ञात लक्षण विद्यमान हैं",
    consultDoctor: "डॉक्टर से संपर्क करें",
    immediately: "तुरंत",
    professionalAdvice: "विशेषज्ञ चिकित्सा सलाह प्राप्त करें",
    invalidInput: "कृपया वैद्यकीय लक्षणों का विश्लेषण करें",
    symptomNotRecognized: "वैद्यकीय लक्षण नहीं विद्यमान है। कृपया डॉक्टर से संपर्क करें।",
    symptomAnalysis: "आपके लक्षणों के आधार पर, चिकित्सा की आवश्यकता है।",
    painReliever: "यदि आवश्यक हो तो दर्द का उपचार (यदि आवश्यक हो)",
    asNeeded: "जब आवश्यक हो",
    followInstructions: "पैकेज के निर्देशों का पालन करें",
    avoidStrain: "शारीरिक विरोधी करने का प्रयास करें"
  },
  mr: {
    title: "लक्षण विश्लेषक",
    describeSymptoms: "आपल्या लक्षणांचे वर्णन करा",
    speakSymptoms: "लक्षणे बोला",
    stop: "थांबवा",
    listening: "ऐकत आहे...",
    analyzeSymptoms: "लक्षणांचे विश्लेषण करा",
    analyzing: "विश्लेषण करत आहे...",
    reset: "रीसेट",
    assessmentResult: "मूल्यांकन परिणाम",
    riskLevel: "जोखीम पातळी",
    recommendedMedicines: "शिफारस केलेल्या औषधी",
    recoveryAdvice: "बरे होण्यासाठी सल्ला",
    foodRecommendations: "अन्न शिफारसी",
    importantNotice: "महत्वाची सूचना",
    noticeText: "हे व्यावसायिक वैद्यकीय सल्ल्याचा पर्याय नाही. खालील परिस्थितीत डॉक्टरांशी संपर्क साधा:",
    noticePoints: [
      "लक्षणे 3 दिवसांपेक्षा जास्त काळ टिकतात किंवा वाढतात",
      "तीव्र वेदना किंवा ताप येतो",
      "पूर्वीची वैद्यकीय समस्या आहे"
    ],
    disclaimer: "हे स्थानिक AI इंटरनेट कनेक्शनशिवाय 50+ सामान्य लक्षणांचे विश्लेषण करते.",
    emergency: "आपत्कालीन परिस्थितीत, नेहमी स्थानिक आरोग्य सेवा प्रदात्यांशी संपर्क साधा.",
    invalidInput: "कृपया वैद्यकीय लक्षणों का विश्लेषण करें"
  },
  ta: {
    title: "அறிகுறி பகுப்பாய்வு",
    describeSymptoms: "உங்கள் அறிகுறிகளை விவரிக்கவும்",
    speakSymptoms: "அறிகுறிகளை பேசுங்கள்",
    stop: "நிறுத்து",
    listening: "கேட்கிறது...",
    analyzeSymptoms: "அறிகுறிகளை பகுப்பாய்வு செய்யுங்கள்",
    analyzing: "பகுப்பாய்வு செய்கிறது...",
    reset: "மீட்டமை",
    assessmentResult: "மதிப்பீட்டு முடிவு",
    riskLevel: "இடர் நிலை",
    recommendedMedicines: "பரிந்துரைக்கப்பட்ட மருந்துகள்",
    recoveryAdvice: "மீட்பு ஆலோசனைகள்",
    foodRecommendations: "உணவு பரிந்துரைகள்",
    importantNotice: "முக்கிய அறிவிப்பு",
    noticeText: "இது தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. பின்வரும் சூழ்நிலைகளில் மருத்துவரை அணுகவும்:",
    noticePoints: [
      "அறிகுறிகள் மோசமடைகின்றன அல்லது 3 நாட்களுக்கு மேல் நீடிக்கின்றன",
      "கடுமையான வலி அல்லது உயர் காய்ச்சல் ஏற்படுகிறது",
      "முன்னரே உள்ள மருத்துவ நிலைமைகள் உள்ளன"
    ],
    disclaimer: "இந்த உள்ளூர் AI இணைய இணைப்பு இல்லாமல் 50+ பொதுவான அறிகுறிகளை பகுப்பாய்வு செய்கிறது.",
    emergency: "அவசரகால சூழ்நிலைகளில், எப்போதும் உள்ளூர் சுகாதார சேவை வழங்குநர்களை தொடர்பு கொள்ளவும்.",
    invalidInput: "வைத்திரம் விவரிக்கவும்"
  },
  te: {
    title: "లక్షణ విశ్లేషకుడు",
    describeSymptoms: "మీ లక్షణాలను వివరించండి",
    speakSymptoms: "లక్షణాలు మాట్లాడండి",
    stop: "ఆపండి",
    listening: "వింటున్నాడు...",
    analyzeSymptoms: "లక్షణాలను విశ్లేషించండి",
    analyzing: "విశ్లేషిస్తున్నాడు...",
    reset: "రీసెట్",
    assessmentResult: "మూల్యాంకన ఫలితం",
    riskLevel: "రిస్క్ స్థాయి",
    recommendedMedicines: "సిఫార్సు చేసిన మందులు",
    recoveryAdvice: "కోలుకోవడానికి సలహాలు",
    foodRecommendations: "ఆహార సూచనలు",
    importantNotice: "ముఖ్యమైన నోటీసు",
    noticeText: "ఇది వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. ఈ క్రింది పరిస్థితులలో వైద్యుడిని సంప్రదించండి:",
    noticePoints: [
      "లక్షణాలు మరింత తీవ్రమవుతాయి లేదా 3 రోజులకు మించి కొనసాగుతాయి",
      "తీవ్రమైన నొప్పి లేదా అధిక జ్వరం ఉంటే",
      "మునుపటి వైద్య పరిస్థితులు ఉంటే"
    ],
    disclaimer: "ఈ స్థానిక AI ఇంటర్నెట్ కనెక్షన్ లేకుండా 50+ సాధారణ లక్షణాలను విశ్లేషిస్తుంది.",
    emergency: "అత్యవసర పరిస్థితులలో, ఎల్లప్పుడూ స్థానిక ఆరోగ్య సేవా ప్రదాతలను సంప్రదించండి.",
    invalidInput: "వైద్యకు వివరించండి"
  },
  kn: {
    title: "ರೋಗಲಕ್ಷಣ ವಿಶ್ಲೇಷಕ",
    describeSymptoms: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
    speakSymptoms: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ಮಾತನಾಡಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    listening: "ಕೇಳುತ್ತಿದೆ...",
    analyzeSymptoms: "ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ",
    analyzing: "ವಿಶ್ಲేಷಿಸುತ್ತಿದೆ...",
    reset: "ಮರುಹೊಂದಿಸಿ",
    assessmentResult: "ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶ",
    riskLevel: "ಅಪಾಯ ಮಟ್ಟ",
    recommendedMedicines: "ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಿಗಳು",
    recoveryAdvice: "ಆರೋಗ್ಯ ಲಾಭ ಸಲಹೆಗಳು",
    foodRecommendations: "ಆಹಾರ ಶಿಫಾರಸುಗಳು",
    importantNotice: "ಮುಖ್ಯ ಸೂಚನೆ",
    noticeText: "ಇದು ವೃತ್ತಿಪರ ವೈದ్ಯಕೀಯ ಸಲಹೆಗೆ ಪರ್ಯಾಯವಲ್ಲ. ಈ ಕೆಳಗಿನ ಸಂದರ್ಭಗಳಲ್ಲಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ:",
    noticePoints: [
      "ರೋಗಲಕ್ಷಣಗಳು 3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚು ಕಾಲ ಇರುತ್ತವೆ ಅಥವಾ ಉಲ್ಬಣಗೊಳ್ಳುತ್ತವೆ",
      "ತೀವ್ರ ನೋವು ಅಥವಾ ಹೆಚ್ಚಿನ ಜ್ವರ ಇದ್ದರೆ",
      "ಮೊದಲೇ ವೈದ್ಯಕೀಯ ಸ್ಥಿತಿಗಳು ಇದ್ದರೆ"
    ],
    disclaimer: "ಈ ಸ್ಥಳೀಯ AI ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲದೆ 50+ ಸಾಮಾನ್ಯ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.",
    emergency: "ಅತ್ಯವಸರ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ, ಯಾವಾಗಲೂ ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    invalidInput: "ವೈದ್యಕు ವಿವರಿಂಚಿರಿ"
  },
  sa: {
    title: "लक्षणविश्लेषकः",
    describeSymptoms: "भवतः लक्षणानि वर्णयतु",
    speakSymptoms: "लक्षणानि वदतु",
    stop: "विरमतु",
    listening: "शृणोति...",
    analyzeSymptoms: "लक्षणानि विश्लेषयतु",
    analyzing: "विश्लेषयति...",
    reset: "पुनःस्थापयतु",
    assessmentResult: "मूल्याङ्कनपरिणामः",
    riskLevel: "जोखिमस्तरः",
    recommendedMedicines: "अनुशंसितौषधानि",
    recoveryAdvice: "स्वास्थ्यलाभसलाहाः",
    foodRecommendations: "आहारसुझावाः",
    importantNotice: "महत्वपूर्णसूचना",
    noticeText: "एतत् व्यावसायिकवैद्यकीयसलाहायाः विकल्पः नास्ति। एतासु परिस्थितिषु वैद्यं संपर्कयतु:",
    noticePoints: [
      "लक्षणानि 3 दिनेभ्यः अधिकं कालं तिष्ठन्ति वा वर्धन्ते",
      "तीव्रवेदना वा उच्चज्वरः भवति",
      "पूर्ववैद्यकीयस्थितयः सन्ति"
    ],
    disclaimer: "एषः स्थानीयः AI इंटरनेटसंपर्कं विना 50+ सामान्यलक्षणानि विश्लेषयति।",
    emergency: "आपत्कालीनपरिस्थितिषु, सर्वदा स्थानीयस्वास्थ्यसेवाप्रदातृभिः संपर्कं कुर्वन्तु।",
    invalidInput: "वैद्यकीय लक्षणों का विश्लेषण करें"
  }
};

// Add symptom translations
const symptomTranslations = {
  en: {
    fever: 'fever',
    headache: 'headache',
    cough: 'cough',
    diarrhea: 'diarrhea',
    stomachache: 'stomachache',
    soreThroat: 'sore throat',
    depression: 'depression',
    menstrualPain: 'menstrual pain',
    jointPain: 'joint pain',
    eczema: 'eczema',
    stress: 'stress',
    constipation: 'constipation',
    backPain: 'back pain',
    dizziness: 'dizziness',
    acne: 'acne',
    anxiety: 'anxiety',
    cold: 'cold',
    vomiting: 'vomiting',
    chestPain: 'chest pain',
    snakeBite: 'snake bite'
  },
  hi: {
    fever: 'बुखार',
    headache: 'सिरदर्द',
    cough: 'खांसी',
    diarrhea: 'दस्त',
    stomachache: 'पेटदर्द',
    soreThroat: 'गले में खराश',
    depression: 'अवसाद',
    menstrualPain: 'मासिक धर्म में दर्द',
    jointPain: 'जोड़ों में दर्द',
    eczema: 'एक्जिमा',
    stress: 'तनाव',
    constipation: 'कब्ज',
    backPain: 'पीठदर्द',
    dizziness: 'चक्कर',
    acne: 'मुंहासे',
    anxiety: 'चिंता',
    cold: 'सर्दी',
    vomiting: 'उल्टी',
    chestPain: 'छाती में दर्द',
    snakeBite: 'सांप का काटना'
  },
  mr: {
    fever: 'ताप',
    headache: 'डोकेदुखी',
    cough: 'खोकला',
    diarrhea: 'अतिसार',
    stomachache: 'पोटदुखी',
    soreThroat: 'घसादुखी',
    depression: 'नैराश्य',
    menstrualPain: 'मासिक पाळी दुखी',
    jointPain: 'सांधेदुखी',
    eczema: 'एक्झिमा',
    stress: 'तणाव',
    constipation: 'मलबद्धता',
    backPain: 'पाठदुखी',
    dizziness: 'चक्कर',
    acne: 'मुरुम',
    anxiety: 'चिंता',
    cold: 'सर्दी',
    vomiting: 'उलटी',
    chestPain: 'छातीदुखी',
    snakeBite: 'सापाचे चावणे'
  },
  ta: {
    fever: 'காய்ச்சல்',
    headache: 'தலைவலி',
    cough: 'இருமல்',
    diarrhea: 'வயிற்றுப்போக்கு',
    stomachache: 'வயிற்று வலி',
    soreThroat: 'தொண்டை வலி',
    depression: 'மனச்சோர்வு',
    menstrualPain: 'மாதவிடாய் வலி',
    jointPain: 'மூட்டு வலி',
    eczema: 'சரும அழற்சி',
    stress: 'மன அழுத்தம்',
    constipation: 'மலச்சிக்கல்',
    backPain: 'முதுகு வலி',
    dizziness: 'தலைச்சுற்றல்',
    acne: 'முகப்பரு',
    anxiety: 'கவலை',
    cold: 'ஜலు஬ు',
    vomiting: 'வாந்தி',
    chestPain: 'மார்பு வலி',
    snakeBite: 'பாம்பு கடி'
  },
  te: {
    fever: 'జ్వరం',
    headache: 'తలనొప్పి',
    cough: 'దగ్గు',
    diarrhea: 'అతిసారం',
    stomachache: 'ఉదరవ్యాధి',
    soreThroat: 'గొంతు నొప్పి',
    depression: 'అవసాదం',
    menstrualPain: 'రజస్వలా నొప్పి',
    jointPain: 'కీళ్ళ నొప్పి',
    eczema: 'ఎక్జిమా',
    stress: 'ఒత్తిడి',
    constipation: 'మలబద్ధకం',
    backPain: 'వెన్ను నొప్పి',
    dizziness: 'తల తిరుగుడు',
    acne: 'మొటిమలు',
    anxiety: 'ఆందోళన',
    cold: 'జలుబు',
    vomiting: 'వాంతి',
    chestPain: 'ఛాతీ నొప్పి',
    snakeBite: 'పాము కాటు'
  },
  kn: {
    fever: 'ಜ್ವರ',
    headache: 'ತಲೆನೋವು',
    cough: 'ಎದೆಗೆಟ್ಟು',
    diarrhea: 'ಅತಿಸಾರ',
    stomachache: 'ಹೊಟ್ಟೆನೋವು',
    soreThroat: 'ಗಂಟಲು ನೋವು',
    depression: 'ಖಿನ್ನತೆ',
    menstrualPain: 'ಮುಟ್ಟಿನ ನೋವು',
    jointPain: 'ಜಂಟಿ ನೋವು',
    eczema: 'ಎಕ್ಸಿಮಾ',
    stress: 'ಒತ್ತಡ',
    constipation: 'ಮಲಬದ್ಧತೆ',
    backPain: 'ಬೆನ್ನುನೋವು',
    dizziness: 'ತಲೆತಿರುಗುವಿಕೆ',
    acne: 'ಮೊಡವೆ',
    anxiety: 'ಆತಂಕ',
    cold: 'ಜ್ವರ',
    vomiting: 'ವಾಂತಿ',
    chestPain: 'ಎದೆನೋವು',
    snakeBite: 'ಹಾವಿನ ಕಡಿತ'
  },
  sa: {
    fever: 'ज्वरः',
    headache: 'शिरोवेदना',
    cough: 'कासः',
    diarrhea: 'अतिसारः',
    stomachache: 'उदरवेदना',
    soreThroat: 'कण्ठवेदना',
    depression: 'विषादः',
    menstrualPain: 'ऋतुवेदना',
    jointPain: 'सन्धिवेदना',
    eczema: 'विस्फोटः',
    stress: 'तनावः',
    constipation: 'मलबद्धता',
    backPain: 'पृष्ठवेदना',
    dizziness: 'भ्रमः',
    acne: 'मुखदूषिका',
    anxiety: 'चिन्ता',
    cold: 'शीतज्वरः',
    vomiting: 'वमनम्',
    chestPain: 'हृदयवेदना',
    snakeBite: 'सर्पदंशः'
  }
};

// Add food translations
const foodTranslations = {
  en: {
    coconutWater: 'Coconut water for electrolytes',
    bananas: 'Bananas for potassium',
    boiledVegetables: 'Boiled vegetables for easy digestion',
    herbalTeas: 'Herbal teas (ginger, tulsi)',
    magnesiumFoods: 'Magnesium-rich foods (spinach, almonds)',
    gingerTea: 'Ginger tea',
    caffeine: 'Caffeine in small amounts',
    watermelon: 'Watermelon for hydration',
    turmericMilk: 'Warm turmeric milk',
    gingerHoneyTea: 'Ginger-honey tea',
    steamedVegetables: 'Steamed vegetables',
    chickenSoup: 'Chicken soup',
    whiteRice: 'White rice',
    boiledPotatoes: 'Boiled potatoes',
    toast: 'Toast or crackers',
    boiledRice: 'Boiled rice',
    steamedApples: 'Steamed apples',
    plainYogurt: 'Plain yogurt',
    warmSoups: 'Warm soups',
    honeyWater: 'Honey with warm water',
    mashedPotatoes: 'Mashed potatoes',
    softFruits: 'Soft fruits (bananas, papaya)',
    salmon: 'Omega-3 rich fish (salmon)',
    berries: 'Berries and dark leafy greens',
    nutsSeeds: 'Nuts and seeds',
    darkChocolate: 'Dark chocolate (in moderation)',
    lowFatYogurt: 'Low-fat yogurt',
    turmericMilk2: 'Turmeric milk',
    fattyFish: 'Fatty fish (anti-inflammatory)',
    greenTea: 'Green tea',
    flaxseeds: 'Flaxseeds (omega-3)',
    probioticYogurt: 'Probiotic yogurt',
    greenLeafy: 'Green leafy vegetables',
    chamomileTea: 'Chamomile tea',
    avocados: 'Avocados',
    oats: 'Oats (serotonin booster)',
    papaya: 'Papaya',
    prunes: 'Prunes or raisins',
    leafyGreens: 'Leafy greens',
    calciumFoods: 'Calcium-rich foods (milk, curd)',
    antiInflammatory: 'Anti-inflammatory foods (turmeric, berries)',
    omega3: 'Omega-3 (fish, flaxseed)',
    saltyCrackers: 'Salty crackers (if BP is low)',
    fruitJuices: 'Fruit juices',
    tomatoes: 'Tomatoes (lycopene)',
    pumpkinSeeds: 'Zinc-rich foods (pumpkin seeds)',
    lowGlycemic: 'Low-glycemic fruits (apples, berries)',
    fermentedFoods: 'Fermented foods (curd)',
    walnuts: 'Walnuts and almonds',
    freshFruits: 'Fresh fruits and vegetables',
    wholeGrains: 'Whole grains',
    leanProteins: 'Lean proteins',
    healthyFats: 'Healthy fats'
  },
  mr: {
    coconutWater: 'इलेक्ट्रोलाइट्ससाठी नारळ पाणी',
    bananas: 'पोटॅशियमसाठी केळी',
    boiledVegetables: 'सहज पचण्यासाठी उकडलेल्या भाज्या',
    herbalTeas: 'हर्बल चहा (आले, तुळस)',
    magnesiumFoods: 'मॅग्नेशियमयुक्त पदार्थ (पालक, बदाम)',
    gingerTea: 'आले चहा',
    caffeine: 'कमी प्रमाणात कॅफीन',
    watermelon: 'पाणी साठवण्यासाठी टरबूज',
    turmericMilk: 'गरम हळद दूध',
    gingerHoneyTea: 'आले-मध चहा',
    steamedVegetables: 'वाफवलेल्या भाज्या',
    chickenSoup: 'चिकन सूप',
    whiteRice: 'पांढरा तांदूळ',
    boiledPotatoes: 'उकडलेले बटाटे',
    toast: 'टोस्ट किंवा क्रॅकर्स',
    boiledRice: 'उकडलेला तांदूळ',
    steamedApples: 'वाफवलेली सफरचंद',
    plainYogurt: 'साधा दही',
    warmSoups: 'गरम सूप',
    honeyWater: 'मध आणि गरम पाणी',
    mashedPotatoes: 'मॅश केलेले बटाटे',
    softFruits: 'मऊ फळे (केळी, पपई)',
    salmon: 'ओमेगा-3 युक्त मासे (सॅल्मन)',
    berries: 'बेरी आणि गडद पाने असलेल्या भाज्या',
    nutsSeeds: 'काजू आणि बिया',
    darkChocolate: 'डार्क चॉकलेट (मर्यादित प्रमाणात)',
    lowFatYogurt: 'कमी चरबीयुक्त दही',
    turmericMilk2: 'हळद दूध',
    fattyFish: 'चरबीयुक्त मासे (दाहक विरोधी)',
    greenTea: 'हिरवा चहा',
    flaxseeds: 'अलसीचे बिया (ओमेगा-3)',
    probioticYogurt: 'प्रोबायोटिक दही',
    greenLeafy: 'हिरव्या पानांच्या भाज्या',
    chamomileTea: 'कॅमोमाइल चहा',
    avocados: 'एव्होकॅडो',
    oats: 'ओट्स (सेरोटोनिन बूस्टर)',
    papaya: 'पपई',
    prunes: 'सुका मनुका किंवा द्राक्ष',
    leafyGreens: 'पानांच्या भाज्या',
    calciumFoods: 'कॅल्शियमयुक्त पदार्थ (दूध, दही)',
    antiInflammatory: 'दाहक विरोधी पदार्थ (हळद, बेरी)',
    omega3: 'ओमेगा-3 (मासे, अलसी)',
    saltyCrackers: 'खारे क्रॅकर्स (रक्तदाब कमी असल्यास)',
    fruitJuices: 'फळांचे रस',
    tomatoes: 'टोमॅटो (लायकोपीन)',
    pumpkinSeeds: 'झिंकयुक्त पदार्थ (कोहळ्याच्या बिया)',
    lowGlycemic: 'कमी ग्लायसेमिक फळे (सफरचंद, बेरी)',
    fermentedFoods: 'किण्वित पदार्थ (दही)',
    walnuts: 'अक्रोड आणि बदाम',
    freshFruits: 'ताजी फळे आणि भाजी',
    wholeGrains: 'संपूर्ण धान्ये',
    leanProteins: 'कमी चरबीयुक्त प्रथिने',
    healthyFats: 'निरोगी चरबी'
  }
  // Add similar translations for other languages (hi, ta, te, kn, sa)
};

const OfflineChat = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize speech recognition
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
    }
  }, []);

  // Get language code for speech recognition
  const getLanguageCode = (language) => {
    switch (language) {
      case 'en': return 'en-US';
      case 'hi': return 'hi-IN';
      case 'mr': return 'mr-IN';
      case 'ta': return 'ta-IN';
      case 'te': return 'te-IN';
      case 'kn': return 'kn-IN';
      case 'sa': return 'sa-IN';
      default: return 'en-US';
    }
  };

  // Start recording
  const startRecording = () => {
    if (recognition) {
      recognition.lang = getLanguageCode(selectedLanguage);
      
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setUserInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      setIsRecording(true);
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  // Transcribe audio using Google Speech-to-Text API
  const transcribeAudio = async (audioBlob) => {
    try {
      setIsLoading(true);
      
      if (!API_CONFIG.GOOGLE_CLOUD_API_KEY) {
        throw new Error('Google Cloud API key is not configured. Please check your .env file.');
      }

      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];

        const response = await axios.post(
          `https://speech.googleapis.com/v1/speech:recognize?key=${API_CONFIG.GOOGLE_CLOUD_API_KEY}`,
          {
            config: {
              encoding: 'WEBM_OPUS',
              sampleRateHertz: 16000,
              languageCode: getLanguageCode(selectedLanguage),
              enableAutomaticPunctuation: true,
              model: 'default'
            },
            audio: {
              content: base64Audio
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.results && response.data.results[0]) {
          const transcription = response.data.results[0].alternatives[0].transcript;
          setUserInput(transcription);
        } else {
          console.log('No transcription results:', response.data);
          alert('No speech detected. Please try again.');
        }
        
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Error transcribing audio:', error.response?.data || error);
      setIsLoading(false);
      alert(error.message || 'Error transcribing audio. Please try again.');
    }
  };

  // Get placeholder text based on selected language
  const getPlaceholderText = () => {
    switch (selectedLanguage) {
      case 'hi':
        return 'उदाहरण: मुझे कल से बुखार और सिरदर्द है...';
      case 'mr':
        return 'उदाहरण: मला कालपासून ताप आणि डोकेदुखी आहे...';
      case 'ta':
        return 'எடுத்துக்காட்டு: எனக்கு நேற்று முதல் காய்ச்சல் மற்றும் தலைவலி...';
      case 'te':
        return 'ఉదాహరణ: నాకు నిన్న నుండి జ్వరం మరియు తలనొప్పి...';
      case 'kn':
        return 'ಉದಾಹರಣೆ: ನನಗೆ ನಿನ್ನೆ ಮೊದಲು ಜ್ವರ ಮತ್ತು ತಲೆನೋವು...';
      case 'sa':
        return 'उदाहरणम्: मम ज्वरः शिरोवेदना च...';
      default:
        return 'Example: I have fever and headache since yesterday...';
    }
  };

  // Local symptom knowledge base (50+ conditions)
  const symptomDatabase = {
    fever: {
      risk: 'moderate',
      description: 'Elevated body temperature often indicating infection',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg every 6 hours', caution: 'Max 4g/day' },
        { name: 'Ibuprofen', dosage: '200-400mg every 6-8 hours', caution: 'Take with food' }
      ],
      recovery: [
        'Rest adequately',
        'Maintain hydration (3-4L daily)',
        'Use cool compresses',
        'Monitor temperature every 4 hours'
      ],
      foods: [
        'Coconut water for electrolytes',
        'Bananas for potassium',
        'Boiled vegetables for easy digestion',
        'Herbal teas (ginger, tulsi)'
      ]
    },
    headache: {
      risk: 'low',
      description: 'Pain in head or neck region',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg every 6 hours', caution: 'Avoid with liver disease' },
        { name: 'Aspirin', dosage: '325mg every 4 hours', caution: 'Not for children' }
      ],
      recovery: [
        'Rest in quiet, dark room',
        'Apply cold compress to forehead',
        'Gentle neck massage',
        'Practice relaxation techniques'
      ],
      foods: [
        'Magnesium-rich foods (spinach, almonds)',
        'Ginger tea',
        'Caffeine in small amounts',
        'Watermelon for hydration'
      ]
    },
    // Add 48+ more conditions below following the same pattern
    cough: {
      risk: 'low',
      description: 'Reflex action to clear throat or airway',
      medicines: [
        { name: 'Dextromethorphan', dosage: '10-20mg every 4-6 hours', caution: 'Not for chronic cough' },
        { name: 'Honey', dosage: '1-2 teaspoons as needed', caution: 'Not for infants under 1' }
      ],
      recovery: [
        'Stay hydrated',
        'Use humidifier',
        'Avoid irritants (smoke, dust)',
        'Elevate head while sleeping'
      ],
      foods: [
        'Warm turmeric milk',
        'Ginger-honey tea',
        'Steamed vegetables',
        'Chicken soup'
      ]
    },
    diarrhea: {
      risk: 'moderate',
      description: 'Frequent loose or watery stools',
      medicines: [
        { name: 'ORS solution', dosage: 'After each loose stool', caution: 'Continue normal feeding' },
        { name: 'Loperamide', dosage: '4mg initially, then 2mg after each stool', caution: 'Max 16mg/day' }
      ],
      recovery: [
        'Maintain oral rehydration',
        'Wash hands frequently',
        'Avoid dairy initially',
        'Rest digestive system'
      ],
      foods: [
        'Bananas',
        'White rice',
        'Boiled potatoes',
        'Toast or crackers'
      ]
    },
    stomachache: {
      risk: 'low',
      description: 'Pain or discomfort in abdominal area',
      medicines: [
        { name: 'Antacids', dosage: 'As directed on package', caution: 'Don\'t overuse' },
        { name: 'Peppermint oil capsules', dosage: '1-2 capsules as needed', caution: 'Not for GERD' }
      ],
      recovery: [
        'Apply warm compress',
        'Practice deep breathing',
        'Avoid lying down immediately after eating',
        'Gentle abdominal massage'
      ],
      foods: [
        'Boiled rice',
        'Steamed apples',
        'Ginger tea',
        'Plain yogurt'
      ]
    },
    soreThroat: {
      risk: 'low',
      description: 'Irritation or pain in the throat, often with difficulty swallowing',
      medicines: [
        { name: 'Lozenges', dosage: 'As needed', caution: 'Avoid overuse' },
        { name: 'Salt water gargle', dosage: '3-4 times a day', caution: 'Do not swallow' }
      ],
      recovery: [
        'Gargle with warm salt water',
        'Use throat sprays',
        'Avoid cold drinks',
        'Take warm fluids'
      ],
      foods: [
        'Warm soups',
        'Honey with warm water',
        'Mashed potatoes',
        'Soft fruits (bananas, papaya)'
      ]
    },
    depression: {
      risk: 'high',
      description: 'Persistent sadness, loss of interest, fatigue',
      medicines: [
        { name: 'Sertraline (SSRI)', dosage: '50mg daily', caution: 'Only under medical supervision' },
        { name: 'Vitamin D', dosage: '600–1000 IU/day', caution: 'Check deficiency first' }
      ],
      recovery: [
        'Talk therapy (counseling)',
        'Regular physical activity',
        'Maintain routine sleep & meals',
        'Avoid alcohol or drugs'
      ],
      foods: [
        'Omega-3 rich fish (salmon)',
        'Berries and dark leafy greens',
        'Nuts and seeds',
        'Dark chocolate (in moderation)'
      ]
    },
    'menstrual Pain': {
      risk: 'low',
      description: 'Cramping pain during menstruation',
      medicines: [
        { name: 'Ibuprofen', dosage: '200-400mg every 6 hrs', caution: 'Take after food' },
        { name: 'Mefenamic acid', dosage: '250mg thrice a day', caution: 'Not for ulcers or kidney issues' }
      ],
      recovery: [
        'Use heating pad on lower abdomen',
        'Light yoga or stretches',
        'Stay hydrated',
        'Track cycle for better prep'
      ],
      foods: [
        'Bananas (potassium)',
        'Ginger tea',
        'Dark leafy greens',
        'Low-fat yogurt'
      ]
    },
    'joint Pain': {
      risk: 'moderate',
      description: 'Discomfort or inflammation in joints',
      medicines: [
        { name: 'Paracetamol', dosage: '500-1000mg every 6 hrs', caution: 'Max 4g/day' },
        { name: 'Diclofenac Gel', dosage: 'Apply thin layer', caution: 'External use only' }
      ],
      recovery: [
        'Gentle stretches & exercise',
        'Use hot or cold compress',
        'Rest inflamed joint',
        'Maintain healthy weight'
      ],
      foods: [
        'Turmeric milk',
        'Fatty fish (anti-inflammatory)',
        'Berries',
        'Green tea'
      ]
    },
    eczema: {
      risk: 'low',
      description: 'Skin condition causing dry, itchy patches',
      medicines: [
        { name: 'Hydrocortisone cream', dosage: 'Apply twice daily', caution: 'Avoid long-term use' },
        { name: 'Antihistamines', dosage: 'As needed for itching', caution: 'May cause drowsiness' }
      ],
      recovery: [
        'Use fragrance-free moisturizers',
        'Avoid hot showers',
        'Keep nails trimmed',
        'Use cotton clothing'
      ],
      foods: [
        'Flaxseeds (omega-3)',
        'Probiotic yogurt',
        'Turmeric',
        'Green leafy vegetables'
      ]
    },
    stress: {
      risk: 'moderate',
      description: 'Mental tension due to demanding circumstances',
      medicines: [
        { name: 'Ashwagandha', dosage: '300mg twice daily', caution: 'Consult before long-term use' },
        { name: 'B-complex vitamins', dosage: '1 tablet daily', caution: 'Only if deficient' }
      ],
      recovery: [
        'Take short breaks',
        'Practice meditation or breathing',
        'Reduce screen time',
        'Spend time in nature or hobbies'
      ],
      foods: [
        'Chamomile tea',
        'Avocados',
        'Berries (antioxidants)',
        'Oats (serotonin booster)'
      ]
    },
    constipation: {
      risk: 'low',
      description: 'Difficulty in emptying the bowels',
      medicines: [
        { name: 'Lactulose', dosage: '15-30ml once daily', caution: 'Not for long-term use' },
        { name: 'Psyllium husk', dosage: '1-2 teaspoons with water', caution: 'Must drink plenty of fluids' }
      ],
      recovery: [
        'Increase fiber intake',
        'Drink warm water in the morning',
        'Regular exercise',
        "Don't ignore urge to go"
      ],
      foods: [
        'Papaya',
        'Oats',
        'Prunes or raisins',
        'Leafy greens'
      ]
    },
    backPain: {
      risk: 'moderate',
      description: 'Pain in the lower or upper back due to strain or posture',
      medicines: [
        { name: 'Ibuprofen', dosage: '400mg every 6-8 hrs', caution: 'Take with food' },
        { name: 'Muscle relaxants', dosage: 'As prescribed', caution: 'May cause drowsiness' }
      ],
      recovery: [
        'Apply hot or cold packs',
        'Do gentle stretches',
        'Maintain posture',
        'Avoid heavy lifting'
      ],
      foods: [
        'Calcium-rich foods (milk, curd)',
        'Anti-inflammatory foods (turmeric, berries)',
        'Omega-3 (fish, flaxseed)',
        'Magnesium-rich foods (spinach, banana)'
      ]
    },
    dizziness: {
      risk: 'moderate',
      description: 'Feeling faint, woozy, or unsteady',
      medicines: [
        { name: 'Meclizine', dosage: '25-50mg every 6 hours', caution: 'May cause drowsiness' },
        { name: 'ORS', dosage: 'After signs of dehydration', caution: 'Ensure electrolyte balance' }
      ],
      recovery: [
        'Lie down and rest',
        'Drink water or fruit juice',
        'Avoid sudden head movement',
        'Check blood pressure'
      ],
      foods: [
        'Bananas',
        'Coconut water',
        'Salty crackers (if BP is low)',
        'Fruit juices'
      ]
    },
    acne: {
      risk: 'low',
      description: 'Skin condition causing pimples, mostly on face',
      medicines: [
        { name: 'Benzoyl Peroxide', dosage: 'Apply once daily', caution: 'Avoid eyes' },
        { name: 'Salicylic Acid', dosage: 'Apply as per product', caution: 'May cause dryness' }
      ],
      recovery: [
        'Wash face twice daily',
        'Avoid touching face',
        'Use oil-free skincare',
        'Drink enough water'
      ],
      foods: [
        'Tomatoes (lycopene)',
        'Green tea',
        'Zinc-rich foods (pumpkin seeds)',
        'Low-glycemic fruits (apples, berries)'
      ]
    },
    anxiety: {
      risk: 'moderate',
      description: 'Feeling of worry, fear, or nervousness',
      medicines: [
        { name: 'Alprazolam (mild)', dosage: '0.25-0.5mg as needed', caution: "Only under doctor's advice" },
        { name: 'Ashwagandha', dosage: '300mg twice daily', caution: 'Consult before use' }
      ],
      recovery: [
        'Practice deep breathing',
        'Limit caffeine intake',
        'Follow sleep schedule',
        'Talk to someone you trust'
      ],
      foods: [
        'Chamomile tea',
        'Dark chocolate (in moderation)',
        'Fermented foods (curd)',
        'Walnuts and almonds'
      ]
    },
    cold: {
      risk: 'low',
      description: 'Viral infection with runny nose, sneezing, mild fever',
      medicines: [
        { name: 'Antihistamines', dosage: 'As per instructions', caution: 'Can cause drowsiness' },
        { name: 'Decongestants', dosage: 'As per label', caution: 'Avoid in high BP' }
      ],
      recovery: [
        'Steam inhalation',
        'Plenty of fluids',
        'Rest well',
        'Avoid cold drinks'
      ],
      foods: [
        'Chicken soup',
        'Ginger tea',
        'Vitamin C-rich fruits (orange, kiwi)',
        'Boiled vegetables'
      ]
    },
    vomiting: {
      risk: 'moderate',
      description: 'Involuntary expulsion of stomach contents',
      medicines: [
        { name: 'Ondansetron', dosage: '4mg every 8 hours', caution: 'Not for long-term use' },
        { name: 'Domperidone', dosage: '10mg before meals', caution: 'Avoid in GI bleeding' }
      ],
      recovery: [
        'Take small sips of clear fluids',
        'Avoid solid foods initially',
        'Lie on your side',
        'Use oral rehydration'
      ],
      foods: [
        'Clear broths',
        'Dry toast',
        'Boiled rice',
        'Apple sauce'
      ]
    },
    'chest pain': {
      risk: 'high',
      description: 'Discomfort in chest, possibly indicating heart issue',
      medicines: [
        { name: 'Aspirin', dosage: '325mg (chewable) during emergency', caution: 'Seek emergency help' },
        { name: 'Nitroglycerin', dosage: 'As prescribed', caution: 'Only under supervision' }
      ],
      recovery: [
        'Seek immediate medical attention',
        'Do not self-medicate',
        'Rest until help arrives',
        'Loosen tight clothing'
      ],
      foods: [
        'Heart-healthy: Oats, berries, leafy greens',
        'Low-sodium diet',
        'Avoid saturated fats',
        'Hydrate adequately'
      ]
    },
    'snake bite': {
      risk: 'high',
      description: 'A venomous snake bite can be life-threatening and requires immediate medical attention.',
      medicines: [
        { name: 'Anti-venom', dosage: "As per doctor's advice", caution: 'Administer only under medical supervision' },
        { name: 'Painkillers (Paracetamol)', dosage: '500mg every 6 hours if needed', caution: 'Avoid NSAIDs like ibuprofen' },
        { name: 'Antibiotics (if infected)', dosage: 'As prescribed', caution: 'Complete full course' }
      ],
      recovery: [
        'Keep the bitten limb immobilized and below heart level',
        'Do not suck out the venom or apply ice',
        'Get emergency help immediately',
        'Monitor vital signs',
        'Stay calm to slow down venom spread'
      ],
      foods: [
        'Oral Rehydration Solution (ORS)',
        'Coconut water for hydration',
        'Soft digestible foods (e.g., khichdi, porridge)',
        'Avoid spicy or acidic foods until stable'
      ]
    }
  };

  // Common symptoms for quick detection
  const commonSymptoms = [
    'fever', 'headache', 'cough', 'diarrhea', 'stomachache', 
    'cold', 'flu', 'back pain', 'joint pain', 'sore throat',
    'nausea', 'vomiting', 'dizziness', 'fatigue', 'rash',
    'heartburn', 'constipation', 'earache', 'toothache', 'muscle pain',
    'chest pain','snake bite'
  ];

  // Validate input against known symptoms
  const validateInput = (input) => {
    if (!input.trim()) {
      setError(translations[selectedLanguage].emptyInput || 'Please enter your symptoms');
      return false;
    }

    // Check if input is too short (less than 3 characters total)
    if (input.trim().length < 3) {
      setError(translations[selectedLanguage].invalidInput || 'Please enter valid symptoms (minimum 3 characters)');
      return false;
    }

    setError('');
    return true;
  };

  // Analyze the user input
  const analyzeSymptoms = () => {
    setIsLoading(true);
    setError('');

    if (!validateInput(userInput)) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => { 
      const input = userInput.toLowerCase();
      let detectedCondition = null;
      
      const currentTranslations = symptomTranslations[selectedLanguage];
      const currentFoodTranslations = foodTranslations[selectedLanguage] || foodTranslations.en;
      const t = translations[selectedLanguage];
      
      // Check for known symptoms
      for (const [key, translation] of Object.entries(currentTranslations)) {
        if (input.includes(translation.toLowerCase())) {
          detectedCondition = symptomDatabase[key] || symptomDatabase['general'];
          if (detectedCondition.foods) {
            detectedCondition.foods = detectedCondition.foods.map(food => 
              currentFoodTranslations[food.toLowerCase().replace(/\s+/g, '')] || food
            );
          }
          break;
        }
      }

      // Always provide analysis, even if no known symptoms matched
      if (!detectedCondition) {
        detectedCondition = {
          risk: 'High',
          description: 'Medical evaluation recommended',
          medicines: [
            { 
              name: 'Consult a doctor', 
              dosage: 'Immediately', 
              caution: 'Get professional medical advice' 
            },
            {
              name: 'Basic pain reliever',
              dosage: 'As needed',
              caution: 'Follow package instructions'
            }
          ],
          recovery: [
            'Get adequate rest',
            'Stay hydrated',
            'Monitor symptoms',
            'Seek medical help if needed'
          ],
          foods: [
            'Fresh fruits',
            'Whole grains',
            'Lean proteins',
            'Healthy fats',
            'Water'
          ]
        };
      }

      setAnalysis(detectedCondition);
      setIsLoading(false);
    }, 800);
  };

  // Reset analysis
  const resetAnalysis = () => {
    setAnalysis(null);
    setUserInput('');
  };

  // Get color based on risk level
  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-red-100 border-red-500 text-red-700';
      case 'moderate': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      case 'unknown': return 'bg-gray-100 border-gray-500 text-gray-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  const t = translations[selectedLanguage];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <select
          value={selectedLanguage}
          onChange={(e) => {
            setSelectedLanguage(e.target.value);
            setUserInput('');
          }}
          className="p-2 border rounded-md"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
          <option value="kn">ಕನ್ನಡ</option>
          <option value="sa">संस्कृतम्</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.title}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t.describeSymptoms}</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-4 py-2 rounded-md ${isRecording ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {isRecording ? t.listening : t.speakSymptoms}
          </button>
          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              {t.stop}
            </button>
          )}
        </div>
        
        <textarea
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            setError(''); // Clear error when user types
          }}
          placeholder={getPlaceholderText()}
          className={`w-full p-3 border rounded-md h-32 mb-4 ${error ? 'border-red-500' : 'border-gray-300'}`}
          dir="ltr"
        />
        
        {error && (
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={analyzeSymptoms}
            disabled={!userInput.trim() || isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? t.analyzing : t.analyzeSymptoms}
          </button>
          
          {analysis && (
            <button
              onClick={resetAnalysis}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              {t.reset}
            </button>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t.analyzing}
          </div>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className={`border-l-4 p-4 mb-6 ${getRiskColor(analysis.risk)}`}>
            <h2 className="text-xl font-semibold mb-2">{t.assessmentResult}</h2>
            <p className="font-medium">{t.riskLevel}: <span className="capitalize">{analysis.risk}</span></p>
            <p>{analysis.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">{t.recommendedMedicines}</h3>
              <ul className="space-y-3">
                {analysis.medicines.map((medicine, index) => (
                  <li key={index} className="border-b border-blue-100 pb-3">
                    <p className="font-medium">{medicine.name}</p>
                    <p className="text-sm">Dosage: {medicine.dosage}</p>
                    <p className="text-xs text-red-600">Caution: {medicine.caution}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-green-800">{t.recoveryAdvice}</h3>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.recovery.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800">{t.foodRecommendations}</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.foods.map((food, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                  {food}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <h3 className="font-semibold">{t.importantNotice}</h3>
            <p>{t.noticeText}</p>
            <ul className="list-disc pl-5 mt-2">
              {t.noticePoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>{t.disclaimer}</p>
        <p>{t.emergency}</p>
      </div>
    </div>
  );
};

export default OfflineChat;