// =====================================================
// KIDS LEARNING WORLD
// No API required
// =====================================================


// =====================================================
// DATA
// =====================================================

const alphabet = [
    ["A", "Apple", "🍎"],
    ["B", "Ball", "⚽"],
    ["C", "Cat", "🐱"],
    ["D", "Dog", "🐶"],
    ["E", "Elephant", "🐘"],
    ["F", "Fish", "🐟"],
    ["G", "Grapes", "🍇"],
    ["H", "Horse", "🐴"],
    ["I", "Ice Cream", "🍦"],
    ["J", "Juice", "🧃"],
    ["K", "Kite", "🪁"],
    ["L", "Lion", "🦁"],
    ["M", "Mango", "🥭"],
    ["N", "Nest", "🪺"],
    ["O", "Orange", "🍊"],
    ["P", "Parrot", "🦜"],
    ["Q", "Queen", "👑"],
    ["R", "Rabbit", "🐰"],
    ["S", "Sun", "☀️"],
    ["T", "Tiger", "🐯"],
    ["U", "Umbrella", "☂️"],
    ["V", "Van", "🚐"],
    ["W", "Watch", "⌚"],
    ["X", "Xylophone", "🎵"],
    ["Y", "Yak", "🐂"],
    ["Z", "Zebra", "🦓"]
];


const days = [
    ["Monday", "🌞"],
    ["Tuesday", "🌈"],
    ["Wednesday", "⭐"],
    ["Thursday", "🌻"],
    ["Friday", "🎉"],
    ["Saturday", "🎈"],
    ["Sunday", "☀️"]
];


const months = [
    ["January", "❄️"],
    ["February", "❤️"],
    ["March", "🌸"],
    ["April", "🌷"],
    ["May", "🌼"],
    ["June", "☀️"],
    ["July", "🌧️"],
    ["August", "🇮🇳"],
    ["September", "🍂"],
    ["October", "🎃"],
    ["November", "🍁"],
    ["December", "🎄"]
];


const fruits = [
    ["Apple", "🍎"],
    ["Banana", "🍌"],
    ["Mango", "🥭"],
    ["Orange", "🍊"],
    ["Grapes", "🍇"],
    ["Watermelon", "🍉"],
    ["Pineapple", "🍍"],
    ["Strawberry", "🍓"],
    ["Papaya", "🥭"],
    ["Coconut", "🥥"],
    ["Cherry", "🍒"],
    ["Peach", "🍑"]
];


const bodyParts = [
    ["Eyes", "👀"],
    ["Ears", "👂"],
    ["Nose", "👃"],
    ["Mouth", "👄"],
    ["Hand", "✋"],
    ["Leg", "🦵"],
    ["Foot", "🦶"],
    ["Head", "🙂"],
    ["Arm", "💪"],
    ["Teeth", "🦷"]
];


const animals = [
    ["Dog", "🐶"],
    ["Cat", "🐱"],
    ["Lion", "🦁"],
    ["Tiger", "🐯"],
    ["Elephant", "🐘"],
    ["Monkey", "🐒"],
    ["Rabbit", "🐰"],
    ["Horse", "🐴"],
    ["Cow", "🐮"],
    ["Giraffe", "🦒"],
    ["Panda", "🐼"],
    ["Bear", "🐻"]
];


const colours = [
    ["Red", "#ff4d6d", "❤️"],
    ["Blue", "#4d96ff", "💙"],
    ["Green", "#38b000", "💚"],
    ["Yellow", "#ffd60a", "💛"],
    ["Orange", "#ff8500", "🧡"],
    ["Purple", "#9b5de5", "💜"],
    ["Pink", "#ff70a6", "💗"],
    ["Brown", "#9c6644", "🤎"],
    ["Black", "#222222", "🖤"],
    ["White", "#ffffff", "🤍"]
];


// =====================================================
// ELEMENTS
// =====================================================

const homePage = document.getElementById("homePage");
const learningPage = document.getElementById("learningPage");

const learningContent =
    document.getElementById("learningContent");

const learningTitle =
    document.getElementById("learningTitle");

const learningSubtitle =
    document.getElementById("learningSubtitle");

const learningIcon =
    document.getElementById("learningIcon");


// =====================================================
// SHOW CATEGORY
// =====================================================

