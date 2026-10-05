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

/* =========================================================
   HINDI ALPHABET LEARNING SYSTEM
   ========================================================= */

const hindiAlphabet = [

    {
        letter: "अ",
        word: "अनार",
        meaning: "अनार एक स्वादिष्ट फल है।",
        english: "Pomegranate",
        emoji: "🍎"
    },

    {
        letter: "आ",
        word: "आम",
        meaning: "आम एक मीठा और स्वादिष्ट फल है।",
        english: "Mango",
        emoji: "🥭"
    },

    {
        letter: "इ",
        word: "इमली",
        meaning: "इमली का स्वाद खट्टा होता है।",
        english: "Tamarind",
        emoji: "🌿"
    },

    {
        letter: "ई",
        word: "ईख",
        meaning: "ईख से गन्ने का रस बनाया जाता है।",
        english: "Sugarcane",
        emoji: "🌱"
    },

    {
        letter: "उ",
        word: "उल्लू",
        meaning: "उल्लू एक पक्षी है जो रात में जागता है।",
        english: "Owl",
        emoji: "🦉"
    },

    {
        letter: "ऊ",
        word: "ऊन",
        meaning: "ऊन भेड़ से मिलने वाला मुलायम रेशा है।",
        english: "Wool",
        emoji: "🧶"
    },

    {
        letter: "ऋ",
        word: "ऋषि",
        meaning: "ऋषि ज्ञानी और तपस्वी व्यक्ति को कहा जाता है।",
        english: "Sage",
        emoji: "🧘"
    },

    {
        letter: "ए",
        word: "एड़ी",
        meaning: "एड़ी पैर का पिछला हिस्सा होती है।",
        english: "Heel",
        emoji: "🦶"
    },

    {
        letter: "ऐ",
        word: "ऐनक",
        meaning: "ऐनक आँखों की सहायता के लिए पहनी जाती है।",
        english: "Glasses",
        emoji: "👓"
    },

    {
        letter: "ओ",
        word: "ओखली",
        meaning: "ओखली में अनाज या मसाले कूटे जाते हैं।",
        english: "Mortar",
        emoji: "🥣"
    },

    {
        letter: "औ",
        word: "औरत",
        meaning: "औरत एक वयस्क महिला को कहा जाता है।",
        english: "Woman",
        emoji: "👩"
    },

    {
        letter: "अं",
        word: "अंगूर",
        meaning: "अंगूर छोटे और मीठे फल होते हैं।",
        english: "Grapes",
        emoji: "🍇"
    },

    {
        letter: "अः",
        word: "दुःख",
        meaning: "दुःख का अर्थ है मन में उदासी या परेशानी।",
        english: "Sorrow",
        emoji: "💙"
    },

    {
        letter: "क",
        word: "कमल",
        meaning: "कमल एक सुंदर फूल है।",
        english: "Lotus",
        emoji: "🌸"
    },

    {
        letter: "ख",
        word: "खरगोश",
        meaning: "खरगोश एक छोटा और तेज दौड़ने वाला जानवर है।",
        english: "Rabbit",
        emoji: "🐇"
    },

    {
        letter: "ग",
        word: "गमला",
        meaning: "गमले में पौधे लगाए जाते हैं।",
        english: "Flower Pot",
        emoji: "🪴"
    },

    {
        letter: "घ",
        word: "घर",
        meaning: "घर वह स्थान है जहाँ हम रहते हैं।",
        english: "House",
        emoji: "🏠"
    },

    {
        letter: "ङ",
        word: "ङ",
        meaning: "यह हिंदी वर्णमाला का एक व्यंजन है।",
        english: "Hindi letter",
        emoji: "🔤"
    },

    {
        letter: "च",
        word: "चम्मच",
        meaning: "चम्मच से भोजन खाया जाता है।",
        english: "Spoon",
        emoji: "🥄"
    },

    {
        letter: "छ",
        word: "छाता",
        meaning: "छाता बारिश से बचने के लिए इस्तेमाल होता है।",
        english: "Umbrella",
        emoji: "☂️"
    },

    {
        letter: "ज",
        word: "जहाज",
        meaning: "जहाज पानी में चलने वाला बड़ा वाहन है।",
        english: "Ship",
        emoji: "🚢"
    },

    {
        letter: "झ",
        word: "झंडा",
        meaning: "झंडा किसी देश या संस्था का प्रतीक हो सकता है।",
        english: "Flag",
        emoji: "🇮🇳"
    },

    {
        letter: "ञ",
        word: "ञ",
        meaning: "यह हिंदी वर्णमाला का एक व्यंजन है।",
        english: "Hindi letter",
        emoji: "🔤"
    },

    {
        letter: "ट",
        word: "टमाटर",
        meaning: "टमाटर एक लाल रंग की सब्जी है।",
        english: "Tomato",
        emoji: "🍅"
    },

    {
        letter: "ठ",
        word: "ठेला",
        meaning: "ठेला सामान ले जाने के लिए इस्तेमाल होता है।",
        english: "Cart",
        emoji: "🛒"
    },

    {
        letter: "ड",
        word: "डमरू",
        meaning: "डमरू एक छोटा वाद्य यंत्र है।",
        english: "Drum",
        emoji: "🥁"
    },

    {
        letter: "ढ",
        word: "ढक्कन",
        meaning: "ढक्कन किसी बर्तन को ढकने के लिए होता है।",
        english: "Lid",
        emoji: "🥣"
    },

    {
        letter: "ण",
        word: "ण",
        meaning: "यह हिंदी वर्णमाला का एक व्यंजन है।",
        english: "Hindi letter",
        emoji: "🔤"
    },

    {
        letter: "त",
        word: "तरबूज",
        meaning: "तरबूज गर्मियों में खाया जाने वाला रसदार फल है।",
        english: "Watermelon",
        emoji: "🍉"
    },

    {
        letter: "थ",
        word: "थैला",
        meaning: "थैले में सामान रखा जाता है।",
        english: "Bag",
        emoji: "👜"
    },

    {
        letter: "द",
        word: "दवात",
        meaning: "दवात में स्याही रखी जाती थी।",
        english: "Ink Pot",
        emoji: "🖋️"
    },

    {
        letter: "ध",
        word: "धनुष",
        meaning: "धनुष एक प्राचीन हथियार है।",
        english: "Bow",
        emoji: "🏹"
    },

    {
        letter: "न",
        word: "नल",
        meaning: "नल से पानी आता है।",
        english: "Tap",
        emoji: "🚰"
    },

    {
        letter: "प",
        word: "पतंग",
        meaning: "पतंग हवा में उड़ाई जाती है।",
        english: "Kite",
        emoji: "🪁"
    },

    {
        letter: "फ",
        word: "फल",
        meaning: "फल हमारे लिए पौष्टिक भोजन हैं।",
        english: "Fruit",
        emoji: "🍎"
    },

    {
        letter: "ब",
        word: "बतख",
        meaning: "बतख एक पक्षी है जो पानी में तैर सकती है।",
        english: "Duck",
        emoji: "🦆"
    },

    {
        letter: "भ",
        word: "भालू",
        meaning: "भालू एक बड़ा जंगली जानवर है।",
        english: "Bear",
        emoji: "🐻"
    },

    {
        letter: "म",
        word: "मछली",
        meaning: "मछली पानी में रहने वाला जीव है।",
        english: "Fish",
        emoji: "🐟"
    },

    {
        letter: "य",
        word: "यज्ञ",
        meaning: "यज्ञ एक धार्मिक अनुष्ठान है।",
        english: "Sacred Ritual",
        emoji: "🔥"
    },

    {
        letter: "र",
        word: "रथ",
        meaning: "रथ पहियों वाला एक वाहन है।",
        english: "Chariot",
        emoji: "🏇"
    },

    {
        letter: "ल",
        word: "लट्टू",
        meaning: "लट्टू बच्चों का एक घूमने वाला खिलौना है।",
        english: "Spinning Top",
        emoji: "🌀"
    },

    {
        letter: "व",
        word: "वन",
        meaning: "वन में बहुत सारे पेड़ और पौधे होते हैं।",
        english: "Forest",
        emoji: "🌳"
    },

    {
        letter: "श",
        word: "शेर",
        meaning: "शेर एक शक्तिशाली जंगली जानवर है।",
        english: "Lion",
        emoji: "🦁"
    },

    {
        letter: "ष",
        word: "षट्कोण",
        meaning: "षट्कोण छह भुजाओं वाली आकृति है।",
        english: "Hexagon",
        emoji: "⬡"
    },

    {
        letter: "स",
        word: "सूरज",
        meaning: "सूरज हमें प्रकाश और गर्मी देता है।",
        english: "Sun",
        emoji: "☀️"
    },

    {
        letter: "ह",
        word: "हाथी",
        meaning: "हाथी एक बहुत बड़ा जानवर है।",
        english: "Elephant",
        emoji: "🐘"
    },

    {
        letter: "क्ष",
        word: "क्षमा",
        meaning: "क्षमा का अर्थ है किसी की गलती को माफ करना।",
        english: "Forgiveness",
        emoji: "❤️"
    },

    {
        letter: "त्र",
        word: "त्रिशूल",
        meaning: "त्रिशूल तीन नुकीले सिरों वाला प्रतीक है।",
        english: "Trident",
        emoji: "🔱"
    },

    {
        letter: "ज्ञ",
        word: "ज्ञान",
        meaning: "ज्ञान का अर्थ है किसी विषय की समझ और जानकारी।",
        english: "Knowledge",
        emoji: "📚"
    }

];


