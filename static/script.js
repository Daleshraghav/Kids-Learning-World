
/* =========================================================
   🌈 KIDS LEARNING WORLD
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   ⚙️ APP SETTINGS
   ========================================================= */

const APP_SETTINGS = {
    speechRate: 0.72,
    speechPitch: 1.05,
    speechVolume: 1,
    animationDuration: 600,
    cardAnimationDelay: 45,
    scrollBehavior: "auto"
};


/* =========================================================
   📌 DOM REFERENCES
   ========================================================= */

const homePage = document.getElementById("homePage");
const learningPage = document.getElementById("learningPage");
const learningContent = document.getElementById("learningContent");
const learningTitle = document.getElementById("learningTitle");
const learningSubtitle = document.getElementById("learningSubtitle");
const learningIcon = document.getElementById("learningIcon");


/* =========================================================
   🧠 GLOBAL STATE
   ========================================================= */

let currentCategory = "";
let adventureMenuOpen = false;
let currentSpeech = null;
let speechSupported = "speechSynthesis" in window;

let playerScore = 0;
let playerStars = 0;
let playerCorrect = 0;
let playerAnswered = 0;

let currentQuizIndex = 0;
let currentQuizQuestions = [];
let currentQuizType = "";

let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = 0;

let drawingCanvas = null;
let drawingContext = null;
let drawingActive = false;
let drawingColor = "#333333";
let drawingSize = 6;

let connectPoints = [];
let connectCurrent = 0;


/* =========================================================
   🛠️ BASIC HELPERS
   ========================================================= */

function elementExists(element) {
    return !!element;
}


function safeText(value) {
    return value === undefined || value === null ? "" : String(value);
}


function escapeHTML(value) {
    return safeText(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: APP_SETTINGS.scrollBehavior
    });
}


function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* =========================================================
   🔊 SPEECH SYSTEM
   ========================================================= */

function stopSpeech() {

    if (!speechSupported) return;

    window.speechSynthesis.cancel();
    currentSpeech = null;
}


function speak(text, options = {}) {

    if (!speechSupported) {
        return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(safeText(text));

    utterance.rate =
        options.rate !== undefined
            ? options.rate
            : APP_SETTINGS.speechRate;

    utterance.pitch =
        options.pitch !== undefined
            ? options.pitch
            : APP_SETTINGS.speechPitch;

    utterance.volume =
        options.volume !== undefined
            ? options.volume
            : APP_SETTINGS.speechVolume;

    if (options.lang) {
        utterance.lang = options.lang;
    } else {
        utterance.lang = "en-IN";
    }

    currentSpeech = utterance;

    utterance.onend = function () {
        currentSpeech = null;
    };

    window.speechSynthesis.speak(utterance);
}


function pauseSpeech() {

    if (!speechSupported) return;

    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
    }
}


function resumeSpeech() {

    if (!speechSupported) return;

    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
}


/* =========================================================
   🇮🇳 HINDI SPEECH
   ========================================================= */

function speakHindi(letter, word) {

    if (!speechSupported) return;

    stopSpeech();

    const utterance =
        new SpeechSynthesisUtterance(
            `${letter} से ${word}`
        );

    utterance.lang = "hi-IN";
    utterance.rate = 0.70;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    currentSpeech = utterance;

    utterance.onend = function () {
        currentSpeech = null;
    };

    window.speechSynthesis.speak(utterance);
}


/* =========================================================
   🔤 ENGLISH ALPHABET
   ========================================================= */

const alphabet = [
    { letter: "A", word: "Apple", emoji: "🍎" },
    { letter: "B", word: "Ball", emoji: "⚽" },
    { letter: "C", word: "Cat", emoji: "🐱" },
    { letter: "D", word: "Dog", emoji: "🐶" },
    { letter: "E", word: "Elephant", emoji: "🐘" },
    { letter: "F", word: "Fish", emoji: "🐟" },
    { letter: "G", word: "Grapes", emoji: "🍇" },
    { letter: "H", word: "Horse", emoji: "🐴" },
    { letter: "I", word: "Ice Cream", emoji: "🍦" },
    { letter: "J", word: "Juice", emoji: "🧃" },
    { letter: "K", word: "Kite", emoji: "🪁" },
    { letter: "L", word: "Lion", emoji: "🦁" },
    { letter: "M", word: "Monkey", emoji: "🐒" },
    { letter: "N", word: "Nest", emoji: "🪺" },
    { letter: "O", word: "Orange", emoji: "🍊" },
    { letter: "P", word: "Parrot", emoji: "🦜" },
    { letter: "Q", word: "Queen", emoji: "👑" },
    { letter: "R", word: "Rabbit", emoji: "🐰" },
    { letter: "S", word: "Sun", emoji: "☀️" },
    { letter: "T", word: "Tiger", emoji: "🐯" },
    { letter: "U", word: "Umbrella", emoji: "☂️" },
    { letter: "V", word: "Van", emoji: "🚐" },
    { letter: "W", word: "Watch", emoji: "⌚" },
    { letter: "X", word: "Xylophone", emoji: "🎵" },
    { letter: "Y", word: "Yak", emoji: "🐂" },
    { letter: "Z", word: "Zebra", emoji: "🦓" }
];


/* =========================================================
   📅 DAYS
   ========================================================= */

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];


/* =========================================================
   🗓️ MONTHS
   ========================================================= */

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =========================================================
   🍎 FRUITS
   ========================================================= */

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
    ["Guava", "🍐"],
    ["Pomegranate", "❤️"],
    ["Cherry", "🍒"],
    ["Peach", "🍑"],
    ["Pear", "🍐"],
    ["Coconut", "🥥"],
    ["Kiwi", "🥝"],
    ["Lemon", "🍋"],
    ["Lime", "🍋"],
    ["Blueberry", "🫐"],
    ["Raspberry", "🍓"],
    ["Melon", "🍈"],
    ["Plum", "🫐"],
    ["Apricot", "🍑"],
    ["Fig", "🟣"],
    ["Dates", "🌴"],
    ["Jackfruit", "🍈"],
    ["Lychee", "🍒"],
    ["Dragon Fruit", "🐉"],
    ["Avocado", "🥑"],
    ["Star Fruit", "⭐"]
];


/* =========================================================
   👦 BODY PARTS
   ========================================================= */

const bodyParts = [
    ["Head", "🧑"],
    ["Eye", "👁️"],
    ["Ear", "👂"],
    ["Nose", "👃"],
    ["Mouth", "👄"],
    ["Teeth", "🦷"],
    ["Tongue", "👅"],
    ["Hair", "💇"],
    ["Neck", "🧍"],
    ["Shoulder", "💪"],
    ["Arm", "💪"],
    ["Hand", "✋"],
    ["Finger", "☝️"],
    ["Chest", "🫀"],
    ["Heart", "❤️"],
    ["Stomach", "🫃"],
    ["Leg", "🦵"],
    ["Knee", "🦵"],
    ["Foot", "🦶"],
    ["Toe", "🦶"],
    ["Brain", "🧠"],
    ["Lungs", "🫁"],
    ["Skin", "🖐️"],
    ["Bone", "🦴"],
    ["Blood", "🩸"],
    ["Face", "🙂"],
    ["Eyebrow", "🤨"],
    ["Eyelash", "👁️"],
    ["Cheek", "😊"],
    ["Chin", "🙂"]
];


/* =========================================================
   🐶 ANIMALS
   ========================================================= */

const animals = [
    ["Dog", "🐶", "Woof"],
    ["Cat", "🐱", "Meow"],
    ["Cow", "🐮", "Moo"],
    ["Lion", "🦁", "Roar"],
    ["Tiger", "🐯", "Roar"],
    ["Elephant", "🐘", "Trumpet"],
    ["Horse", "🐴", "Neigh"],
    ["Goat", "🐐", "Bleat"],
    ["Sheep", "🐑", "Baa"],
    ["Monkey", "🐒", "Chatter"],
    ["Rabbit", "🐰", "Squeak"],
    ["Bear", "🐻", "Growl"],
    ["Fox", "🦊", "Bark"],
    ["Wolf", "🐺", "Howl"],
    ["Deer", "🦌", "Bleat"],
    ["Giraffe", "🦒", "Hum"],
    ["Zebra", "🦓", "Neigh"],
    ["Kangaroo", "🦘", "Growl"],
    ["Panda", "🐼", "Growl"],
    ["Penguin", "🐧", "Squawk"],
    ["Parrot", "🦜", "Squawk"],
    ["Peacock", "🦚", "Call"],
    ["Duck", "🦆", "Quack"],
    ["Chicken", "🐔", "Cluck"],
    ["Rooster", "🐓", "Cock-a-doodle-doo"],
    ["Frog", "🐸", "Croak"],
    ["Snake", "🐍", "Hiss"],
    ["Crocodile", "🐊", "Growl"],
    ["Dolphin", "🐬", "Click"],
    ["Whale", "🐋", "Song"]
];


/* =========================================================
   🎨 COLOURS
   ========================================================= */

const colours = [
    ["Red", "#ff4d4d", "🔴"],
    ["Blue", "#4d96ff", "🔵"],
    ["Green", "#38b000", "🟢"],
    ["Yellow", "#ffd43b", "🟡"],
    ["Orange", "#ff922b", "🟠"],
    ["Purple", "#9b5de5", "🟣"],
    ["Pink", "#ff70a6", "🩷"],
    ["Brown", "#8d5524", "🟤"],
    ["Black", "#222222", "⚫"],
    ["White", "#ffffff", "⚪"],
    ["Cyan", "#00b4d8", "🔵"],
    ["Grey", "#999999", "⚪"],
    ["Gold", "#f5c542", "🌟"],
    ["Silver", "#bfc0c0", "✨"],
    ["Navy", "#001f54", "🔵"],
    ["Sky Blue", "#74c0fc", "🔵"],
    ["Lime", "#a9e34b", "🟢"],
    ["Magenta", "#d63384", "🩷"],
    ["Maroon", "#800000", "🔴"],
    ["Teal", "#008080", "🟢"],
    ["Olive", "#808000", "🟢"],
    ["Violet", "#7b2cbf", "🟣"],
    ["Beige", "#f5f5dc", "🟨"],
    ["Coral", "#ff7f50", "🟠"],
    ["Peach", "#ffdab9", "🍑"],
    ["Turquoise", "#40e0d0", "💎"],
    ["Indigo", "#4b0082", "🟣"],
    ["Cream", "#fffdd0", "🟡"],
    ["Mint", "#98ff98", "🟢"],
    ["Lavender", "#e6e6fa", "🟣"]
];


/* =========================================================
   🇮🇳 HINDI ALPHABET
   ========================================================= */

const hindiAlphabet = [
    ["अ", "अनार", "Apple", "🍎"],
    ["आ", "आम", "Mango", "🥭"],
    ["इ", "इमली", "Tamarind", "🌿"],
    ["ई", "ईख", "Sugarcane", "🌾"],
    ["उ", "उल्लू", "Owl", "🦉"],
    ["ऊ", "ऊन", "Wool", "🧶"],
    ["ऋ", "ऋषि", "Sage", "🧘"],
    ["ए", "एड़ी", "Heel", "🦶"],
    ["ऐ", "ऐनक", "Glasses", "👓"],
    ["ओ", "ओखली", "Mortar", "🥣"],
    ["औ", "औरत", "Woman", "👩"],
    ["अं", "अंगूर", "Grapes", "🍇"],
    ["अः", "अः", "Visarga", "📖"],

    ["क", "कमल", "Lotus", "🌸"],
    ["ख", "खरगोश", "Rabbit", "🐰"],
    ["ग", "गमला", "Pot", "🪴"],
    ["घ", "घर", "House", "🏠"],
    ["ङ", "ङ", "Letter", "🔤"],

    ["च", "चम्मच", "Spoon", "🥄"],
    ["छ", "छाता", "Umbrella", "☂️"],
    ["ज", "जहाज", "Ship", "🚢"],
    ["झ", "झंडा", "Flag", "🇮🇳"],
    ["ञ", "ञ", "Letter", "🔤"],

    ["ट", "टमाटर", "Tomato", "🍅"],
    ["ठ", "ठेला", "Cart", "🛒"],
    ["ड", "डमरू", "Drum", "🥁"],
    ["ढ", "ढक्कन", "Lid", "🫙"],
    ["ण", "ण", "Letter", "🔤"],

    ["त", "तरबूज", "Watermelon", "🍉"],
    ["थ", "थर्मस", "Thermos", "🧴"],
    ["द", "दवात", "Inkpot", "🖋️"],
    ["ध", "धनुष", "Bow", "🏹"],
    ["न", "नल", "Tap", "🚰"],

    ["प", "पतंग", "Kite", "🪁"],
    ["फ", "फल", "Fruit", "🍎"],
    ["ब", "बकरी", "Goat", "🐐"],
    ["भ", "भालू", "Bear", "🐻"],
    ["म", "मछली", "Fish", "🐟"],

    ["य", "यज्ञ", "Yagya", "🔥"],
    ["र", "रथ", "Chariot", "🏇"],
    ["ल", "लड्डू", "Laddu", "🍬"],
    ["व", "वक", "Crane", "🦢"],

    ["श", "शेर", "Lion", "🦁"],
    ["ष", "षट्कोण", "Hexagon", "⬡"],
    ["स", "सूरज", "Sun", "☀️"],
    ["ह", "हाथी", "Elephant", "🐘"],

    ["क्ष", "क्षत्रिय", "Warrior", "🛡️"],
    ["त्र", "त्रिशूल", "Trident", "🔱"],
    ["ज्ञ", "ज्ञान", "Knowledge", "📚"]
];


/* =========================================================
   🏠 NAVIGATION
   ========================================================= */

function setupLearning(icon, title, subtitle, content) {

    if (!learningPage || !learningContent) return;

    stopSpeech();

    if (homePage) {
        homePage.style.display = "none";
    }

    learningPage.style.display = "block";

    if (learningIcon) {
        learningIcon.textContent = icon;
    }

    if (learningTitle) {
        learningTitle.textContent = title;
    }

    if (learningSubtitle) {
        learningSubtitle.textContent = subtitle;
    }

    learningContent.innerHTML = content;

    scrollToTop();

    animateLearningCards();
}


/* 🚀 START LEARNING BUTTON FIX */

function openLearningMenu() {
    if (!homePage || !learningPage || !learningContent) {
        console.error("Learning page elements nahi mile!");
        return;
    }

    stopSpeech();

    currentCategory = "menu";

    homePage.style.display = "none";
    learningPage.style.display = "block";
    learningPage.classList.add("learning-menu-page");

    if (learningIcon) {
        learningIcon.textContent = "🌟";
    }

    if (learningTitle) {
        learningTitle.textContent = "Choose Your Learning World";
    }

    if (learningSubtitle) {
        learningSubtitle.textContent =
            "Learn • Play • Explore • Create";
    }

    learningContent.innerHTML = renderLearningMenu();

    scrollToTop();
    animateLearningCards();
}

function goHome() {

    stopSpeech();

    currentCategory = "";

    if (learningPage) {
        learningPage.style.display = "none";
        learningPage.classList.remove("learning-menu-page");
    }

    if (homePage) {
        homePage.style.display = "block";
    }

    scrollToTop();
}

function goBackFromLearning() {

    // Current page ka title check karo
    const pageTitle = learningTitle
        ? learningTitle.textContent.trim()
        : "";

    // More Learning topics se Back par main learning menu kholo
    const moreLearningTopics = [
        "abc",
        "hindi",
        "days",
        "months",
        "tables",
        "fruits",
        "bodyparts",
        "animals",
        "colours"
    ];

    if (moreLearningTopics.includes(currentCategory)) {
        openLearningMenu();
        return;
    }

    // Agar World menu par hain, toh main 6 categories par jao
    const worldTitles = [
        "Language World",
        "Maths World",
        "General Knowledge",
        "Science World",
        "Games & Quizzes",
        "Creative World"
    ];

    if (worldTitles.includes(pageTitle)) {
        openLearningMenu();
        return;
    }

    // Agar kisi category ke andar hain,
    // toh usi World ke menu par wapas jao
    const menu = window.currentAdventureMenu;

    if (menu === "language") {
        setupLearning(
            "🔤",
            "Language World",
            "Letters, words, reading and stories!",
            showLanguageMenu()
        );
        return;
    }

    if (menu === "maths") {
        setupLearning(
            "🔢",
            "Maths World",
            "Let's play with numbers!",
            showMathsMenu()
        );
        return;
    }

    if (menu === "gk") {
        setupLearning(
            "🌍",
            "General Knowledge",
            "Discover our amazing world!",
            showGKMenu()
        );
        return;
    }

    if (menu === "science") {
        setupLearning(
            "🔬",
            "Science World",
            "Let's discover how things work!",
            showScienceMenu()
        );
        return;
    }

    if (menu === "games") {
        setupLearning(
            "🎮",
            "Games & Quizzes",
            "Play games and earn stars!",
            showGamesMenu()
        );
        return;
    }

    if (menu === "creativity") {
        setupLearning(
            "🎨",
            "Creative World",
            "Draw, colour and create!",
            showCreativityMenu()
        );
        return;
    }

    // Koi World select nahi hai toh main menu kholo
    openLearningMenu();
}


/* =========================================================
   🎬 CARD ANIMATION
   ========================================================= */

