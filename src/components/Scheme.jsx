import React from "react";
import { Link } from "react-router-dom";

const Scheme = () => {
  const schemes = [
    {
      name: "Ayushman Bharat Yojana",
      description:
        "A flagship scheme providing free health coverage up to ₹5 lakhs per family per year.",
      eligibility: "Families identified based on SECC 2011 data.",
      link: "https://pmjay.gov.in",
    },
    {
      name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
      description: "State-run scheme in Maharashtra covering medical expenses.",
      eligibility: "Ration card holders – Yellow, Orange, and Antyodaya cards.",
      link: "https://www.jeevandayee.gov.in/",
    },
    {
      name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
      description:
        "Early identification and intervention for children from birth to 18 years to cover 4Ds – Defects, Diseases, Deficiency, and Development delays.",
      eligibility:
        "Children aged 0-18 years under government schools and anganwadis.",
      link:
        "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1201&lid=188",
    },
    {
      name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
      description:
        "Free health checkups for pregnant women on the 9th of every month at government health facilities.",
      eligibility: "All pregnant women in the second or third trimester.",
      link: "https://pmsma.nhp.gov.in/",
    },
    {
      name: "National Health Mission (NHM)",
      description:
        "A nationwide initiative to provide accessible, affordable and quality healthcare services.",
      eligibility:
        "Available for rural and urban populations, especially vulnerable groups.",
      link: "https://nhm.gov.in",
    },
    {
      name:
        "Deendayal Antyodaya Yojana - National Urban Health Mission (DAY-NUHM)",
      description:
        "Healthcare services for the urban poor with a special focus on slum dwellers.",
      eligibility:
        "Urban poor including slum dwellers, homeless, and street children.",
      link:
        "https://www.nhm.gov.in/index1.php?lang=1&level=2&sublinkid=971&lid=156",
    },
    {
      name: "Central Government Health Scheme (CGHS)",
      description:
        "Comprehensive health care for central government employees and pensioners.",
      eligibility:
        "Central Government employees, pensioners, and their dependents.",
      link: "https://cghs.gov.in/",
    },
    {
      name: "Nikshay Poshan Yojana",
      description:
        "Nutritional support scheme for TB patients providing ₹500/month during treatment.",
      eligibility: "All TB patients notified under the NIKSHAY portal.",
      link: "https://nikshay.in/",
    },
    {
      name: "Janani Suraksha Yojana",
      description: "A safe motherhood intervention under NHM.",
      eligibility: "Pregnant women below poverty line (BPL).",
      link: "https://nhm.gov.in",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="ml-2 text-xl font-bold text-gray-800">
                  SarathiAi
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/schemes"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Government Schemes
              </Link>
              <Link
                to="/voice-chat"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Voice Chat
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Government Health Schemes
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Empowering lives through accessible healthcare
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {scheme.name}
                </h2>
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <p className="text-gray-700 font-medium">
                  <span className="font-bold">Eligibility:</span>{" "}
                  {scheme.eligibility}
                </p>
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Visit Official Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheme;
