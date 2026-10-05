from flask import Flask, render_template, jsonify

app = Flask(__name__)


# -----------------------------
# ALPHABETS
# -----------------------------

alphabet = [
    {"letter": "A", "small": "a", "word": "Apple", "emoji": "🍎"},
    {"letter": "B", "small": "b", "word": "Ball", "emoji": "⚽"},
    {"letter": "C", "small": "c", "word": "Cat", "emoji": "🐱"},
    {"letter": "D", "small": "d", "word": "Dog", "emoji": "🐶"},
    {"letter": "E", "small": "e", "word": "Elephant", "emoji": "🐘"},
    {"letter": "F", "small": "f", "word": "Fish", "emoji": "🐟"},
    {"letter": "G", "small": "g", "word": "Grapes", "emoji": "🍇"},
    {"letter": "H", "small": "h", "word": "Horse", "emoji": "🐴"},
    {"letter": "I", "small": "i", "word": "Ice Cream", "emoji": "🍦"},
    {"letter": "J", "small": "j", "word": "Juice", "emoji": "🧃"},
    {"letter": "K", "small": "k", "word": "Kite", "emoji": "🪁"},
    {"letter": "L", "small": "l", "word": "Lion", "emoji": "🦁"},
    {"letter": "M", "small": "m", "word": "Mango", "emoji": "🥭"},
    {"letter": "N", "small": "n", "word": "Nest", "emoji": "🪺"},
    {"letter": "O", "small": "o", "word": "Orange", "emoji": "🍊"},
    {"letter": "P", "small": "p", "word": "Parrot", "emoji": "🦜"},
    {"letter": "Q", "small": "q", "word": "Queen", "emoji": "👸"},
    {"letter": "R", "small": "r", "word": "Rabbit", "emoji": "🐰"},
    {"letter": "S", "small": "s", "word": "Sun", "emoji": "☀️"},
    {"letter": "T", "small": "t", "word": "Tiger", "emoji": "🐯"},
    {"letter": "U", "small": "u", "word": "Umbrella", "emoji": "☂️"},
    {"letter": "V", "small": "v", "word": "Van", "emoji": "🚐"},
    {"letter": "W", "small": "w", "word": "Watch", "emoji": "⌚"},
    {"letter": "X", "small": "x", "word": "Xylophone", "emoji": "🎵"},
    {"letter": "Y", "small": "y", "word": "Yo-Yo", "emoji": "🪀"},
    {"letter": "Z", "small": "z", "word": "Zebra", "emoji": "🦓"}
]


# -----------------------------
# DAYS
# -----------------------------

days = [
    {"name": "Monday", "emoji": "🌞"},
    {"name": "Tuesday", "emoji": "🌈"},
    {"name": "Wednesday", "emoji": "🌟"},
    {"name": "Thursday", "emoji": "🌻"},
    {"name": "Friday", "emoji": "🎉"},
    {"name": "Saturday", "emoji": "🎈"},
    {"name": "Sunday", "emoji": "☀️"}
]


# -----------------------------
# MONTHS
# -----------------------------

months = [
    {"name": "January", "emoji": "❄️"},
    {"name": "February", "emoji": "❤️"},
    {"name": "March", "emoji": "🌷"},
    {"name": "April", "emoji": "🌧️"},
    {"name": "May", "emoji": "🌸"},
    {"name": "June", "emoji": "☀️"},
    {"name": "July", "emoji": "🌴"},
    {"name": "August", "emoji": "🌻"},
    {"name": "September", "emoji": "🍂"},
    {"name": "October", "emoji": "🎃"},
    {"name": "November", "emoji": "🍁"},
    {"name": "December", "emoji": "🎄"}
]


# -----------------------------
# FRUITS
# -----------------------------

fruits = [
    {"name": "Apple", "emoji": "🍎"},
    {"name": "Banana", "emoji": "🍌"},
    {"name": "Mango", "emoji": "🥭"},
    {"name": "Orange", "emoji": "🍊"},
    {"name": "Grapes", "emoji": "🍇"},
    {"name": "Watermelon", "emoji": "🍉"},
    {"name": "Pineapple", "emoji": "🍍"},
    {"name": "Strawberry", "emoji": "🍓"},
    {"name": "Cherry", "emoji": "🍒"},
    {"name": "Peach", "emoji": "🍑"},
    {"name": "Pear", "emoji": "🍐"},
    {"name": "Kiwi", "emoji": "🥝"},
    {"name": "Coconut", "emoji": "🥥"},
    {"name": "Lemon", "emoji": "🍋"},
    {"name": "Papaya", "emoji": "🧡"}
]


