"""
Knowledge Base: Contains intent mappings and fallback response.
Uses Python Dictionary Hash Map for O(1) performance (Slides 13-15).
"""

INTENTS = {
    'hello': 'Hello! Welcome to DecodeLabs. How can I help you today?',
    'hi': 'Hi there! What can I do for you today?',
    'hey': 'Hey! Hope you are having a productive day.',
    'how are you': 'I am a deterministic AI bot running smoothly! How are you?',
    'what is your name': 'I am DecodeBot, a Rule-Based AI Chatbot built for Project 1.',
    'what can you do': 'I can answer predefined questions using instant O(1) hash map lookups!',
    'who created you': 'I was created as part of the DecodeLabs AI Engineering Training Program.',
    'help': 'You can greet me, ask about my identity, capabilities, or type "exit" to quit.',
    'thanks': 'You are welcome! Happy to assist.',
    'thank you': 'My pleasure! Let me know if you need anything else.',
    'bye': 'Goodbye! Have a great day ahead!'
}

FALLBACK_RESPONSE = "I am sorry, I do not understand that command. Type 'help' to see what I can answer."
EXIT_COMMANDS = ['exit', 'quit', 'bye', 'stop']
