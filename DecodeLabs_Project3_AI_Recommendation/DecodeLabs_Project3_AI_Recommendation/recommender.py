import json
items=json.load(open("data/items.json"))
def recommend(interest,level):
    return [i["title"] for i in items if i["category"]==interest and i["level"]==level]
