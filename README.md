# Rural Healthcare Multilingual AI Assistant

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

```
Team-Ignite/
├── python/
│   ├── main.py           # Client application
│   ├── server.py         # Server implementation
│   ├── multilingual_handler.py  # Language handling
│   └── requirements.txt  # Python dependencies
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
