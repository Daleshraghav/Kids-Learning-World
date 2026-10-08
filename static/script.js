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

    if (currentCategory === "menu") {
        goHome();
        return;
    }

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
   💡 STUDY LAMP
   DO NOT REMOVE
   ========================================================= */

function turnLampOn() {

    const intro =
        document.getElementById("studyIntro");

    if (!intro) return;

    if (intro.classList.contains("lamp-on")) return;

    intro.classList.add("lamp-on");

    setTimeout(function () {

        intro.classList.add("hide-intro");

    }, 2200);
}


/* =========================================================
   📚 LEARNING MENU
   ========================================================= */

function openLearningMenu() {

    stopSpeech();

    currentCategory = "menu";

    if (homePage) {
        homePage.style.display = "none";
    }

    if (learningPage) {
        learningPage.style.display = "block";
        learningPage.classList.add("learning-menu-page");
    }

    if (learningIcon) {
        learningIcon.textContent = "🚀";
    }

    if (learningTitle) {
        learningTitle.textContent =
            "What do you want to learn?";
    }

    if (learningSubtitle) {
        learningSubtitle.textContent =
            "Choose a topic and let's start learning! ✨";
    }

    if (learningContent) {
        learningContent.innerHTML =
            renderLearningMenu();
    }

    scrollToTop();

    animateLearningCards();
}