# -----------------------------
# BODY PARTS
# -----------------------------

body_parts = [
    {"name": "Head", "emoji": "🙂"},
    {"name": "Eyes", "emoji": "👀"},
    {"name": "Ears", "emoji": "👂"},
    {"name": "Nose", "emoji": "👃"},
    {"name": "Mouth", "emoji": "👄"},
    {"name": "Teeth", "emoji": "🦷"},
    {"name": "Hand", "emoji": "✋"},
    {"name": "Finger", "emoji": "☝️"},
    {"name": "Arm", "emoji": "💪"},
    {"name": "Leg", "emoji": "🦵"},
    {"name": "Foot", "emoji": "🦶"},
    {"name": "Heart", "emoji": "❤️"}
]


# -----------------------------
# ANIMALS
# -----------------------------

animals = [
    {"name": "Dog", "emoji": "🐶"},
    {"name": "Cat", "emoji": "🐱"},
    {"name": "Lion", "emoji": "🦁"},
    {"name": "Tiger", "emoji": "🐯"},
    {"name": "Elephant", "emoji": "🐘"},
    {"name": "Monkey", "emoji": "🐒"},
    {"name": "Rabbit", "emoji": "🐰"},
    {"name": "Cow", "emoji": "🐄"},
    {"name": "Horse", "emoji": "🐴"},
    {"name": "Goat", "emoji": "🐐"},
    {"name": "Sheep", "emoji": "🐑"},
    {"name": "Bear", "emoji": "🐻"},
    {"name": "Fox", "emoji": "🦊"},
    {"name": "Panda", "emoji": "🐼"},
    {"name": "Zebra", "emoji": "🦓"}
]


# -----------------------------
# COLOURS
# -----------------------------

colors = [
    {"name": "Red", "value": "#ff4d4d", "emoji": "🔴"},
    {"name": "Blue", "value": "#3498db", "emoji": "🔵"},
    {"name": "Green", "value": "#2ecc71", "emoji": "🟢"},
    {"name": "Yellow", "value": "#f1c40f", "emoji": "🟡"},
    {"name": "Orange", "value": "#ff8c00", "emoji": "🟠"},
    {"name": "Purple", "value": "#9b59b6", "emoji": "🟣"},
    {"name": "Pink", "value": "#ff69b4", "emoji": "🩷"},
    {"name": "Brown", "value": "#8b4513", "emoji": "🟤"},
    {"name": "Black", "value": "#222222", "emoji": "⚫"},
    {"name": "White", "value": "#ffffff", "emoji": "⚪"}
]


# -----------------------------
# HOME PAGE
# -----------------------------

@app.route("/")
def home():
    return render_template(
        "index.html",
        alphabet=alphabet,
        days=days,
        months=months,
        fruits=fruits,
        body_parts=body_parts,
        animals=animals,
        colors=colors
    )


# -----------------------------
# API ROUTES
# -----------------------------

@app.route("/api/alphabet")
def get_alphabet():
    return jsonify(alphabet)


@app.route("/api/days")
def get_days():
    return jsonify(days)


@app.route("/api/months")
def get_months():
    return jsonify(months)


@app.route("/api/fruits")
def get_fruits():
    return jsonify(fruits)


@app.route("/api/body-parts")
def get_body_parts():
    return jsonify(body_parts)


@app.route("/api/animals")
def get_animals():
    return jsonify(animals)


@app.route("/api/colors")
def get_colors():
    return jsonify(colors)


# -----------------------------
# TABLE API
# -----------------------------

@app.route("/api/table/<int:number>")
def get_table(number):
    if number < 2 or number > 220:
        return jsonify({
            "error": "Table must be between 2 and 220"
        }), 400

    table = []

    for i in range(1, 11):
        table.append({
            "question": f"{number} × {i}",
            "answer": number * i
        })

    return jsonify(table)


# -----------------------------
# RUN SERVER
# -----------------------------

if __name__ == "__main__":
    app.run(debug=True)