function showCategory(category) {

    homePage.style.display = "none";

    learningPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (category === "abc") {
        setupLearning(
            "🔤",
            "Learn A to Z",
            "Click a letter to hear it!",
            showAlphabet()
        );
    }


    else if (category === "days") {
        setupLearning(
            "📅",
            "Days of the Week",
            "Click a day to hear it!",
            showDays()
        );
    }


    else if (category === "months") {
        setupLearning(
            "🗓️",
            "Months of the Year",
            "Click a month to hear it!",
            showMonths()
        );
    }


    else if (category === "tables") {
        setupLearning(
            "✖️",
            "Multiplication Tables",
            "Choose a table to start!",
            showTables()
        );
    }


    else if (category === "fruits") {
        setupLearning(
            "🍎",
            "Yummy Fruits",
            "Let's learn fruit names!",
            showFruits()
        );
    }


    else if (category === "bodyparts") {
        setupLearning(
            "👦",
            "Body Parts",
            "Let's learn about our body!",
            showBodyParts()
        );
    }


    else if (category === "animals") {
        setupLearning(
            "🐶",
            "Amazing Animals",
            "Meet some amazing animals!",
            showAnimals()
        );
    }


    else if (category === "colours") {
        setupLearning(
            "🎨",
            "Beautiful Colours",
            "Explore the world of colours!",
            showColours()
        );
    }
}


// =====================================================
// SETUP
// =====================================================

function setupLearning(icon, title, subtitle, content) {

    learningIcon.textContent = icon;

    learningTitle.textContent = title;

    learningSubtitle.textContent = subtitle;

    learningContent.innerHTML = content;

    setTimeout(() => {

        const cards =
            document.querySelectorAll(".learning-card");

        cards.forEach((card, index) => {

            card.style.animationDelay =
                `${index * 0.04}s`;

        });

    }, 50);
}


// =====================================================
// ALPHABET
// =====================================================