function backToLearningMenu() {
   
   if (currentCategory === "menu") {
        goHome();
        return;
    }

    openLearningMenu();
}
function removeLearningMenuMode() {

    if (learningPage) {
        learningPage.classList.remove(
            "learning-menu-page"
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

function openAdventure(type) {

    stopSpeech();

    removeLearningMenuMode();

    currentCategory = type;

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
                "✍️",
                "Letter Writing",
                "Practice writing letters",
                "openLetterWriting()"
            )}


            ${createWorldCard(
                "🔊",
                "ABC Pronunciation",
                "Listen and repeat",
                "openPronunciation()"
            )}


            ${createWorldCard(
                "🔗",
                "Word Matching",
                "Match letters with words",
                "startWordMatching()"
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
                "🎵",
                "Nursery Rhymes",
                "Fun rhymes for kids",
                "openRhymes()"
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


/* =========================================================
   🔊 PRONUNCIATION
   ========================================================= */

function openPronunciation() {

    setupLearning(
        "🔊",
        "ABC Pronunciation",
        "Tap any letter to hear it!",
        renderAlphabet()
    );
}


/* =========================================================
   🔗 WORD MATCHING
   ========================================================= */

function startWordMatching() {

    const selected =
        shuffleArray(alphabet).slice(0, 8);

    setupLearning(
        "🔗",
        "Word Matching",
        "Match the letter with the correct word!",
        `

        <div class="cards-grid">

            ${selected.map((item, index) => `

                <div
                    class="learning-card"
                    onclick="checkLetterWordMatch(this, '${item.letter}', '${item.word}')"
                >

                    <div class="letter">
                        ${item.letter}
                    </div>

                    <div class="learning-emoji">
                        ${item.emoji}
                    </div>

                    <div class="word">
                        ${item.word}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


function checkLetterWordMatch(card, letter, word) {

    speak(
        `${letter} for ${word}`,
        {
            lang: "en-US",
            rate: 0.68
        }
    );

    if (card) {
        card.style.transform = "scale(1.05)";

        setTimeout(() => {
            card.style.transform = "";
        }, 300);
    }

    addStars(1);
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
                "⚖️",
                "Greater / Less",
                "Compare numbers",
                "startComparisonGame()"
            )}

            ${createWorldCard(
                "🔎",
                "Missing Numbers",
                "Find the missing number",
                "startMissingNumbersGame()"
            )}

            ${createWorldCard(
                "🔷",
                "Shapes",
                "Learn basic shapes",
                "openShapes()"
            )}

            ${createWorldCard(
                "📏",
                "Measurement",
                "Big, small, long, short",
                "openMeasurement()"
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

    setupLearning(
        "🔢",
        "Numbers 1–100",
        "Let's count together!",
        `

        <div class="cards-grid">

            ${Array.from({ length: 100 }, (_, i) => i + 1)
                .map(number => `

                    <div
                        class="learning-card"
                        onclick="speak('${number}', {lang:'en-US'})"
                    >

                        <div class="letter">
                            ${number}
                        </div>

                        <div class="mini-text">
                            🔊
                        </div>

                    </div>

                `).join("")}

        </div>

        `
    );
}


/* =========================================================
   ➕ ADDITION
   ========================================================= */

function startAdditionGame() {

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    const answer = a + b;

    showMathQuestion(
        "➕ Addition",
        `${a} + ${b} = ?`,
        answer
    );
}


/* =========================================================
   ➖ SUBTRACTION
   ========================================================= */

function startSubtractionGame() {

    let a = Math.floor(Math.random() * 15) + 5;
    let b = Math.floor(Math.random() * 10) + 1;

    if (b > a) {
        [a, b] = [b, a];
    }

    const answer = a - b;

    showMathQuestion(
        "➖ Subtraction",
        `${a} - ${b} = ?`,
        answer
    );
}


/* =========================================================
   ✖️ MULTIPLICATION
   ========================================================= */

function startMultiplicationGame() {

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;

    const answer = a * b;

    showMathQuestion(
        "✖️ Multiplication",
        `${a} × ${b} = ?`,
        answer
    );
}


/* =========================================================
   ➗ DIVISION
   ========================================================= */

function startDivisionGame() {

    const b = Math.floor(Math.random() * 9) + 1;
    const answer = Math.floor(Math.random() * 10) + 1;
    const a = b * answer;

    showMathQuestion(
        "➗ Division",
        `${a} ÷ ${b} = ?`,
        answer
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
   🔤 NUMBER NAMES
   ========================================================= */

const numberNames = {
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty"
};


function openNumberNames() {

    setupLearning(
        "🔤",
        "Number Names",
        "Learn numbers in words!",
        `

        <div class="cards-grid">

            ${Object.entries(numberNames).map(([num, name]) => `

                <div
                    class="learning-card"
                    onclick="speak('${name}', {lang:'en-US'})"
                >

                    <div class="letter">
                        ${num}
                    </div>

                    <div class="word">
                        ${name}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   ⚖️ GREATER / LESS
   ========================================================= */

function startComparisonGame() {

    const a =
        Math.floor(Math.random() * 20) + 1;

    let b =
        Math.floor(Math.random() * 20) + 1;

    while (b === a) {
        b =
            Math.floor(Math.random() * 20) + 1;
    }

    let answer;

    if (a > b) {
        answer = ">";
    } else {
        answer = "<";
    }

    window.currentComparisonAnswer = answer;

    setupLearning(
        "⚖️",
        "Greater or Less?",
        "Choose the correct sign.",
        `

        <div class="quiz-box">

            <div class="quiz-question">
                ${a} ? ${b}
            </div>

            <div class="quiz-options">

                <button
                    onclick="checkComparisonAnswer('>')"
                >
                    ${a} &gt; ${b}
                </button>

                <button
                    onclick="checkComparisonAnswer('<')"
                >
                    ${a} &lt; ${b}
                </button>

            </div>

        </div>

        `
    );
}


function checkComparisonAnswer(answer) {

    playerAnswered++;

    if (
        answer ===
        window.currentComparisonAnswer
    ) {

        playerCorrect++;
        addScore(10);
        addStars(1);

        showSuccessMessage(
            "🎉 Correct!",
            "Excellent comparison!"
        );

    } else {

        showSuccessMessage(
            "😊 Try Again!",
            `The correct sign is ${window.currentComparisonAnswer}.`
        );
    }
}


/* =========================================================
   🔎 MISSING NUMBERS
   ========================================================= */

function startMissingNumbersGame() {

    const start =
        Math.floor(Math.random() * 10) + 1;

    const missingIndex =
        Math.floor(Math.random() * 3) + 1;

    const numbers = [
        start,
        start + 1,
        start + 2,
        start + 3,
        start + 4
    ];

    const answer =
        numbers[missingIndex];

    window.currentMissingAnswer = answer;

    const display =
        numbers.map((number, index) =>
            index === missingIndex
                ? "?"
                : number
        ).join(" , ");

    const options =
        shuffleArray([
            answer,
            answer + 1,
            answer - 1,
            answer + 2
        ]);

    setupLearning(
        "🔎",
        "Missing Number",
        "Find the missing number!",
        `

        <div class="quiz-box">

            <div class="quiz-question">
                ${display}
            </div>

            <div class="quiz-options">

                ${options.map(option => `

                    <button
                        onclick="checkMissingAnswer(${option})"
                    >
                        ${option}
                    </button>

                `).join("")}

            </div>

        </div>

        `
    );
}


function checkMissingAnswer(answer) {

    playerAnswered++;

    if (
        answer ===
        window.currentMissingAnswer
    ) {

        playerCorrect++;
        addScore(10);
        addStars(1);

        showSuccessMessage(
            "🌟 Amazing!",
            "You found the missing number!"
        );

    } else {

        showSuccessMessage(
            "😊 Keep Trying!",
            `The answer was ${window.currentMissingAnswer}.`
        );
    }
}


/* =========================================================
   🔷 SHAPES
   ========================================================= */

function openShapes() {

    const shapes = [
        ["Circle", "⭕"],
        ["Square", "🟦"],
        ["Triangle", "🔺"],
        ["Rectangle", "▭"],
        ["Star", "⭐"],
        ["Heart", "❤️"],
        ["Diamond", "🔷"],
        ["Oval", "🥚"]
    ];

    setupLearning(
        "🔷",
        "Shapes",
        "Let's learn basic shapes!",
        `

        <div class="cards-grid">

            ${shapes.map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[0]}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${item[0]}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   📏 MEASUREMENT
   ========================================================= */

function openMeasurement() {

    const concepts = [
        ["Big", "🐘"],
        ["Small", "🐭"],
        ["Long", "📏"],
        ["Short", "✏️"],
        ["Heavy", "🏋️"],
        ["Light", "🪶"],
        ["Tall", "🦒"],
        ["Short", "🐜"]
    ];

    setupLearning(
        "📏",
        "Measurement",
        "Learn basic measurement ideas!",
        `

        <div class="cards-grid">

            ${concepts.map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[0]}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${item[1]}
                    </div>

                    <div class="word">
                        ${item[0]}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   🧠 MATH QUIZ
   ========================================================= */

function startMathQuiz() {

    const questions = [
        {
            question: "5 + 8 = ?",
            options: [13, 10, 18, 9],
            answer: 13
        },
        {
            question: "10 - 4 = ?",
            options: [5, 6, 7, 8],
            answer: 6
        },
        {
            question: "7 × 4 = ?",
            options: [26, 10, 28, 14],
            answer: 28
        },
        {
            question: "20 ÷ 5 = ?",
            options: [2, 3, 4, 5],
            answer: 4
        },
        {
            question: "7 + 9 + 12 = ?",
            options: [25, 29, 28, 11],
            answer: 28
        }
    ];

    startQuiz(
        "Maths Quiz",
        questions,
        "math"
    );
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
                "Draw Shapes",
                "Create basic shapes",
                "openShapeDrawing()"
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

/* =========================================================
   🌈 PROPER COLOURING
   ========================================================= */

function openColouring() {

    setupLearning(
        "🌈",
        "Colouring World",
        "Choose a picture and start colouring!",
        `
        <div class="colouring-world">

            <div class="colouring-intro">
                <h2>🎨 Choose a Picture</h2>
                <p>Click any picture to start colouring!</p>
            </div>

            <div class="colouring-picture-grid">

                <div class="colouring-picture-card" onclick="openColouringPicture('apple')">
                    <div class="colouring-preview">🍎</div>
                    <h3>Apple</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('sun')">
                    <div class="colouring-preview">☀️</div>
                    <h3>Sun</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('flower')">
                    <div class="colouring-preview">🌸</div>
                    <h3>Flower</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('butterfly')">
                    <div class="colouring-preview">🦋</div>
                    <h3>Butterfly</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('house')">
                    <div class="colouring-preview">🏠</div>
                    <h3>House</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('car')">
                    <div class="colouring-preview">🚗</div>
                    <h3>Car</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('tree')">
                    <div class="colouring-preview">🌳</div>
                    <h3>Tree</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('fish')">
                    <div class="colouring-preview">🐟</div>
                    <h3>Fish</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('balloon')">
                    <div class="colouring-preview">🎈</div>
                    <h3>Balloon</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('icecream')">
                    <div class="colouring-preview">🍦</div>
                    <h3>Ice Cream</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('star')">
                    <div class="colouring-preview">⭐</div>
                    <h3>Star</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('cloud')">
                    <div class="colouring-preview">☁️</div>
                    <h3>Cloud</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('bird')">
                    <div class="colouring-preview">🐦</div>
                    <h3>Bird</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('cat')">
                    <div class="colouring-preview">🐱</div>
                    <h3>Cat</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('dog')">
                    <div class="colouring-preview">🐶</div>
                    <h3>Dog</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('rabbit')">
                    <div class="colouring-preview">🐰</div>
                    <h3>Rabbit</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('bus')">
                    <div class="colouring-preview">🚌</div>
                    <h3>Bus</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('kite')">
                    <div class="colouring-preview">🪁</div>
                    <h3>Kite</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('boat')">
                    <div class="colouring-preview">⛵</div>
                    <h3>Boat</h3>
                </div>

                <div class="colouring-picture-card" onclick="openColouringPicture('cupcake')">
                    <div class="colouring-preview">🧁</div>
                    <h3>Cupcake</h3>
                </div>

            </div>

        </div>
        `
    );
}

/* =========================================================
   🎨 COLOURING PICTURE SYSTEM
   ========================================================= */

let selectedColour = "#ff0000";
let colouringEraser = false;


/* ---------------------------------------------------------
   🌈 COLOUR PALETTE
--------------------------------------------------------- */

const colouringColours = [
    "#ff0000",
    "#ff7a00",
    "#ffd400",
    "#00b83f",
    "#00cfff",
    "#0066ff",
    "#7b2cff",
    "#ff00a8",
    "#ff69b4",
    "#8b4513",
    "#000000",
    "#ffffff",
    "#808080",
    "#00ffff",
    "#7fff00",
    "#ffd700",
    "#ff4500",
    "#32cd32"
];


/* ---------------------------------------------------------
   🎨 COLOUR BUTTONS
--------------------------------------------------------- */

function createColourPalette() {

    return colouringColours.map(function(colour) {

        return `
            <button
                class="colouring-colour-button"
                style="background:${colour};"
                onclick="chooseColour('${colour}', this)"
                aria-label="Choose colour"
            ></button>
        `;

    }).join("");
}


/* ---------------------------------------------------------
   🎨 SELECT COLOUR
--------------------------------------------------------- */

function chooseColour(colour, button) {

    selectedColour = colour;
    colouringEraser = false;

    document
        .querySelectorAll(".colouring-colour-button")
        .forEach(function(btn) {
            btn.classList.remove("selected-colour");
        });

    if (button) {
        button.classList.add("selected-colour");
    }

    const eraserButton = document.getElementById("colouringEraser");

    if (eraserButton) {
        eraserButton.classList.remove("active-tool");
    }

    const currentColour = document.getElementById("currentColour");

    if (currentColour) {
        currentColour.style.background = colour;
    }
}


/* ---------------------------------------------------------
   🧽 ERASER
--------------------------------------------------------- */

function useColouringEraser() {

    colouringEraser = true;

    document
        .querySelectorAll(".colouring-colour-button")
        .forEach(function(btn) {
            btn.classList.remove("selected-colour");
        });

    const eraserButton = document.getElementById("colouringEraser");

    if (eraserButton) {
        eraserButton.classList.add("active-tool");
    }
}


/* ---------------------------------------------------------
   🖌️ COLOR SVG PART
--------------------------------------------------------- */

function colourDrawingPart(part) {

    if (!part) return;

    if (colouringEraser) {

        part.setAttribute(
            "fill",
            part.getAttribute("data-original") || "#ffffff"
        );

        return;
    }

    part.setAttribute("fill", selectedColour);
}


/* ---------------------------------------------------------
   🔄 RESET DRAWING
--------------------------------------------------------- */

function resetColouring() {

    const parts = document.querySelectorAll(".colour-part");

    parts.forEach(function(part) {

        const original =
            part.getAttribute("data-original") || "#ffffff";

        part.setAttribute("fill", original);

    });
}


/* ---------------------------------------------------------
   🖼️ OPEN DRAWING
--------------------------------------------------------- */

function openColouringPicture(type) {

    let title = "Colouring";

    if (type === "apple") title = "🍎 Apple";
    if (type === "sun") title = "☀️ Sun";
    if (type === "flower") title = "🌸 Flower";
    if (type === "butterfly") title = "🦋 Butterfly";
    if (type === "house") title = "🏠 House";
    if (type === "car") title = "🚗 Car";
    if (type === "tree") title = "🌳 Tree";
    if (type === "fish") title = "🐟 Fish";
    if (type === "balloon") title = "🎈 Balloon";
    if (type === "icecream") title = "🍦 Ice Cream";
    if (type === "star") title = "⭐ Star";
    if (type === "cloud") title = "☁️ Cloud";
    if (type === "bird") title = "🐦 Bird";
    if (type === "cat") title = "🐱 Cat";
    if (type === "dog") title = "🐶 Dog";
    if (type === "rabbit") title = "🐰 Rabbit";
    if (type === "bus") title = "🚌 Bus";
    if (type === "kite") title = "🪁 Kite";
    if (type === "boat") title = "⛵ Boat";
    if (type === "cupcake") title = "🧁 Cupcake";


    let drawing = getColouringSVG(type);


    setupLearning(
        "🎨",
        title,
        "Choose a colour and click different parts of the picture!",
        `

        <div class="proper-colouring-page">

            <div class="colouring-toolbar">

                <button
                    class="colouring-tool-button"
                    onclick="openColouring()"
                >
                    ⬅️ Pictures
                </button>

                <button
                    class="colouring-tool-button"
                    id="colouringEraser"
                    onclick="useColouringEraser()"
                >
                    🧽 Eraser
                </button>

                <button
                    class="colouring-tool-button"
                    onclick="resetColouring()"
                >
                    🔄 Reset
                </button>

            </div>


            <div class="colouring-colour-area">

                <div class="current-colour-box">
                    <span>Current:</span>

                    <span
                        id="currentColour"
                        class="current-colour"
                    ></span>
                </div>


                <div class="colouring-palette">
                    ${createColourPalette()}
                </div>

            </div>


            <div class="colouring-drawing-board">

                ${drawing}

            </div>


            <div class="colouring-help">
                🎨 Pick a colour and tap any part of the picture!
            </div>

        </div>

        `
    );


    selectedColour = "#ff0000";
    colouringEraser = false;


    setTimeout(function() {

        const currentColour =
            document.getElementById("currentColour");

        if (currentColour) {
            currentColour.style.background = selectedColour;
        }

        const firstButton =
            document.querySelector(".colouring-colour-button");

        if (firstButton) {
            firstButton.classList.add("selected-colour");
        }

    }, 50);
}


/* =========================================================
   🖼️ SVG DRAWINGS
   ========================================================= */

function getColouringSVG(type) {

    const commonStart = `
        <svg
            class="colouring-svg"
            viewBox="0 0 500 500"
            xmlns="http://www.w3.org/2000/svg"
        >
    `;

    const commonEnd = `</svg>`;


    /* 🍎 APPLE */

    if (type === "apple") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250"
                cy="280"
                rx="145"
                ry="130"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M250 155 C240 115 250 85 270 65"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M260 105 C315 55 365 85 385 125 C330 145 290 135 260 105Z"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* ☀️ SUN */

    if (type === "sun") {

        return commonStart + `

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250"
                cy="250"
                r="105"
                onclick="colourDrawingPart(this)"
            />

            <g
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                onclick="colourDrawingPart(this)"
            >
                <path d="M250 35 L270 115 L230 115 Z"/>
                <path d="M250 465 L270 385 L230 385 Z"/>
                <path d="M35 250 L115 270 L115 230 Z"/>
                <path d="M465 250 L385 270 L385 230 Z"/>
                <path d="M100 100 L160 155 L135 180 Z"/>
                <path d="M400 100 L340 155 L365 180 Z"/>
                <path d="M100 400 L160 345 L135 320 Z"/>
                <path d="M400 400 L340 345 L365 320 Z"/>
            </g>

        ` + commonEnd;
    }


    /* 🌸 FLOWER */

    if (type === "flower") {

        return commonStart + `

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="145" r="65"
                onclick="colourDrawingPart(this)"
            />

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="165" cy="190" r="65"
                onclick="colourDrawingPart(this)"
            />

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="335" cy="190" r="65"
                onclick="colourDrawingPart(this)"
            />

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="190" cy="280" r="65"
                onclick="colourDrawingPart(this)"
            />

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="310" cy="280" r="65"
                onclick="colourDrawingPart(this)"
            />

            <circle class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="215" r="55"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="235" y="265"
                width="30"
                height="180"
                rx="15"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="205" cy="350"
                rx="65"
                ry="25"
                transform="rotate(-25 205 350)"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="295" cy="390"
                rx="65"
                ry="25"
                transform="rotate(25 295 390)"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🦋 BUTTERFLY */

    if (type === "butterfly") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="170" cy="210"
                rx="110"
                ry="125"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="330" cy="210"
                rx="110"
                ry="125"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="185" cy="330"
                rx="75"
                ry="70"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="315" cy="330"
                rx="75"
                ry="70"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="230"
                y="150"
                width="40"
                height="240"
                rx="20"
                onclick="colourDrawingPart(this)"
            />

            <path
                d="M240 165 Q190 80 155 90"
                fill="none"
                stroke="#222"
                stroke-width="8"
            />

            <path
                d="M260 165 Q310 80 345 90"
                fill="none"
                stroke="#222"
                stroke-width="8"
            />

        ` + commonEnd;
    }


    /* 🏠 HOUSE */

    if (type === "house") {

        return commonStart + `

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="100" y="210"
                width="300" height="220"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M70 220 L250 70 L430 220 Z"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="205" y="310"
                width="90"
                height="120"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="135" y="260"
                width="70"
                height="70"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="295" y="260"
                width="70"
                height="70"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="320" y="105"
                width="45"
                height="80"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🚗 CAR */

    if (type === "car") {

        return commonStart + `

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="80" y="245"
                width="340"
                height="120"
                rx="35"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M145 245 L185 165 L320 165 L365 245 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                d="M195 235 L215 185 L260 185 L260 235 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                d="M275 185 L315 185 L345 235 L275 235 Z"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="155" cy="370" r="45"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="345" cy="370" r="45"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🌳 TREE */

    if (type === "tree") {

        return commonStart + `

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="210" y="250"
                width="80" height="190"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="170" cy="210" r="90"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="330" cy="210" r="90"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="130" r="100"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🐟 FISH */

    if (type === "fish") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="250"
                rx="145" ry="90"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M115 250 L45 175 L45 325 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M250 160 L290 95 L320 180 Z"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="335" cy="225" r="18"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🎈 BALLOON */

    if (type === "balloon") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="190"
                rx="120"
                ry="145"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M230 330 L250 365 L270 330 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                d="M250 365 C230 405 270 425 250 470"
                fill="none"
                stroke="#222"
                stroke-width="8"
            />

        ` + commonEnd;
    }


    /* 🍦 ICE CREAM */

    if (type === "icecream") {

        return commonStart + `

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="180" r="90"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M155 215 L345 215 L250 440 Z"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="215" cy="140" r="18"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="285" cy="165" r="18"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* ⭐ STAR */

    if (type === "star") {

        return commonStart + `

            <polygon
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                points="
                    250,55
                    305,180
                    440,190
                    335,275
                    370,410
                    250,335
                    130,410
                    165,275
                    60,190
                    195,180
                "
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* ☁️ CLOUD */

    if (type === "cloud") {

        return commonStart + `

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M100 330
                    C70 300 90 245 135 235
                    C135 165 220 135 270 190
                    C320 145 400 180 395 240
                    C440 245 455 310 415 335
                    Z
                "
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="170" cy="390" r="20"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="420" r="20"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="330" cy="390" r="20"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🐦 BIRD */

    if (type === "bird") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="270"
                rx="125" ry="95"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="225" cy="275"
                rx="65" ry="50"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="340" cy="220" r="15"
                onclick="colourDrawingPart(this)"
            />

            <polygon
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                points="365,225 430,250 365,275"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🐱 CAT */

    if (type === "cat") {

        return commonStart + `

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="180" r="95"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="345"
                rx="105" ry="120"
                onclick="colourDrawingPart(this)"
            />

            <polygon
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                points="175,120 180,45 230,105"
                onclick="colourDrawingPart(this)"
            />

            <polygon
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                points="325,120 320,45 270,105"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="395"
                rx="35" ry="25"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🐶 DOG */

    if (type === "dog") {

        return commonStart + `

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="190" r="95"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="350"
                rx="110" ry="120"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="155" cy="185"
                rx="45" ry="85"
                transform="rotate(-20 155 185)"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="345" cy="185"
                rx="45" ry="85"
                transform="rotate(20 345 185)"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="235" r="25"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🐰 RABBIT */

    if (type === "rabbit") {

        return commonStart + `

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="210" cy="120"
                rx="40" ry="100"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="290" cy="120"
                rx="40" ry="100"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="230" r="100"
                onclick="colourDrawingPart(this)"
            />

            <ellipse
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250" cy="365"
                rx="100" ry="105"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="270" r="20"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🚌 BUS */

    if (type === "bus") {

        return commonStart + `

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                x="70" y="140"
                width="360" height="240"
                rx="35"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="105" y="180"
                width="80" height="75"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="205" y="180"
                width="80" height="75"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="305" y="180"
                width="80" height="75"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="150" cy="390" r="40"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="350" cy="390" r="40"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🪁 KITE */

    if (type === "kite") {

        return commonStart + `

            <polygon
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                points="250,45 390,230 250,380 110,230"
                onclick="colourDrawingPart(this)"
            />

            <path
                d="M250 45 L250 380"
                fill="none"
                stroke="#222"
                stroke-width="7"
            />

            <path
                d="M110 230 L390 230"
                fill="none"
                stroke="#222"
                stroke-width="7"
            />

            <path
                d="M250 380 C220 410 280 430 250 470"
                fill="none"
                stroke="#222"
                stroke-width="7"
            />

        ` + commonEnd;
    }


    /* ⛵ BOAT */

    if (type === "boat") {

        return commonStart + `

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M80 320 L420 320 L350 410 L150 410 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M250 80 L250 320 L120 320 Z"
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M260 100 L380 250 L260 250 Z"
                onclick="colourDrawingPart(this)"
            />

            <rect
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                x="245" y="70"
                width="12"
                height="255"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    /* 🧁 CUPCAKE */

    if (type === "cupcake") {

        return commonStart + `

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="
                    M130 220
                    C130 145 200 125 250 160
                    C300 125 370 145 370 220
                    C370 280 320 300 250 285
                    C180 300 130 280 130 220
                    Z
                "
                onclick="colourDrawingPart(this)"
            />

            <path
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                d="M145 280 L355 280 L325 430 L175 430 Z"
                onclick="colourDrawingPart(this)"
            />

            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="7"
                cx="250" cy="130" r="35"
                onclick="colourDrawingPart(this)"
            />

        ` + commonEnd;
    }


    return `
        <svg
            class="colouring-svg"
            viewBox="0 0 500 500"
        >
            <circle
                class="colour-part"
                data-original="#ffffff"
                fill="#ffffff"
                stroke="#222"
                stroke-width="8"
                cx="250"
                cy="250"
                r="150"
                onclick="colourDrawingPart(this)"
            />
        </svg>
    `;
}

/* =========================================================
   🔷 SHAPE DRAWING
   ========================================================= */

function openShapeDrawing() {

    setupLearning(
        "🔷",
        "Draw Shapes",
        "Choose a shape to practise!",
        `

        <div class="cards-grid">

            ${[
                ["⭕", "Circle"],
                ["🟦", "Square"],
                ["🔺", "Triangle"],
                ["⭐", "Star"],
                ["❤️", "Heart"],
                ["🔷", "Diamond"]
            ].map(item => `

                <div
                    class="learning-card"
                    onclick="speak('${item[1]}', {lang:'en-US'})"
                >

                    <div class="learning-emoji">
                        ${item[0]}
                    </div>

                    <div class="word">
                        ${item[1]}
                    </div>

                </div>

            `).join("")}

        </div>

        `
    );
}


/* =========================================================
   🎨 COLOUR PICKER
   ========================================================= */

function openColourPicker() {

    setupLearning(
        "🎨",
        "Colour Picker",
        "Pick a colour!",
        `

        <div class="learning-card">

            <input
                type="color"
                id="mainColourPicker"
                value="#ff4d6d"
                style="
                    width:120px;
                    height:120px;
                    cursor:pointer;
                "
                onchange="speakSelectedColour(this.value)"
            >

            <h2>
                Choose your colour
            </h2>

        </div>

        `
    );
}


function speakSelectedColour(value) {

    speak(
        `You selected colour ${value}`,
        {
            lang: "en-US"
        }
    );
}


/* =========================================================
   🔢 CONNECT THE DOTS
   ========================================================= */

function openConnectDots() {

    connectPoints = [
        [120, 120],
        [220, 80],
        [320, 120],
        [360, 220],
        [260, 300],
        [160, 260],
        [120, 120]
    ];

    connectCurrent = 0;

    setupLearning(
        "🔢",
        "Connect the Dots",
        "Click the dots in order!",
        `

        <div
            id="connectDotsArea"
            style="
                position:relative;
                width:min(600px,90vw);
                height:400px;
                margin:auto;
                background:white;
                border-radius:25px;
                border:3px solid #ddd;
            "
        >

            ${connectPoints.map((point, index) => `

                <button
                    type="button"
                    onclick="connectDot(${index})"
                    style="
                        position:absolute;
                        left:${point[0]}px;
                        top:${point[1]}px;
                        width:40px;
                        height:40px;
                        border-radius:50%;
                    "
                >
                    ${index + 1}
                </button>

            `).join("")}

        </div>

        `
    );
}


function connectDot(index) {

    if (index !== connectCurrent) {

        showSuccessMessage(
            "😊 Almost!",
            "Start from the dots in order."
        );

        return;
    }

    connectCurrent++;

    addScore(5);

    if (
        connectCurrent >=
        connectPoints.length
    ) {

        addStars(2);

        showSuccessMessage(
            "🎉 Amazing!",
            "You connected all the dots!"
        );
    }
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
