from langdetect import detect
from googletrans import Translator
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate

class MultilingualHandler:
    def __init__(self):
        self.translator = Translator()
        self.supported_languages = {
            'hi': 'Hindi',
            'mr': 'Marathi',
            'kn': 'Kannada',
            'ta': 'Tamil',
            'te': 'Telugu',
            'gu': 'Gujarati',
            'bn': 'Bengali',
            'pa': 'Punjabi',
            'ml': 'Malayalam'
        }

    def detect_language(self, text):
        """Detect the language of the input text"""
        try:
            lang_code = detect(text)
            return lang_code if lang_code in self.supported_languages else 'en'
        except:
            return 'en'

    def translate_to_english(self, text, source_lang):
        """Translate text from source language to English"""
        try:
            if source_lang == 'en':
                return text
            translation = self.translator.translate(text, src=source_lang, dest='en')
            return translation.text
        except Exception as e:
            print(f"Translation error: {str(e)}")
            return text

    def translate_to_language(self, text, target_lang):
        """Translate text from English to target language"""
        try:
            if target_lang == 'en':
                return text
            translation = self.translator.translate(text, src='en', dest=target_lang)
            return translation.text
        except Exception as e:
            print(f"Translation error: {str(e)}")
            return text

    def process_input(self, text):
        """Process input text: detect language and translate to English"""
        source_lang = self.detect_language(text)
        english_text = self.translate_to_english(text, source_lang)
        return english_text, source_lang

    def process_output(self, text, target_lang):
        """Process output text: translate from English to target language"""
        return self.translate_to_language(text, target_lang)

    def get_supported_languages(self):
        """Return list of supported languages"""
        return self.supported_languages 