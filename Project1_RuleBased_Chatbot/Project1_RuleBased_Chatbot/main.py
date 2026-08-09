"""
Main Entry Point: Continuous Infinite Loop (Slide 11).
"""

from src.chatbot import RuleBasedChatbot

def main():
    bot = RuleBasedChatbot(name="DecodeBot")
print("=" * 60)
    print(f"🤖 Welcome to {bot.name} (DecodeLabs Project 1)")
    print("Type 'help' for guidance, or 'exit' / 'quit' to terminate.")
    print("=" * 60 + "\n")

    while True:
        try:
            raw_input = input("You: ")
            clean_input = bot.sanitize_input(raw_input)

            if not clean_input:
                continue

            if bot.is_exit_command(clean_input):
                print(f"{bot.name}: {bot.get_response('bye')}")
                print("\n[Chat session terminated successfully]")
                break

            response = bot.get_response(clean_input)
            print(f"{bot.name}: {response}\n")

        except (KeyboardInterrupt, EOFError):
            print(f"\n{bot.name}: Session interrupted. Goodbye!")
            break

if __name__ == "__main__":
    main()