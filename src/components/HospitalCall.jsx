import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaPhone, FaPhoneSlash, FaUserMd, FaClock, FaAmbulance, FaInfoCircle,
  FaMapMarkerAlt, FaPhoneAlt, FaHospitalSymbol, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const HospitalCall = () => {
  const { language, translations } = useLanguage();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [estimatedWaitTime] = useState(5); // static wait time
  const [showFirstAid, setShowFirstAid] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [showEmergencyNumbers, setShowEmergencyNumbers] = useState(false);

  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔴 Replace with your API key

  const emergencyNumbers = {
    national: [
      { name: translations.nationalEmergency, number: '112' },
      { name: translations.police, number: '100' },
      { name: translations.fire, number: '101' }
    ],
    medical: [
      { name: translations.ambulance, number: '108' },
      { name: translations.covidHelpline, number: '1075' },
      { name: translations.bloodBank, number: '104' }
    ],
    private: [
      { name: translations.apolloAmbulance, number: '1066' },
      { name: translations.fortisAmbulance, number: '8376808422' },
      { name: translations.maxAmbulance, number: '011-40554055' }
    ]
  };

  useEffect(() => {
    let timer;
    if (isCallActive) {
      timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isCallActive]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(coords);
          await fetchNearestHospitals(coords);
        },
        (error) => console.error("Location error:", error)
      );
    }
  }, []);

  const fetchNearestHospitals = async ({ latitude, longitude }) => {
    try {
      const radius = 5000;

      const nearbyRes = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${latitude},${longitude}`,
            radius,
            type: "hospital",
            key: apiKey,
          },
        }
      );

      const hospitalsWithDetails = await Promise.all(
        nearbyRes.data.results.slice(0, 5).map(async (place) => {
          const detailsRes = await axios.get(
            "https://maps.googleapis.com/maps/api/place/details/json",
            {
              params: {
                place_id: place.place_id,
                fields: "name,formatted_phone_number,formatted_address",
                key: apiKey,
              },
            }
          );

          const details = detailsRes.data.result;

          return {
            name: details.name || "Unnamed Hospital",
            number: details.formatted_phone_number || "Not available",
            address: details.formatted_address || "Address not available",
            doctorAvailable: Math.random() < 0.6, // mock availability
            distance: "Nearby",
          };
        })
      );

      setNearestHospitals(hospitalsWithDetails);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setCallStatus('connecting');
    setTimeout(() => {
      setIsCallActive(true);
      setCallStatus('active');
      setCallDuration(0);
    }, 2000);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallStatus('ended');
    setCallDuration(0);
  };

  const handleRequestAmbulance = () => setShowEmergencyNumbers(true);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{translations.hospitalCall}</h1>
            <div className="flex items-center space-x-2">
              <FaUserMd className="text-blue-500 text-xl" />
              <span className="text-gray-600">{translations.hospitalStaff}</span>
            </div>
          </div>

          {userLocation && nearestHospitals.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-green-500" />
                <span className="text-gray-700">{translations.yourLocation}</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{translations.nearestHospitals}</h3>
              <div className="space-y-3">
                {nearestHospitals.map((hospital, index) => (
                  <div key={index} className="bg-white p-3 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaHospitalSymbol className="text-blue-400" /> {hospital.name}
                      </p>
                      <p className="text-sm text-gray-600">{hospital.address}</p>
                      <p className="text-sm text-gray-500 mt-1">📞 {hospital.number}</p>
                      <p className="text-sm mt-1">
                        Doctor: {hospital.doctorAvailable ? (
                          <span className="text-green-600 inline-flex items-center"><FaCheckCircle className="mr-1" /> Available</span>
                        ) : (
                          <span className="text-red-600 inline-flex items-center"><FaTimesCircle className="mr-1" /> Not Available</span>
                        )}
                      </p>
                    </div>
                    <a href={`tel:${hospital.number}`} className="mt-2 md:mt-0 text-blue-500 hover:text-blue-700 flex items-center">
                      <FaPhoneAlt className="mr-1" /> Call
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaClock className="text-blue-500" />
                <span className="text-gray-700">
                  {callStatus === 'idle'
                    ? translations.estimatedWaitTime.replace('{{time}}', estimatedWaitTime)
                    : callStatus === 'connecting'
                      ? translations.connecting
                      : callStatus === 'active'
                        ? translations.callDuration.replace('{{time}}', formatTime(callDuration))
                        : translations.callEnded}
                </span>
              </div>
              {callStatus === 'idle' && (
                <span className="text-sm text-blue-600">{translations.staffAvailable}</span>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            {!isCallActive ? (
              <button
                onClick={handleStartCall}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2"
                disabled={callStatus === 'connecting'}
              >
                <FaPhone />
                <span>{callStatus === 'connecting' ? translations.connecting : translations.startCall}</span>
              </button>
            ) : (
              <button
                onClick={handleEndCall}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center space-x-2"
              >
                <FaPhoneSlash />
                <span>{translations.endCall}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handleRequestAmbulance}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <FaAmbulance />
              <span>{translations.requestAmbulance}</span>
            </button>
            <button
              onClick={() => setShowFirstAid(!showFirstAid)}
              className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-3 rounded-lg flex items-center space-x-2"
            >
              <FaInfoCircle />
              <span>{translations.showFirstAid}</span>
            </button>
          </div>

          {showEmergencyNumbers && (
            <div className="bg-red-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-800 mb-4">{translations.emergencyNumbers}</h3>
              <div className="space-y-4">
                {Object.entries(emergencyNumbers).map(([category, numbers]) => (
                  <div key={category}>
                    <h4 className="font-medium text-red-700 mb-2">{translations[category]}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {numbers.map((item, index) => (
                        <div key={index} className="bg-white p-2 rounded flex justify-between items-center">
                          <span className="text-gray-700">{item.name}</span>
                          <a href={`tel:${item.number}`} className="text-blue-500 hover:text-blue-700">
                            {item.number}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showFirstAid && (
            <div className="bg-yellow-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">{translations.firstAidInstructions}</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-2">{translations.basicFirstAid}</h4>
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>{translations.firstAid1}</li>
                    <li>{translations.firstAid2}</li>
                    <li>{translations.firstAid3}</li>
                    <li>{translations.firstAid4}</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-2">{translations.emergencySteps}</h4>
                  <ol className="list-decimal list-inside text-yellow-700 space-y-1">
                    <li>{translations.emergencyStep1}</li>
                    <li>{translations.emergencyStep2}</li>
                    <li>{translations.emergencyStep3}</li>
                    <li>{translations.emergencyStep4}</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default HospitalCall;
