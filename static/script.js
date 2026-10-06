// ============================================================
// KIDS LEARNING WORLD 🌈
// COMPLETE LEARNING SYSTEM
// PART 1
// ============================================================
//
// IMPORTANT:
// This file works with the existing index.html IDs:
//
// homePage
// learningPage
// learningContent
// learningTitle
// learningSubtitle
// learningIcon
//
// Hindi Alphabet:
// अ → ज्ञ
//
// ============================================================


// ============================================================
// GLOBAL SETTINGS
// ============================================================

const APP_SETTINGS = {

    speechRate: 0.72,

    speechPitch: 1.05,

    speechVolume: 1,

    animationDuration: 600,

    cardAnimationDelay: 45,

    scrollBehavior: "smooth"

};


// ============================================================
// DOM ELEMENTS
// ============================================================

const homePage =
    document.getElementById("homePage");


const learningPage =
    document.getElementById("learningPage");


const learningContent =
    document.getElementById("learningContent");


const learningTitle =
    document.getElementById("learningTitle");


const learningSubtitle =
    document.getElementById("learningSubtitle");


const learningIcon =
    document.getElementById("learningIcon");


// ============================================================
// CURRENT STATE
// ============================================================

let currentCategory = "";

let currentSpeech = null;

let speechSupported =
    "speechSynthesis" in window;


// ============================================================
// SAFE ELEMENT CHECK
// ============================================================

function elementExists(element) {

    return element !== null &&
           element !== undefined;

}


// ============================================================
// SAFE TEXT
// ============================================================

