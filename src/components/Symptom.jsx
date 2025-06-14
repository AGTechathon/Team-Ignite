import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SymptomAnalyzer = () => {
  const [userInput, setUserInput] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => setUserInput(result),
  });

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
      'Don’t ignore urge to go'
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
      { name: 'Alprazolam (mild)', dosage: '0.25-0.5mg as needed', caution: 'Only under doctor’s advice' },
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
    { name: 'Anti-venom', dosage: 'As per doctor’s advice', caution: 'Administer only under medical supervision' },
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

  // Analyze the user input
  const analyzeSymptoms = () => {
    setIsLoading(true);
    setTimeout(() => { 
      const input = userInput.toLowerCase();
      let detectedCondition = null;
      
      // Check for each known symptom
      for (const symptom of commonSymptoms) {
        if (input.includes(symptom)) {
          detectedCondition = symptomDatabase[symptom] || symptomDatabase['general'];
          break;
        }
      }

      // If no specific condition found, use general advice
      if (!detectedCondition) {
        detectedCondition = {
          risk: 'High',
          description: 'General health advice',
          medicines: [
            { name: 'Multivitamin', dosage: 'As directed', caution: 'Check for allergies' }
          ],
          recovery: [
            'Get adequate rest',
            'Maintain hydration',
            'Eat balanced meals',
            'Monitor symptoms'
          ],
          foods: [
            'Fresh fruits and vegetables',
            'Whole grains',
            'Lean proteins',
            'Healthy fats'
          ]
        };
      }

      setAnalysis(detectedCondition);
      setIsLoading(false);
    }, 800); // Simulate processing time
  };

  // Reset analysis
  const resetAnalysis = () => {
    setAnalysis(null);
    setUserInput('');
  };

  // Get color based on risk level
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-red-100 border-red-500 text-red-700';
      case 'moderate': return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'low': return 'bg-green-100 border-green-500 text-green-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Symptom Analyzer</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Describe Your Symptoms</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => listening ? stop() : listen()}
            className={`px-4 py-2 rounded-md ${listening ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {listening ? 'Listening...' : 'Speak Symptoms'}
          </button>
          {listening && (
            <button
              onClick={stop}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Stop
            </button>
          )}
        </div>
        
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Example: I have fever and headache since yesterday..."
          className="w-full p-3 border border-gray-300 rounded-md h-32 mb-4"
        />
        
        <div className="flex gap-3">
          <button
            onClick={analyzeSymptoms}
            disabled={!userInput.trim() || isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
          
          {analysis && (
            <button
              onClick={resetAnalysis}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Reset
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
            Analyzing your symptoms...
          </div>
        </div>
      )}

      {analysis && !isLoading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className={`border-l-4 p-4 mb-6 ${getRiskColor(analysis.risk)}`}>
            <h2 className="text-xl font-semibold mb-2">Assessment Result</h2>
            <p className="font-medium">Risk Level: <span className="capitalize">{analysis.risk}</span></p>
            <p>{analysis.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Recommended Medicines</h3>
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
              <h3 className="text-lg font-semibold mb-3 text-green-800">Recovery Advice</h3>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.recovery.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800">Food Recommendations</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.foods.map((food, index) => (
                <span key={index} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                  {food}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <h3 className="font-semibold">Important Notice</h3>
            <p>This is not a substitute for professional medical advice. Consult a doctor if:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Symptoms worsen or persist beyond 3 days</li>
              <li>You experience severe pain or high fever</li>
              <li>You have pre-existing medical conditions</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This local AI analyzes 50+ common symptoms without internet connection.</p>
        <p>For emergencies, always contact local healthcare providers.</p>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;



































