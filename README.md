# Rural Healthcare Multilingual AI Assistant

# Aarogya AI – Team Ignite 🏥🔥

A smart, multilingual healthcare support system for rural communities. Developed during AGTechathon, this project combines a React-based frontend with a Python-based client-server module to provide emergency medical communication, local language support, and awareness about government schemes.

---

## 🌟 Problem Statement

Rural populations in India face several challenges in accessing healthcare:
- Lack of reliable internet or mobile networks
- Language barriers for non-English/Hindi speakers
- Difficulty in locating or contacting emergency services
- Unawareness of existing government health schemes

---

## ✅ Our Solution

**Aarogya AI** is designed to:
- Support local languages via multilingual translation
- Work with minimal network using lightweight communication
- Provide emergency call functionality
- Display essential doctor and hospital info
- Educate users about government health schemes

---


A voice-based AI healthcare assistant designed for rural communities in India, supporting multiple local languages for better healthcare accessibility.

## Features

- Voice-based interaction
- Support for multiple Indian languages:
  - Hindi
  - Marathi
  - Kannada
  - Tamil
  - Telugu
  - Gujarati
  - Bengali
  - Punjabi
  - Malayalam
- Emergency response system
- Health condition assessment
- First aid guidance
- Medical emergency protocols

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Team-Ignite
```

2. Install dependencies:
```bash
pip install -r python/requirements.txt
```

3. Create a `.env` file in the python directory with your API keys:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the server:
```bash
cd python
python server.py
```

5. In a new terminal, run the client:
```bash
cd python
python main.py
```

## Usage

1. Start the application
2. Speak your health concern in any supported Indian language
3. The AI will:
   - Detect your language
   - Assess if it's an emergency
   - Provide immediate actions
   - Give first aid instructions
   - List warning signs
   - Recommend when to seek medical help

## Project Structure

Team-Ignite/
├── python/ # Python socket communication module
│ ├── main.py # Client-side script (user input + sending data)
│ ├── server.py # Server-side script (receives and processes)
│ ├── multilingual_handler.py # Handles translation & language detection
│ └── requirements.txt # Python dependencies
│
├── public/ # Vite static files
│
├── src/ # React frontend
│ ├── components/ # UI components (DoctorCard, Call Buttons, etc.)
│ ├── context/ # LanguageContext for switching languages
│ ├── pages/ # HomePage view
│ ├── translations/ # Text files for en, hi, mr
│ ├── App.jsx # Root component
│ └── main.jsx # React entry point
│
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js # PostCSS setup
├── vite.config.js # Vite config
├── package.json # Project metadata & scripts
├── .gitignore
└── README.md

yaml
Copy
Edit
## 🚀 Features

- ✅ Multilingual support (English, Hindi, Marathi)
- 📞 Emergency call system (ambulance/hospital)
- 👨‍⚕️ Doctor information cards with icons
- 🧠 Smart Python server-client messaging system
- 📢 Health scheme awareness for rural users
- 🎯 User-friendly interface for low-literacy users

---

## 💻 Frontend Setup (React + Vite)

### Prerequisites:
- Node.js v16+
- npm

### Steps:

```bash
# Clone the repo
git clone https://github.com/AGTechathon/Team-Ignite.git
cd Team-Ignite

# Go to frontend (src folder is inside root)
npm install
npm run dev
🐍 Python Backend (Client-Server Module)
Prerequisites:
Python 3.x

pip

Setup Instructions:
bash
Copy
Edit
cd python
pip install -r requirements.txt
Run Server:
bash
Copy
Edit
python server.py
Run Client (Separate terminal):
bash
Copy
Edit
python main.py
🌐 Languages Supported
🇬🇧 English (en.js)

🇮🇳 Hindi (hi.js)

🇮🇳 Marathi (mr.js)

To add more languages, edit the src/translations/ directory and LanguageContext.jsx.

📸 Screenshots (Add if available)
Feature	Screenshot
Home Page	
Emergency Call UI	
Doctor Info	

👥 Team Members – Team Ignite
Sachin Fulari
Anil Bhoi
Samarth Patil
Mujaffar Mujawar

📜 License
This project is open-sourced under the MIT License.

🙏 Acknowledgments
AGTechathon Organizers

Local health mentors and rural healthcare volunteers

OpenAI / Google Translate APIs (if used for translation)



## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
