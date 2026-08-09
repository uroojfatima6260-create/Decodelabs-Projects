"""
Chatbot Logic: Handles Input Sanitization and Lookup.
"""
from src.knowledge_base import INTENTS, FALLBACK_RESPONSE, EXIT_COMMANDS

class RuleBasedChatbot:
    def __init__(self, name="DecodeBot"):
        self.name = name
        self.knowledge_base = INTENTS

    def sanitize_input(self, raw_input: str) -> str:
        """Phase 1: Input Normalization (Slide 10)"""
        if not raw_input:
            return ""
        return raw_input.lower().strip()

    def get_response(self, clean_input: str) -> str:
        """Phase 2 & 3: Atomic Lookup + Fallback (Slide 15)"""
        return self.knowledge_base.get(clean_input, FALLBACK_RESPONSE)

    def is_exit_command(self, clean_input: str) -> bool:
        """Exit Strategy Handling (Slide 11 & 17)"""
        return clean_input in EXIT_COMMANDS