function safeText(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }

    return String(value);

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHTML(value) {

    return safeText(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ============================================================
// ABC DATA
// ============================================================

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


// ============================================================
// DAYS DATA
// ============================================================

const days = [

    ["Monday", "🌞"],

    ["Tuesday", "🌈"],

    ["Wednesday", "⭐"],

    ["Thursday", "🌻"],

    ["Friday", "🎉"],

    ["Saturday", "🎈"],

    ["Sunday", "☀️"]

];


// ============================================================
// MONTHS DATA
// ============================================================

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


// ============================================================
// FRUITS DATA
// ============================================================

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


// ============================================================
// BODY PARTS DATA
// ============================================================

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


// ============================================================
// ANIMALS DATA
// ============================================================

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


// ============================================================
// COLOURS DATA
// ============================================================

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


// ============================================================
// HINDI ALPHABET DATA
// ============================================================

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


// ============================================================
// SHOW CATEGORY
// ============================================================

function showCategory(category) {

    currentCategory = category;

    if (!elementExists(homePage) ||
        !elementExists(learningPage)) {

        console.error(
            "Learning page elements not found."
        );

        return;

    }


    homePage.style.display = "none";

    learningPage.classList.add("active");

    learningPage.style.display = "block";


    window.scrollTo({

        top: 0,

        behavior: APP_SETTINGS.scrollBehavior

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

    else if (category === "hindi") {

        openHindiAlphabet();

    }

}


// ============================================================
// SETUP LEARNING
// ============================================================

function setupLearning(
    icon,
    title,
    subtitle,
    content
) {

    if (elementExists(learningIcon)) {

        learningIcon.textContent =
            safeText(icon);

    }


    if (elementExists(learningTitle)) {

        learningTitle.textContent =
            safeText(title);

    }


    if (elementExists(learningSubtitle)) {

        learningSubtitle.textContent =
            safeText(subtitle);

    }


    if (!elementExists(learningContent)) {

        return;

    }


    learningContent.innerHTML =
        content;


    animateLearningCards();

}


// ============================================================
// ANIMATE LEARNING CARDS
// ============================================================

function animateLearningCards() {

    setTimeout(() => {

        const cards =
            document.querySelectorAll(
                ".learning-card"
            );


        cards.forEach(
            (card, index) => {

                card.style.animationDelay =
                    `${index * APP_SETTINGS.cardAnimationDelay}ms`;

            }
        );


    }, 50);

}


// ============================================================
// ABC PAGE
// ============================================================

function showAlphabet() {

    let html =
        `<div class="cards-grid alphabet-grid">`;


    alphabet.forEach(
        (item, index) => {

            const letter =
                escapeHTML(item[0]);

            const word =
                escapeHTML(item[1]);

            const emoji =
                escapeHTML(item[2]);


            html += `

                <div
                    class="learning-card alphabet-card"
                    tabindex="0"
                    role="button"
                    data-index="${index}"
                    onclick="handleAlphabetClick(this, '${letter}', '${word}')"
                    onkeydown="handleCardKey(event, this, '${letter}', '${word}')"
                >

                    <div class="letter">
                        ${letter}
                    </div>

                    <div class="learning-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${word}
                    </div>

                    <div class="mini-text">
                        ${letter} for ${word}
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// ABC CLICK
// ============================================================

function handleAlphabetClick(
    card,
    letter,
    word
) {

    animateCard(card);

    speak(
        `${letter} for ${word}`
    );

}


// ============================================================
// DAYS PAGE
// ============================================================

function showDays() {

    let html =
        `<div class="cards-grid">`;


    days.forEach(
        (item, index) => {

            const name =
                escapeHTML(item[0]);

            const emoji =
                escapeHTML(item[1]);


            html += `

                <div
                    class="learning-card day-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div class="number-badge">
                        ${index + 1}
                    </div>

                    <div class="learning-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="mini-text">
                        Day ${index + 1}
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// MONTHS PAGE
// ============================================================

function showMonths() {

    let html =
        `<div class="cards-grid months-grid">`;


    months.forEach(
        (item, index) => {

            const name =
                escapeHTML(item[0]);

            const emoji =
                escapeHTML(item[1]);


            html += `

                <div
                    class="learning-card month-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div class="number-badge">
                        ${index + 1}
                    </div>

                    <div class="learning-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// SIMPLE CARD CLICK
// ============================================================

function handleSimpleCardClick(
    card,
    text
) {

    animateCard(card);

    speak(text);

}


// ============================================================
// KEYBOARD SUPPORT
// ============================================================

function handleCardKey(
    event,
    card,
    text
) {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();

        animateCard(card);

        speak(text);

    }

}


// ============================================================
// CARD ANIMATION
// ============================================================

function animateCard(card) {

    if (!card) {

        return;

    }


    card.classList.remove(
        "card-active"
    );


    void card.offsetWidth;


    card.classList.add(
        "card-active"
    );


    setTimeout(() => {

        card.classList.remove(
            "card-active"
        );

    }, APP_SETTINGS.animationDuration);

}


// ============================================================
// SPEECH FUNCTION
// ============================================================

function speak(text) {

    if (!speechSupported) {

        console.warn(
            "Speech synthesis is not supported."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            safeText(text)
        );


    speech.rate =
        APP_SETTINGS.speechRate;


    speech.pitch =
        APP_SETTINGS.speechPitch;


    speech.volume =
        APP_SETTINGS.speechVolume;


    speech.lang = "en-IN";


    currentSpeech =
        speech;


    speech.onstart = function () {

        document.body.classList.add(
            "speaking"
        );

    };


    speech.onend = function () {

        document.body.classList.remove(
            "speaking"
        );

    };


    speech.onerror = function () {

        document.body.classList.remove(
            "speaking"
        );

    };


    window.speechSynthesis.speak(
        speech
    );

}


// ============================================================
// STOP SPEECH
// ============================================================

function stopSpeech() {

    if (!speechSupported) {

        return;

    }


    window.speechSynthesis.cancel();


    document.body.classList.remove(
        "speaking"
    );

}


// ============================================================
// PAUSE SPEECH
// ============================================================

function pauseSpeech() {

    if (!speechSupported) {

        return;

    }


    if (
        window.speechSynthesis.speaking
    ) {

        window.speechSynthesis.pause();

    }

}


// ============================================================
// RESUME SPEECH
// ============================================================

function resumeSpeech() {

    if (!speechSupported) {

        return;

    }


    if (
        window.speechSynthesis.paused
    ) {

        window.speechSynthesis.resume();

    }

}


// ============================================================
// TABLES PAGE
// ============================================================

function showTables() {

    let html = `

        <div class="table-choice">

            <div class="table-choice-title">
                ✨ Choose a table
            </div>

            <div class="table-buttons">

    `;


    for (
        let i = 1;
        i <= 20;
        i++
    ) {

        html += `

            <button
                type="button"
                onclick="showTable(${i})"
                class="table-number"
            >
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


// ============================================================
// SHOW INDIVIDUAL TABLE
// ============================================================

function showTable(number) {

    const result =
        document.getElementById(
            "tableResult"
        );


    if (!result) {

        return;

    }


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


    for (
        let i = 1;
        i <= 10;
        i++
    ) {

        const answer =
            number * i;


        html += `

            <div
                class="multiplication-row"
                onclick="speak('${number} times ${i} equals ${answer}')"
            >

                <span>
                    ${number}
                </span>

                <b>×</b>

                <span>
                    ${i}
                </span>

                <b>=</b>

                <strong>
                    ${answer}
                </strong>

            </div>

        `;

    }


    html += `

            </div>

        </div>

    `;


    result.innerHTML =
        html;


    result.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ============================================================
// FRUITS PAGE
// ============================================================

function showFruits() {

    let html =
        `<div class="cards-grid">`;


    fruits.forEach(
        (item, index) => {

            const name =
                escapeHTML(item[0]);

            const emoji =
                escapeHTML(item[1]);


            html += `

                <div
                    class="learning-card fruit-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div class="learning-emoji fruit-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="mini-text">
                        Yummy! 😋
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// BODY PARTS PAGE
// ============================================================

function showBodyParts() {

    let html =
        `<div class="cards-grid">`;


    bodyParts.forEach(
        (item) => {

            const name =
                escapeHTML(item[0]);

            const emoji =
                escapeHTML(item[1]);


            html += `

                <div
                    class="learning-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div class="learning-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// ANIMALS PAGE
// ============================================================

function showAnimals() {

    let html =
        `<div class="cards-grid">`;


    animals.forEach(
        (item) => {

            const name =
                escapeHTML(item[0]);

            const emoji =
                escapeHTML(item[1]);


            html += `

                <div
                    class="learning-card animal-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div class="learning-emoji animal-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="mini-text">
                        Say hello! 👋
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// COLOURS PAGE
// ============================================================

function showColours() {

    let html =
        `<div class="cards-grid">`;


    colours.forEach(
        (item) => {

            const name =
                escapeHTML(item[0]);

            const color =
                escapeHTML(item[1]);

            const emoji =
                escapeHTML(item[2]);


            html += `

                <div
                    class="learning-card colour-card"
                    tabindex="0"
                    role="button"
                    onclick="handleSimpleCardClick(this, '${name}')"
                    onkeydown="handleCardKey(event, this, '${name}')"
                >

                    <div
                        class="colour-circle"
                        style="background:${color}">
                    </div>

                    <div class="learning-emoji">
                        ${emoji}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                    <div class="sound-hint">
                        🔊 Tap to hear
                    </div>

                </div>

            `;

        }
    );


    html += `</div>`;


    return html;

}


// ============================================================
// GO HOME
// ============================================================

function goHome() {

    stopSpeech();


    currentCategory = "";


    if (elementExists(learningPage)) {

        learningPage.classList.remove(
            "active"
        );

        learningPage.style.display =
            "none";

    }


    if (elementExists(homePage)) {

        homePage.style.display =
            "block";

    }


    window.scrollTo({

        top: 0,

        behavior:
            APP_SETTINGS.scrollBehavior

    });

}


// ============================================================
// HINDI ALPHABET OPEN
// ============================================================

function openHindiAlphabet() {

    currentCategory = "hindi";


    stopSpeech();


    if (elementExists(homePage)) {

        homePage.style.display =
            "none";

    }


    if (elementExists(learningPage)) {

        learningPage.classList.add(
            "active"
        );

        learningPage.style.display =
            "block";

    }


    if (elementExists(learningIcon)) {

        learningIcon.textContent =
            "🇮🇳";

    }


    if (elementExists(learningTitle)) {

        learningTitle.textContent =
            "हिंदी वर्णमाला";

    }


    if (elementExists(learningSubtitle)) {

        learningSubtitle.textContent =
            "अ से ज्ञ तक हिंदी अक्षर सीखें!";

    }


    renderHindiAlphabet();


    window.scrollTo({

        top: 0,

        behavior:
            APP_SETTINGS.scrollBehavior

    });

}


// ============================================================
// RENDER HINDI ALPHABET
// ============================================================

function renderHindiAlphabet() {

    if (!elementExists(learningContent)) {

        return;

    }


    let html = `

        <div class="hindi-learning-heading">

            <div class="hindi-title-icon">
                🌈
            </div>

            <h2>
                हिंदी अक्षर सीखें
            </h2>

            <p>
                किसी भी अक्षर पर क्लिक करें
                और उसका उच्चारण सुनें 🔊
            </p>

        </div>


        <div class="hindi-grid">

    `;


    hindiAlphabet.forEach(
        (item, index) => {

            html +=
                createHindiCard(
                    item,
                    index
                );

        }
    );


    html += `

        </div>

    `;


    learningContent.innerHTML =
        html;


    animateHindiCards();

}


// ============================================================
// CREATE HINDI CARD
// ============================================================

function createHindiCard(
    item,
    index
) {

    const letter =
        escapeHTML(item.letter);

    const word =
        escapeHTML(item.word);

    const meaning =
        escapeHTML(item.meaning);

    const english =
        escapeHTML(item.english);

    const emoji =
        escapeHTML(item.emoji);


    return `

        <div
            class="hindi-card"
            tabindex="0"
            role="button"
            data-hindi-index="${index}"
            onclick="handleHindiCardClick(this, ${index})"
            onkeydown="handleHindiKey(event, this, ${index})"
        >

            <div class="hindi-letter">

                ${letter}

            </div>


            <div class="hindi-emoji">

                ${emoji}

            </div>


            <div class="hindi-word">

                ${word}

            </div>


            <div class="hindi-english">

                ${english}

            </div>


            <div class="hindi-meaning">

                ${meaning}

            </div>


            <button
                type="button"
                class="hindi-sound-btn"
                onclick="event.stopPropagation(); handleHindiCardClick(document.querySelector('[data-hindi-index=&quot;${index}&quot;]'), ${index})"
                aria-label="उच्चारण सुनें"
            >

                🔊

            </button>


            <div class="hindi-tap-text">

                सुनने के लिए टैप करें

            </div>

        </div>

    `;

}


// ============================================================
// HINDI CARD ANIMATION
// ============================================================

function animateHindiCards() {

    setTimeout(() => {

        const cards =
            document.querySelectorAll(
                ".hindi-card"
            );


        cards.forEach(
            (card, index) => {

                card.style.animationDelay =
                    `${index * 35}ms`;

            }
        );


    }, 50);

}


// ============================================================
// HINDI CARD CLICK
// ============================================================

function handleHindiCardClick(
    card,
    index
) {

    const item =
        hindiAlphabet[index];


    if (!item) {

        return;

    }


    animateHindiCard(card);


    speakHindi(
        item.letter,
        item.word
    );

}


// ============================================================
// HINDI KEYBOARD
// ============================================================

function handleHindiKey(
    event,
    card,
    index
) {

    if (
        event.key === "Enter" ||
        event.key === " "
    ) {

        event.preventDefault();


        handleHindiCardClick(
            card,
            index
        );

    }

}


// ============================================================
// HINDI CARD ACTIVE ANIMATION
// ============================================================

function animateHindiCard(card) {

    if (!card) {

        return;

    }


    card.classList.remove(
        "hindi-active"
    );


    void card.offsetWidth;


    card.classList.add(
        "hindi-active"
    );


    setTimeout(() => {

        card.classList.remove(
            "hindi-active"
        );

    }, 750);

}


// ============================================================
// HINDI SPEECH
// ============================================================

function speakHindi(
    letter,
    word
) {

    if (!speechSupported) {

        alert(
            "Aapke browser mein voice support available nahi hai."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const text =
        `${letter} से ${word}`;


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.lang =
        "hi-IN";


    speech.rate =
        0.70;


    speech.pitch =
        1.05;


    speech.volume =
        1;


    currentSpeech =
        speech;


    speech.onstart =
        function () {

            document.body.classList.add(
                "hindi-speaking"
            );

        };


    speech.onend =
        function () {

            document.body.classList.remove(
                "hindi-speaking"
            );

        };


    speech.onerror =
        function () {

            document.body.classList.remove(
                "hindi-speaking"
            );

        };


    window.speechSynthesis.speak(
        speech
    );

}


// ============================================================
// END OF PART 1
// ============================================================
//
// IMPORTANT:
// Part 2 isi file ke END mein paste hoga.
// Part 2 mein:
// - Hindi voice selection
// - Hindi pronunciation effects
// - extra animations
// - speech helpers
// - table animations
// - card effects
// - mobile interactions
//
// ============================================================

/* =========================================================
   💡 LUXURY LAMP START
   ========================================================= */

function turnLampOn() {

    const intro = document.getElementById("studyIntro");

    if (!intro) {
        return;
    }

    if (intro.classList.contains("lamp-on")) {
        return;
    }

    intro.classList.add("lamp-on");

    setTimeout(function () {
        intro.classList.add("hide-intro");
    }, 2200);
}

function openLearningMenu() {

    const categorySection =
        document.querySelector(".category-section");

    const aboutSection =
        document.querySelector(".about-section");

    categorySection.classList.add("show-learning-menu");

    if (aboutSection) {
        aboutSection.classList.add("show-learning-menu");
    }

    setTimeout(function () {

        categorySection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}

function openLearningMenu() {

    const categorySection =
        document.querySelector(".category-section");

    const aboutSection =
        document.querySelector(".about-section");

    if (categorySection) {
        categorySection.classList.add("show-learning-menu");
    }

    if (aboutSection) {
        aboutSection.classList.add("show-learning-menu");
    }

    setTimeout(function () {

        if (categorySection) {
            categorySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }, 100);
}

// ============================================================
// 🚀 START LEARNING - FULL LEARNING MENU
// ============================================================

function openLearningMenu() {

    stopSpeech();

    currentCategory = "";

    // Hide Home Page
    if (elementExists(homePage)) {
        homePage.style.display = "none";
    }

    // Show Learning Page
    if (elementExists(learningPage)) {

        learningPage.classList.remove("learning-menu-page");

        // Restart animation
        void learningPage.offsetWidth;

        learningPage.classList.add("active");
        learningPage.classList.add("learning-menu-page");

        learningPage.style.display = "block";
    }

    // Change header
    if (elementExists(learningIcon)) {
        learningIcon.textContent = "🎯";
    }

    if (elementExists(learningTitle)) {
        learningTitle.textContent =
            "What do you want to learn?";
    }

    if (elementExists(learningSubtitle)) {
        learningSubtitle.textContent =
            "Choose a topic and let's start learning! ✨";
    }

    // Show learning categories
    renderLearningMenu();

    // Start from top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// 🎯 RENDER LEARNING MENU
// ============================================================

function renderLearningMenu() {

    if (!elementExists(learningContent)) {
        return;
    }

    learningContent.innerHTML = `

        <div class="learning-menu-intro">

            <div class="learning-menu-stars">
                ✨ ⭐ ✨
            </div>

            <h2>
                🎓 Choose Your Learning Adventure
            </h2>

            <p>
                Pick any topic below and let's learn something amazing!
            </p>

        </div>


        <div class="learning-menu-grid">


            <!-- ABC -->

            <button
                class="learning-menu-card menu-blue"
                type="button"
                onclick="showCategory('abc')">

                <div class="menu-card-icon">
                    🔤
                </div>

                <div class="menu-card-text">

                    <h3>
                        ABC
                    </h3>

                    <p>
                        Learn A to Z
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- HINDI -->

            <button
                class="learning-menu-card menu-hindi"
                type="button"
                onclick="openHindiAlphabet()">

                <div class="menu-card-icon">
                    🇮🇳
                </div>

                <div class="menu-card-text">

                    <h3>
                        Hindi Alphabet
                    </h3>

                    <p>
                        हिंदी वर्णमाला सीखें
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- DAYS -->

            <button
                class="learning-menu-card menu-purple"
                type="button"
                onclick="showCategory('days')">

                <div class="menu-card-icon">
                    📅
                </div>

                <div class="menu-card-text">

                    <h3>
                        Days
                    </h3>

                    <p>
                        Learn the days of the week
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- MONTHS -->

            <button
                class="learning-menu-card menu-pink"
                type="button"
                onclick="showCategory('months')">

                <div class="menu-card-icon">
                    🗓️
                </div>

                <div class="menu-card-text">

                    <h3>
                        Months
                    </h3>

                    <p>
                        Learn the months of the year
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- TABLES -->

            <button
                class="learning-menu-card menu-orange"
                type="button"
                onclick="showCategory('tables')">

                <div class="menu-card-icon">
                    ✖️
                </div>

                <div class="menu-card-text">

                    <h3>
                        Tables
                    </h3>

                    <p>
                        Practice multiplication tables
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- FRUITS -->

            <button
                class="learning-menu-card menu-red"
                type="button"
                onclick="showCategory('fruits')">

                <div class="menu-card-icon">
                    🍎
                </div>

                <div class="menu-card-text">

                    <h3>
                        Fruits
                    </h3>

                    <p>
                        Discover yummy fruits
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- BODY PARTS -->

            <button
                class="learning-menu-card menu-green"
                type="button"
                onclick="showCategory('bodyparts')">

                <div class="menu-card-icon">
                    👦
                </div>

                <div class="menu-card-text">

                    <h3>
                        Body Parts
                    </h3>

                    <p>
                        Learn about your body
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- ANIMALS -->

            <button
                class="learning-menu-card menu-yellow"
                type="button"
                onclick="showCategory('animals')">

                <div class="menu-card-icon">
                    🐶
                </div>

                <div class="menu-card-text">

                    <h3>
                        Animals
                    </h3>

                    <p>
                        Meet amazing animals
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


            <!-- COLOURS -->

            <button
                class="learning-menu-card menu-cyan"
                type="button"
                onclick="showCategory('colours')">

                <div class="menu-card-icon">
                    🎨
                </div>

                <div class="menu-card-text">

                    <h3>
                        Colours
                    </h3>

                    <p>
                        Explore beautiful colours
                    </p>

                </div>

                <span class="menu-card-arrow">
                    →
                </span>

            </button>


        </div>


        <div class="learning-menu-footer">

            🌟 Every click is a new thing to learn! 🌟

        </div>

    `;


    // Animate cards one by one

    const cards =
        document.querySelectorAll(
            ".learning-menu-card"
        );


    cards.forEach(function(card, index) {

        card.style.setProperty(
            "--menu-delay",
            `${index * 80}ms`
        );

    });

}