function showAlphabet() {

    let html = `<div class="cards-grid alphabet-grid">`;

    alphabet.forEach((item) => {

        html += `

            <div class="learning-card alphabet-card"
                 onclick="speak('${item[0]} for ${item[1]}')">

                <div class="letter">
                    ${item[0]}
                </div>

                <div class="learning-emoji">
                    ${item[2]}
                </div>

                <div class="word">
                    ${item[1]}
                </div>

                <div class="mini-text">
                    ${item[0]} for ${item[1]}
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// DAYS
// =====================================================

function showDays() {

    let html = `<div class="cards-grid">`;

    days.forEach((item, index) => {

        html += `

            <div class="learning-card day-card"
                 onclick="speak('${item[0]}')">

                <div class="number-badge">
                    ${index + 1}
                </div>

                <div class="learning-emoji">
                    ${item[1]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

                <div class="mini-text">
                    Day ${index + 1}
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// MONTHS
// =====================================================

function showMonths() {

    let html = `<div class="cards-grid months-grid">`;

    months.forEach((item, index) => {

        html += `

            <div class="learning-card month-card"
                 onclick="speak('${item[0]}')">

                <div class="number-badge">
                    ${index + 1}
                </div>

                <div class="learning-emoji">
                    ${item[1]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// TABLES
// =====================================================

function showTables() {

    let html = `

        <div class="table-choice">

            <div class="table-choice-title">
                ✨ Choose a table
            </div>

            <div class="table-buttons">
    `;


    for (let i = 1; i <= 20; i++) {

        html += `

            <button
                onclick="showTable(${i})"
                class="table-number">

                ${i}

            </button>

        `;
    }


    html += `

            </div>

        </div>

        <div id="tableResult"></div>

    `;

    return html;
}


// =====================================================
// INDIVIDUAL TABLE
// =====================================================

function showTable(number) {

    let html = `

        <div class="table-result-box">

            <div class="table-big-number">
                ${number}
            </div>

            <h2>
                Table of ${number}
            </h2>

            <div class="multiplication-list">

    `;


    for (let i = 1; i <= 10; i++) {

        html += `

            <div class="multiplication-row">

                <span>
                    ${number}
                </span>

                <b>×</b>

                <span>
                    ${i}
                </span>

                <b>=</b>

                <strong>
                    ${number * i}
                </strong>

            </div>

        `;
    }


    html += `

            </div>

        </div>

    `;


    document.getElementById(
        "tableResult"
    ).innerHTML = html;
}


// =====================================================
// FRUITS
// =====================================================

function showFruits() {

    let html = `<div class="cards-grid">`;

    fruits.forEach(item => {

        html += `

            <div class="learning-card fruit-card"
                 onclick="speak('${item[0]}')">

                <div class="learning-emoji fruit-emoji">
                    ${item[1]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

                <div class="mini-text">
                    Yummy!
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// BODY PARTS
// =====================================================

function showBodyParts() {

    let html = `<div class="cards-grid">`;

    bodyParts.forEach(item => {

        html += `

            <div class="learning-card"
                 onclick="speak('${item[0]}')">

                <div class="learning-emoji">
                    ${item[1]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// ANIMALS
// =====================================================

function showAnimals() {

    let html = `<div class="cards-grid">`;

    animals.forEach(item => {

        html += `

            <div class="learning-card animal-card"
                 onclick="speak('${item[0]}')">

                <div class="learning-emoji animal-emoji">
                    ${item[1]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

                <div class="mini-text">
                    Say hello! 👋
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// COLOURS
// =====================================================

function showColours() {

    let html = `<div class="cards-grid">`;

    colours.forEach(item => {

        html += `

            <div class="learning-card colour-card"
                 onclick="speak('${item[0]}')">

                <div class="colour-circle"
                     style="background:${item[1]}">
                </div>

                <div class="learning-emoji">
                    ${item[2]}
                </div>

                <div class="word">
                    ${item[0]}
                </div>

            </div>

        `;
    });

    html += `</div>`;

    return html;
}


// =====================================================
// BACK HOME
// =====================================================

function goHome() {

    learningPage.classList.remove("active");

    homePage.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =====================================================
// VOICE
// =====================================================

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.rate = 0.75;

    speech.pitch = 1.15;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}
/* =====================================================
   HINDI ALPHABET DATA
   ===================================================== */

const hindiAlphabets = [

    {
        letter: "अ",
        word: "अनार",
        meaning: "Pomegranate",
        sound: "अ से अनार"
    },

    {
        letter: "आ",
        word: "आम",
        meaning: "Mango",
        sound: "आ से आम"
    },

    {
        letter: "इ",
        word: "इमली",
        meaning: "Tamarind",
        sound: "इ से इमली"
    },

    {
        letter: "ई",
        word: "ईख",
        meaning: "Sugarcane",
        sound: "ई से ईख"
    },

    {
        letter: "उ",
        word: "उल्लू",
        meaning: "Owl",
        sound: "उ से उल्लू"
    },

    {
        letter: "ऊ",
        word: "ऊन",
        meaning: "Wool",
        sound: "ऊ से ऊन"
    },

    {
        letter: "ऋ",
        word: "ऋषि",
        meaning: "Sage",
        sound: "ऋ से ऋषि"
    },

    {
        letter: "ए",
        word: "एड़ी",
        meaning: "Heel",
        sound: "ए से एड़ी"
    },

    {
        letter: "ऐ",
        word: "ऐनक",
        meaning: "Spectacles",
        sound: "ऐ से ऐनक"
    },

    {
        letter: "ओ",
        word: "ओखली",
        meaning: "Mortar",
        sound: "ओ से ओखली"
    },

    {
        letter: "औ",
        word: "औरत",
        meaning: "Woman",
        sound: "औ से औरत"
    },

    {
        letter: "अं",
        word: "अंगूर",
        meaning: "Grapes",
        sound: "अं से अंगूर"
    },

    {
        letter: "अः",
        word: "दुःख",
        meaning: "Sorrow",
        sound: "अः का उदाहरण दुःख"
    },


    /* ================= व्यंजन ================= */

    {
        letter: "क",
        word: "कमल",
        meaning: "Lotus",
        sound: "क से कमल"
    },

    {
        letter: "ख",
        word: "खरगोश",
        meaning: "Rabbit",
        sound: "ख से खरगोश"
    },

    {
        letter: "ग",
        word: "गमला",
        meaning: "Flower Pot",
        sound: "ग से गमला"
    },

    {
        letter: "घ",
        word: "घर",
        meaning: "House",
        sound: "घ से घर"
    },

    {
        letter: "ङ",
        word: "गंगा",
        meaning: "Ganga River",
        sound: "ङ का प्रयोग गंगा शब्द में"
    },

    {
        letter: "च",
        word: "चम्मच",
        meaning: "Spoon",
        sound: "च से चम्मच"
    },

    {
        letter: "छ",
        word: "छतरी",
        meaning: "Umbrella",
        sound: "छ से छतरी"
    },

    {
        letter: "ज",
        word: "जहाज",
        meaning: "Ship",
        sound: "ज से जहाज"
    },

    {
        letter: "झ",
        word: "झंडा",
        meaning: "Flag",
        sound: "झ से झंडा"
    },

    {
        letter: "ञ",
        word: "ज्ञान",
        meaning: "Knowledge",
        sound: "ञ का प्रयोग ज्ञान शब्द में"
    },

    {
        letter: "ट",
        word: "टमाटर",
        meaning: "Tomato",
        sound: "ट से टमाटर"
    },

    {
        letter: "ठ",
        word: "ठेला",
        meaning: "Cart",
        sound: "ठ से ठेला"
    },

    {
        letter: "ड",
        word: "डमरू",
        meaning: "Small Drum",
        sound: "ड से डमरू"
    },

    {
        letter: "ढ",
        word: "ढक्कन",
        meaning: "Lid",
        sound: "ढ से ढक्कन"
    },

    {
        letter: "ण",
        word: "गणेश",
        meaning: "Ganesha",
        sound: "ण का प्रयोग गणेश शब्द में"
    },

    {
        letter: "त",
        word: "तरबूज",
        meaning: "Watermelon",
        sound: "त से तरबूज"
    },

    {
        letter: "थ",
        word: "थर्मस",
        meaning: "Thermos",
        sound: "थ से थर्मस"
    },

    {
        letter: "द",
        word: "दवात",
        meaning: "Inkpot",
        sound: "द से दवात"
    },

    {
        letter: "ध",
        word: "धनुष",
        meaning: "Bow",
        sound: "ध से धनुष"
    },

    {
        letter: "न",
        word: "नल",
        meaning: "Tap",
        sound: "न से नल"
    },

    {
        letter: "प",
        word: "पतंग",
        meaning: "Kite",
        sound: "प से पतंग"
    },

    {
        letter: "फ",
        word: "फल",
        meaning: "Fruit",
        sound: "फ से फल"
    },

    {
        letter: "ब",
        word: "बकरी",
        meaning: "Goat",
        sound: "ब से बकरी"
    },

    {
        letter: "भ",
        word: "भालू",
        meaning: "Bear",
        sound: "भ से भालू"
    },

    {
        letter: "म",
        word: "मछली",
        meaning: "Fish",
        sound: "म से मछली"
    },

    {
        letter: "य",
        word: "यमराज",
        meaning: "Yamraj",
        sound: "य से यमराज"
    },

    {
        letter: "र",
        word: "रथ",
        meaning: "Chariot",
        sound: "र से रथ"
    },

    {
        letter: "ल",
        word: "लट्टू",
        meaning: "Spinning Top",
        sound: "ल से लट्टू"
    },

    {
        letter: "व",
        word: "वन",
        meaning: "Forest",
        sound: "व से वन"
    },

    {
        letter: "श",
        word: "शेर",
        meaning: "Lion",
        sound: "श से शेर"
    },

    {
        letter: "ष",
        word: "षट्कोण",
        meaning: "Hexagon",
        sound: "ष से षट्कोण"
    },

    {
        letter: "स",
        word: "सूरज",
        meaning: "Sun",
        sound: "स से सूरज"
    },

    {
        letter: "ह",
        word: "हाथी",
        meaning: "Elephant",
        sound: "ह से हाथी"
    },

    {
        letter: "क्ष",
        word: "क्षमा",
        meaning: "Forgiveness",
        sound: "क्ष से क्षमा"
    },

    {
        letter: "त्र",
        word: "त्रिशूल",
        meaning: "Trident",
        sound: "त्र से त्रिशूल"
    },

    {
        letter: "ज्ञ",
        word: "ज्ञान",
        meaning: "Knowledge",
        sound: "ज्ञ से ज्ञान"
    }

];


/* =====================================================
   CREATE HINDI CARDS
   ===================================================== */

const hindiGrid = document.getElementById("hindiGrid");


if (hindiGrid) {

    hindiAlphabets.forEach((item) => {

        const card = document.createElement("div");

        card.className = "hindi-card";

        card.innerHTML = `

            <div class="hindi-letter">
                ${item.letter}
            </div>

            <div class="hindi-word">
                ${item.word}
            </div>

            <div class="hindi-meaning">
                ${item.meaning}
            </div>

            <button
                class="hindi-sound-btn"
                onclick="speakHindi('${item.sound}')"
                aria-label="Listen to ${item.sound}"
            >
                🔊
            </button>

        `;

        hindiGrid.appendChild(card);

    });

}


/* =====================================================
   HINDI TEXT TO SPEECH
   ===================================================== */

function speakHindi(text) {

    if (!("speechSynthesis" in window)) {

        alert(
            "Sorry! Your browser does not support voice playback."
        );

        return;
    }


    // Agar pehle se koi sound chal raha hai
    window.speechSynthesis.cancel();


    const speech = new SpeechSynthesisUtterance(text);


    // Hindi language
    speech.lang = "hi-IN";


    // Natural child-friendly speed
    speech.rate = 0.85;


    // Normal pitch
    speech.pitch = 1;


    // Volume
    speech.volume = 1;


    window.speechSynthesis.speak(speech);
}
