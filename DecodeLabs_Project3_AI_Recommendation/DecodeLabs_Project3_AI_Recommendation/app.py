import json
from recommender import recommend
prefs=json.load(open("data/users.json"))
print("AI Recommendation System")
name=input("Name: ")
interest=input("Interest (AI/Web/Data): ")
level=input("Level (Beginner/Intermediate): ")
for item in recommend(interest,level):
    print("-",item)
