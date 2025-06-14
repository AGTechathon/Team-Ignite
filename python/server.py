import asyncio
import json
import os
import base64
from websockets.server import serve
from dotenv import load_dotenv
import websockets.client
import logging
from multilingual_handler import MultilingualHandler

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class GeminiVoiceServer:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        self.model = "gemini-2.0-flash-exp"
        self.uri = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key={self.api_key}"
        self.multilingual_handler = MultilingualHandler()
        
        # Updated health-focused system prompt with direct solutions
        self.health_prompt = """You are a healthcare assistant for rural communities. Your role is to provide immediate, actionable solutions. NEVER respond with questions - always provide direct solutions.

For EMERGENCY situations (like snake bites, severe bleeding, heart attacks, etc.):
1. IMMEDIATELY state: "This is an emergency situation"
2. Provide step-by-step immediate actions:
   - First action (e.g., "Call ambulance immediately")
   - Second action (e.g., "Keep the affected area below heart level")
   - Third action (e.g., "Remove any tight clothing or jewelry")
3. List emergency warning signs to watch for
4. Provide nearest emergency contact numbers

For NON-EMERGENCY situations:
1. Provide a simple explanation of the condition
2. List immediate home remedies/first aid steps
3. Specify when to see a doctor
4. Give preventive measures
5. List warning signs that indicate worsening

IMPORTANT RULES:
1. NEVER ask questions - provide direct solutions
2. Always start with the most critical action first
3. Use simple, clear language
4. Consider rural healthcare limitations
5. Include specific, actionable steps
6. For emergencies, always include emergency contact information
7. Focus on practical, accessible solutions

Example for snake bite:
"EMERGENCY: Snake Bite
IMMEDIATE ACTIONS:
1. Call ambulance immediately (Emergency: 108)
2. Keep the affected limb below heart level
3. Remove any tight clothing or jewelry
4. Clean the wound with soap and water
5. Keep the person calm and still
6. Note the snake's appearance if possible

DO NOT:
- Cut the wound
- Suck out the venom
- Apply tourniquet
- Apply ice

WARNING SIGNS:
- Difficulty breathing
- Swelling
- Numbness
- Nausea
- Dizziness

SEEK IMMEDIATE MEDICAL HELP - This is a medical emergency requiring antivenom treatment."

Format your response in this structure:
[EMERGENCY STATUS]
[IMMEDIATE ACTIONS]
[DO NOT DO]
[WARNING SIGNS]
[WHEN TO SEEK HELP]
[PREVENTION TIPS]"""
        
        logger.info("GeminiVoiceServer initialized")

    async def handle_client(self, websocket):
        logger.info("New client connected")
        try:
            # Connect to Gemini API
            async with websockets.client.connect(
                self.uri,
                extra_headers={"Content-Type": "application/json"}
            ) as gemini_ws:
                logger.info("Connected to Gemini API")
                
                # Send setup message to Gemini with health-focused prompt
                setup_message = {
                    "setup": {
                        "model": f"models/{self.model}",
                        "system_instruction": self.health_prompt
                    }
                }
                logger.info(f"Sending setup message: {setup_message}")
                await gemini_ws.send(json.dumps(setup_message))
                setup_response = await gemini_ws.recv()
                logger.info(f"Setup response: {setup_response}")
                logger.info("Gemini API setup complete")

                # Handle messages from client
                async for message in websocket:
                    try:
                        # Forward audio data to Gemini
                        audio_message = {
                            "realtime_input": {
                                "media_chunks": [{
                                    "data": base64.b64encode(message).decode(),
                                    "mime_type": "audio/pcm",
                                }]
                            }
                        }
                        logger.info("Sending audio data to Gemini")
                        await gemini_ws.send(json.dumps(audio_message))

                        # Get response from Gemini
                        response = await gemini_ws.recv()
                        response_data = json.loads(response)
                        logger.info(f"Raw Gemini response: {response_data}")

                        # Extract audio and text data from response
                        if "serverContent" in response_data:
                            server_content = response_data["serverContent"]
                            logger.info(f"Server content: {server_content}")
                            
                            model_turn = server_content.get("modelTurn", {})
                            logger.info(f"Model turn: {model_turn}")
                            
                            parts = model_turn.get("parts", [])
                            logger.info(f"Parts: {parts}")
                            
                            if parts:
                                part = parts[0]
                                audio_data = part.get("inlineData", {}).get("data")
                                text_data = part.get("text") or part.get("content")
                                
                                if not text_data:
                                    logger.warning("No text found in response")
                                    text_data = "AI response"  # Fallback text
                                
                                # Process text through multilingual handler
                                # First, detect the language of the input
                                source_lang = self.multilingual_handler.detect_language(text_data)
                                
                                # Translate the response to the detected language
                                translated_text = self.multilingual_handler.translate_to_language(text_data, source_lang)
                                
                                logger.info(f"Original text: {text_data}")
                                logger.info(f"Translated text: {translated_text}")
                                logger.info(f"Audio data present: {bool(audio_data)}")
                                
                                # Send both audio and text back to client
                                response_to_client = {
                                    "audio": audio_data,
                                    "text": translated_text,
                                    "original_text": text_data,
                                    "language": source_lang
                                }
                                logger.info(f"Sending to client: {response_to_client}")
                                await websocket.send(json.dumps(response_to_client))
                                logger.info("Sent response to client")
                            else:
                                logger.warning("No parts found in response")
                                await websocket.send(json.dumps({"error": "Invalid response format"}))
                        else:
                            logger.warning("No serverContent in response")
                            await websocket.send(json.dumps({"error": "Invalid response format"}))

                    except Exception as e:
                        logger.error(f"Error processing message: {str(e)}")
                        await websocket.send(json.dumps({"error": str(e)}))

        except Exception as e:
            logger.error(f"Connection error: {str(e)}")
            await websocket.send(json.dumps({"error": str(e)}))

async def main():
    try:
        server = GeminiVoiceServer()
        async with serve(server.handle_client, "localhost", 8000):
            logger.info("Server started on ws://localhost:8000")
            await asyncio.Future()  # run forever
    except Exception as e:
        logger.error(f"Server error: {str(e)}")

if __name__ == "__main__":
    asyncio.run(main()) 