/* =========================================================
   OPEN HINDI ALPHABET
   ========================================================= */

function openHindiAlphabet() {

    const homePage = document.getElementById("homePage");
    const learningPage = document.getElementById("learningPage");

    if (homePage) {
        homePage.style.display = "none";
    }

    if (learningPage) {
        learningPage.style.display = "block";
    }

    const icon = document.getElementById("learningIcon");
    const title = document.getElementById("learningTitle");
    const subtitle = document.getElementById("learningSubtitle");
    const content = document.getElementById("learningContent");

    if (icon) {
        icon.textContent = "🇮🇳";
    }

    if (title) {
        title.textContent = "हिंदी वर्णमाला";
    }

    if (subtitle) {
        subtitle.textContent = "अ से ज्ञ तक हिंदी अक्षर सीखें!";
    }

    if (!content) return;

    content.innerHTML = "";

    const heading = document.createElement("div");

    heading.className = "hindi-learning-heading";

    heading.innerHTML = `
        <h2>🌈 हिंदी अक्षर सीखें</h2>
        <p>किसी भी अक्षर पर क्लिक करें और उसका उच्चारण सुनें 🔊</p>
    `;

    content.appendChild(heading);


    const grid = document.createElement("div");

    grid.className = "hindi-grid";


    hindiAlphabet.forEach((item) => {

        const card = document.createElement("div");

        card.className = "hindi-card";


        card.innerHTML = `
            <div class="hindi-letter">
                ${item.letter}
            </div>

            <div class="hindi-word">
                ${item.emoji} ${item.word}
            </div>

            <div class="hindi-meaning">
                ${item.meaning}
            </div>

            <button
                class="hindi-sound-btn"
                onclick="speakHindi('${item.letter}', '${item.word}')"
                aria-label="उच्चारण सुनें">

                🔊

            </button>
        `;

card.addEventListener("click", function(event) {

    if (event.target.closest(".hindi-sound-btn")) {
        return;
    }

    speakHindi(item.letter, item.word);

}); content.appendChild(grid);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   HINDI PRONUNCIATION
   ========================================================= */

function speakHindi(letter, word) {

    if (!("speechSynthesis" in window)) {

        alert("Aapke browser mein voice support available nahi hai.");

        return;
    }


    window.speechSynthesis.cancel();


    const text = `${letter} से ${word}`;


    const speech = new SpeechSynthesisUtterance(text);


    speech.lang = "hi-IN";
    speech.rate = 0.75;
    speech.pitch = 1.05;
    speech.volume = 1;


    window.speechSynthesis.speak(speech);
}