function animateLearningCards() {

    const cards = document.querySelectorAll(
        ".learning-card, .hindi-card, .adventure-card, .learning-menu-card"
    );

    cards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * APP_SETTINGS.cardAnimationDelay}ms`;

    });
}


/* =========================================================
   🔤 MAIN CATEGORY SYSTEM
   ========================================================= */

function showCategory(category) {

    stopSpeech();

    currentCategory = category;

    if (category === "abc") {

        setupLearning(
            "🔤",
            "Learn A to Z",
            "Let's learn letters and words!",
            renderAlphabet()
        );

        return;
    }


    if (category === "days") {

        setupLearning(
            "📅",
            "Days of the Week",
            "Let's learn all seven days!",
            renderDays()
        );

        return;
    }


    if (category === "months") {

        setupLearning(
            "🗓️",
            "Months of the Year",
            "Let's learn all twelve months!",
            renderMonths()
        );

        return;
    }


    if (category === "tables") {

        setupLearning(
            "✖️",
            "Multiplication Tables",
            "Choose a table and start practising!",
            renderTableChoice()
        );

        return;
    }


    if (category === "fruits") {

        setupLearning(
            "🍎",
            "Fruits",
            "Let's learn delicious fruits!",
            renderFruits()
        );

        return;
    }


    if (category === "bodyparts") {

        setupLearning(
            "👦",
            "Body Parts",
            "Let's learn about our body!",
            renderBodyParts()
        );

        return;
    }


    if (category === "animals") {

        setupLearning(
            "🐶",
            "Animals",
            "Let's meet some amazing animals!",
            renderAnimals()
        );

        return;
    }


    if (category === "colours") {

        setupLearning(
            "🎨",
            "Colours",
            "Let's explore beautiful colours!",
            renderColours()
        );

        return;
    }


    if (category === "hindi") {

        openHindiAlphabet();

        return;
    }
}


/* =========================================================
   🔤 ALPHABET RENDER
   ========================================================= */

function renderAlphabet() {

    return `
        <div class="learning-heading">
            <h2>🔤 ABC Alphabet</h2>
            <p>Tap a card to hear the letter.</p>
        </div>

        <div class="cards-grid">

            ${alphabet.map((item, index) => `
                <div
                    class="learning-card"
                    tabindex="0"
                    role="button"
                    onclick="speakAlphabet(${index})"
                    onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();speakAlphabet(${index})}"
                >

                    <div class="letter">
                        ${escapeHTML(item.letter)}
                    </div>

                    <div class="learning-emoji">
                        ${item.emoji}
                    </div>

                    <div class="word">
                        ${escapeHTML(item.word)}
                    </div>

                    <div class="mini-text">
                        🔊 Tap to hear
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


function speakAlphabet(index) {

    const item = alphabet[index];

    if (!item) return;

    speak(
        `${item.letter}. ${item.word}`,
        {
            lang: "en-US",
            rate: 0.68
        }
    );
}


/* =========================================================
   📅 DAYS
   ========================================================= */

function renderDays() {

    return `
        <div class="learning-heading">
            <h2>📅 Days of the Week</h2>
            <p>There are 7 days in a week.</p>
        </div>

        <div class="cards-grid">

            ${days.map((day, index) => `
                <div
                    class="learning-card"
                    onclick="speak('Today is ${day}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${["🌞","🌈","⭐","🌸","🎉","🎮","🏡"][index]}
                    </div>

                    <div class="word">
                        ${day}
                    </div>

                    <div class="mini-text">
                        Day ${index + 1}
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


/* =========================================================
   🗓️ MONTHS
   ========================================================= */

function renderMonths() {

    return `
        <div class="learning-heading">
            <h2>🗓️ Months of the Year</h2>
            <p>There are 12 months in a year.</p>
        </div>

        <div class="cards-grid">

            ${months.map((month, index) => `
                <div
                    class="learning-card"
                    onclick="speak('${month}', {lang:'en-US'})"
                >

                    <div class="number-badge">
                        ${index + 1}
                    </div>

                    <div class="learning-emoji">
                        ${["❄️","💖","🌸","🌷","🌞","🌦️","🏖️","🌈","🍂","🎃","🍁","🎄"][index]}
                    </div>

                    <div class="word">
                        ${month}
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


/* =========================================================
   🍎 FRUITS
   ========================================================= */

function renderFruits() {

    return `
        <div class="learning-heading">
            <h2>🍎 Fruits</h2>
            <p>Tap a fruit to hear its name.</p>
        </div>

        <div class="cards-grid">

            ${fruits.map((item, index) => `
                <div
                    class="learning-card"
                    onclick="speakFruit(${index})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${escapeHTML(item[0])}
                    </div>

                    <div class="mini-text">
                        🔊 Listen
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


function speakFruit(index) {

    if (!fruits[index]) return;

    speak(fruits[index][0], {
        lang: "en-US",
        rate: 0.70
    });
}


/* =========================================================
   👦 BODY PARTS
   ========================================================= */

function renderBodyParts() {

    return `
        <div class="learning-heading">
            <h2>👦 Body Parts</h2>
            <p>Let's learn about our body.</p>
        </div>

        <div class="cards-grid">

            ${bodyParts.map((item, index) => `
                <div
                    class="learning-card"
                    onclick="speak('${item[0]}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${escapeHTML(item[0])}
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


/* =========================================================
   🐶 ANIMALS
   ========================================================= */

function renderAnimals() {

    return `
        <div class="learning-heading">
            <h2>🐾 Animals</h2>
            <p>Meet our animal friends!</p>
        </div>

        <div class="cards-grid">

            ${animals.map((item, index) => `
                <div
                    class="learning-card"
                    onclick="speakAnimal(${index})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${escapeHTML(item[0])}
                    </div>

                    <div class="mini-text">
                        ${escapeHTML(item[2])} 🔊
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


function speakAnimal(index) {

    const item = animals[index];

    if (!item) return;

    speak(
        `${item[0]}. It says ${item[2]}.`,
        {
            lang: "en-US",
            rate: 0.68
        }
    );
}


/* =========================================================
   🎨 COLOURS
   ========================================================= */

function renderColours() {

    return `
        <div class="learning-heading">
            <h2>🎨 Colours</h2>
            <p>Let's learn colours!</p>
        </div>

        <div class="cards-grid">

            ${colours.map((item, index) => `
                <div
                    class="learning-card colour-card"
                    onclick="speak('${item[0]}', {lang:'en-US'})"
                >

                    <div
                        class="colour-circle"
                        style="background:${item[1]}"
                    ></div>

                    <div class="learning-emoji">
                        ${item[2]}
                    </div>

                    <div class="word">
                        ${escapeHTML(item[0])}
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}


/* =========================================================
   🇮🇳 HINDI ALPHABET
   ========================================================= */

function openHindiAlphabet() {

    stopSpeech();

    currentCategory = "hindi";

    setupLearning(
        "🇮🇳",
        "Hindi Alphabet",
        "हिंदी वर्णमाला सीखें और सुनें!",
        renderHindiAlphabet()
    );
}


function renderHindiAlphabet() {

    return `
        <div class="hindi-learning-heading">

            <h2>🇮🇳 हिंदी वर्णमाला</h2>

            <p>
                अक्षर पर टैप करके उच्चारण सुनें।
            </p>

        </div>

        <div class="hindi-grid">

            ${hindiAlphabet.map((item, index) =>
                createHindiCard(
                    {
                        letter: item[0],
                        word: item[1],
                        english: item[2],
                        emoji: item[3]
                    },
                    index
                )
            ).join("")}

        </div>
    `;
}


function createHindiCard(item, index) {

    const letter = escapeHTML(item.letter);
    const word = escapeHTML(item.word);
    const emoji = escapeHTML(item.emoji);

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
                ${letter} — ${word}
            </div>

            <button
                type="button"
                class="hindi-sound-btn"
                onclick="event.stopPropagation(); handleHindiCardClick(this.closest('.hindi-card'), ${index})"
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


function handleHindiCardClick(card, index) {

    if (!hindiAlphabet[index]) return;

    const item = hindiAlphabet[index];

    speakHindi(
        item[0],
        item[1]
    );

    if (card) {

        card.classList.remove("hindi-card-active");

        void card.offsetWidth;

        card.classList.add("hindi-card-active");

        setTimeout(() => {
            card.classList.remove("hindi-card-active");
        }, 700);
    }
}


function handleHindiKey(event, card, index) {

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

/* =========================================================
   🌟 MAIN ADVENTURE MENU
   ========================================================= */

function renderLearningMenu() {

    return `

        <div class="adventure-heading">

            <div class="adventure-badge">
                🌟 BIG LEARNING ADVENTURE
            </div>

            <h2>
                Choose Your Learning World
            </h2>

            <p>
                Learn • Play • Explore • Create
            </p>

        </div>


        <div class="adventure-grid">


            <!-- LANGUAGE -->

            <button
                class="adventure-card adventure-language"
                onclick="openAdventure('language')"
            >

                <div class="adventure-icon">
                    🔤
                </div>

                <h3>
                    Language World
                </h3>

                <p>
                    Letters, words, stories & reading
                </p>

                <span>
                    Explore →
                </span>

            </button>


            <!-- MATHS -->

            <button
                class="adventure-card adventure-maths"
                onclick="openAdventure('maths')"
            >

                <div class="adventure-icon">
                    🔢
                </div>

                <h3>
                    Maths World
                </h3>

                <p>
                    Numbers, maths & challenges
                </p>

                <span>
                    Explore →
                </span>

            </button>


            <!-- GK -->

            <button
                class="adventure-card adventure-gk"
                onclick="openAdventure('gk')"
            >

                <div class="adventure-icon">
                    🌍
                </div>

                <h3>
                    General Knowledge
                </h3>

                <p>
                    World, animals, places & more
                </p>

                <span>
                    Explore →
                </span>

            </button>


            <!-- SCIENCE -->

            <button
                class="adventure-card adventure-science"
                onclick="openAdventure('science')"
            >

                <div class="adventure-icon">
                    🔬
                </div>

                <h3>
                    Science World
                </h3>

                <p>
                    Discover how our world works
                </p>

                <span>
                    Explore →
                </span>

            </button>


            <!-- GAMES -->

            <button
                class="adventure-card adventure-games"
                onclick="openAdventure('games')"
            >

                <div class="adventure-icon">
                    🎮
                </div>

                <h3>
                    Games & Quizzes
                </h3>

                <p>
                    Play games and earn stars
                </p>

                <span>
                    Play →
                </span>

            </button>


            <!-- CREATIVITY -->

            <button
                class="adventure-card adventure-creativity"
                onclick="openAdventure('creativity')"
            >

                <div class="adventure-icon">
                    🎨
                </div>

                <h3>
                    Drawing & Creativity
                </h3>

                <p>
                    Draw, colour and create
                </p>

                <span>
                    Create →
                </span>

            </button>

        </div>


        <div class="learning-menu-existing-title">

            <h2>
                📚 More Learning
            </h2>

            <p>
                Your original learning topics
            </p>

        </div>


        <div class="learning-menu-grid existing-learning-grid">


            <button
                class="learning-menu-card menu-blue"
                onclick="showCategory('abc')"
            >
                <div class="menu-icon">🔤</div>
                <h3>ABC</h3>
                <p>Learn A to Z</p>
            </button>


            <button
                class="learning-menu-card menu-hindi"
                onclick="openHindiAlphabet()"
            >
                <div class="menu-icon">🇮🇳</div>
                <h3>Hindi Alphabet</h3>
                <p>हिंदी वर्णमाला</p>
            </button>


            <button
                class="learning-menu-card menu-purple"
                onclick="showCategory('days')"
            >
                <div class="menu-icon">📅</div>
                <h3>Days</h3>
                <p>Days of the week</p>
            </button>


            <button
                class="learning-menu-card menu-pink"
                onclick="showCategory('months')"
            >
                <div class="menu-icon">🗓️</div>
                <h3>Months</h3>
                <p>Months of the year</p>
            </button>


            <button
                class="learning-menu-card menu-orange"
                onclick="showCategory('tables')"
            >
                <div class="menu-icon">✖️</div>
                <h3>Tables</h3>
                <p>Multiplication tables</p>
            </button>


            <button
                class="learning-menu-card menu-red"
                onclick="showCategory('fruits')"
            >
                <div class="menu-icon">🍎</div>
                <h3>Fruits</h3>
                <p>Learn fruits</p>
            </button>


            <button
                class="learning-menu-card menu-green"
                onclick="showCategory('bodyparts')"
            >
                <div class="menu-icon">👦</div>
                <h3>Body Parts</h3>
                <p>Know your body</p>
            </button>


            <button
                class="learning-menu-card menu-yellow"
                onclick="showCategory('animals')"
            >
                <div class="menu-icon">🐶</div>
                <h3>Animals</h3>
                <p>Meet animals</p>
            </button>


            <button
                class="learning-menu-card menu-cyan"
                onclick="showCategory('colours')"
            >
                <div class="menu-icon">🎨</div>
                <h3>Colours</h3>
                <p>Explore colours</p>
            </button>

        </div>

    `;
}


/* =========================================================
   🚀 OPEN ADVENTURE
   ========================================================= */

function removeLearningMenuMode() {
    if (learningPage) {
        learningPage.classList.remove("learning-menu-page");
    }
}

function openAdventure(type) {

    stopSpeech();

    removeLearningMenuMode();

    currentCategory = type;
   window.currentAdventureMenu = type;
   adventureMenuOpen = true;

    if (type === "language") {

        setupLearning(
            "🔤",
            "Language World",
            "Letters, words, reading and stories!",
            showLanguageMenu()
        );

        return;
    }


    if (type === "maths") {

        setupLearning(
            "🔢",
            "Maths World",
            "Let's play with numbers!",
            showMathsMenu()
        );

        return;
    }


    if (type === "gk") {

        setupLearning(
            "🌍",
            "General Knowledge",
            "Discover our amazing world!",
            showGKMenu()
        );

        return;
    }


    if (type === "science") {

        setupLearning(
            "🔬",
            "Science World",
            "Let's discover how things work!",
            showScienceMenu()
        );

        return;
    }


    if (type === "games") {

        setupLearning(
            "🎮",
            "Games & Quizzes",
            "Play games and earn stars!",
            showGamesMenu()
        );

        return;
    }


    if (type === "creativity") {

        setupLearning(
            "🎨",
            "Creative World",
            "Draw, colour and create!",
            showCreativityMenu()
        );

        return;
    }
}


/* =========================================================
   🔤 LANGUAGE WORLD
   ========================================================= */

function showLanguageMenu() {

    return `

        <div class="learning-heading">

            <h2>🔤 Language World</h2>

            <p>
                Learn letters, words and reading.
            </p>

        </div>


        <div class="learning-menu-grid">


            ${createWorldCard(
                "🔠",
                "Capital & Small Letters",
                "Learn A and a together",
                "openCapitalSmallLetters()"
            )}


${createWorldCard(
    "📖",
    "Word Meaning",
    "Learn English words with Hindi meanings",
    "startWordMeaning()"
)}


            ${createWorldCard(
                "📝",
                "Spell the Word",
                "Build simple words",
                "startSpellingGame()"
            )}


            ${createWorldCard(
                "🐱",
                "Easy Words",
                "CAT • DOG • SUN",
                "openEasyWords()"
            )}


            ${createWorldCard(
                "📖",
                "Short Stories",
                "Read tiny stories",
                "openStories()"
            )}


            ${createWorldCard(
                "म",
                "Hindi Matra",
                "Learn Hindi matras",
                "openHindiMatra()"
            )}


            ${createWorldCard(
                "📚",
                "Hindi Words",
                "Simple Hindi words",
                "openHindiWords()"
            )}

        </div>
    `;
}


function createWorldCard(icon, title, description, action) {

    return `
        <button
            class="learning-menu-card"
            onclick="${action}"
        >

            <div class="menu-icon">
                ${icon}
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(description)}
            </p>

        </button>
    `;
}


/* =========================================================
   🔠 CAPITAL / SMALL LETTERS
   ========================================================= */

function openCapitalSmallLetters() {

    setupLearning(
        "🔠",
        "Capital & Small Letters",
        "Learn uppercase and lowercase letters!",
        `
        <div class="cards-grid">

            ${alphabet.map((item, index) => `

                <div
                    class="learning-card"
                    onclick="speak('${item.letter} ${item.letter.toLowerCase()}', {lang:'en-US'})"
                >

                    <div class="letter">
                        ${item.letter}
                    </div>

                    <div class="word">
                        ${item.letter.toLowerCase()}
                    </div>

                    <div class="learning-emoji">
                        ${item.emoji}
                    </div>

                    <div class="mini-text">
                        ${item.word}
                    </div>

                </div>

            `).join("")}

        </div>
        `
    );
}


/* =========================================================
   ✍️ LETTER WRITING
   ========================================================= */

function openLetterWriting() {

    setupLearning(
        "✍️",
        "Letter Writing Practice",
        "Practice letters on the screen!",
        `

        <div class="learning-card writing-practice-card">

            <div class="letter" id="writingLetter">
                A
            </div>

            <p>
                Trace or write the letter.
            </p>

            <div style="
                display:flex;
                gap:10px;
                justify-content:center;
                flex-wrap:wrap;
            ">

                <button
                    type="button"
                    onclick="previousWritingLetter()"
                >
                    ← Previous
                </button>

                <button
                    type="button"
                    onclick="nextWritingLetter()"
                >
                    Next →
                </button>

                <button
                    type="button"
                    onclick="speakCurrentWritingLetter()"
                >
                    🔊 Hear
                </button>

            </div>

        </div>
        `
    );

    window.currentWritingIndex = 0;
}


function nextWritingLetter() {

    if (window.currentWritingIndex === undefined) {
        window.currentWritingIndex = 0;
    }

    window.currentWritingIndex =
        (window.currentWritingIndex + 1) %
        alphabet.length;

    updateWritingLetter();
}


function previousWritingLetter() {

    if (window.currentWritingIndex === undefined) {
        window.currentWritingIndex = 0;
    }

    window.currentWritingIndex =
        (window.currentWritingIndex - 1 + alphabet.length) %
        alphabet.length;

    updateWritingLetter();
}


function updateWritingLetter() {

    const element =
        document.getElementById("writingLetter");

    if (!element) return;

    const item =
        alphabet[window.currentWritingIndex];

    element.textContent =
        `${item.letter} ${item.letter.toLowerCase()}`;
}


function speakCurrentWritingLetter() {

    const item =
        alphabet[window.currentWritingIndex || 0];

    speak(item.letter, {
        lang: "en-US"
    });
}


/* ==========================================
   📖 WORD MEANING - 50 WORDS
========================================== */

function startWordMeaning() {
    currentCategory = "wordmeaning";
    window.wordMeaningPage = 0;
    renderWordMeaningPage();
}

function renderWordMeaningPage() {
    const words = [
        ["Apple", "🍎", "सेब", "A round fruit that can be red or green."],
        ["Brave", "🦁", "बहादुर", "Ready to face danger without fear."],
        ["Beautiful", "🌸", "सुंदर", "Something that looks very pretty."],
        ["Honest", "🤝", "ईमानदार", "A person who tells the truth."],
        ["Kind", "💗", "दयालु", "Someone who cares about others."],
        ["Clever", "🧠", "चतुर", "Quick to understand and learn."],
        ["Happy", "😊", "खुश", "Feeling joy or pleasure."],
        ["Sad", "😢", "उदास", "Feeling unhappy."],
        ["Strong", "💪", "मज़बूत", "Having great power or strength."],
        ["Polite", "🙏", "विनम्र", "Showing good manners and respect."],
        ["Tiny", "🐜", "बहुत छोटा", "Very small in size."],
        ["Huge", "🐘", "विशाल", "Extremely big."],
        ["Quick", "🐇", "तेज़", "Moving or doing something fast."],
        ["Slow", "🐢", "धीमा", "Moving without much speed."],
        ["Ancient", "🏛️", "प्राचीन", "Very old; from a long time ago."],
        ["Modern", "🏙️", "आधुनिक", "Belonging to the present time."],
        ["Begin", "🚦", "शुरू करना", "To start something."],
        ["Finish", "🏁", "समाप्त करना", "To bring something to an end."],
        ["Quiet", "🤫", "शांत", "Making little or no noise."],
        ["Noisy", "🥁", "शोरगुल वाला", "Making a lot of noise."],
        ["Bright", "☀️", "चमकीला", "Giving out lots of light."],
        ["Dark", "🌙", "अँधेरा", "Having little or no light."],
        ["Clean", "🧼", "साफ़", "Free from dirt."],
        ["Dirty", "🟤", "गंदा", "Not clean."],
        ["Empty", "🫙", "खाली", "Having nothing inside."],
        ["Full", "🎒", "भरा हुआ", "Containing as much as possible."],
        ["Friend", "🧒", "दोस्त", "A person you like and trust."],
        ["Family", "👨‍👩‍👧‍👦", "परिवार", "People who are related to one another."],
        ["Garden", "🌻", "बगीचा", "A place where plants and flowers grow."],
        ["Forest", "🌳", "जंगल", "A large area covered with trees."],
        ["River", "🏞️", "नदी", "A natural stream of flowing water."],
        ["Mountain", "⛰️", "पहाड़", "A very high area of land."],
        ["Weather", "🌦️", "मौसम", "The condition of the air outside."],
        ["Season", "🍂", "ऋतु", "One part of the year with its own weather."],
        ["Journey", "🚌", "यात्रा", "The act of travelling from one place to another."],
        ["Village", "🏡", "गाँव", "A small place where people live."],
        ["City", "🏙️", "शहर", "A large town where many people live."],
        ["Protect", "🛡️", "रक्षा करना", "To keep someone or something safe."],
        ["Discover", "🔍", "खोज करना", "To find something for the first time."],
        ["Improve", "📈", "सुधारना", "To make something better."],
        ["Careful", "⚠️", "सावधान", "Taking care to avoid mistakes or danger."],
        ["Healthy", "🥗", "स्वस्थ", "Being well and free from illness."],
        ["Thirsty", "🥤", "प्यासा", "Needing or wanting a drink."],
        ["Hungry", "🍲", "भूखा", "Needing or wanting food."],
        ["Borrow", "📚", "उधार लेना", "To take something for a while and return it."],
        ["Return", "↩️", "लौटाना", "To give something back."],
        ["Promise", "🤞", "वादा", "A statement that you will do something."],
        ["Respect", "🙏", "सम्मान", "Showing care and value for someone."],
        ["Success", "🏆", "सफलता", "Achieving something you wanted to do."],
        ["Knowledge", "📖", "ज्ञान", "Information and understanding gained by learning."],
        ["Environment", "🌍", "पर्यावरण", "The world around us, including air, water and land."]
    ];

    const pageSize = 9;
    const page = window.wordMeaningPage || 0;
    const start = page * pageSize;
    const visibleWords = words.slice(start, start + pageSize);
    const totalPages = Math.ceil(words.length / pageSize);

    setupLearning(
        "📖",
        "Word Meaning",
        "50 useful English words with Hindi meanings",
        `
        <section class="word-meaning-section">
            <div class="word-meaning-intro">
                <span class="word-meaning-badge">✨ LEARN • READ • GROW</span>
                <h2>📚 Word Meaning World</h2>
                <p>Learn a new word, understand its meaning and grow your vocabulary!</p>
                <div class="word-meaning-progress">
                    <span>📘 50 Words</span>
                    <span>🇮🇳 Hindi Meanings</span>
                    <span>🎨 Picture Cards</span>
                </div>
            </div>

            <div class="word-meaning-grid">
                ${visibleWords.map((item, index) => `
                    <article class="word-meaning-card"
                        style="--word-delay:${index * 55}ms">
                        <div class="word-meaning-number">${start + index + 1}</div>
                        <div class="word-meaning-picture">${item[1]}</div>
                        <h3>${item[0]}</h3>
                        <div class="word-meaning-hindi">${item[2]}</div>
                        <p>${item[3]}</p>
                        <button class="word-speak-button"
                            onclick="speakWordMeaning('${item[0]}', '${item[2]}')">
                            🔊 Listen
                        </button>
                    </article>
                `).join("")}
            </div>

            <div class="word-meaning-pagination">
                <button onclick="changeWordMeaningPage(-1)"
                    ${page === 0 ? "disabled" : ""}>
                    ← Previous
                </button>
                <span>Page ${page + 1} of ${totalPages}</span>
                <button onclick="changeWordMeaningPage(1)"
                    ${page >= totalPages - 1 ? "disabled" : ""}>
                    Next →
                </button>
            </div>
            <p class="word-meaning-tip">💡 Tip: Read the English word, say its Hindi meaning, and use it in a sentence!</p>
        </section>
        `
    );
}

function changeWordMeaningPage(direction) {
    const totalPages = 6;
    const nextPage = (window.wordMeaningPage || 0) + direction;

    if (nextPage < 0 || nextPage >= totalPages) return;

    window.wordMeaningPage = nextPage;
    renderWordMeaningPage();
}

function speakWordMeaning(word, hindi) {
    speak(word, {
        lang: "en-US",
        rate: 0.75
    });
}


/* =========================================================
   📝 SPELL THE WORD
   ========================================================= */
function startSpellingGame() {

    const words = [
        { word: "CAT", emoji: "🐱" },
        { word: "DOG", emoji: "🐶" },
        { word: "SUN", emoji: "☀️" },
        { word: "BALL", emoji: "⚽" },
        { word: "FISH", emoji: "🐟" },
        { word: "BIRD", emoji: "🐦" },
        { word: "TREE", emoji: "🌳" },
        { word: "BOOK", emoji: "📚" },
        { word: "PEN", emoji: "🖊️" },
        { word: "CAR", emoji: "🚗" },
        { word: "BUS", emoji: "🚌" },
        { word: "MILK", emoji: "🥛" },
        { word: "APPLE", emoji: "🍎" },
        { word: "MANGO", emoji: "🥭" },
        { word: "BANANA", emoji: "🍌" },
        { word: "ORANGE", emoji: "🍊" },
        { word: "GRAPES", emoji: "🍇" },
        { word: "WATER", emoji: "💧" },
        { word: "HOUSE", emoji: "🏠" },
        { word: "SCHOOL", emoji: "🏫" },
        { word: "CHAIR", emoji: "🪑" },
        { word: "TABLE", emoji: "🪑" },
        { word: "CLOCK", emoji: "⏰" },
        { word: "PHONE", emoji: "📱" },
        { word: "MOBILE", emoji: "📱" },
        { word: "MOTHER", emoji: "👩" },
        { word: "FATHER", emoji: "👨" },
        { word: "BABY", emoji: "👶" },
        { word: "BOY", emoji: "👦" },
        { word: "GIRL", emoji: "👧" },
        { word: "FLOWER", emoji: "🌸" },
        { word: "ROSE", emoji: "🌹" },
        { word: "STAR", emoji: "⭐" },
        { word: "MOON", emoji: "🌙" },
        { word: "RAIN", emoji: "🌧️" },
        { word: "CLOUD", emoji: "☁️" },
        { word: "SNOW", emoji: "❄️" },
        { word: "FIRE", emoji: "🔥" },
        { word: "HOUSE", emoji: "🏠" },
        { word: "DOOR", emoji: "🚪" },
        { word: "WINDOW", emoji: "🪟" },
        { word: "SHOES", emoji: "👟" },
        { word: "SHIRT", emoji: "👕" },
        { word: "PANTS", emoji: "👖" },
        { word: "HAT", emoji: "🧢" },
        { word: "HAND", emoji: "✋" },
        { word: "FOOT", emoji: "🦶" },
        { word: "EYE", emoji: "👁️" },
        { word: "NOSE", emoji: "👃" },
        { word: "MOUTH", emoji: "👄" },
        { word: "EAR", emoji: "👂" },
        { word: "TOOTH", emoji: "🦷" },
        { word: "LION", emoji: "🦁" },
        { word: "TIGER", emoji: "🐯" },
        { word: "ELEPHANT", emoji: "🐘" },
        { word: "MONKEY", emoji: "🐒" },
        { word: "HORSE", emoji: "🐴" },
        { word: "COW", emoji: "🐄" },
        { word: "GOAT", emoji: "🐐" },
        { word: "SHEEP", emoji: "🐑" },
        { word: "RABBIT", emoji: "🐰" },
        { word: "BEAR", emoji: "🐻" }
    ];

    let html = `
        <div class="spelling-list">
    `;

    words.forEach((item, index) => {

        html += `
            <div class="learning-card spelling-card">

                <div class="spelling-number">
                    ${index + 1}
                </div>

                <div class="learning-emoji">
                    ${item.emoji}
                </div>

                <h2>
                    ${item.word}
                </h2>

                <p>
                    ${item.word.split("").join(" - ")}
                </p>

                <button
                    type="button"
                    onclick="speak('${item.word}', {lang:'en-US'})"
                >
                    🔊 Hear Word
                </button>

            </div>
        `;

    });

    html += `
        </div>
    `;

    setupLearning(
        "📝",
        "Spell the Words",
        "Learn to spell 60 easy English words!",
        html
    );
}
/* =========================================================
   📚 EASY WORDS — 100 WORDS + HINDI MEANING + VOICE
   ========================================================= */

function openEasyWords() {

    const easyWords = [

        ["CAT", "बिल्ली", "🐱"],
        ["DOG", "कुत्ता", "🐶"],
        ["SUN", "सूरज", "☀️"],
        ["MOON", "चाँद", "🌙"],
        ["STAR", "तारा", "⭐"],
        ["BAT", "चमगादड़", "🦇"],
        ["CUP", "कप", "🥤"],
        ["PEN", "कलम", "🖊️"],
        ["BOOK", "किताब", "📚"],
        ["BAG", "बैग", "🎒"],

        ["BUS", "बस", "🚌"],
        ["CAR", "गाड़ी", "🚗"],
        ["TRAIN", "रेलगाड़ी", "🚆"],
        ["BIKE", "साइकिल", "🚲"],
        ["BOAT", "नाव", "⛵"],
        ["SHIP", "जहाज़", "🚢"],
        ["PLANE", "हवाई जहाज़", "✈️"],
        ["ROAD", "सड़क", "🛣️"],
        ["HOUSE", "घर", "🏠"],
        ["DOOR", "दरवाज़ा", "🚪"],

        ["MOTHER", "माँ", "👩"],
        ["FATHER", "पिता", "👨"],
        ["BABY", "बच्चा", "👶"],
        ["BOY", "लड़का", "👦"],
        ["GIRL", "लड़की", "👧"],
        ["MAN", "आदमी", "👨"],
        ["WOMAN", "महिला", "👩"],
        ["FAMILY", "परिवार", "👨‍👩‍👧‍👦"],
        ["FRIEND", "दोस्त", "🧑‍🤝‍🧑"],
        ["HOME", "घर", "🏡"],

        ["APPLE", "सेब", "🍎"],
        ["MANGO", "आम", "🥭"],
        ["BANANA", "केला", "🍌"],
        ["ORANGE", "संतरा", "🍊"],
        ["GRAPES", "अंगूर", "🍇"],
        ["GUAVA", "अमरूद", "🍐"],
        ["PAPAYA", "पपीता", "🥭"],
        ["WATERMELON", "तरबूज", "🍉"],
        ["LEMON", "नींबू", "🍋"],
        ["COCONUT", "नारियल", "🥥"],

        ["MILK", "दूध", "🥛"],
        ["WATER", "पानी", "💧"],
        ["BREAD", "ब्रेड", "🍞"],
        ["RICE", "चावल", "🍚"],
        ["CAKE", "केक", "🎂"],
        ["EGG", "अंडा", "🥚"],
        ["SALT", "नमक", "🧂"],
        ["SUGAR", "चीनी", "🍬"],
        ["HONEY", "शहद", "🍯"],
        ["FOOD", "खाना", "🍲"],

        ["LION", "शेर", "🦁"],
        ["TIGER", "बाघ", "🐯"],
        ["ELEPHANT", "हाथी", "🐘"],
        ["MONKEY", "बंदर", "🐒"],
        ["HORSE", "घोड़ा", "🐴"],
        ["COW", "गाय", "🐄"],
        ["GOAT", "बकरी", "🐐"],
        ["SHEEP", "भेड़", "🐑"],
        ["RABBIT", "खरगोश", "🐰"],
        ["BEAR", "भालू", "🐻"],

        ["BIRD", "पक्षी", "🐦"],
        ["FISH", "मछली", "🐟"],
        ["DUCK", "बत्तख", "🦆"],
        ["HEN", "मुर्गी", "🐔"],
        ["PARROT", "तोता", "🦜"],
        ["CROW", "कौआ", "🐦‍⬛"],
        ["PIGEON", "कबूतर", "🕊️"],
        ["PEACOCK", "मोर", "🦚"],
        ["OWL", "उल्लू", "🦉"],
        ["EAGLE", "गरुड़", "🦅"],

        ["TREE", "पेड़", "🌳"],
        ["FLOWER", "फूल", "🌸"],
        ["ROSE", "गुलाब", "🌹"],
        ["LEAF", "पत्ता", "🍃"],
        ["GRASS", "घास", "🌱"],
        ["PLANT", "पौधा", "🪴"],
        ["SEED", "बीज", "🌱"],
        ["SUN", "सूरज", "☀️"],
        ["RAIN", "बारिश", "🌧️"],
        ["CLOUD", "बादल", "☁️"],

        ["EYE", "आँख", "👁️"],
        ["EAR", "कान", "👂"],
        ["NOSE", "नाक", "👃"],
        ["MOUTH", "मुँह", "👄"],
        ["HAND", "हाथ", "✋"],
        ["FOOT", "पैर", "🦶"],
        ["HEAD", "सिर", "🙂"],
        ["HAIR", "बाल", "💇"],
        ["TOOTH", "दाँत", "🦷"],
        ["FACE", "चेहरा", "😀"],

        ["RED", "लाल", "🔴"],
        ["BLUE", "नीला", "🔵"],
        ["GREEN", "हरा", "🟢"],
        ["YELLOW", "पीला", "🟡"],
        ["BLACK", "काला", "⚫"],
        ["WHITE", "सफेद", "⚪"],
        ["BIG", "बड़ा", "🔝"],
        ["SMALL", "छोटा", "🔹"],
        ["HAPPY", "खुश", "😊"],
        ["GOOD", "अच्छा", "👍"]

    ];

    setupLearning(
        "📚",
        "Easy Words",
        "100 easy English words with Hindi meanings!",
        `

        <div class="cards-grid easy-words-grid">

            ${easyWords.map((item, index) => `

                <div class="learning-card easy-word-card">

                    <div class="word-number">
                        ${index + 1}
                    </div>

                    <div class="learning-emoji">
                        ${item[2]}
                    </div>

                    <div class="word">
                        ${item[0]}
                    </div>

                    <div class="hindi-word">
                        ${item[1]}
                    </div>

                    <div class="word-voices">

                        <button
                            type="button"
                            onclick="event.stopPropagation(); speak('${item[0]}', {lang:'en-US'})"
                        >
                            🔊 English
                        </button>

                        <button
                            type="button"
                            onclick="event.stopPropagation(); speak('${item[1]}', {lang:'hi-IN'})"
                        >
                            🔊 हिंदी
                        </button>

                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}

/* =========================================================
   📖 STORIES
   ========================================================= */

function openStories() {

    const stories = [
        {
            title: "🐰 The Little Rabbit and the Magic Garden",
            emoji: "🐰",
            text: "Once upon a time, a little rabbit named Bunny lived near a beautiful green forest. One morning, Bunny found a tiny golden key under a big tree. He followed a trail of colorful flowers and discovered a secret garden. The garden was filled with butterflies, singing birds, and delicious carrots. But the garden had one rule: everyone had to share. Bunny invited his forest friends to the garden, and together they shared the fruits and vegetables. Bunny learned that happiness becomes bigger when we share it with our friends.",
            moral: "Sharing happiness with others makes everyone happier. 🌈"
        },

        {
            title: "🦁 The Kind Lion and the Little Mouse",
            emoji: "🦁",
            text: "One sunny afternoon, a big lion was sleeping peacefully under a tree. A little mouse accidentally ran across his paw. The lion woke up and caught the mouse. The mouse was frightened and asked the lion to let him go. The lion decided to be kind and released him. A few days later, the lion became trapped in a hunter's net. He roared loudly for help. The little mouse heard him and quickly chewed through the ropes. The lion was free again. From that day, the lion and the mouse became the best of friends.",
            moral: "Never underestimate anyone. Even the smallest friend can make a big difference. ❤️"
        },

        {
            title: "🐦 The Little Bird Who Was Afraid to Fly",
            emoji: "🐦",
            text: "High in a tall green tree lived a little bird named Sunny. Sunny watched all the other birds flying through the blue sky, but she was afraid to leave her nest. Her mother gently told her that she didn't have to be perfect on her first try. Sunny took a deep breath, opened her wings, and jumped. At first, she fell a little, but she quickly moved her wings and began to fly. She flew from one branch to another and then higher and higher. Sunny was so happy that she sang a beautiful song.",
            moral: "Be brave and keep trying, even when something feels scary. ⭐"
        },

        {
            title: "🐘 Ellie the Elephant and the Lost Baby Deer",
            emoji: "🐘",
            text: "Ellie was a kind elephant who lived near a large forest lake. One morning, while drinking water, she heard a tiny cry. She looked around and found a baby deer who had lost his mother. The baby deer was scared and didn't know which way to go. Ellie promised to help him. She carefully walked through the forest, asking birds, monkeys, and rabbits if they had seen the deer's mother. Finally, a little bird showed Ellie the way to a quiet meadow. There they found the worried mother deer searching everywhere. The baby deer ran happily to his mother.",
            moral: "Helping someone who is lost or scared is a wonderful act of kindness. 💖"
        },

        {
            title: "🐻 Bruno the Honey-Loving Bear",
            emoji: "🐻",
            text: "There was once a young bear named Bruno who loved honey more than anything in the world. Every morning, he searched the forest for a beehive. One day, he found a huge beehive hanging from a tall tree. Bruno climbed the tree and took a big piece of honey. But instead of eating it alone, he remembered his friends. He invited a rabbit, a squirrel, and a little bird to share it with him. Everyone enjoyed the sweet honey together. The next day, Bruno's friends brought him berries, apples, and nuts as a thank-you gift.",
            moral: "When you share with friends, kindness often comes back to you. 🍯"
        },

        {
            title: "🐿️ Sammy Squirrel's Big Adventure",
            emoji: "🐿️",
            text: "Sammy was a little squirrel who dreamed of exploring the forest. One morning, he packed three nuts in his tiny backpack and started his adventure. He crossed a small stream, climbed a tall hill, and discovered a beautiful waterfall. Near the waterfall, he found a colorful butterfly that seemed to be lost. Sammy followed the butterfly and discovered a hidden meadow full of flowers. Suddenly, dark clouds appeared in the sky and rain began to fall. Sammy quickly found a safe hollow tree and waited there. When the rain stopped, a rainbow appeared across the sky.",
            moral: "Every adventure teaches us something new. Be curious, but always stay safe. 🌈"
        },

        {
            title: "🐒 Momo the Clever Monkey",
            emoji: "🐒",
            text: "Momo the monkey loved eating sweet mangoes. One summer morning, he found the biggest mango tree in the forest. The mangoes were delicious, but many of them were too high for Momo to reach. Instead of giving up, Momo thought carefully. He called his friends, the parrots and squirrels, and asked them to help. The parrots flew to the highest branches and dropped mangoes down, while the squirrels collected them safely. Momo then shared all the mangoes with his friends. Everyone had enough to eat.",
            moral: "Teamwork can help us solve problems that are difficult to solve alone. 🤝"
        },

        {
            title: "🐶 Max the Brave Little Puppy",
            emoji: "🐶",
            text: "Max was a small puppy who lived with a loving family near a quiet village. One evening, Max heard a strange sound coming from the garden. He was a little scared, but he decided to investigate. He slowly walked toward the bushes and discovered a tiny kitten stuck between two branches. The kitten was frightened and couldn't get out. Max barked loudly until his owner came outside. Together, they carefully rescued the kitten. The kitten was reunited with its mother, and Max became a hero in the neighborhood.",
            moral: "Being brave means helping others even when you feel afraid. 🦸"
        },

        {
            title: "🦋 Bella the Butterfly and the Little Flower",
            emoji: "🦋",
            text: "A little butterfly named Bella lived in a colorful garden. Every day she flew from flower to flower, enjoying the warm sunshine. One morning, she noticed a small flower growing alone near a rock. The flower looked sad because no butterflies or bees visited it. Bella decided to visit the flower every day. She carried tiny grains of pollen from other flowers and helped the little flower grow. After several days, the flower became bright and beautiful. Other butterflies noticed it and began visiting too.",
            moral: "Even a small act of kindness can make someone's world beautiful. 🌸"
        },

        {
            title: "🌈 The Rainbow Adventure",
            emoji: "🌈",
            text: "One morning, three friends named Leo the lion cub, Mimi the rabbit, and Coco the parrot decided to explore the forest. After a short rain shower, they saw a huge rainbow in the sky. They wondered where the rainbow ended, so they decided to follow it. They crossed a little bridge, walked through a field of flowers, and climbed a small hill. At the top, they discovered a sparkling pond surrounded by colorful flowers. There was no treasure made of gold, but there was something much better: a beautiful place where all the forest animals could play together.",
            moral: "The best treasures are friendship, memories, and the people we share them with. 🌟"
        }
    ];

    window.currentStories = stories;

    setupLearning(
        "📖",
        "Amazing Story World",
        "Choose a story, read it and listen to it! 🌈",
        `
        <div class="stories-world">

            <div class="stories-cloud cloud-one">☁️</div>
            <div class="stories-cloud cloud-two">☁️</div>

            <div class="stories-intro">
                <div class="story-big-icon">📚</div>
                <h2>Welcome to Story World! ✨</h2>
                <p>Pick your favorite story and start an adventure!</p>
            </div>

            <div class="stories-grid">

                ${stories.map((story, index) => `
                    
                    <div class="story-card">

                        <div class="story-card-animation">
                            ${story.emoji}
                        </div>

                        <h3>${escapeHTML(story.title)}</h3>

                        <p>
                            ${escapeHTML(
                                story.text.substring(0, 105)
                            )}...
                        </p>

                        <button
                            class="read-story-button"
                            type="button"
                            onclick="readStory(${index})"
                        >
                            📖 Read Story
                        </button>

                    </div>

                `).join("")}

            </div>

        </div>
        `
    );
}


function readStory(index) {

    const story =
        window.currentStories &&
        window.currentStories[index];

    if (!story) return;

    const storyContainer = document.querySelector(".learning-content");

    if (!storyContainer) return;

    storyContainer.innerHTML = `

        <div class="story-reader">

            <div class="story-stars">✨ ⭐ ✨</div>

            <div class="story-main-character">
                <span>${story.emoji}</span>
            </div>

            <h2 class="story-reader-title">
                ${escapeHTML(story.title)}
            </h2>

            <div class="story-scene">

                <div class="floating-cloud">☁️</div>
                <div class="floating-butterfly">🦋</div>
                <div class="floating-star">⭐</div>

                <div class="story-character-left">
                    ${story.emoji}
                </div>

                <div class="story-tree">
                    🌳
                </div>

                <div class="story-character-right">
                    🌸
                </div>

            </div>

            <div class="story-text-box">

                <p>
                    ${escapeHTML(story.text)}
                </p>

            </div>

            <div class="story-controls">

                <button
                    type="button"
                    class="story-voice-button"
                    onclick="speakStory(${index})"
                >
                    🔊 Read Aloud
                </button>

                <button
                    type="button"
                    class="story-stop-button"
                    onclick="stopStoryVoice()"
                >
                    ⏹️ Stop
                </button>

            </div>

            <div class="story-moral">

                <div class="moral-icon">
                    💡
                </div>

                <div>
                    <h3>🌟 Moral of the Story</h3>

                    <p>
                        ${escapeHTML(story.moral)}
                    </p>
                </div>

            </div>

            <button
                type="button"
                class="back-stories-button"
                onclick="openStories()"
            >
                ⬅️ Back to Stories
            </button>

        </div>
    `;

    speakStory(index);
}


function speakStory(index) {

    const story =
        window.currentStories &&
        window.currentStories[index];

    if (!story) return;

    speak(
        `${story.title}. ${story.text}. Moral of the story: ${story.moral}`,
        {
            lang: "en-US",
            rate: 0.62
        }
    );
}


function stopStoryVoice() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


/* =========================================================
   🎵 RHYMES
   ========================================================= */

function openRhymes() {

    const rhymes = [
        "Twinkle, twinkle, little star.",
        "Rain, rain, go away.",
        "Row, row, row your boat.",
        "Humpty Dumpty sat on a wall."
    ];

    setupLearning(
        "🎵",
        "Nursery Rhymes",
        "Listen to fun little rhymes!",
        `

        <div class="cards-grid">

            ${rhymes.map((rhyme, index) => `

                <div class="learning-card">

                    <div class="learning-emoji">
                        🎵
                    </div>

                    <div class="word">
                        Rhyme ${index + 1}
                    </div>

                    <p>
                        ${escapeHTML(rhyme)}
                    </p>

                    <button
                        type="button"
                        onclick="speakRhyme(${index})"
                    >
                        🔊 Listen
                    </button>

                </div>

            `).join("")}

        </div>

        `
    );

    window.currentRhymes = rhymes;
}


function speakRhyme(index) {

    const rhyme =
        window.currentRhymes &&
        window.currentRhymes[index];

    if (!rhyme) return;

    speak(
        rhyme,
        {
            lang: "en-US",
            rate: 0.65
        }
    );
}


/* =========================================================
   म HINDI MATRA
   ========================================================= */

function openHindiMatra() {

    const matras = [
        ["ा", "का", "आ की मात्रा"],
        ["ि", "कि", "इ की मात्रा"],
        ["ी", "की", "ई की मात्रा"],
        ["ु", "कु", "उ की मात्रा"],
        ["ू", "कू", "ऊ की मात्रा"],
        ["े", "के", "ए की मात्रा"],
        ["ै", "कै", "ऐ की मात्रा"],
        ["ो", "को", "ओ की मात्रा"],
        ["ौ", "कौ", "औ की मात्रा"],
        ["ं", "कं", "अनुस्वार"],
        ["ः", "कः", "विसर्ग"]
    ];

    setupLearning(
        "म",
        "Hindi Matra",
        "मात्राएँ सीखें!",
        `

        <div class="cards-grid">

            ${matras.map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[1]}', {lang:'hi-IN'})"
                >

                    <div class="letter">
                        ${item[0]}
                    </div>

                    <div class="word">
                        ${item[1]}
                    </div>

                    <div class="mini-text">
                        ${item[2]}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   📚 HINDI WORDS
   ========================================================= */

function openHindiWords() {

    const words = [
        ["कमल", "🌸"],
        ["घर", "🏠"],
        ["गाय", "🐮"],
        ["फल", "🍎"],
        ["जल", "💧"],
        ["सूरज", "☀️"],
        ["चाँद", "🌙"],
        ["पेड़", "🌳"],
        ["फूल", "🌸"],
        ["मछली", "🐟"],
        ["हाथी", "🐘"],
        ["किताब", "📚"]
    ];

    setupLearning(
        "📚",
        "Hindi Words",
        "आसान हिंदी शब्द सीखें!",
        `

        <div class="cards-grid">

            ${words.map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[0]}', {lang:'hi-IN'})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${item[0]}
                    </div>

                    <div class="mini-text">
                        🔊 सुनें
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   🔢 MATHS WORLD
   ========================================================= */

function showMathsMenu() {

    return `

        <div class="learning-heading">

            <h2>🔢 Maths World</h2>

            <p>
                Numbers ko fun ke saath seekho!
            </p>

        </div>


        <div class="learning-menu-grid">

            ${createWorldCard(
                "🔢",
                "Numbers 1–100",
                "Learn counting",
                "openNumbers()"
            )}

            ${createWorldCard(
                "➕",
                "Addition",
                "Add numbers",
                "startAdditionGame()"
            )}

            ${createWorldCard(
                "➖",
                "Subtraction",
                "Subtract numbers",
                "startSubtractionGame()"
            )}

            ${createWorldCard(
                "✖️",
                "Multiplication",
                "Multiply numbers",
                "startMultiplicationGame()"
            )}

            ${createWorldCard(
                "➗",
                "Division",
                "Divide numbers",
                "startDivisionGame()"
            )}

            ${createWorldCard(
                "🔤",
                "Number Names",
                "Learn number names",
                "openNumberNames()"
            )}

           
${createWorldCard(
    "📈",
    "Ascending Order",
    "Arrange numbers from smallest to largest",
    "openAscendingOrder()"
)}


            ${createWorldCard(
                "🔷",
                "Shapes",
                "Learn basic shapes",
                "openShapes()"
            )}


            ${createWorldCard(
                "🧠",
                "Maths Quiz",
                "Test your maths",
                "startMathQuiz()"
            )}

        </div>

    `;
}


/* =========================================================
   🔢 NUMBERS
   ========================================================= */

function openNumbers() {
    const numberCards = Array.from({ length: 100 }, (_, index) => {
        const number = index + 1;

        return `
            <button
                type="button"
                class="number-100-card"
                style="--number-index: ${index};"
                onclick="speak('${number}', {lang:'en-US'})"
                aria-label="Number ${number}, tap to hear"
            >
                <span class="number-100-value">${number}</span>
                <span class="number-100-sound">🔊 Tap to hear</span>
            </button>
        `;
    }).join("");

    setupLearning(
        "🔢",
        "Numbers 1–100",
        "✨ Learn numbers in the correct order!",
        `
            <div class="numbers-100-wrapper">
                <div class="numbers-100-heading">
                    <span>👑</span>
                    <h2>Let's Learn 1 to 100!</h2>
                    <p>Tap any number to hear it aloud.</p>
                </div>

                <div class="numbers-100-grid">
                    ${numberCards}
                </div>
            </div>
        `
    );
}




/* =========================================================
   👑 LUXURY ADDITION PRACTICE — 50 QUESTIONS
   Questions only • No game mechanics
========================================================= */

let additionPractice = {
    questions: [],
    index: 0,
    answered: false,
    correct: 0,
    wrong: 0
};

function createAdditionQuestions() {
    const questions = [];

    for (let i = 0; i < 50; i++) {
        // Questions 1–40: numbers from 1 to 30
        // Questions 41–50: numbers from 20 to 50
        const min = i < 40 ? 1 : 20;
        const max = i < 40 ? 30 : 50;

        const a = Math.floor(Math.random() * (max - min + 1)) + min;
        const b = Math.floor(Math.random() * (max - min + 1)) + min;

        questions.push({
            a,
            b,
            answer: a + b
        });
    }

    return questions;
}

function startAdditionGame() {
    additionPractice = {
        questions: createAdditionQuestions(),
        index: 0,
        answered: false,
        correct: 0,
        wrong: 0
    };

    renderAdditionQuestion();
}

function renderAdditionQuestion() {
    const game = additionPractice;
    const q = game.questions[game.index];

    if (!q) return;

    game.answered = false;

    const number = game.index + 1;
    const rangeText = number <= 40
        ? "Easy Practice · Numbers 1–30"
        : "Practice Challenge · Numbers 20–50";

    const options = new Set([q.answer]);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 11) - 5;
        const choice = q.answer + offset;

        if (choice >= 0) options.add(choice);
    }

    const shuffledOptions = typeof shuffleArray === "function"
        ? shuffleArray([...options])
        : [...options].sort(() => Math.random() - 0.5);

    setupLearning(
        "➕",
        "Addition Practice",
        `Question ${number} of 50`,
        `
        <section class="addition-luxury">
            <div class="addition-sparkles" aria-hidden="true">
              
            </div>

            <header class="addition-heading">
                <div class="addition-crown">👑</div>
                <h2>Let's Learn Addition!</h2>
                <p>${rangeText}</p>
            </header>

            <div class="addition-progress-info">
                <span>QUESTION ${number} / 50</span>
                <span>⭐ ${game.correct} correct</span>
            </div>

            <div class="addition-progress-track">
                <div class="addition-progress-fill"
                     style="width:${number * 2}%"></div>
            </div>

            <div class="addition-question-card">
                <div class="addition-question-label">
                    💫 Solve the question
                </div>

                <div class="addition-equation">
                    <span>${q.a}</span>
                    <span class="addition-plus">+</span>
                    <span>${q.b}</span>
                </div>

                <div class="addition-equals">= ?</div>
            </div>

            <p class="addition-prompt">Choose the correct answer</p>

            <div class="addition-options">
                ${shuffledOptions.map((option, i) => `
                    <button type="button"
                        class="addition-option"
                        style="--option-index:${i}"
                        onclick="checkAdditionAnswer(${option}, this)">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <div id="addition-feedback"
                 class="addition-feedback"
                 aria-live="polite">
                🌟 You can do it!
            </div>

            <button type="button"
                    class="addition-next-button"
                    id="addition-next-button"
                    onclick="nextAdditionQuestion()"
                    disabled>
                ${number === 50 ? "View Final Result 🏆" : "Next Question →"}
            </button>

            <p class="addition-score-line">
                Correct: ${game.correct} · Incorrect: ${game.wrong}
            </p>
        </section>
        `
    );
}

function checkAdditionAnswer(answer, button) {
    const game = additionPractice;

    if (!game || game.answered) return;

    const q = game.questions[game.index];
    const feedback = document.getElementById("addition-feedback");
    const next = document.getElementById("addition-next-button");

    if (!feedback || !next) return;

    game.answered = true;

    document.querySelectorAll(".addition-option").forEach(option => {
        option.disabled = true;

        if (Number(option.textContent.trim()) === q.answer) {
            option.classList.add("addition-correct");
        }
    });

    if (answer === q.answer) {
        game.correct++;

        button.classList.add("addition-correct");
        feedback.className =
            "addition-feedback addition-feedback-correct";
        feedback.textContent = "🎉 Excellent! Your answer is correct!";

        if (typeof addScore === "function") addScore(10);
        if (typeof addStars === "function") addStars(1);
    } else {
        game.wrong++;

        button.classList.add("addition-wrong");
        feedback.className =
            "addition-feedback addition-feedback-wrong";
        feedback.textContent =
            `💛 Good try! The correct answer is ${q.answer}.`;
    }

    next.disabled = false;

    const scoreLine = document.querySelector(".addition-score-line");
    if (scoreLine) {
        scoreLine.textContent =
            `Correct: ${game.correct} · Incorrect: ${game.wrong}`;
    }
}

function nextAdditionQuestion() {
    const game = additionPractice;

    if (!game || !game.answered) return;

    if (game.index === 49) {
        showAdditionResults();
        return;
    }

    game.index++;
    renderAdditionQuestion();
}

function showAdditionResults() {
    const game = additionPractice;
    const percentage = Math.round((game.correct / 50) * 100);

    let message = "Keep practising! You are learning every day. 💛";

    if (percentage >= 90) {
        message = "Amazing work! You are an Addition Star! 🌟";
    } else if (percentage >= 70) {
        message = "Wonderful effort! Keep learning! 🎉";
    } else if (percentage >= 50) {
        message = "Good effort! You are getting better! 👏";
    }

    setupLearning(
        "🏆",
        "Addition Practice Complete",
        "You solved all 50 questions!",
        `
        <section class="addition-luxury addition-results">
            <div class="addition-crown">🏆</div>
            <h2>Well Done!</h2>
            <div class="addition-final-score">${game.correct} / 50</div>
            <p class="addition-result-message">${message}</p>

            <div class="addition-result-stats">
                <div>✅ Correct<strong>${game.correct}</strong></div>
                <div>❌ Incorrect<strong>${game.wrong}</strong></div>
                <div>🎯 Score<strong>${percentage}%</strong></div>
            </div>

            <button type="button"
                    class="addition-next-button"
                    onclick="startAdditionGame()">
                Practise Again 🔄
            </button>
        </section>
        `
    );
}



/* =========================================================
   👑 LUXURY SUBTRACTION PRACTICE — 50 QUESTIONS
========================================================= */

let subtractionPractice = {
    questions: [],
    index: 0,
    answered: false,
    correct: 0,
    wrong: 0
};

function createSubtractionQuestions() {
    const questions = [];

    for (let i = 0; i < 50; i++) {
        const min = i < 40 ? 1 : 20;
        const max = i < 40 ? 30 : 50;

        // Ensure the answer is never negative
        const a = Math.floor(Math.random() * (max - min + 1)) + min;
        const b = Math.floor(Math.random() * (a - min + 1)) + min;

        questions.push({
            a,
            b,
            answer: a - b
        });
    }

    return questions;
}

function startSubtractionGame() {
    subtractionPractice = {
        questions: createSubtractionQuestions(),
        index: 0,
        answered: false,
        correct: 0,
        wrong: 0
    };

    renderSubtractionQuestion();
}

function renderSubtractionQuestion() {
    const game = subtractionPractice;
    const q = game.questions[game.index];

    if (!q) return;
    game.answered = false;

    const number = game.index + 1;
    const rangeText = number <= 40
        ? "Easy Practice · Numbers 1–30"
        : "Practice Challenge · Numbers 20–50";

    const options = new Set([q.answer]);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 11) - 5;
        const choice = q.answer + offset;

        if (choice >= 0) options.add(choice);
    }

    const shuffledOptions = typeof shuffleArray === "function"
        ? shuffleArray([...options])
        : [...options].sort(() => Math.random() - 0.5);

    setupLearning(
        "➖",
        "Subtraction Practice",
        `Question ${number} of 50`,
        `
        <section class="addition-luxury subtraction-luxury">
            <div class="addition-sparkles" aria-hidden="true">
               
            </div>

            <header class="addition-heading">
                <div class="addition-crown">👑</div>
                <h2>Let's Learn Subtraction!</h2>
                <p>${rangeText}</p>
            </header>

            <div class="addition-progress-info">
                <span>QUESTION ${number} / 50</span>
                <span>⭐ ${game.correct} correct</span>
            </div>

            <div class="addition-progress-track">
                <div class="addition-progress-fill"
                     style="width:${number * 2}%"></div>
            </div>

            <div class="addition-question-card">
                <div class="addition-question-label">
                    💫 Solve the question
                </div>

                <div class="addition-equation">
                    <span>${q.a}</span>
                    <span class="subtraction-minus">−</span>
                    <span>${q.b}</span>
                </div>

                <div class="addition-equals">= ?</div>
            </div>

            <p class="addition-prompt">Choose the correct answer</p>

            <div class="addition-options">
                ${shuffledOptions.map((option, i) => `
                    <button type="button"
                        class="addition-option"
                        style="--option-index:${i}"
                        onclick="checkSubtractionAnswer(${option}, this)">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <div id="subtraction-feedback"
                 class="addition-feedback"
                 aria-live="polite">
                🌟 You can do it!
            </div>

            <button type="button"
                    class="addition-next-button"
                    id="subtraction-next-button"
                    onclick="nextSubtractionQuestion()"
                    disabled>
                ${number === 50 ? "View Final Result 🏆" : "Next Question →"}
            </button>

            <p class="addition-score-line" id="subtraction-score-line">
                Correct: ${game.correct} · Incorrect: ${game.wrong}
            </p>
        </section>
        `
    );
}

function checkSubtractionAnswer(answer, button) {
    const game = subtractionPractice;

    if (!game || game.answered) return;

    const q = game.questions[game.index];
    const feedback = document.getElementById("subtraction-feedback");
    const next = document.getElementById("subtraction-next-button");

    if (!feedback || !next) return;

    game.answered = true;

    document.querySelectorAll(
        ".subtraction-luxury .addition-option"
    ).forEach(option => {
        option.disabled = true;

        if (Number(option.textContent.trim()) === q.answer) {
            option.classList.add("addition-correct");
        }
    });

    if (answer === q.answer) {
        game.correct++;

        button.classList.add("addition-correct");
        feedback.className =
            "addition-feedback addition-feedback-correct";
        feedback.textContent = "🎉 Excellent! Your answer is correct!";

        if (typeof addScore === "function") addScore(10);
        if (typeof addStars === "function") addStars(1);
    } else {
        game.wrong++;

        button.classList.add("addition-wrong");
        feedback.className =
            "addition-feedback addition-feedback-wrong";
        feedback.textContent =
            `💛 Good try! The correct answer is ${q.answer}.`;
    }

    next.disabled = false;

    const scoreLine = document.getElementById("subtraction-score-line");
    if (scoreLine) {
        scoreLine.textContent =
            `Correct: ${game.correct} · Incorrect: ${game.wrong}`;
    }
}

function nextSubtractionQuestion() {
    const game = subtractionPractice;

    if (!game || !game.answered) return;

    if (game.index === 49) {
        showSubtractionResults();
        return;
    }

    game.index++;
    renderSubtractionQuestion();
}

function showSubtractionResults() {
    const game = subtractionPractice;
    const percentage = Math.round((game.correct / 50) * 100);

    let message = "Keep practising! You are learning every day. 💛";

    if (percentage >= 90) {
        message = "Amazing work! You are a Subtraction Star! 🌟";
    } else if (percentage >= 70) {
        message = "Wonderful effort! Keep learning! 🎉";
    } else if (percentage >= 50) {
        message = "Good effort! You are getting better! 👏";
    }

    setupLearning(
        "🏆",
        "Subtraction Practice Complete",
        "You solved all 50 questions!",
        `
        <section class="addition-luxury subtraction-luxury addition-results">
            <div class="addition-crown">🏆</div>
            <h2>Well Done!</h2>
            <div class="addition-final-score">${game.correct} / 50</div>
            <p class="addition-result-message">${message}</p>

            <div class="addition-result-stats">
                <div>✅ Correct<strong>${game.correct}</strong></div>
                <div>❌ Incorrect<strong>${game.wrong}</strong></div>
                <div>🎯 Score<strong>${percentage}%</strong></div>
            </div>

            <button type="button"
                    class="addition-next-button"
                    onclick="startSubtractionGame()">
                Practise Again 🔄
            </button>
        </section>
        `
    );
}

/* ==========================================
   ✖️ MULTIPLICATION PRACTICE — 50 QUESTIONS
========================================== */

let multiplicationPractice = {
    questions: [],
    index: 0,
    answered: false,
    correct: 0,
    wrong: 0
};

function createMultiplicationQuestions() {
    const questions = [];

    for (let i = 0; i < 50; i++) {
        let minTable, maxTable, level;

        if (i < 20) {
            minTable = 2;
            maxTable = 10;
            level = "Easy Practice · Tables 2–10";
        } else if (i < 30) {
            minTable = 2;
            maxTable = 15;
            level = "Medium Practice · Tables 2–15";
        } else {
            minTable = 2;
            maxTable = 20;
            level = "Challenge Practice · Tables 2–20";
        }

        const a = Math.floor(
            Math.random() * (maxTable - minTable + 1)
        ) + minTable;

        // Multiplication table questions: ×1 to ×12
        const b = Math.floor(Math.random() * 12) + 1;

        questions.push({
            a,
            b,
            answer: a * b,
            level
        });
    }

    return questions;
}

function startMultiplicationGame() {
    multiplicationPractice = {
        questions: createMultiplicationQuestions(),
        index: 0,
        answered: false,
        correct: 0,
        wrong: 0
    };

    renderMultiplicationQuestion();
}

function renderMultiplicationQuestion() {
    const game = multiplicationPractice;
    const q = game.questions[game.index];

    if (!q) return;

    game.answered = false;

    const number = game.index + 1;
    const options = new Set([q.answer]);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 21) - 10;
        const choice = q.answer + offset;

        if (choice >= 0) {
            options.add(choice);
        }
    }

    const shuffledOptions =
        typeof shuffleArray === "function"
            ? shuffleArray([...options])
            : [...options].sort(() => Math.random() - 0.5);

    setupLearning(
        "✖️",
        "Multiplication Practice",
        `Question ${number} of 50`,
        `
        <section class="addition-luxury multiplication-luxury">

            <div class="addition-sparkles" aria-hidden="true">
                
            </div>

            <header class="addition-heading">
                <div class="addition-crown">🏆</div>
                <h2>Let's Learn Multiplication!</h2>
                <p>${q.level}</p>
            </header>

            <div class="addition-progress-info">
                <span>QUESTION ${number} / 50</span>
                <span>⭐ ${game.correct} correct</span>
            </div>

            <div class="addition-progress-track">
                <div class="addition-progress-fill"
                     style="width:${number * 2}%"></div>
            </div>

            <div class="addition-question-card">
                <div class="addition-question-label">
                    💫 Solve the question
                </div>

                <div class="addition-equation">
                    <span>${q.a}</span>
                    <span class="multiplication-sign">×</span>
                    <span>${q.b}</span>
                </div>

                <div class="addition-equals">= ?</div>
            </div>

            <p class="addition-prompt">
                Choose the correct answer
            </p>

            <div class="addition-options">
                ${shuffledOptions.map((option, i) => `
                    <button
                        type="button"
                        class="addition-option"
                        style="--option-index:${i}"
                        onclick="checkMultiplicationAnswer(${option}, this)">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <div id="multiplication-feedback"
                 class="addition-feedback"
                 aria-live="polite">
                🌟 You can do it!
            </div>

            <button
                type="button"
                class="addition-next-button"
                id="multiplication-next-button"
                onclick="nextMultiplicationQuestion()"
                disabled>
                ${number === 50
                    ? "View Final Result 🏆"
                    : "Next Question →"}
            </button>

            <p class="addition-score-line"
               id="multiplication-score-line">
                Correct: ${game.correct} · Incorrect: ${game.wrong}
            </p>

        </section>
        `
    );
}

function checkMultiplicationAnswer(answer, button) {
    const game = multiplicationPractice;

    if (!game || game.answered) return;

    const q = game.questions[game.index];
    const feedback = document.getElementById(
        "multiplication-feedback"
    );
    const next = document.getElementById(
        "multiplication-next-button"
    );

    if (!feedback || !next) return;

    game.answered = true;

    document.querySelectorAll(
        ".multiplication-luxury .addition-option"
    ).forEach(option => {
        option.disabled = true;

        if (Number(option.textContent.trim()) === q.answer) {
            option.classList.add("addition-correct");
        }
    });

    if (answer === q.answer) {
        game.correct++;
        button.classList.add("addition-correct");

        feedback.className =
            "addition-feedback addition-feedback-correct";

        feedback.textContent =
            "🎉 Excellent! Your answer is correct!";

        if (typeof addScore === "function") addScore(10);
        if (typeof addStars === "function") addStars(1);

    } else {
        game.wrong++;
        button.classList.add("addition-wrong");

        feedback.className =
            "addition-feedback addition-feedback-wrong";

        feedback.textContent =
            `💛 Good try! The correct answer is ${q.answer}.`;
    }

    next.disabled = false;

    const scoreLine = document.getElementById(
        "multiplication-score-line"
    );

    if (scoreLine) {
        scoreLine.textContent =
            `Correct: ${game.correct} · Incorrect: ${game.wrong}`;
    }
}

function nextMultiplicationQuestion() {
    const game = multiplicationPractice;

    if (!game || !game.answered) return;

    if (game.index === 49) {
        showMultiplicationResults();
        return;
    }

    game.index++;
    renderMultiplicationQuestion();
}

function showMultiplicationResults() {
    const game = multiplicationPractice;
    const percentage = Math.round((game.correct / 50) * 100);

    let message = "Keep practising! You are learning every day. 💛";

    if (percentage >= 90) {
        message = "Amazing! You are a Multiplication Star! 🌟";
    } else if (percentage >= 70) {
        message = "Wonderful work! Keep learning! 🎉";
    } else if (percentage >= 50) {
        message = "Good effort! You are getting better! 👏";
    }

    setupLearning(
        "🏆",
        "Multiplication Complete",
        "You solved all 50 questions!",
        `
        <section class="addition-luxury multiplication-luxury addition-results">

            <div class="addition-crown">🏆</div>

            <h2>Well Done!</h2>

            <div class="addition-final-score">
                ${game.correct} / 50
            </div>

            <p class="addition-result-message">
                ${message}
            </p>

            <div class="addition-result-stats">
                <div>
                    ✅ Correct
                    <strong>${game.correct}</strong>
                </div>

                <div>
                    ❌ Incorrect
                    <strong>${game.wrong}</strong>
                </div>

                <div>
                    🎯 Score
                    <strong>${percentage}%</strong>
                </div>
            </div>

            <button
                type="button"
                class="addition-next-button"
                onclick="startMultiplicationGame()">
                Practise Again 🔄
            </button>

        </section>
        `
    );
}


/* ==========================================
   ➗ DIVISION PRACTICE — 50 QUESTIONS
========================================== */

let divisionPractice = {
    questions: [],
    index: 0,
    answered: false,
    correct: 0,
    wrong: 0
};

function createDivisionQuestions() {
    const questions = [];

    for (let i = 0; i < 50; i++) {
        let minDivisor, maxDivisor, level;

        if (i < 20) {
            minDivisor = 2;
            maxDivisor = 10;
            level = "Easy Practice · Divisors 2–10";
        } else if (i < 30) {
            minDivisor = 2;
            maxDivisor = 15;
            level = "Medium Practice · Divisors 2–15";
        } else {
            minDivisor = 2;
            maxDivisor = 20;
            level = "Challenge Practice · Divisors 2–20";
        }

        const divisor = Math.floor(
            Math.random() * (maxDivisor - minDivisor + 1)
        ) + minDivisor;

        const quotient = Math.floor(Math.random() * 12) + 1;
        const dividend = divisor * quotient;

        questions.push({
            a: dividend,
            b: divisor,
            answer: quotient,
            level
        });
    }

    return questions;
}

function startDivisionGame() {
    divisionPractice = {
        questions: createDivisionQuestions(),
        index: 0,
        answered: false,
        correct: 0,
        wrong: 0
    };

    renderDivisionQuestion();
}

function renderDivisionQuestion() {
    const game = divisionPractice;
    const q = game.questions[game.index];

    if (!q) return;

    game.answered = false;

    const number = game.index + 1;
    const options = new Set([q.answer]);

    while (options.size < 4) {
        const offset = Math.floor(Math.random() * 11) - 5;
        const choice = q.answer + offset;

        if (choice >= 0 && choice !== q.answer) {
            options.add(choice);
        }
    }

    const shuffledOptions =
        typeof shuffleArray === "function"
            ? shuffleArray([...options])
            : [...options].sort(() => Math.random() - 0.5);

    setupLearning(
        "➗",
        "Division Practice",
        `Question ${number} of 50`,
        `
        <section class="addition-luxury division-luxury">

            <div class="addition-sparkles" aria-hidden="true">
                
            </div>

            <header class="addition-heading">
                <div class="addition-crown">👑</div>
                <h2>Let's Learn Division!</h2>
                <p>${q.level}</p>
            </header>

            <div class="addition-progress-info">
                <span>QUESTION ${number} / 50</span>
                <span>⭐ ${game.correct} correct</span>
            </div>

            <div class="addition-progress-track">
                <div class="addition-progress-fill"
                     style="width:${number * 2}%"></div>
            </div>

            <div class="addition-question-card">
                <div class="addition-question-label">
                    💫 Solve the question
                </div>

                <div class="addition-equation">
                    <span>${q.a}</span>
                    <span class="division-sign">÷</span>
                    <span>${q.b}</span>
                </div>

                <div class="addition-equals">= ?</div>
            </div>

            <p class="addition-prompt">
                Choose the correct answer
            </p>

            <div class="addition-options">
                ${shuffledOptions.map((option, i) => `
                    <button
                        type="button"
                        class="addition-option"
                        style="--option-index:${i}"
                        onclick="checkDivisionAnswer(${option}, this)">
                        ${option}
                    </button>
                `).join("")}
            </div>

            <div id="division-feedback"
                 class="addition-feedback"
                 aria-live="polite">
                🌟 You can do it!
            </div>

            <button
                type="button"
                class="addition-next-button"
                id="division-next-button"
                onclick="nextDivisionQuestion()"
                disabled>
                ${number === 50
                    ? "View Final Result 🏆"
                    : "Next Question →"}
            </button>

            <p class="addition-score-line"
               id="division-score-line">
                Correct: ${game.correct} · Incorrect: ${game.wrong}
            </p>

        </section>
        `
    );
}

function checkDivisionAnswer(answer, button) {
    const game = divisionPractice;

    if (!game || game.answered) return;

    const q = game.questions[game.index];

    const feedback = document.getElementById("division-feedback");
    const next = document.getElementById("division-next-button");

    if (!feedback || !next) return;

    game.answered = true;

    document.querySelectorAll(
        ".division-luxury .addition-option"
    ).forEach(option => {
        option.disabled = true;

        if (Number(option.textContent.trim()) === q.answer) {
            option.classList.add("addition-correct");
        }
    });

    if (answer === q.answer) {
        game.correct++;
        button.classList.add("addition-correct");

        feedback.className =
            "addition-feedback addition-feedback-correct";

        feedback.textContent =
            "🎉 Excellent! Your answer is correct!";

        if (typeof addScore === "function") addScore(10);
        if (typeof addStars === "function") addStars(1);

    } else {
        game.wrong++;
        button.classList.add("addition-wrong");

        feedback.className =
            "addition-feedback addition-feedback-wrong";

        feedback.textContent =
            `💛 Good try! The correct answer is ${q.answer}.`;
    }

    next.disabled = false;

    const scoreLine = document.getElementById("division-score-line");

    if (scoreLine) {
        scoreLine.textContent =
            `Correct: ${game.correct} · Incorrect: ${game.wrong}`;
    }
}

function nextDivisionQuestion() {
    const game = divisionPractice;

    if (!game || !game.answered) return;

    if (game.index === 49) {
        showDivisionResults();
        return;
    }

    game.index++;
    renderDivisionQuestion();
}

function showDivisionResults() {
    const game = divisionPractice;
    const percentage = Math.round((game.correct / 50) * 100);

    let message = "Keep practising! You are learning every day. 💛";

    if (percentage >= 90) {
        message = "Amazing! You are a Division Star! 🌟";
    } else if (percentage >= 70) {
        message = "Wonderful work! Keep learning! 🎉";
    } else if (percentage >= 50) {
        message = "Good effort! You are getting better! 👏";
    }

    setupLearning(
        "🏆",
        "Division Complete",
        "You solved all 50 questions!",
        `
        <section class="addition-luxury division-luxury addition-results">

            <div class="addition-crown">🏆</div>

            <h2>Well Done!</h2>

            <div class="addition-final-score">
                ${game.correct} / 50
            </div>

            <p class="addition-result-message">
                ${message}
            </p>

            <div class="addition-result-stats">
                <div>
                    ✅ Correct
                    <strong>${game.correct}</strong>
                </div>

                <div>
                    ❌ Incorrect
                    <strong>${game.wrong}</strong>
                </div>

                <div>
                    🎯 Score
                    <strong>${percentage}%</strong>
                </div>
            </div>

            <button
                type="button"
                class="addition-next-button"
                onclick="startDivisionGame()">
                Practise Again 🔄
            </button>

        </section>
        `
    );
}

/* =========================================================
   🧮 MATH QUESTION
   ========================================================= */

function showMathQuestion(title, question, answer) {

    const options = shuffleArray([
        answer,
        answer + 1,
        Math.max(0, answer - 1),
        answer + 2
    ]).slice(0, 4);

    window.currentMathAnswer = answer;

    setupLearning(
        "🧠",
        title,
        "Choose the correct answer!",
        `

        <div class="quiz-box">

            <div class="quiz-question">
                ${question}
            </div>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        type="button"
                        onclick="checkMathAnswer(${option})"
                    >
                        ${option}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


function checkMathAnswer(answer) {

    const correct =
        answer === window.currentMathAnswer;

    playerAnswered++;

    if (correct) {

        playerCorrect++;

        addScore(10);
        addStars(1);

        showSuccessMessage(
            "🎉 Great Job!",
            "Your answer is correct!"
        );

    } else {

        showSuccessMessage(
            "😊 Nice Try!",
            `The correct answer is ${window.currentMathAnswer}.`
        );
    }
}

/* =========================================================
   🔤 NUMBER NAMES — 1 TO 100
   ========================================================= */

function numberToWords(n) {
    const ones = [
        "", "One", "Two", "Three", "Four", "Five",
        "Six", "Seven", "Eight", "Nine"
    ];

    const teens = [
        "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen",
        "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];

    const tens = [
        "", "", "Twenty", "Thirty", "Forty",
        "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    if (n === 100) return "One Hundred";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];

    const ten = Math.floor(n / 10);
    const one = n % 10;

    return tens[ten] + (one ? " " + ones[one] : "");
}

function openNumberNames() {
    const cards = Array.from({ length: 100 }, (_, i) => {
        const num = i + 1;
        const name = numberToWords(num);

        return `
            <button
                type="button"
                class="number-name-card"
                style="--card-hue: ${(num * 37) % 360}"
                onclick="speak('${name}', {lang:'en-US'})"
                aria-label="${num}, ${name}. Tap to hear pronunciation"
            >
                <span class="number-name-number">${num}</span>
                <span class="number-name-word">${name}</span>
                <span class="number-name-sound" aria-hidden="true">🔊</span>
            </button>
        `;
    }).join("");

    setupLearning(
        "🔤",
        "Number Names (1–100)",
        "Tap any number to hear its name!",
        `
            <div class="number-names-grid">
                ${cards}
            </div>
        `
    );
}



/* =====================================================
   ASCENDING ORDER — KIDS LEARNING WORLD
   20 QUESTIONS | AUTO CHECK | EDITABLE ANSWERS
   ===================================================== */

let ascendingState = {
    question: 0,
    score: 0,
    numbers: [],
    selected: [],
    usedQuestions: new Set(),
    locked: false
};


/* OPEN ACTIVITY */
function openAscendingOrder() {
    ascendingState = {
        question: 0,
        score: 0,
        numbers: [],
        selected: [],
        usedQuestions: new Set(),
        locked: false
    };

    setupLearning(
        "📈",
        "Ascending Order",
        "Arrange from smallest to largest",
        `
        <section class="ascending-luxury">

            <div class="ascending-top">
                <span>✨ MATHS WORLD ✨</span>
                <h2>Ascending Order</h2>
                <p>Arrange from smallest to largest</p>
            </div>

            <div class="ascending-progress">
                <span id="ascendingQuestionNo">Question 1 / 20</span>
                <span>⭐ <b id="ascendingScore">0</b></span>
            </div>

            <div class="ascending-progress-track">
                <div id="ascendingProgressFill"></div>
            </div>

            <h3 class="ascending-instruction">
                ✨ Tap numbers from smallest to largest ✨
            </h3>

            <div id="ascendingNumbers"
                 class="ascending-question-circles"></div>

            <h3 class="ascending-answer-title">Your Answer</h3>

            <div id="ascendingAnswers"
                 class="ascending-answer-circles"></div>

            <p id="ascendingFeedback"
               class="ascending-feedback"
               aria-live="polite"></p>

            <button id="ascendingReset"
                    class="ascending-reset"
                    style="display:none"
                    type="button"
                    onclick="resetAscendingAnswer()">
                ↻ Try Again
            </button>

            <button id="ascendingNext"
                    class="ascending-next"
                    style="display:none"
                    type="button"
                    onclick="nextAscendingQuestion()">
                Next Question →
            </button>

        </section>
        `
    );

    renderAscendingQuestion();
}


/* GENERATE RANDOM, NON-REPEATING QUESTIONS */
function createAscendingNumbers(index) {
    const count = Math.random() < 0.5 ? 5 : 6;

    let min;
    let max;

    if (index < 5) {
        min = 1;
        max = 100;
    } else if (index < 12) {
        min = 20;
        max = 500;
    } else {
        min = 100;
        max = 1500;
    }

    let numbers;
    let key;

    do {
        const numberSet = new Set();

        while (numberSet.size < count) {
            numberSet.add(
                Math.floor(Math.random() * (max - min + 1)) + min
            );
        }

        numbers = [...numberSet];

        key = [...numbers]
            .sort((a, b) => a - b)
            .join(",");

    } while (ascendingState.usedQuestions.has(key));

    ascendingState.usedQuestions.add(key);

    // Shuffle the displayed numbers
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
}


/* RENDER CURRENT QUESTION */
function renderAscendingQuestion() {
    const numbersBox = document.getElementById("ascendingNumbers");
    const answersBox = document.getElementById("ascendingAnswers");

    if (!numbersBox || !answersBox) return;

    if (ascendingState.question >= 20) {
        showAscendingResults();
        return;
    }

    ascendingState.numbers =
        createAscendingNumbers(ascendingState.question);

    ascendingState.selected = [];
    ascendingState.locked = false;

    document.getElementById("ascendingQuestionNo").textContent =
        `Question ${ascendingState.question + 1} / 20`;

    document.getElementById("ascendingScore").textContent =
        ascendingState.score;

    document.getElementById("ascendingProgressFill").style.width =
        `${(ascendingState.question / 20) * 100}%`;

    document.getElementById("ascendingFeedback").textContent = "";
    document.getElementById("ascendingReset").style.display = "none";
    document.getElementById("ascendingNext").style.display = "none";

    numbersBox.innerHTML = "";
    answersBox.innerHTML = "";

    ascendingState.numbers.forEach(number => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "ascending-number-circle";
        button.textContent = String(number).padStart(2, "0");
        button.setAttribute("aria-label", `Choose ${number}`);

        button.onclick = () => selectAscendingNumber(number);

        numbersBox.appendChild(button);
    });

    ascendingState.numbers.forEach(() => {
        const slot = document.createElement("button");

        slot.type = "button";
        slot.className = "ascending-answer-circle";
        slot.textContent = "";
        slot.setAttribute("aria-label", "Empty answer slot");
        slot.title = "Choose a number above first";
        slot.onclick = null;

        answersBox.appendChild(slot);
    });

    renderAscendingAnswers();
}


/* SELECT A NUMBER */
function selectAscendingNumber(number) {
    if (ascendingState.locked) return;

    if (ascendingState.selected.includes(number)) return;

    if (ascendingState.selected.length >= ascendingState.numbers.length) {
        return;
    }

    ascendingState.selected.push(number);

    renderAscendingAnswers();

    // Check automatically as soon as every slot is filled
    if (ascendingState.selected.length === ascendingState.numbers.length) {
        checkAscendingAnswer();
    }
}


/* DRAW ANSWERS AND KEEP FILLED SLOTS EDITABLE */
function renderAscendingAnswers() {
    const slots = document.querySelectorAll(
        "#ascendingAnswers .ascending-answer-circle"
    );

    const numberButtons = document.querySelectorAll(
        "#ascendingNumbers .ascending-number-circle"
    );

    numberButtons.forEach(button => {
        const value = Number(button.textContent);

        const isSelected = ascendingState.selected.includes(value);

        button.disabled = isSelected || ascendingState.locked;
        button.classList.toggle("ascending-picked", isSelected);
    });

    slots.forEach((slot, index) => {
        const value = ascendingState.selected[index];
        const filled = value !== undefined;

        slot.textContent = filled
            ? String(value).padStart(2, "0")
            : "";

        slot.classList.toggle("ascending-filled", filled);
        slot.classList.remove("ascending-correct-slot");

        slot.setAttribute(
            "aria-label",
            filled ? `Remove ${value} from answer` : "Empty answer slot"
        );

        slot.style.cursor = filled && !ascendingState.locked
            ? "pointer"
            : "default";

        slot.title = filled && !ascendingState.locked
            ? "Click to remove this number"
            : "";

        // Always attach the correct current slot handler
        slot.onclick = filled && !ascendingState.locked
            ? () => removeAscendingNumber(index)
            : null;
    });
}


/* REMOVE A NUMBER FROM AN ANSWER SLOT */
function removeAscendingNumber(index) {
    if (ascendingState.locked) return;

    if (index < 0 || index >= ascendingState.selected.length) return;

    ascendingState.selected.splice(index, 1);

    document.getElementById("ascendingFeedback").textContent = "";
    document.getElementById("ascendingReset").style.display = "none";
    document.getElementById("ascendingNext").style.display = "none";

    renderAscendingAnswers();
}


/* CHECK ANSWER AUTOMATICALLY */
function checkAscendingAnswer() {
    if (ascendingState.locked) return;

    const feedback = document.getElementById("ascendingFeedback");
    const resetButton = document.getElementById("ascendingReset");
    const nextButton = document.getElementById("ascendingNext");

    if (!feedback || !resetButton || !nextButton) return;

    if (ascendingState.selected.length !== ascendingState.numbers.length) {
        return;
    }

    const correctOrder = [...ascendingState.numbers].sort(
        (a, b) => a - b
    );

    const isCorrect = ascendingState.selected.every(
        (number, index) => number === correctOrder[index]
    );

    if (isCorrect) {
        ascendingState.locked = true;
        ascendingState.score++;

        feedback.textContent = "🎉 Correct! Excellent work!";
        feedback.style.color = "#16803c";

        document.getElementById("ascendingScore").textContent =
            ascendingState.score;

        document.getElementById("ascendingProgressFill").style.width =
            `${((ascendingState.question + 1) / 20) * 100}%`;

        resetButton.style.display = "none";
        nextButton.style.display = "inline-block";

        renderAscendingAnswers();

    } else {
        feedback.textContent =
            "❌ Not quite! Remove a number by clicking its answer circle, or tap Try Again.";

        feedback.style.color = "#d62828";

        resetButton.style.display = "inline-block";
        nextButton.style.display = "none";
    }
}


/* CLEAR CURRENT ANSWER */
function resetAscendingAnswer() {
    if (ascendingState.locked) return;

    ascendingState.selected = [];

    document.getElementById("ascendingFeedback").textContent = "";
    document.getElementById("ascendingReset").style.display = "none";
    document.getElementById("ascendingNext").style.display = "none";

    renderAscendingAnswers();
}


/* NEXT QUESTION */
function nextAscendingQuestion() {
    if (!ascendingState.locked) return;

    ascendingState.question++;

    if (ascendingState.question >= 20) {
        showAscendingResults();
        return;
    }

    renderAscendingQuestion();
}


/* FINAL RESULTS */
function showAscendingResults() {
    const container = document.querySelector(".ascending-luxury");

    if (!container) return;

    container.innerHTML = `
        <div class="ascending-top">
            <span>🏆 MATHS WORLD 🏆</span>
            <h2>Activity Completed!</h2>
            <p>You completed all 20 questions!</p>
        </div>

        <div class="ascending-final-score">
            <h2>⭐ Your Score: ${ascendingState.score} / 20</h2>
            <p>
                ${
                    ascendingState.score === 20
                        ? "Perfect score! Amazing! 🌟"
                        : "Well done! Keep practising! 🎉"
                }
            </p>
        </div>

        <button type="button"
                class="ascending-next"
                onclick="openAscendingOrder()">
            ↻ Play Again
        </button>
    `;
}



/* =====================================================
   LUXURY SHAPES STUDIO
   12 TWO-DIMENSIONAL + 9 THREE-DIMENSIONAL SHAPES
   ===================================================== */

const SHAPES_STUDIO_DATA = [
  {
    id:"circle", name:"Circle", hi:"वृत्त", type:"2D",
    example:"Clock / घड़ी",
    description:"A round, flat shape. Every point on its boundary is equally distant from the centre.",
    descHi:"एक समतल गोल आकृति, जिसकी सीमा का हर बिंदु केंद्र से समान दूरी पर होता है।",
    formulas:[
      ["Area / क्षेत्रफल","πr²"],
      ["Circumference / परिधि","2πr"],
      ["Diameter / व्यास","2r"]
    ],
    properties:["1 curved boundary / 1 वक्र सीमा","No vertices / कोई शीर्ष नहीं"],
    symbols:"r = radius / त्रिज्या; π ≈ 3.14159",
    sides:0, geometry:"circle"
  },
  {
    id:"triangle", name:"Triangle", hi:"त्रिभुज", type:"2D",
    example:"Road sign / सड़क का संकेत",
    description:"A polygon with three sides and three angles.",
    descHi:"तीन भुजाओं और तीन कोणों वाली बहुभुज आकृति।",
    formulas:[
      ["Area / क्षेत्रफल","½ × base × height"],
      ["Perimeter / परिमाप","a + b + c"],
      ["Angle sum / कोणों का योग","180°"]
    ],
    properties:["3 sides / 3 भुजाएँ","3 vertices / 3 शीर्ष"],
    symbols:"a,b,c = sides / भुजाएँ; h = height / ऊँचाई",
    sides:3, geometry:"triangle"
  },
  {
    id:"square", name:"Square", hi:"वर्ग", type:"2D",
    example:"Chessboard tile / शतरंज का खाना",
    description:"A quadrilateral with four equal sides and four right angles.",
    descHi:"चार समान भुजाओं और चार समकोणों वाली आकृति।",
    formulas:[
      ["Area / क्षेत्रफल","a²"],
      ["Perimeter / परिमाप","4a"],
      ["Diagonal / विकर्ण","a√2"]
    ],
    properties:["4 equal sides / 4 समान भुजाएँ","4 right angles / 4 समकोण"],
    symbols:"a = side / भुजा",
    sides:4, geometry:"square"
  },
  {
    id:"rectangle", name:"Rectangle", hi:"आयत", type:"2D",
    example:"Book / किताब",
    description:"A quadrilateral with opposite sides equal and four right angles.",
    descHi:"विपरीत भुजाओं के समान और चार समकोण वाली आकृति।",
    formulas:[
      ["Area / क्षेत्रफल","l × w"],
      ["Perimeter / परिमाप","2(l + w)"],
      ["Diagonal / विकर्ण","√(l² + w²)"]
    ],
    properties:["4 sides / 4 भुजाएँ","4 right angles / 4 समकोण"],
    symbols:"l = length / लंबाई; w = width / चौड़ाई",
    sides:4, geometry:"rectangle"
  },
  {
    id:"oval", name:"Oval / Ellipse", hi:"अंडाकार", type:"2D",
    example:"Egg / अंडा",
    description:"An oval-like closed curve. An ellipse has two axes of different lengths.",
    descHi:"एक बंद अंडाकार वक्र। दीर्घवृत्त की दो अक्षों की लंबाइयाँ अलग हो सकती हैं।",
    formulas:[
      ["Area / क्षेत्रफल","πab"],
      ["Approx. perimeter / लगभग परिधि","π[3(a+b) − √((3a+b)(a+3b))]"]
    ],
    properties:["Curved boundary / वक्र सीमा","No corners / कोई कोना नहीं"],
    symbols:"a,b = semi-axes / अर्ध-अक्ष",
    sides:0, geometry:"oval"
  },
  {
    id:"pentagon", name:"Pentagon", hi:"पंचभुज", type:"2D",
    example:"Five-sided badge / पाँच भुजाओं का बैज",
    description:"A polygon with five sides.",
    descHi:"पाँच भुजाओं वाली बहुभुज आकृति।",
    formulas:[
      ["Interior angle sum / आंतरिक कोणों का योग","540°"],
      ["Regular area / नियमित क्षेत्रफल","¼√(5(5+2√5))a²"],
      ["Regular perimeter / परिमाप","5a"]
    ],
    properties:["5 sides / 5 भुजाएँ","5 vertices / 5 शीर्ष"],
    symbols:"a = side / भुजा; regular pentagon formulas assume equal sides",
    sides:5, geometry:"polygon5"
  },
  {
    id:"hexagon", name:"Hexagon", hi:"षट्भुज", type:"2D",
    example:"Honeycomb / मधुमक्खी का छत्ता",
    description:"A polygon with six sides.",
    descHi:"छह भुजाओं वाली बहुभुज आकृति।",
    formulas:[
      ["Interior angle sum / कोणों का योग","720°"],
      ["Regular area / क्षेत्रफल","(3√3/2)a²"],
      ["Regular perimeter / परिमाप","6a"]
    ],
    properties:["6 sides / 6 भुजाएँ","6 vertices / 6 शीर्ष"],
    symbols:"a = side / भुजा; regular hexagon / नियमित षट्भुज",
    sides:6, geometry:"polygon6"
  },
  {
    id:"octagon", name:"Octagon", hi:"अष्टभुज", type:"2D",
    example:"Stop sign / स्टॉप संकेत",
    description:"A polygon with eight sides.",
    descHi:"आठ भुजाओं वाली बहुभुज आकृति।",
    formulas:[
      ["Interior angle sum / कोणों का योग","1080°"],
      ["Regular area / क्षेत्रफल","2(1+√2)a²"],
      ["Regular perimeter / परिमाप","8a"]
    ],
    properties:["8 sides / 8 भुजाएँ","8 vertices / 8 शीर्ष"],
    symbols:"a = side / भुजा; regular octagon / नियमित अष्टभुज",
    sides:8, geometry:"polygon8"
  },
  {
    id:"rhombus", name:"Rhombus", hi:"समचतुर्भुज", type:"2D",
    example:"Diamond-shaped sign / हीरे जैसा संकेत",
    description:"A quadrilateral with four equal sides.",
    descHi:"चार समान भुजाओं वाली चतुर्भुज आकृति।",
    formulas:[
      ["Area / क्षेत्रफल","½ × d₁ × d₂"],
      ["Perimeter / परिमाप","4a"],
      ["Area using base / आधार से क्षेत्रफल","base × height"]
    ],
    properties:["4 equal sides / 4 समान भुजाएँ","Opposite angles equal / विपरीत कोण समान"],
    symbols:"d₁,d₂ = diagonals / विकर्ण; a = side / भुजा",
    sides:4, geometry:"rhombus"
  },
  {
    id:"parallelogram", name:"Parallelogram", hi:"समांतर चतुर्भुज", type:"2D",
    example:"Slanted tile / तिरछी टाइल",
    description:"A quadrilateral whose opposite sides are parallel.",
    descHi:"ऐसी चतुर्भुज आकृति जिसकी विपरीत भुजाएँ समानांतर होती हैं।",
    formulas:[
      ["Area / क्षेत्रफल","base × height"],
      ["Perimeter / परिमाप","2(a+b)"]
    ],
    properties:["Opposite sides parallel / विपरीत भुजाएँ समानांतर","Opposite angles equal / विपरीत कोण समान"],
    symbols:"a,b = side lengths / भुजाएँ; h = height / ऊँचाई",
    sides:4, geometry:"parallelogram"
  },
  {
    id:"trapezium", name:"Trapezium", hi:"समलंब चतुर्भुज", type:"2D",
    example:"Trapezoid-shaped table / समलंब मेज",
    description:"A quadrilateral with one pair of parallel sides (Indian/UK convention).",
    descHi:"एक जोड़ी समानांतर भुजाओं वाली चतुर्भुज आकृति।",
    formulas:[
      ["Area / क्षेत्रफल","½(a+b)h"],
      ["Perimeter / परिमाप","a+b+c+d"]
    ],
    properties:["4 sides / 4 भुजाएँ","One pair of parallel sides / एक जोड़ी समानांतर भुजाएँ"],
    symbols:"a,b = parallel sides / समानांतर भुजाएँ; h = height / ऊँचाई",
    sides:4, geometry:"trapezium"
  },
  {
    id:"semicircle", name:"Semicircle", hi:"अर्धवृत्त", type:"2D",
    example:"Half-round window / अर्धगोल खिड़की",
    description:"Half of a circle divided by its diameter.",
    descHi:"व्यास से विभाजित वृत्त का आधा भाग।",
    formulas:[
      ["Area / क्षेत्रफल","½πr²"],
      ["Perimeter / परिमाप","πr + 2r"],
      ["Curved arc / वक्र चाप","πr"]
    ],
    properties:["One curved arc / एक वक्र चाप","One diameter / एक व्यास"],
    symbols:"r = radius / त्रिज्या",
    sides:0, geometry:"semicircle"
  },
  {
    id:"cube", name:"Cube", hi:"घन", type:"3D",
    example:"Dice / पासा",
    description:"A solid with six equal square faces.",
    descHi:"छह समान वर्गाकार फलकों वाला ठोस।",
    formulas:[
      ["Volume / आयतन","a³"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","6a²"],
      ["Lateral surface area / पार्श्व क्षेत्रफल","4a²"],
      ["Space diagonal / अंतरिक्ष विकर्ण","a√3"]
    ],
    properties:["6 faces / 6 फलक","12 edges / 12 किनारे","8 vertices / 8 शीर्ष"],
    symbols:"a = edge length / किनारे की लंबाई",
    geometry:"cube"
  },
  {
    id:"cuboid", name:"Cuboid", hi:"घनाभ", type:"3D",
    example:"Brick / ईंट",
    description:"A solid with six rectangular faces.",
    descHi:"छह आयताकार फलकों वाला ठोस।",
    formulas:[
      ["Volume / आयतन","l × w × h"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","2(lw+wh+hl)"],
      ["Lateral surface area / पार्श्व क्षेत्रफल","2h(l+w)"],
      ["Space diagonal / अंतरिक्ष विकर्ण","√(l²+w²+h²)"]
    ],
    properties:["6 faces / 6 फलक","12 edges / 12 किनारे","8 vertices / 8 शीर्ष"],
    symbols:"l = length / लंबाई; w = width / चौड़ाई; h = height / ऊँचाई",
    geometry:"cuboid"
  },
  {
    id:"sphere", name:"Sphere", hi:"गोला", type:"3D",
    example:"Ball / गेंद",
    description:"A perfectly round solid whose surface points are equally distant from its centre.",
    descHi:"एक गोल ठोस जिसकी सतह का प्रत्येक बिंदु केंद्र से समान दूरी पर होता है।",
    formulas:[
      ["Volume / आयतन","(4/3)πr³"],
      ["Surface area / पृष्ठीय क्षेत्रफल","4πr²"]
    ],
    properties:["One curved surface / एक वक्र सतह","No edges or vertices / किनारे या शीर्ष नहीं"],
    symbols:"r = radius / त्रिज्या",
    geometry:"sphere"
  },
  {
    id:"cylinder", name:"Cylinder", hi:"बेलन", type:"3D",
    example:"Tin can / डिब्बा",
    description:"A solid with two equal circular bases and one curved surface.",
    descHi:"दो समान वृत्ताकार आधारों और एक वक्र सतह वाला ठोस।",
    formulas:[
      ["Volume / आयतन","πr²h"],
      ["Curved surface area / वक्र पृष्ठीय क्षेत्रफल","2πrh"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","2πr(r+h)"]
    ],
    properties:["2 circular bases / 2 वृत्ताकार आधार","1 curved surface / 1 वक्र सतह"],
    symbols:"r = radius / त्रिज्या; h = height / ऊँचाई",
    geometry:"cylinder"
  },
  {
    id:"cone", name:"Cone", hi:"शंकु", type:"3D",
    example:"Ice-cream cone / आइसक्रीम कोन",
    description:"A solid with a circular base and one pointed vertex.",
    descHi:"एक वृत्ताकार आधार और एक नुकीले शीर्ष वाला ठोस।",
    formulas:[
      ["Volume / आयतन","⅓πr²h"],
      ["Curved surface area / वक्र पृष्ठीय क्षेत्रफल","πrl"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","πr(l+r)"],
      ["Slant height / तिर्यक ऊँचाई","l = √(r²+h²)"]
    ],
    properties:["1 circular base / 1 वृत्ताकार आधार","1 vertex / 1 शीर्ष"],
    symbols:"r = radius / त्रिज्या; h = height / ऊँचाई; l = slant height / तिर्यक ऊँचाई",
    geometry:"cone"
  },
  {
    id:"pyramid", name:"Square Pyramid", hi:"वर्गाकार पिरामिड", type:"3D",
    example:"Pyramid monument / पिरामिड",
    description:"A solid with a square base and four triangular side faces.",
    descHi:"वर्गाकार आधार और चार त्रिकोणीय पार्श्व फलकों वाला ठोस।",
    formulas:[
      ["Volume / आयतन","⅓a²h"],
      ["Lateral surface area / पार्श्व क्षेत्रफल","2al"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","a²+2al"]
    ],
    properties:["5 faces / 5 फलक","8 edges / 8 किनारे","5 vertices / 5 शीर्ष"],
    symbols:"a = base side / आधार भुजा; h = vertical height / ऊर्ध्वाधर ऊँचाई; l = slant height / तिर्यक ऊँचाई",
    geometry:"pyramid"
  },
  {
    id:"triangular-prism", name:"Triangular Prism", hi:"त्रिभुजीय प्रिज्म", type:"3D",
    example:"Tent / तंबू",
    description:"A solid with two parallel triangular bases.",
    descHi:"दो समानांतर त्रिकोणीय आधारों वाला ठोस।",
    formulas:[
      ["Volume / आयतन","Base area × prism length"],
      ["Surface area / पृष्ठीय क्षेत्रफल","2B + PL"]
    ],
    properties:["5 faces / 5 फलक","9 edges / 9 किनारे","6 vertices / 6 शीर्ष"],
    symbols:"B = triangle area / त्रिभुज का क्षेत्रफल; P = base perimeter / आधार का परिमाप; L = prism length / प्रिज्म की लंबाई",
    geometry:"triangular-prism"
  },
  {
    id:"hemisphere", name:"Hemisphere", hi:"अर्धगोला", type:"3D",
    example:"Bowl / कटोरा",
    description:"Half of a sphere.",
    descHi:"गोले का आधा भाग।",
    formulas:[
      ["Volume / आयतन","(2/3)πr³"],
      ["Curved surface area / वक्र पृष्ठीय क्षेत्रफल","2πr²"],
      ["Total surface area / कुल पृष्ठीय क्षेत्रफल","3πr²"]
    ],
    properties:["1 curved surface / 1 वक्र सतह","1 circular base / 1 वृत्ताकार आधार"],
    symbols:"r = radius / त्रिज्या",
    geometry:"hemisphere"
  },
  {
    id:"torus", name:"Torus", hi:"वलयाकार ठोस", type:"3D",
    example:"Doughnut / डोनट",
    description:"A ring-shaped solid formed by revolving a circle around an axis outside it.",
    descHi:"एक वलयाकार ठोस, जो वृत्त को उसके बाहर स्थित अक्ष के चारों ओर घुमाने से बनता है।",
    formulas:[
      ["Volume / आयतन","2π²Rr²"],
      ["Surface area / पृष्ठीय क्षेत्रफल","4π²Rr"]
    ],
    properties:["Ring-shaped surface / वलयाकार सतह","No flat faces / समतल फलक नहीं"],
    symbols:"R = major radius / बड़ा त्रिज्या; r = minor radius / छोटा त्रिज्या",
    geometry:"torus"
  }
];

let shapesStudioPreviousHTML = "";
let shapesStudioRotation = { x: 0.35, y: 0.55 };
let shapesStudioRenderer = null;
let shapesStudioScene = null;
let shapesStudioCamera = null;
let shapesStudioFrame = null;
let shapesStudioObject = null;
let shapesStudioControls = null;
let shapesStudioResizeHandler = null;

function openShapes() {
  const root = document.getElementById("learningContent");
  if (!root) return;

  root.innerHTML = `
    <section class="shapes-studio">
      <header class="shapes-hero">
        <span class="shapes-eyebrow">EXPLORE • LEARN • DISCOVER</span>
        <h2>🔷 Shapes Studio</h2>
        <p>Discover 21 amazing shapes — Hindi & English names, formulas, properties and interactive 3D models.</p>
        <p>21 आकृतियाँ सीखें — नाम, सूत्र, गुणधर्म और 3D मॉडल।</p>
      </header>
      ${shapesGallerySection("2D SHAPES • समतल आकृतियाँ",
        "Flat shapes with length and width", "12", "2D")}
      ${shapesGallerySection("3D SHAPES • ठोस आकृतियाँ",
        "Solid shapes with length, width and height", "9", "3D")}
      <p class="shapes-footer-note">✨ Tap any shape to explore its details and formulas. किसी भी आकृति पर क्लिक करें।</p>
    </section>`;
}

function shapesGallerySection(title, subtitle, count, type) {
  return `
    <section class="${type === "3D" ? "shapes-second-section" : ""}">
      <div class="shapes-section-heading">
        <div><h3>${title}</h3><p>${subtitle}</p></div>
        <span class="shapes-count">${count} SHAPES</span>
      </div>
      <div class="shapes-gallery-grid">
        ${SHAPES_STUDIO_DATA.filter(s => s.type === type).map(shapesStudioCard).join("")}
      </div>
    </section>`;
}

function shapesStudioCard(shape) {
  return `
    <button class="shapes-card" type="button"
      onclick="openShapeDetail('${shape.id}')"
      aria-label="${shape.name}, ${shape.hi}">
      <span class="shapes-card-type">${shape.type}</span>
      <span class="shapes-card-visual">${shapePreviewSVG(shape)}</span>
      <span class="shapes-card-name">${shape.name}</span>
      <span class="shapes-card-hindi">${shape.hi}</span>
      <span class="shapes-card-action">Explore ↗</span>
    </button>`;
}

function shapePreviewSVG(shape) {
  const c = "#8062c9";
  const g = "#d8c7ff";
  const common = `fill="${g}" stroke="${c}" stroke-width="3" stroke-linejoin="round"`;
  let element = "";

  switch (shape.geometry) {
    case "circle":
      element = `<circle cx="60" cy="60" r="36" ${common}/>`; break;
    case "triangle":
      element = `<polygon points="60,19 100,94 20,94" ${common}/>`; break;
    case "square":
      element = `<rect x="25" y="25" width="70" height="70" rx="2" ${common}/>`; break;
    case "rectangle":
      element = `<rect x="13" y="34" width="94" height="52" rx="2" ${common}/>`; break;
    case "oval":
      element = `<ellipse cx="60" cy="60" rx="43" ry="29" ${common}/>`; break;
    case "pentagon":
      element = `<polygon points="60,17 100,46 85,94 35,94 20,46" ${common}/>`; break;
    case "hexagon":
      element = `<polygon points="35,22 85,22 108,60 85,98 35,98 12,60" ${common}/>`; break;
    case "octagon":
      element = `<polygon points="42,15 78,15 105,42 105,78 78,105 42,105 15,78 15,42" ${common}/>`; break;
    case "rhombus":
      element = `<polygon points="60,13 101,60 60,107 19,60" ${common}/>`; break;
    case "parallelogram":
      element = `<polygon points="38,25 108,25 82,95 12,95" ${common}/>`; break;
    case "trapezium":
      element = `<polygon points="38,25 82,25 106,95 14,95" ${common}/>`; break;
    case "semicircle":
      element = `<path d="M18 72 A42 42 0 0 1 102 72 L18 72 Z" ${common}/>`; break;
    case "cube":
      element = `<polygon points="60,13 99,35 60,57 21,35" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/><polygon points="21,35 60,57 60,102 21,80" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><polygon points="60,57 99,35 99,80 60,102" fill="#9274dc" stroke="${c}" stroke-width="2.5"/>`; break;
    case "cuboid":
      element = `<polygon points="44,22 104,35 104,79 44,66" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/><polygon points="44,22 15,43 15,87 44,66" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><polygon points="15,43 75,56 104,35 44,22" fill="#d8c7ff" stroke="${c}" stroke-width="2.5"/><polygon points="15,87 75,100 104,79 44,66" fill="#9274dc" stroke="${c}" stroke-width="2.5"/><polygon points="75,56 104,35 104,79 75,100" fill="#8062c9" stroke="${c}" stroke-width="2.5"/>`; break;
    case "sphere":
      element = `<defs><radialGradient id="sg${shape.id}"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#bba5f5"/><stop offset="1" stop-color="#8062c9"/></radialGradient></defs><circle cx="60" cy="60" r="42" fill="url(#sg${shape.id})" stroke="${c}" stroke-width="2"/>`; break;
    case "cylinder":
      element = `<path d="M22 30 L22 87 A38 13 0 0 0 98 87 L98 30" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><ellipse cx="60" cy="30" rx="38" ry="13" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/><path d="M22 87 A38 13 0 0 0 98 87" fill="none" stroke="${c}" stroke-width="2.5"/>`; break;
    case "cone":
      element = `<path d="M60 17 L20 88 A40 13 0 0 0 100 88 Z" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><ellipse cx="60" cy="88" rx="40" ry="13" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/>`; break;
    case "pyramid":
      element = `<polygon points="60,14 15,86 60,105" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><polygon points="60,14 60,105 105,86" fill="#9274dc" stroke="${c}" stroke-width="2.5"/><polygon points="15,86 60,69 105,86 60,105" fill="#d8c7ff" stroke="${c}" stroke-width="2.5"/>`; break;
    case "triangular-prism":
      element = `<polygon points="22,38 22,87 62,63" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><polygon points="22,38 62,63 103,38" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/><polygon points="22,87 62,63 103,87" fill="#9274dc" stroke="${c}" stroke-width="2.5"/><polygon points="62,63 103,38 103,87" fill="#8062c9" stroke="${c}" stroke-width="2.5"/>`; break;
    case "hemisphere":
      element = `<path d="M18 66 A42 42 0 0 1 102 66 Z" fill="#bba5f5" stroke="${c}" stroke-width="2.5"/><ellipse cx="60" cy="66" rx="42" ry="12" fill="#eee7ff" stroke="${c}" stroke-width="2.5"/>`; break;
    case "torus":
      element = `<ellipse cx="60" cy="60" rx="43" ry="29" fill="none" stroke="#8062c9" stroke-width="23"/><ellipse cx="60" cy="60" rx="43" ry="29" fill="none" stroke="#d8c7ff" stroke-width="14"/>`; break;
  }

  return `<svg class="shape-svg" viewBox="0 0 120 120" role="img" aria-label="${shape.name}">${element}</svg>`;
}

function openShapeDetail(shapeId) {
  const shape = SHAPES_STUDIO_DATA.find(s => s.id === shapeId);
  const root = document.getElementById("learningContent");
  if (!shape || !root) return;

  destroyShape3D();

  root.innerHTML = `
    <section class="shape-detail-page">
      <button class="shape-back-button" onclick="openShapes()" type="button">← All Shapes / सभी आकृतियाँ</button>
      <header class="shape-detail-hero">
        <span class="shapes-eyebrow">${shape.type} SHAPE • ${shape.type === "2D" ? "समतल आकृति" : "ठोस आकृति"}</span>
        <h2>${shape.name}</h2>
        <h3>${shape.hi}</h3>
        <p>${shape.description}</p>
        <p lang="hi">${shape.descHi}</p>
      </header>

      <div class="shape-detail-layout">
        <article class="shape-viewer-card">
          <div class="shape-viewer-toolbar">
            <span>✨ Shape Explorer</span>
            <span class="shape-live-pill">${shape.type === "3D" ? "INTERACTIVE 3D" : "2D MODEL"}</span>
          </div>
          <div class="shape-rotation-stage" id="shape3DStage">
            ${shape.type === "3D"
              ? `<div class="shape-three-host" id="shapeThreeHost"></div>`
              : `<div class="shape-flat-large">${shapePreviewSVG(shape)}</div>`}
          </div>
          ${shape.type === "3D"
            ? `<p class="shape-viewer-hint">Drag to rotate • Scroll/pinch to zoom • खींचकर घुमाएँ</p>`
            : `<p class="shape-viewer-hint">A flat, two-dimensional shape / समतल आकृति</p>`}
          <div class="shape-example-box">
            <span>REAL-WORLD EXAMPLE • वास्तविक उदाहरण</span>
            <strong>${shape.example}</strong>
          </div>
        </article>

        <article class="shape-facts-card">
          <h3>📐 Formulas / सूत्र</h3>
          <div class="shape-formula-list">
            ${shape.formulas.map(f => `<div class="shape-formula-row"><span>${f[0]}</span><strong>${f[1]}</strong></div>`).join("")}
          </div>
          <h3 class="shape-formula-heading">⭐ Properties / गुणधर्म</h3>
          <ul class="shape-property-list">${shape.properties.map(p => `<li>${p}</li>`).join("")}</ul>
          <div class="shape-symbol-note">
            <strong>Symbols / संकेतों का अर्थ</strong>
            <p>${shape.symbols}</p>
          </div>
          <div class="shape-learning-note">
            <span>💡</span>
            <div><strong>Remember / याद रखें</strong>
              <p>${shape.type === "3D"
                ? "3D shapes have length, width and height. / 3D आकृतियों में लंबाई, चौड़ाई और ऊँचाई होती है।"
                : "2D shapes have length and width. / 2D आकृतियों में लंबाई और चौड़ाई होती है।"}</p>
            </div>
          </div>
        </article>
      </div>
    </section>`;

  if (shape.type === "3D") {
    loadShapeThreeJS(() => createShape3D(shape));
  }
}

function loadShapeThreeJS(callback) {
  if (window.THREE) {
    callback();
    return;
  }

  if (document.getElementById("shapes-three-script")) {
    const check = setInterval(() => {
      if (window.THREE) {
        clearInterval(check);
        callback();
      }
    }, 100);
    setTimeout(() => clearInterval(check), 10000);
    return;
  }

  const script = document.createElement("script");
  script.id = "shapes-three-script";
  script.src = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";
  script.onload = callback;
  script.onerror = () => {
    const host = document.getElementById("shapeThreeHost");
    if (host) host.innerHTML = "<p>3D model could not load. Please check your internet connection. / इंटरनेट कनेक्शन जाँचें।</p>";
  };
  document.head.appendChild(script);
}

function createShape3D(shape) {
  const host = document.getElementById("shapeThreeHost");
  if (!host || !window.THREE) return;

  destroyShape3D();

  const T = window.THREE;
  const width = Math.max(host.clientWidth, 240);
  const height = Math.max(host.clientHeight, 240);

  shapesStudioScene = new T.Scene();
  shapesStudioScene.background = new T.Color("#f0eaff");

  shapesStudioCamera = new T.PerspectiveCamera(40, width / height, 0.1, 100);
  shapesStudioCamera.position.set(4, 3, 5);
  shapesStudioCamera.lookAt(0, 0, 0);

  shapesStudioRenderer = new T.WebGLRenderer({ antialias: true, alpha: true });
  shapesStudioRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  shapesStudioRenderer.setSize(width, height);
  shapesStudioRenderer.shadowMap.enabled = true;
  host.appendChild(shapesStudioRenderer.domElement);

  shapesStudioScene.add(new T.AmbientLight(0xffffff, 2.0));

  const keyLight = new T.DirectionalLight(0xffffff, 3);
  keyLight.position.set(4, 6, 5);
  shapesStudioScene.add(keyLight);

  const fillLight = new T.PointLight(0xbba5ff, 25);
  fillLight.position.set(-4, 2, -3);
  shapesStudioScene.add(fillLight);

  const material = new T.MeshStandardMaterial({
    color: "#9b82e8",
    roughness: 0.34,
    metalness: 0.08,
    flatShading: false
  });
  const edgeMaterial = new T.LineBasicMaterial({ color: "#6045a6" });

  let geometry;

  switch (shape.geometry) {
    case "cube":
      geometry = new T.BoxGeometry(2, 2, 2); break;
    case "cuboid":
      geometry = new T.BoxGeometry(2.7, 1.7, 1.3); break;
    case "sphere":
      geometry = new T.SphereGeometry(1.35, 48, 32); break;
    case "cylinder":
      geometry = new T.CylinderGeometry(1, 1, 2.2, 48); break;
    case "cone":
      geometry = new T.ConeGeometry(1.2, 2.4, 48); break;
    case "pyramid":
      geometry = new T.ConeGeometry(1.3, 2.2, 4);
      break;
    case "triangular-prism":
      geometry = new T.CylinderGeometry(1.05, 1.05, 2.1, 3, 1);
      geometry.rotateY(Math.PI / 2);
      break;
    case "hemisphere":
      geometry = new T.SphereGeometry(1.3, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      break;
    case "torus":
      geometry = new T.TorusGeometry(0.9, 0.42, 24, 72); break;
    default:
      return;
  }

  shapesStudioObject = new T.Mesh(geometry, material);
  shapesStudioObject.rotation.set(0.2, 0.35, 0);
  shapesStudioScene.add(shapesStudioObject);

  const edges = new T.LineSegments(new T.EdgesGeometry(geometry), edgeMaterial);
  shapesStudioObject.add(edges);

  let dragging = false;
  let previousX = 0;
  let previousY = 0;
  let pinchDistance = 0;
  const canvas = shapesStudioRenderer.domElement;

  canvas.style.touchAction = "none";
  canvas.style.cursor = "grab";

  canvas.addEventListener("pointerdown", e => {
    dragging = true;
    previousX = e.clientX;
    previousY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointermove", e => {
    if (!dragging || !shapesStudioObject) return;
    shapesStudioObject.rotation.y += (e.clientX - previousX) * 0.012;
    shapesStudioObject.rotation.x += (e.clientY - previousY) * 0.012;
    previousX = e.clientX;
    previousY = e.clientY;
  });

  const stopDrag = () => {
    dragging = false;
    canvas.style.cursor = "grab";
  };
  canvas.addEventListener("pointerup", stopDrag);
  canvas.addEventListener("pointercancel", stopDrag);
  canvas.addEventListener("pointerleave", stopDrag);

  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    shapesStudioCamera.position.multiplyScalar(e.deltaY > 0 ? 1.08 : 0.92);
    const distance = shapesStudioCamera.position.length();
    if (distance < 2.5) shapesStudioCamera.position.setLength(2.5);
    if (distance > 10) shapesStudioCamera.position.setLength(10);
  }, { passive: false });

  shapesStudioResizeHandler = () => {
    if (!host.isConnected || !shapesStudioRenderer) return;
    const w = Math.max(host.clientWidth, 240);
    const h = Math.max(host.clientHeight, 240);
    shapesStudioCamera.aspect = w / h;
    shapesStudioCamera.updateProjectionMatrix();
    shapesStudioRenderer.setSize(w, h);
  };
  window.addEventListener("resize", shapesStudioResizeHandler);

  function animate() {
    if (!shapesStudioRenderer || !host.isConnected) return;
    shapesStudioFrame = requestAnimationFrame(animate);
    shapesStudioRenderer.render(shapesStudioScene, shapesStudioCamera);
  }
  animate();
}

function destroyShape3D() {
  if (shapesStudioFrame) cancelAnimationFrame(shapesStudioFrame);
  shapesStudioFrame = null;

  if (shapesStudioResizeHandler) {
    window.removeEventListener("resize", shapesStudioResizeHandler);
    shapesStudioResizeHandler = null;
  }

  if (shapesStudioObject && shapesStudioScene) {
    shapesStudioScene.remove(shapesStudioObject);
    shapesStudioObject.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
  }

  if (shapesStudioRenderer) {
    shapesStudioRenderer.dispose();
    shapesStudioRenderer.domElement.remove();
  }

  shapesStudioRenderer = null;
  shapesStudioScene = null;
  shapesStudioCamera = null;
  shapesStudioObject = null;
  shapesStudioControls = null;
}

/* =========================================================
   🌍 GENERAL KNOWLEDGE
   ========================================================= */

function showGKMenu() {

    return `

        <div class="learning-heading">

            <h2>🌍 General Knowledge</h2>

            <p>
                Discover amazing things around us!
            </p>

        </div>


        <div class="learning-menu-grid">

            ${createWorldCard(
                "🌎",
                "Countries",
                "Learn about countries",
                "openCountries()"
            )}

            ${createWorldCard(
                "🏛️",
                "Famous Places",
                "Explore famous places",
                "openFamousPlaces()"
            )}

            ${createWorldCard(
                "🚩",
                "Flags",
                "Learn country flags",
                "openFlags()"
            )}

            ${createWorldCard(
                "🪐",
                "Solar System",
                "Explore space",
                "openSolarSystem()"
            )}

            ${createWorldCard(
                "🐾",
                "Wild Animals",
                "Meet wild animals",
                "openWildAnimals()"
            )}

            ${createWorldCard(
                "🐄",
                "Domestic Animals",
                "Animals around us",
                "openDomesticAnimals()"
            )}

            ${createWorldCard(
                "🚗",
                "Vehicles",
                "Cars, buses, planes",
                "openVehicles()"
            )}

            ${createWorldCard(
                "👩‍⚕️",
                "Community Helpers",
                "People who help us",
                "openCommunityHelpers()"
            )}

            ${createWorldCard(
                "🌦️",
                "Weather",
                "Learn weather",
                "openWeather()"
            )}

            ${createWorldCard(
                "🌱",
                "Plants",
                "Learn about plants",
                "openPlants()"
            )}

            ${createWorldCard(
                "🍎",
                "Healthy Food",
                "Eat healthy",
                "openHealthyFood()"
            )}

            ${createWorldCard(
                "🫀",
                "Human Body",
                "Discover the human body",
                "openBodyScience()"
            )}

        </div>

    `;
}


/* =========================================================
   🌎 COUNTRIES
   ========================================================= */

function openCountries() {

    const data = [
        ["India", "🇮🇳"],
        ["Japan", "🇯🇵"],
        ["USA", "🇺🇸"],
        ["UK", "🇬🇧"],
        ["France", "🇫🇷"],
        ["Australia", "🇦🇺"],
        ["Canada", "🇨🇦"],
        ["Brazil", "🇧🇷"],
        ["Germany", "🇩🇪"],
        ["Italy", "🇮🇹"]
    ];

    renderSimpleTopic(
        "🌎",
        "Countries",
        data
    );
}


/* =========================================================
   🏛️ FAMOUS PLACES
   ========================================================= */

function openFamousPlaces() {

    const data = [
        ["Taj Mahal", "🕌"],
        ["Eiffel Tower", "🗼"],
        ["Great Wall of China", "🏯"],
        ["Statue of Liberty", "🗽"],
        ["Big Ben", "🕰️"],
        ["Pyramids", "🔺"],
        ["Colosseum", "🏛️"],
        ["Sydney Opera House", "🎭"]
    ];

    renderSimpleTopic(
        "🏛️",
        "Famous Places",
        data
    );
}


/* =========================================================
   🚩 FLAGS
   ========================================================= */

function openFlags() {

    const data = [
        ["India", "🇮🇳"],
        ["USA", "🇺🇸"],
        ["UK", "🇬🇧"],
        ["Japan", "🇯🇵"],
        ["France", "🇫🇷"],
        ["Germany", "🇩🇪"],
        ["Canada", "🇨🇦"],
        ["Australia", "🇦🇺"]
    ];

    renderSimpleTopic(
        "🚩",
        "Flags",
        data
    );
}


/* =========================================================
   🪐 SOLAR SYSTEM
   ========================================================= */

function openSolarSystem() {

    const planets = [
        ["Mercury", "☿️"],
        ["Venus", "♀️"],
        ["Earth", "🌍"],
        ["Mars", "🔴"],
        ["Jupiter", "🪐"],
        ["Saturn", "🪐"],
        ["Uranus", "🔵"],
        ["Neptune", "🔵"]
    ];

    renderSimpleTopic(
        "🪐",
        "Planets",
        planets
    );
}


/* =========================================================
   🐾 WILD ANIMALS
   ========================================================= */

function openWildAnimals() {

    const data = animals
        .slice(0, 20)
        .map(item => [item[0], item[1]]);

    renderSimpleTopic(
        "🐾",
        "Wild Animals",
        data
    );
}


/* =========================================================
   🐄 DOMESTIC ANIMALS
   ========================================================= */

function openDomesticAnimals() {

    const data = [
        ["Cow", "🐮"],
        ["Dog", "🐶"],
        ["Cat", "🐱"],
        ["Goat", "🐐"],
        ["Sheep", "🐑"],
        ["Horse", "🐴"],
        ["Hen", "🐔"],
        ["Duck", "🦆"]
    ];

    renderSimpleTopic(
        "🐄",
        "Domestic Animals",
        data
    );
}


/* =========================================================
   🚗 VEHICLES
   ========================================================= */

function openVehicles() {

    const data = [
        ["Car", "🚗"],
        ["Bus", "🚌"],
        ["Train", "🚆"],
        ["Aeroplane", "✈️"],
        ["Helicopter", "🚁"],
        ["Bicycle", "🚲"],
        ["Ship", "🚢"],
        ["Boat", "⛵"],
        ["Truck", "🚚"],
        ["Ambulance", "🚑"]
    ];

    renderSimpleTopic(
        "🚗",
        "Vehicles",
        data
    );
}


/* =========================================================
   👩‍⚕️ COMMUNITY HELPERS
   ========================================================= */

function openCommunityHelpers() {

    const data = [
        ["Doctor", "👨‍⚕️"],
        ["Teacher", "👩‍🏫"],
        ["Police Officer", "👮"],
        ["Firefighter", "👨‍🚒"],
        ["Farmer", "👨‍🌾"],
        ["Pilot", "👨‍✈️"],
        ["Chef", "👨‍🍳"],
        ["Nurse", "👩‍⚕️"]
    ];

    renderSimpleTopic(
        "👩‍⚕️",
        "Community Helpers",
        data
    );
}


/* =========================================================
   🌦️ WEATHER
   ========================================================= */

function openWeather() {

    const data = [
        ["Sunny", "☀️"],
        ["Rainy", "🌧️"],
        ["Cloudy", "☁️"],
        ["Windy", "💨"],
        ["Snowy", "❄️"],
        ["Stormy", "⛈️"],
        ["Rainbow", "🌈"]
    ];

    renderSimpleTopic(
        "🌦️",
        "Weather",
        data
    );
}


/* =========================================================
   🌱 PLANTS
   ========================================================= */

function openPlants() {

    const data = [
        ["Tree", "🌳"],
        ["Flower", "🌸"],
        ["Leaf", "🍃"],
        ["Seed", "🌱"],
        ["Root", "🌿"],
        ["Fruit", "🍎"],
        ["Vegetable", "🥕"]
    ];

    renderSimpleTopic(
        "🌱",
        "Plants",
        data
    );
}


/* =========================================================
   🍎 HEALTHY FOOD
   ========================================================= */

function openHealthyFood() {

    const data = [
        ["Apple", "🍎"],
        ["Banana", "🍌"],
        ["Carrot", "🥕"],
        ["Milk", "🥛"],
        ["Egg", "🥚"],
        ["Spinach", "🥬"],
        ["Orange", "🍊"],
        ["Water", "💧"]
    ];

    renderSimpleTopic(
        "🍎",
        "Healthy Food",
        data
    );
}


/* =========================================================
   🫀 HUMAN BODY
   ========================================================= */

function openBodyScience() {

    const data = [
        ["Brain", "🧠"],
        ["Heart", "❤️"],
        ["Lungs", "🫁"],
        ["Eye", "👁️"],
        ["Ear", "👂"],
        ["Nose", "👃"],
        ["Hand", "✋"],
        ["Foot", "🦶"]
    ];

    renderSimpleTopic(
        "🫀",
        "Human Body",
        data
    );
}


function renderSimpleTopic(icon, title, data) {

    setupLearning(
        icon,
        title,
        "Tap a card to learn!",
        `

        <div class="cards-grid">

            ${data.map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[0]}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${escapeHTML(item[0])}
                    </div>

                    <div class="mini-text">
                        🔊 Listen
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   🔬 SCIENCE WORLD
   ========================================================= */

function showScienceMenu() {

    return `

        <div class="learning-heading">

            <h2>🔬 Science World</h2>

            <p>
                Discover how the world works!
            </p>

        </div>


        <div class="learning-menu-grid">

            ${createWorldCard(
                "☀️",
                "Sun",
                "Learn about the Sun",
                "openScienceSun()"
            )}

            ${createWorldCard(
                "🌍",
                "Earth",
                "Our home planet",
                "openScienceEarth()"
            )}

            ${createWorldCard(
                "🌙",
                "Moon",
                "Explore the Moon",
                "openScienceMoon()"
            )}

            ${createWorldCard(
                "🪐",
                "Solar System",
                "Explore planets",
                "openSolarSystem()"
            )}

            ${createWorldCard(
                "💧",
                "Water Cycle",
                "Learn evaporation & rain",
                "openWaterCycle()"
            )}

            ${createWorldCard(
                "🌱",
                "Plant Growth",
                "Seed to plant",
                "openPlantGrowth()"
            )}

            ${createWorldCard(
                "🦋",
                "Life Cycle",
                "How living things grow",
                "openLifeCycle()"
            )}

            ${createWorldCard(
                "🧲",
                "Magnets",
                "Discover magnets",
                "openMagnets()"
            )}

            ${createWorldCard(
                "💧",
                "Water",
                "Why water is important",
                "openScienceWater()"
            )}

            ${createWorldCard(
                "🌈",
                "Colours & Light",
                "Learn about light",
                "openLightColours()"
            )}

            ${createWorldCard(
                "🫀",
                "Human Body",
                "Discover your body",
                "openBodyScience()"
            )}

        </div>

    `;
}


/* =========================================================
   ☀️ SCIENCE SUN
   ========================================================= */

function openScienceSun() {

    openScienceInfo(
        "☀️",
        "The Sun",
        "The Sun is a star that gives us light and heat."
    );
}


function openScienceEarth() {

    openScienceInfo(
        "🌍",
        "Earth",
        "Earth is the planet where we live."
    );
}


function openScienceMoon() {

    openScienceInfo(
        "🌙",
        "Moon",
        "The Moon is Earth's natural satellite."
    );
}


function openWaterCycle() {

    openScienceInfo(
        "💧",
        "Water Cycle",
        "Water moves through evaporation, condensation and precipitation."
    );
}


function openPlantGrowth() {

    openScienceInfo(
        "🌱",
        "Plant Growth",
        "A seed can grow into a plant with water, air, light and care."
    );
}


function openLifeCycle() {

    openScienceInfo(
        "🦋",
        "Life Cycle",
        "Living things grow and change through different stages."
    );
}


function openMagnets() {

    openScienceInfo(
        "🧲",
        "Magnets",
        "Magnets can attract some metal objects."
    );
}


function openScienceWater() {

    openScienceInfo(
        "💧",
        "Water",
        "Water is important for people, animals and plants."
    );
}


function openLightColours() {

    openScienceInfo(
        "🌈",
        "Colours & Light",
        "Light helps us see colours around us."
    );
}


function openScienceInfo(icon, title, text) {

    setupLearning(
        icon,
        title,
        "Let's learn something new!",
        `

        <div class="learning-card">

            <div class="learning-emoji">
                ${icon}
            </div>

            <h2>
                ${escapeHTML(title)}
            </h2>

            <p>
                ${escapeHTML(text)}
            </p>

            <button
                type="button"
                onclick="speak('${escapeHTML(text)}', {lang:'en-US'})"
            >
                🔊 Listen
            </button>

        </div>

        `
    );
}


/* =========================================================
   🎮 GAMES & QUIZZES
   ========================================================= */

function showGamesMenu() {

    return `

        <div class="learning-heading">

            <h2>🎮 Games & Quizzes</h2>

            <p>
                Play, learn and earn stars!
            </p>

        </div>


        <div class="learning-menu-grid">

            ${createWorldCard(
                "🧠",
                "Quiz",
                "Answer fun questions",
                "startGeneralQuiz()"
            )}

            ${createWorldCard(
                "🃏",
                "Memory Game",
                "Find matching cards",
                "startMemoryGame()"
            )}

            ${createWorldCard(
                "🔤",
                "Guess the Letter",
                "Guess the hidden letter",
                "startGuessLetterGame()"
            )}

            ${createWorldCard(
                "🍎",
                "Guess the Fruit",
                "Guess the fruit",
                "startGuessFruitGame()"
            )}

            ${createWorldCard(
                "🐶",
                "Guess the Animal",
                "Guess the animal",
                "startGuessAnimalGame()"
            )}

            ${createWorldCard(
                "🎨",
                "Guess the Colour",
                "Guess the colour",
                "startGuessColourGame()"
            )}

            ${createWorldCard(
                "➕",
                "Math Challenge",
                "Fast maths challenge",
                "startMathChallenge()"
            )}

            ${createWorldCard(
                "⭐",
                "My Progress",
                "See your score & stars",
                "showProgress()"
            )}

        </div>

    `;
}


/* =========================================================
   🧠 GENERAL QUIZ
   ========================================================= */

function startGeneralQuiz() {

    const questions = [
        {
            question: "Which planet do we live on?",
            options: ["Mars", "Earth", "Jupiter", "Venus"],
            answer: "Earth"
        },
        {
            question: "Which animal says Moo?",
            options: ["Dog", "Cow", "Cat", "Lion"],
            answer: "Cow"
        },
        {
            question: "How many days are in a week?",
            options: ["5", "6", "7", "8"],
            answer: "7"
        },
        {
            question: "Which fruit is yellow?",
            options: ["Banana", "Apple", "Grapes", "Blueberry"],
            answer: "Banana"
        },
        {
            question: "What colour is the sky usually?",
            options: ["Blue", "Black", "Green", "Pink"],
            answer: "Blue"
        },
        {
            question: "Which animal is called the king of the jungle?",
            options: ["Tiger", "Lion", "Horse", "Rabbit"],
            answer: "Lion"
        },
        {
            question: "How many legs does a dog have?",
            options: ["2", "3", "4", "6"],
            answer: "4"
        },
        {
            question: "Which shape has three sides?",
            options: ["Circle", "Square", "Triangle", "Oval"],
            answer: "Triangle"
        }
    ];

    startQuiz(
        "Kids Quiz",
        questions,
        "general"
    );
}


/* =========================================================
   🧠 COMMON QUIZ ENGINE
   ========================================================= */

function startQuiz(title, questions, type) {

    currentQuizQuestions =
        shuffleArray(questions);

    currentQuizIndex = 0;
    currentQuizType = type;

    renderCurrentQuizQuestion(title);
}


function renderCurrentQuizQuestion(title) {

    const question =
        currentQuizQuestions[currentQuizIndex];

    if (!question) {

        finishQuiz(title);

        return;
    }

    const total =
        currentQuizQuestions.length;

    const progress =
        currentQuizIndex + 1;

    setupLearning(
        "🧠",
        title,
        `Question ${progress} / ${total}`,
        `

        <div class="quiz-box">

            <div class="quiz-question">
                ${escapeHTML(question.question)}
            </div>

            <div class="quiz-options">

                ${question.options.map(option => `

                    <button
                        type="button"
                        onclick="answerQuiz('${escapeHTML(option)}')"
                    >
                        ${escapeHTML(option)}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


function answerQuiz(answer) {

    const question =
        currentQuizQuestions[currentQuizIndex];

    if (!question) return;

    playerAnswered++;

    if (String(answer) === String(question.answer)) {

        playerCorrect++;

        addScore(20);
        addStars(1);

        showSuccessMessage(
            "🎉 Correct!",
            "Excellent! You earned a star."
        );

    } else {

        showSuccessMessage(
            "😊 Good Try!",
            `Correct answer: ${question.answer}`
        );
    }

    currentQuizIndex++;

    setTimeout(() => {

        renderCurrentQuizQuestion(
            currentQuizType === "math"
                ? "Maths Quiz"
                : "Kids Quiz"
        );

    }, 900);
}


function finishQuiz(title) {

    const total =
        currentQuizQuestions.length;

    const percentage =
        total
            ? Math.round(
                (playerCorrect / total) * 100
            )
            : 0;

    setupLearning(
        "🏆",
        "Quiz Complete!",
        "Amazing work!",
        `

        <div class="learning-card">

            <div class="learning-emoji">
                🏆
            </div>

            <h2>
                ${title}
            </h2>

            <p>
                You answered
                <strong>${playerCorrect}</strong>
                correctly.
            </p>

            <p>
                Score:
                <strong>${playerScore}</strong>
            </p>

            <p>
                Stars:
                <strong>${playerStars} ⭐</strong>
            </p>

            <p>
                Result:
                <strong>${percentage}%</strong>
            </p>

            <button
                onclick="startGeneralQuiz()"
            >
                🔄 Play Again
            </button>

        </div>

        `
    );
}


/* =========================================================
   🐾 GUESS THE LETTER
   ========================================================= */

function startGuessLetterGame() {

    const item =
        randomItem(alphabet);

    const options =
        shuffleArray([
            item.letter,
            randomItem(alphabet).letter,
            randomItem(alphabet).letter,
            randomItem(alphabet).letter
        ]);

    window.guessAnswer =
        item.letter;

    setupLearning(
        "🔤",
        "Guess the Letter",
        `Which letter is for ${item.word}?`,
        `

        <div class="learning-card">

            <div class="learning-emoji">
                ${item.emoji}
            </div>

            <h2>
                ${item.word}
            </h2>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        onclick="checkGuessAnswer('${option}')"
                    >
                        ${option}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


/* =========================================================
   🍎 GUESS FRUIT
   ========================================================= */

function startGuessFruitGame() {

    const item =
        randomItem(fruits);

    const options =
        shuffleArray([
            item[0],
            randomItem(fruits)[0],
            randomItem(fruits)[0],
            randomItem(fruits)[0]
        ]);

    window.guessAnswer =
        item[0];

    setupLearning(
        "🍎",
        "Guess the Fruit",
        "Which fruit is this?",
        `

        <div class="learning-card">

            <div class="learning-emoji">
                ${item[1]}
            </div>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        onclick="checkGuessAnswer('${escapeHTML(option)}')"
                    >
                        ${escapeHTML(option)}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


/* =========================================================
   🐶 GUESS ANIMAL
   ========================================================= */

function startGuessAnimalGame() {

    const item =
        randomItem(animals);

    const options =
        shuffleArray([
            item[0],
            randomItem(animals)[0],
            randomItem(animals)[0],
            randomItem(animals)[0]
        ]);

    window.guessAnswer =
        item[0];

    setupLearning(
        "🐾",
        "Guess the Animal",
        `This animal says "${item[2]}"`,
        `

        <div class="learning-card">

            <div class="learning-emoji">
                ${item[1]}
            </div>

            <p>
                It says:
                <strong>${item[2]}</strong>
            </p>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        onclick="checkGuessAnswer('${escapeHTML(option)}')"
                    >
                        ${escapeHTML(option)}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


/* =========================================================
   🎨 GUESS COLOUR
   ========================================================= */

function startGuessColourGame() {

    const item =
        randomItem(colours);

    const options =
        shuffleArray([
            item[0],
            randomItem(colours)[0],
            randomItem(colours)[0],
            randomItem(colours)[0]
        ]);

    window.guessAnswer =
        item[0];

    setupLearning(
        "🎨",
        "Guess the Colour",
        "Which colour is this?",
        `

        <div class="learning-card">

            <div
                class="colour-circle"
                style="
                    background:${item[1]};
                    margin:20px auto;
                "
            ></div>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        onclick="checkGuessAnswer('${escapeHTML(option)}')"
                    >
                        ${escapeHTML(option)}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


function checkGuessAnswer(answer) {

    playerAnswered++;

    if (
        String(answer) ===
        String(window.guessAnswer)
    ) {

        playerCorrect++;

        addScore(20);
        addStars(1);

        showSuccessMessage(
            "🎉 Correct!",
            "You guessed it!"
        );

    } else {

        showSuccessMessage(
            "😊 Nice Try!",
            `Correct answer: ${window.guessAnswer}`
        );
    }
}


/* =========================================================
   🃏 MEMORY GAME
   ========================================================= */

function startMemoryGame() {

    const symbols = [
        "🍎",
        "🐶",
        "🚗",
        "⭐",
        "🌈",
        "⚽"
    ];

    const cards =
        shuffleArray([
            ...symbols,
            ...symbols
        ]);

    memoryCards = cards;
    memoryFlipped = [];
    memoryMatched = 0;

    setupLearning(
        "🃏",
        "Memory Game",
        "Find matching pairs!",
        `

        <div
            class="memory-grid"
            id="memoryGrid"
        >

            ${cards.map((symbol, index) => `

                <button
                    type="button"
                    class="memory-card"
                    id="memory-${index}"
                    onclick="flipMemoryCard(${index})"
                >
                    ❓
                </button>

            `).join("")}

        </div>

        `
    );
}


function flipMemoryCard(index) {

    if (memoryFlipped.length >= 2) return;

    const card =
        document.getElementById(
            `memory-${index}`
        );

    if (!card) return;

    if (
        card.dataset.matched === "true" ||
        memoryFlipped.includes(index)
    ) {
        return;
    }

    card.textContent =
        memoryCards[index];

    memoryFlipped.push(index);

    if (memoryFlipped.length === 2) {

        const [first, second] =
            memoryFlipped;

        if (
            memoryCards[first] ===
            memoryCards[second]
        ) {

            document.getElementById(
                `memory-${first}`
            ).dataset.matched = "true";

            document.getElementById(
                `memory-${second}`
            ).dataset.matched = "true";

            memoryMatched++;

            addScore(10);
            addStars(1);

            memoryFlipped = [];

            if (memoryMatched === 6) {

                setTimeout(() => {

                    showSuccessMessage(
                        "🏆 Memory Master!",
                        "You found every pair!"
                    );

                }, 300);
            }

        } else {

            setTimeout(() => {

                const firstCard =
                    document.getElementById(
                        `memory-${first}`
                    );

                const secondCard =
                    document.getElementById(
                        `memory-${second}`
                    );

                if (firstCard) {
                    firstCard.textContent = "❓";
                }

                if (secondCard) {
                    secondCard.textContent = "❓";
                }

                memoryFlipped = [];

            }, 700);
        }
    }
}


/* =========================================================
   ⚡ MATH CHALLENGE
   ========================================================= */

function startMathChallenge() {

    let timeLeft = 30;
    let challengeScore = 0;

    function nextQuestion() {

        const a =
            Math.floor(Math.random() * 10) + 1;

        const b =
            Math.floor(Math.random() * 10) + 1;

        const answer =
            a + b;

        window.challengeAnswer =
            answer;

        setupLearning(
            "⚡",
            "Math Challenge",
            `Time: ${timeLeft}s | Score: ${challengeScore}`,
            `

            <div class="quiz-box">

                <div class="quiz-question">
                    ${a} + ${b} = ?
                </div>

                <div class="quiz-options">

                    ${shuffleArray([
                        answer,
                        answer + 1,
                        answer + 2,
                        Math.max(0, answer - 1)
                    ]).map(option => `

                        <button
                            onclick="challengeAnswer(${option})"
                        >
                            ${option}
                        </button>

                    `).join("")}

                </div>

            </div>

            `
        );
    }

    window.challengeAnswer = function (answer) {

        if (timeLeft <= 0) return;

        if (
            answer ===
            window.challengeAnswerValue
        ) {
            challengeScore += 10;
        }
    };

    window.challengeAnswerValue = 0;

    nextQuestion();

    const timer =
        setInterval(() => {

            timeLeft--;

            if (timeLeft <= 0) {

                clearInterval(timer);

                setupLearning(
                    "🏆",
                    "Challenge Complete",
                    "Time is up!",
                    `

                    <div class="learning-card">

                        <div class="learning-emoji">
                            🏆
                        </div>

                        <h2>
                            Great Work!
                        </h2>

                        <p>
                            Challenge Score:
                            ${challengeScore}
                        </p>

                    </div>

                    `
                );

            }

        }, 1000);
}


/* =========================================================
   ⭐ SCORE SYSTEM
   ========================================================= */

function addScore(points) {

    playerScore += points;

    saveProgress();
}


function addStars(stars) {

    playerStars += stars;

    saveProgress();

    celebrateStars();
}


function celebrateStars() {

    if (!document.body) return;

    const star =
        document.createElement("div");

    star.textContent = "⭐";

    star.style.position = "fixed";
    star.style.left = "50%";
    star.style.top = "45%";
    star.style.zIndex = "9999";
    star.style.fontSize = "50px";
    star.style.pointerEvents = "none";
    star.style.transition =
        "transform 0.8s ease, opacity 0.8s ease";

    document.body.appendChild(star);

    requestAnimationFrame(() => {

        star.style.transform =
            "translateY(-100px) scale(1.4)";

        star.style.opacity = "0";

    });

    setTimeout(() => {

        star.remove();

    }, 900);
}


/* =========================================================
   💾 SAVE PROGRESS
   ========================================================= */

function saveProgress() {

    try {

        localStorage.setItem(
            "kidsLearningScore",
            String(playerScore)
        );

        localStorage.setItem(
            "kidsLearningStars",
            String(playerStars)
        );

        localStorage.setItem(
            "kidsLearningCorrect",
            String(playerCorrect)
        );

        localStorage.setItem(
            "kidsLearningAnswered",
            String(playerAnswered)
        );

    } catch (error) {

        console.warn(
            "Progress could not be saved.",
            error
        );
    }
}


function loadProgress() {

    try {

        playerScore =
            Number(
                localStorage.getItem(
                    "kidsLearningScore"
                )
            ) || 0;

        playerStars =
            Number(
                localStorage.getItem(
                    "kidsLearningStars"
                )
            ) || 0;

        playerCorrect =
            Number(
                localStorage.getItem(
                    "kidsLearningCorrect"
                )
            ) || 0;

        playerAnswered =
            Number(
                localStorage.getItem(
                    "kidsLearningAnswered"
                )
            ) || 0;

    } catch (error) {

        console.warn(
            "Progress could not be loaded.",
            error
        );
    }
}


function resetProgress() {

    playerScore = 0;
    playerStars = 0;
    playerCorrect = 0;
    playerAnswered = 0;

    saveProgress();

    showSuccessMessage(
        "🔄 Progress Reset",
        "Your learning progress has been reset."
    );
}


/* =========================================================
   📊 PROGRESS
   ========================================================= */

function showProgress() {

    const accuracy =
        playerAnswered > 0
            ? Math.round(
                (playerCorrect /
                    playerAnswered) * 100
            )
            : 0;

    setupLearning(
        "⭐",
        "My Progress",
        "Keep learning and collecting stars!",
        `

        <div class="cards-grid">

            <div class="learning-card">

                <div class="learning-emoji">
                    🏆
                </div>

                <div class="word">
                    ${playerScore}
                </div>

                <div class="mini-text">
                    Total Score
                </div>

            </div>


            <div class="learning-card">

                <div class="learning-emoji">
                    ⭐
                </div>

                <div class="word">
                    ${playerStars}
                </div>

                <div class="mini-text">
                    Stars
                </div>

            </div>


            <div class="learning-card">

                <div class="learning-emoji">
                    ✅
                </div>

                <div class="word">
                    ${playerCorrect}
                </div>

                <div class="mini-text">
                    Correct Answers
                </div>

            </div>


            <div class="learning-card">

                <div class="learning-emoji">
                    🎯
                </div>

                <div class="word">
                    ${accuracy}%
                </div>

                <div class="mini-text">
                    Accuracy
                </div>

            </div>

        </div>


        <div style="text-align:center;margin-top:25px;">

            <button
                type="button"
                onclick="resetProgress()"
            >
                🔄 Reset Progress
            </button>

        </div>

        `
    );
}


/* =========================================================
   🎨 CREATIVITY WORLD
   ========================================================= */

function showCreativityMenu() {

    return `

        <div class="learning-heading">

            <h2>🎨 Creative World</h2>

            <p>
                Draw, colour and create!
            </p>

        </div>


        <div class="learning-menu-grid">

            ${createWorldCard(
                "🖌️",
                "Drawing Pad",
                "Draw anything you want",
                "openDrawingPad()"
            )}

            ${createWorldCard(
                "🌈",
                "Colouring",
                "Colour your ideas",
                "openColouring()"
            )}
${createWorldCard(
    "🔷",
    "Shapes",
    "Explore 2D and 3D shapes",
    "openShapes()"
)}
            ${createWorldCard(
                "🎨",
                "Colour Picker",
                "Choose your favourite colour",
                "openColourPicker()"
            )}

            ${createWorldCard(
                "🖌️",
                "Simple Paint Tool",
                "Paint on the screen",
                "openDrawingPad()"
            )}

            ${createWorldCard(
                "🔢",
                "Connect the Dots",
                "Join the dots",
                "openConnectDots()"
            )}

        </div>

    `;
}


/* =========================================================
   🖌️ DRAWING PAD
   ========================================================= */

function openDrawingPad() {

    setupLearning(
        "🖌️",
        "Drawing Pad",
        "Draw anything you like!",
        `

        <div class="drawing-area">

            <div
                style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                    justify-content:center;
                    margin-bottom:15px;
                "
            >

                <label>
                    Colour:
                    <input
                        type="color"
                        value="#333333"
                        onchange="setDrawingColor(this.value)"
                    >
                </label>


                <label>
                    Size:
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value="6"
                        oninput="setDrawingSize(this.value)"
                    >
                </label>


                <button
                    type="button"
                    onclick="clearDrawingCanvas()"
                >
                    🗑️ Clear
                </button>

            </div>


            <canvas
                id="drawingCanvas"
                width="900"
                height="500"
                style="
                    max-width:100%;
                    border:3px solid #ddd;
                    border-radius:20px;
                    background:white;
                    touch-action:none;
                "
            ></canvas>

        </div>

        `
    );

    setTimeout(
        initializeDrawingCanvas,
        100
    );
}


function initializeDrawingCanvas() {

    drawingCanvas =
        document.getElementById(
            "drawingCanvas"
        );

    if (!drawingCanvas) return;

    drawingContext =
        drawingCanvas.getContext("2d");

    drawingContext.lineCap = "round";
    drawingContext.lineJoin = "round";

    drawingCanvas.addEventListener(
        "pointerdown",
        startDrawing
    );

    drawingCanvas.addEventListener(
        "pointermove",
        draw
    );

    drawingCanvas.addEventListener(
        "pointerup",
        stopDrawing
    );

    drawingCanvas.addEventListener(
        "pointerleave",
        stopDrawing
    );
}


function getCanvasPosition(event) {

    const rect =
        drawingCanvas.getBoundingClientRect();

    const scaleX =
        drawingCanvas.width / rect.width;

    const scaleY =
        drawingCanvas.height / rect.height;

    return {
        x:
            (event.clientX - rect.left) *
            scaleX,

        y:
            (event.clientY - rect.top) *
            scaleY
    };
}


function startDrawing(event) {

    if (!drawingContext) return;

    drawingActive = true;

    const pos =
        getCanvasPosition(event);

    drawingContext.beginPath();

    drawingContext.moveTo(
        pos.x,
        pos.y
    );
}


function draw(event) {

    if (!drawingActive) return;

    const pos =
        getCanvasPosition(event);

    drawingContext.strokeStyle =
        drawingColor;

    drawingContext.lineWidth =
        drawingSize;

    drawingContext.lineTo(
        pos.x,
        pos.y
    );

    drawingContext.stroke();
}


function stopDrawing() {

    drawingActive = false;

    if (drawingContext) {
        drawingContext.closePath();
    }
}


function setDrawingColor(color) {

    drawingColor = color;
}


function setDrawingSize(size) {

    drawingSize =
        Number(size) || 6;
}


function clearDrawingCanvas() {

    if (!drawingCanvas || !drawingContext) {
        return;
    }

    drawingContext.clearRect(
        0,
        0,
        drawingCanvas.width,
        drawingCanvas.height
    );
}

let colouringSelectedColor = "#ff0000";
let colouringEraser = false;
let currentColouringType = "";


/* =========================================================
   🎨 COLOUR PALETTE
   ========================================================= */

const colouringPalette = [

    "#ff0000",   // Red
    "#ff6600",   // Orange
    "#ffd000",   // Yellow
    "#00b83f",   // Green
    "#00c853",   // Bright Green
    "#00bfff",   // Sky Blue
    "#0066ff",   // Blue
    "#6a00ff",   // Purple
    "#b000ff",   // Violet
    "#ff00a8",   // Pink
    "#ff69b4",   // Light Pink
    "#8b4513",   // Brown
    "#000000",   // Black
    "#ffffff",   // White
    "#777777",   // Grey
    "#00ffff",   // Cyan
    "#7fff00",   // Lime
    "#ffd700",   // Gold
    "#ff4500",   // Red Orange
    "#8b0000"    // Dark Red

];


/* =========================================================
   💾 STORAGE
   ========================================================= */

const COLOURING_STORAGE_PREFIX =
    "kidsLearningWorld_colouring_";


function getColouringStorageKey(type) {

    return (
        COLOURING_STORAGE_PREFIX +
        type
    );

}


/* =========================================================
   🌈 MAIN COLOURING MENU
   ========================================================= */

function openColouring() {

    currentColouringType = "";

    setupLearning(

        "🌈",

        "Colouring World",

        "Choose a picture and start colouring!",

        `

        <div class="colouring-world">


            <div class="colouring-intro">

                <h2>
                    🎨 Choose Your Picture
                </h2>

                <p>
                    Click a picture and colour it!
                </p>

            </div>


            <div class="colouring-picture-grid">


                <!-- 1 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('luxuryhome')"
                >

                    <div class="colouring-preview">
                        🏡
                    </div>

                    <h3>
                        Luxury Home
                    </h3>

                    <p>
                        Big beautiful house
                    </p>

                </div>


                <!-- 2 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('mountainriver')"
                >

                    <div class="colouring-preview">
                        🏔️
                    </div>

                    <h3>
                        Mountain River
                    </h3>

                    <p>
                        Home • River • Trees
                    </p>

                </div>


                <!-- 3 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('bigtree')"
                >

                    <div class="colouring-preview">
                        🌳
                    </div>

                    <h3>
                        Big Tree
                    </h3>

                    <p>
                        Large beautiful tree
                    </p>

                </div>


                <!-- 4 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('realfish')"
                >

                    <div class="colouring-preview">
                        🐟
                    </div>

                    <h3>
                        Big Fish
                    </h3>

                    <p>
                        Detailed fish
                    </p>

                </div>


                <!-- 5 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('waterbottles')"
                >

                    <div class="colouring-preview">
                        🧴
                    </div>

                    <h3>
                        10 Water Bottles
                    </h3>

                    <p>
                        Colour every bottle
                    </p>

                </div>


                <!-- 6 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('balloonsflowers')"
                >

                    <div class="colouring-preview">
                        🎈🌸
                    </div>

                    <h3>
                        Balloons & Flowers
                    </h3>

                    <p>
                        10 balloons + 5 flowers
                    </p>

                </div>


                <!-- 7 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('luxurycar')"
                >

                    <div class="colouring-preview">
                        🚗
                    </div>

                    <h3>
                        Luxury Sports Car
                    </h3>

                    <p>
                        Premium car
                    </p>

                </div>


                <!-- 8 -->
                <div
                    class="colouring-picture-card"
                    onclick="openColouringPicture('fivestars')"
                >

                    <div class="colouring-preview stars-preview">

                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>

                    </div>

                    <h3>
                        5 Stars
                    </h3>

                    <p>
                        Colour every star
                    </p>

                </div>


            </div>

        </div>

        `
    );
}


/* =========================================================
   🎨 CREATE PALETTE
   ========================================================= */

function createColouringPalette() {

    return colouringPalette.map(function(color) {

        return `

            <button
                type="button"
                class="colouring-colour-button"
                style="background:${color};"
                onclick="selectColouringColor('${color}', this)"
                aria-label="Choose colour"
            ></button>

        `;

    }).join("");

}


/* =========================================================
   🎨 SELECT COLOUR
   ========================================================= */

function selectColouringColor(color, button) {

    colouringSelectedColor = color;

    colouringEraser = false;


    document
        .querySelectorAll(
            ".colouring-colour-button"
        )
        .forEach(function(item) {

            item.classList.remove(
                "selected-colouring-color"
            );

        });


    if (button) {

        button.classList.add(
            "selected-colouring-color"
        );

    }


    const eraser =
        document.getElementById(
            "colouringEraserButton"
        );


    if (eraser) {

        eraser.classList.remove(
            "active-colouring-tool"
        );

    }


    const indicator =
        document.getElementById(
            "colouringCurrentColor"
        );


    if (indicator) {

        indicator.style.background =
            color;

    }

}


/* =========================================================
   🧽 ERASER
   ========================================================= */

function activateColouringEraser() {

    colouringEraser = true;


    document
        .querySelectorAll(
            ".colouring-colour-button"
        )
        .forEach(function(item) {

            item.classList.remove(
                "selected-colouring-color"
            );

        });


    const eraser =
        document.getElementById(
            "colouringEraserButton"
        );


    if (eraser) {

        eraser.classList.add(
            "active-colouring-tool"
        );

    }

}


/* =========================================================
   🖌️ COLOUR PART + AUTO SAVE
   ========================================================= */

function colourDrawingPart(part) {

    if (!part) {
        return;
    }


    if (colouringEraser) {

        part.setAttribute(
            "fill",
            part.getAttribute(
                "data-original"
            ) || "#ffffff"
        );

    }

    else {

        part.setAttribute(
            "fill",
            colouringSelectedColor
        );

    }


    /*
       Automatically save after every colour.
    */

    saveColouringDrawing(
        currentColouringType,
        false
    );

}


/* =========================================================
   💾 SAVE DRAWING
   ========================================================= */

function saveColouringDrawing(
    type,
    showMessage
) {

    if (!type) {
        return;
    }


    const parts =
        document.querySelectorAll(
            ".colour-part"
        );


    if (!parts.length) {
        return;
    }


    const colours = [];


    parts.forEach(function(part) {

        colours.push(

            part.getAttribute("fill") ||

            part.getAttribute(
                "data-original"
            ) ||

            "#ffffff"

        );

    });


    try {

        localStorage.setItem(

            getColouringStorageKey(type),

            JSON.stringify(colours)

        );


        if (showMessage) {

            showColouringMessage(
                "💾 Colouring Saved!"
            );

        }

    }

    catch (error) {

        console.warn(
            "Colouring could not be saved.",
            error
        );

    }

}


/* =========================================================
   📂 LOAD DRAWING
   ========================================================= */

function loadColouringDrawing(type) {

    if (!type) {
        return;
    }


    try {

        const saved =
            localStorage.getItem(
                getColouringStorageKey(type)
            );


        if (!saved) {
            return;
        }


        const colours =
            JSON.parse(saved);


        const parts =
            document.querySelectorAll(
                ".colour-part"
            );


        parts.forEach(function(part, index) {

            if (
                colours[index] &&
                typeof colours[index] === "string"
            ) {

                part.setAttribute(
                    "fill",
                    colours[index]
                );

            }

        });


        showColouringMessage(
            "✨ Your saved colouring is back!"
        );

    }

    catch (error) {

        console.warn(
            "Saved colouring could not be loaded.",
            error
        );

    }

}


/* =========================================================
   🔄 RESET DRAWING
   ========================================================= */

function resetColouringDrawing() {

    const type =
        currentColouringType;


    document
        .querySelectorAll(
            ".colour-part"
        )
        .forEach(function(part) {

            const original =
                part.getAttribute(
                    "data-original"
                ) || "#ffffff";


            part.setAttribute(
                "fill",
                original
            );

        });


    /*
       Delete saved version.
    */

    if (type) {

        try {

            localStorage.removeItem(
                getColouringStorageKey(type)
            );

        }

        catch (error) {

            console.warn(
                "Saved colouring could not be removed.",
                error
            );

        }

    }


    colouringSelectedColor =
        "#ff0000";

    colouringEraser =
        false;


    const indicator =
        document.getElementById(
            "colouringCurrentColor"
        );


    if (indicator) {

        indicator.style.background =
            "#ff0000";

    }


    document
        .querySelectorAll(
            ".colouring-colour-button"
        )
        .forEach(function(button) {

            button.classList.remove(
                "selected-colouring-color"
            );

        });


    const firstButton =
        document.querySelector(
            ".colouring-colour-button"
        );


    if (firstButton) {

        firstButton.classList.add(
            "selected-colouring-color"
        );

    }


    const eraser =
        document.getElementById(
            "colouringEraserButton"
        );


    if (eraser) {

        eraser.classList.remove(
            "active-colouring-tool"
        );

    }


    showColouringMessage(
        "🔄 Reset! Colour again."
    );

}


/* =========================================================
   💬 MESSAGE
   ========================================================= */

function showColouringMessage(message) {

    const box =
        document.getElementById(
            "colouringSaveMessage"
        );


    if (!box) {
        return;
    }


    box.textContent = message;


    box.classList.add(
        "show-colouring-message"
    );


    clearTimeout(
        window.colouringMessageTimer
    );


    window.colouringMessageTimer =
        setTimeout(function() {

            box.classList.remove(
                "show-colouring-message"
            );

        }, 1800);

}


/* =========================================================
   🖼️ OPEN DRAWING
   ========================================================= */

function openColouringPicture(type) {

    currentColouringType = type;


    let title =
        "Colouring";


    if (type === "luxuryhome") {

        title =
            "🏡 Luxury Home";

    }


    if (type === "mountainriver") {

        title =
            "🏔️ Mountain River";

    }


    if (type === "bigtree") {

        title =
            "🌳 Big Tree";

    }


    if (type === "realfish") {

        title =
            "🐟 Big Fish";

    }


    if (type === "waterbottles") {

        title =
            "🧴 10 Water Bottles";

    }


    if (type === "balloonsflowers") {

        title =
            "🎈 Balloons & 🌸 Flowers";

    }


    if (type === "luxurycar") {

        title =
            "🚗 Luxury Sports Car";

    }


    if (type === "fivestars") {

        title =
            "⭐ 5 Stars";

    }


    setupLearning(

        "🎨",

        title,

        "Choose a colour and click any part of the drawing!",

        `

        <div class="proper-colouring-page">


            <!-- TOOLBAR -->

            <div class="colouring-toolbar">


                <button
                    type="button"
                    class="colouring-tool-button"
                    onclick="openColouring()"
                >
                    ⬅️ Pictures
                </button>


                <button
                    type="button"
                    class="colouring-tool-button"
                    id="colouringEraserButton"
                    onclick="activateColouringEraser()"
                >
                    🧽 Eraser
                </button>


                <button
                    type="button"
                    class="colouring-tool-button save-colouring-button"
                    onclick="saveColouringDrawing(currentColouringType, true)"
                >
                    💾 Save
                </button>


                <button
                    type="button"
                    class="colouring-tool-button"
                    onclick="resetColouringDrawing()"
                >
                    🔄 Reset
                </button>


            </div>


            <!-- SAVE MESSAGE -->

            <div
                id="colouringSaveMessage"
                class="colouring-save-message"
            >
                💾 Automatically saved
            </div>


            <!-- COLOUR AREA -->

            <div class="colouring-colour-area">


                <div class="current-colour-box">

                    <span>
                        Current Colour:
                    </span>


                    <span
                        id="colouringCurrentColor"
                        class="current-colour"
                    ></span>

                </div>


                <div class="colouring-palette">

                    ${createColouringPalette()}

                </div>


            </div>


            <!-- DRAWING -->

            <div class="colouring-drawing-board">

                ${getColouringSVG(type)}

            </div>


            <div class="colouring-help">

                🎨 Pick a colour and tap different parts
                of the picture!

                <br>

                💾 Your colouring is saved automatically
                on this device.

            </div>


        </div>

        `
    );


    colouringSelectedColor =
        "#ff0000";

    colouringEraser =
        false;


    /*
       Wait until SVG is inside DOM,
       then load previous colouring.
    */

    setTimeout(function() {


        const indicator =
            document.getElementById(
                "colouringCurrentColor"
            );


        if (indicator) {

            indicator.style.background =
                "#ff0000";

        }


        const firstButton =
            document.querySelector(
                ".colouring-colour-button"
            );


        if (firstButton) {

            firstButton.classList.add(
                "selected-colouring-color"
            );

        }


        loadColouringDrawing(type);


    }, 80);

}


/* =========================================================
   🖼️ SVG DRAWINGS
   ========================================================= */

function getColouringSVG(type) {


    const start = `

        <svg
            class="colouring-svg"
            viewBox="0 0 700 600"
            xmlns="http://www.w3.org/2000/svg"
        >

    `;


    const end = `

        </svg>

    `;


    /* =====================================================
       🏡 1. LUXURY HOME
       ===================================================== */

    if (type === "luxuryhome") {

        return start + `


            <!-- HOUSE BODY -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="120"
                y="260"
                width="460"
                height="250"
                rx="10"
                onclick="colourDrawingPart(this)"
            />


            <!-- ROOF -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M80 270
                    L350 70
                    L620 270
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- LEFT BALCONY -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="150"
                y="205"
                width="130"
                height="90"
                onclick="colourDrawingPart(this)"
            />


            <!-- RIGHT BALCONY -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="420"
                y="205"
                width="130"
                height="90"
                onclick="colourDrawingPart(this)"
            />


            <!-- DOOR -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="300"
                y="365"
                width="100"
                height="145"
                onclick="colourDrawingPart(this)"
            />


            <!-- LEFT WINDOW -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="160"
                y="330"
                width="95"
                height="85"
                onclick="colourDrawingPart(this)"
            />


            <!-- RIGHT WINDOW -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="445"
                y="330"
                width="95"
                height="85"
                onclick="colourDrawingPart(this)"
            />


            <!-- CHIMNEY -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="470"
                y="110"
                width="60"
                height="100"
                onclick="colourDrawingPart(this)"
            />


            <!-- GARAGE -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="90"
                y="395"
                width="110"
                height="115"
                onclick="colourDrawingPart(this)"
            />


            <!-- PATH -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                d="
                    M300 510
                    L400 510
                    L470 590
                    L230 590
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


        ` + end;

    }


    /* =====================================================
       🏔️ 2. MOUNTAIN + RIVER + HOME + TREES
       ===================================================== */

    if (type === "mountainriver") {

        return start + `


            <!-- BACKGROUND -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="5"
                x="10"
                y="10"
                width="680"
                height="580"
                rx="20"
                onclick="colourDrawingPart(this)"
            />


            <!-- MOUNTAIN -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M20 350
                    L210 100
                    L300 210
                    L400 80
                    L680 350
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- SNOW -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                d="
                    M210 100
                    L155 175
                    L205 160
                    L230 185
                    L260 145
                    L300 210
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- RIVER -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M320 300
                    C250 350 270 390 330 430
                    C390 470 370 520 300 590
                    L560 590
                    C610 520 600 470 530 420
                    C460 370 470 330 510 300
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- HOME -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="90"
                y="300"
                width="180"
                height="150"
                onclick="colourDrawingPart(this)"
            />


            <!-- HOME ROOF -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                d="
                    M65 305
                    L180 215
                    L295 305
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- HOME DOOR -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                x="155"
                y="365"
                width="55"
                height="85"
                onclick="colourDrawingPart(this)"
            />


            <!-- TREE TRUNK 1 -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                x="40"
                y="350"
                width="30"
                height="120"
                onclick="colourDrawingPart(this)"
            />


            <!-- TREE 1 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="55"
                cy="325"
                r="65"
                onclick="colourDrawingPart(this)"
            />


            <!-- TREE TRUNK 2 -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                x="600"
                y="340"
                width="30"
                height="130"
                onclick="colourDrawingPart(this)"
            />


            <!-- TREE 2 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="615"
                cy="315"
                r="70"
                onclick="colourDrawingPart(this)"
            />


        ` + end;

    }


    /* =====================================================
       🌳 3. BIG TREE
       ===================================================== */

    if (type === "bigtree") {

        return start + `


            <!-- MAIN TRUNK -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                d="
                    M270 280
                    L430 280
                    L455 570
                    L245 570
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- MAIN CANOPY -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                cx="350"
                cy="200"
                r="155"
                onclick="colourDrawingPart(this)"
            />


            <!-- LEFT CANOPY -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                cx="190"
                cy="250"
                r="115"
                onclick="colourDrawingPart(this)"
            />


            <!-- RIGHT CANOPY -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                cx="510"
                cy="250"
                r="115"
                onclick="colourDrawingPart(this)"
            />


            <!-- BRANCH -->

            <path
                d="
                    M350 340
                    L230 250
                    M350 350
                    L480 245
                "
                fill="none"
                stroke="#222"
                stroke-width="20"
            />


            <!-- FRUIT -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="150"
                cy="220"
                r="18"
                onclick="colourDrawingPart(this)"
            />


            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="530"
                cy="190"
                r="18"
                onclick="colourDrawingPart(this)"
            />


            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="350"
                cy="110"
                r="18"
                onclick="colourDrawingPart(this)"
            />


        ` + end;

    }


    /* =====================================================
       🐟 4. BIG FISH
       ===================================================== */

    if (type === "realfish") {

        return start + `


            <!-- BODY -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                d="
                    M80 300
                    C130 170 310 145 470 245
                    C515 270 555 300 600 300
                    C555 300 515 330 470 355
                    C310 455 130 430 80 300
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- TAIL -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                d="
                    M470 245
                    L640 150
                    L610 300
                    L640 450
                    L470 355
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- TOP FIN -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M280 175
                    L330 70
                    L390 190
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- BOTTOM FIN -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M290 405
                    L350 500
                    L400 385
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- SIDE FIN -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M300 280
                    L210 390
                    L360 335
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- EYE -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="170"
                cy="260"
                r="35"
                onclick="colourDrawingPart(this)"
            />


            <!-- PUPIL -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="175"
                cy="260"
                r="14"
                onclick="colourDrawingPart(this)"
            />


            <!-- SCALE -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="5"
                cx="270"
                cy="240"
                r="28"
                onclick="colourDrawingPart(this)"
            />


            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="5"
                cx="330"
                cy="230"
                r="28"
                onclick="colourDrawingPart(this)"
            />


            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="5"
                cx="390"
                cy="250"
                r="28"
                onclick="colourDrawingPart(this)"
            />


        ` + end;

    }


    /* =====================================================
       🧴 5. TEN WATER BOTTLES
       ===================================================== */

    if (type === "waterbottles") {

        let bottles = "";


        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const x =
                45 +
                (i % 5) * 130;


            const y =
                i < 5
                    ? 70
                    : 320;


            bottles += `


                <!-- BODY -->

                <rect
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="6"
                    x="${x}"
                    y="${y + 50}"
                    width="80"
                    height="145"
                    rx="20"
                    onclick="colourDrawingPart(this)"
                />


                <!-- NECK -->

                <rect
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="6"
                    x="${x + 20}"
                    y="${y + 15}"
                    width="40"
                    height="45"
                    rx="8"
                    onclick="colourDrawingPart(this)"
                />


                <!-- CAP -->

                <rect
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    x="${x + 18}"
                    y="${y}"
                    width="44"
                    height="22"
                    rx="6"
                    onclick="colourDrawingPart(this)"
                />


                <!-- LABEL -->

                <rect
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    x="${x + 8}"
                    y="${y + 105}"
                    width="64"
                    height="45"
                    rx="6"
                    onclick="colourDrawingPart(this)"
                />


            `;

        }


        return start + bottles + end;

    }


    /* =====================================================
       🎈 6. 10 BALLOONS + 5 FLOWERS
       ===================================================== */

    if (type === "balloonsflowers") {

        let items = "";


        /* 10 BALLOONS */

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            const x =
                75 +
                (i % 5) * 135;


            const y =
                i < 5
                    ? 100
                    : 275;


            items += `


                <ellipse
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="6"
                    cx="${x}"
                    cy="${y}"
                    rx="45"
                    ry="60"
                    onclick="colourDrawingPart(this)"
                />


                <path
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    d="
                        M${x - 8} ${y + 58}
                        L${x} ${y + 75}
                        L${x + 8} ${y + 58}
                        Z
                    "
                    onclick="colourDrawingPart(this)"
                />


                <path
                    d="
                        M${x} ${y + 75}
                        C${x - 10} ${y + 130}
                        ${x + 10} ${y + 160}
                        ${x} ${y + 190}
                    "
                    fill="none"
                    stroke="#222"
                    stroke-width="4"
                />


            `;

        }


        /* 5 FLOWERS */

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const x =
                100 +
                i * 125;


            const y =
                535;


            items += `


                <circle
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    cx="${x}"
                    cy="${y - 28}"
                    r="24"
                    onclick="colourDrawingPart(this)"
                />


                <circle
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    cx="${x - 27}"
                    cy="${y}"
                    r="24"
                    onclick="colourDrawingPart(this)"
                />


                <circle
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    cx="${x + 27}"
                    cy="${y}"
                    r="24"
                    onclick="colourDrawingPart(this)"
                />


                <circle
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    cx="${x}"
                    cy="${y}"
                    r="20"
                    onclick="colourDrawingPart(this)"
                />


                <rect
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="5"
                    x="${x - 5}"
                    y="${y + 18}"
                    width="10"
                    height="55"
                    onclick="colourDrawingPart(this)"
                />


            `;

        }


        return start + items + end;

    }


    /* =====================================================
       🚗 7. LUXURY SPORTS CAR
       ===================================================== */

    if (type === "luxurycar") {

        return start + `


            <!-- MAIN BODY -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="9"
                d="
                    M70 350
                    L110 270
                    C135 220 190 190 250 180
                    L410 180
                    C470 190 520 230 555 280
                    L625 330
                    L625 390
                    L70 390
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- CABIN -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M175 260
                    L225 190
                    L405 190
                    L495 270
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- LEFT WINDOW -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                d="
                    M220 250
                    L250 205
                    L315 205
                    L315 250
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- RIGHT WINDOW -->

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                d="
                    M330 205
                    L400 205
                    L460 250
                    L330 250
                    Z
                "
                onclick="colourDrawingPart(this)"
            />


            <!-- FRONT LIGHT -->

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="565"
                cy="325"
                rx="35"
                ry="18"
                onclick="colourDrawingPart(this)"
            />


            <!-- GRILLE -->

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                x="510"
                y="350"
                width="70"
                height="30"
                rx="8"
                onclick="colourDrawingPart(this)"
            />


            <!-- WHEEL 1 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="10"
                cx="180"
                cy="395"
                r="55"
                onclick="colourDrawingPart(this)"
            />


            <!-- WHEEL 2 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="10"
                cx="510"
                cy="395"
                r="55"
                onclick="colourDrawingPart(this)"
            />


            <!-- WHEEL CENTER 1 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="180"
                cy="395"
                r="22"
                onclick="colourDrawingPart(this)"
            />


            <!-- WHEEL CENTER 2 -->

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="6"
                cx="510"
                cy="395"
                r="22"
                onclick="colourDrawingPart(this)"
            />


        ` + end;

    }


    /* =====================================================
       ⭐ 8. FIVE STARS
       ===================================================== */

    if (type === "fivestars") {

        const stars = [

            {
                x: 150,
                y: 170,
                size: 90
            },

            {
                x: 350,
                y: 140,
                size: 100
            },

            {
                x: 550,
                y: 170,
                size: 90
            },

            {
                x: 250,
                y: 390,
                size: 105
            },

            {
                x: 470,
                y: 400,
                size: 105
            }

        ];


        let output = "";


        stars.forEach(function(star) {

            const points = [];


            for (
                let i = 0;
                i < 10;
                i++
            ) {

                const angle =
                    -Math.PI / 2 +
                    i * Math.PI / 5;


                const radius =
                    i % 2 === 0
                        ? star.size
                        : star.size * 0.42;


                points.push(

                    (
                        star.x +
                        Math.cos(angle) *
                        radius
                    ) +
                    "," +
                    (
                        star.y +
                        Math.sin(angle) *
                        radius
                    )

                );

            }


            output += `

                <polygon
                    class="colour-part"
                    data-original="#ffffff"
                    fill="#ffffff"
                    stroke="#222"
                    stroke-width="8"
                    points="${points.join(" ")}"
                    onclick="colourDrawingPart(this)"
                />

            `;

        });


        return start + output + end;

    }


    /* =====================================================
       FALLBACK
       ===================================================== */

    return start + `

        <circle
            class="colour-part"
            data-original="#ffffff"
            fill="#ffffff"
            stroke="#222"
            stroke-width="8"
            cx="350"
            cy="300"
            r="150"
            onclick="colourDrawingPart(this)"
        />

    ` + end;

}


/* =========================================================
   🎉 SUCCESS MESSAGE
   ========================================================= */

function showSuccessMessage(title, message) {

    const old =
        document.getElementById(
            "learningSuccessMessage"
        );

    if (old) {
        old.remove();
    }

    const box =
        document.createElement("div");

    box.id =
        "learningSuccessMessage";

    box.innerHTML = `
        <div>
            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>
        </div>
    `;

    box.style.position = "fixed";
    box.style.left = "50%";
    box.style.top = "20px";
    box.style.transform = "translateX(-50%)";
    box.style.zIndex = "10000";
    box.style.padding = "18px 25px";
    box.style.borderRadius = "20px";
    box.style.background = "white";
    box.style.boxShadow =
        "0 15px 40px rgba(0,0,0,.18)";
    box.style.textAlign = "center";

    document.body.appendChild(box);

    setTimeout(() => {

        box.remove();

    }, 1300);
}


/* =========================================================
   🎊 SIMPLE CONFETTI
   ========================================================= */

function createConfetti() {

    const emojis = [
        "🎉",
        "⭐",
        "✨",
        "🎈",
        "🌟"
    ];

    for (let i = 0; i < 15; i++) {

        const piece =
            document.createElement("div");

        piece.textContent =
            randomItem(emojis);

        piece.style.position =
            "fixed";

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.top =
            "-30px";

        piece.style.fontSize =
            `${18 + Math.random() * 20}px`;

        piece.style.zIndex =
            "10001";

        piece.style.pointerEvents =
            "none";

        document.body.appendChild(piece);

        const duration =
            900 + Math.random() * 1000;

        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                    opacity: 0
                }
            ],
            {
                duration,
                easing: "ease-out"
            }
        );

        setTimeout(() => {

            piece.remove();

        }, duration);
    }
}


/* =========================================================
   🔄 ENHANCED SUCCESS
   ========================================================= */

const originalShowSuccessMessage =
    showSuccessMessage;

showSuccessMessage = function (
    title,
    message
) {

    originalShowSuccessMessage(
        title,
        message
    );

    if (
        title.includes("Correct") ||
        title.includes("Great") ||
        title.includes("Amazing") ||
        title.includes("Master") ||
        title.includes("🎉")
    ) {

        createConfetti();
    }
};


/* =========================================================
   🧮 TABLES
   ========================================================= */

function renderTableChoice() {

    return `

        <div class="table-choice">

            <div class="table-choice-title">
                Choose a table
            </div>

            <div class="table-buttons">

                ${Array.from(
                    { length: 20 },
                    (_, index) => {

                        const number =
                            index + 1;

                        return `
                            <button
                                class="table-number"
                                onclick="showTable(${number})"
                            >
                                ${number}
                            </button>
                        `;
                    }
                ).join("")}

            </div>

        </div>

        <div id="tableResult"></div>

    `;
}


function showTable(number) {

    const result =
        document.getElementById(
            "tableResult"
        );

    if (!result) return;

    result.innerHTML = `

        <div class="table-result-box">

            <div class="table-big-number">
                ${number}
            </div>

            <h2>
                Table of ${number}
            </h2>

            <div class="multiplication-list">

                ${Array.from(
                    { length: 10 },
                    (_, index) => {

                        const multiplier =
                            index + 1;

                        return `
                            <div
                                class="multiplication-row"
                            >

                                <span>
                                    ${number}
                                </span>

                                ×

                                <span>
                                    ${multiplier}
                                </span>

                                =

                                <strong>
                                    ${number * multiplier}
                                </strong>

                            </div>
                        `;
                    }
                ).join("")}

            </div>

            <button
                onclick="speakTable(${number})"
            >
                🔊 Hear Table
            </button>

        </div>

    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


function speakTable(number) {

    const lines = [];

    for (let i = 1; i <= 10; i++) {

        lines.push(
            `${number} times ${i} is ${number * i}`
        );
    }

    speak(
        lines.join(". "),
        {
            lang: "en-US",
            rate: 0.65
        }
    );
}


/* =========================================================
   🖱️ GLOBAL BUTTON SAFETY
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest("button");

        if (!button) return;

        button.classList.add(
            "js-button-clicked"
        );

        setTimeout(() => {

            button.classList.remove(
                "js-button-clicked"
            );

        }, 250);
    }
);


/* =========================================================
   ⌨️ KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            stopSpeech();
        }
    }
);


/* =========================================================
   📱 TOUCH SUPPORT
   ========================================================= */

document.addEventListener(
    "touchstart",
    function () {

        if (speechSupported) {

            /*
             * Some mobile browsers require
             * user interaction before speech.
             */
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   🚀 APP START
   ========================================================= */

function initializeApp() {

    loadProgress();

    if (learningPage) {
        learningPage.style.display = "none";
    }

    if (homePage) {
        homePage.style.display = "block";
    }

    console.log(
        "🌈 Kids Learning World loaded successfully!"
    );

    console.log(
        `⭐ Stars: ${playerStars} | 🏆 Score: ${playerScore}`
    );
}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();
}
