const characterSets = {
    "en": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "fi": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "å", "ä", "ö"]
}

let lang = "en";
let characterCount = 1;
let correctAnswers = 0;
let monkeySee, monkeyType, monkeyLike, monkeyCount = null;

function changeCase(elementIds) {
    const uc = "monkey-text-uc";
    const lc = "monkey-text-lc";
    elementIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el.classList.contains(uc)) {
            el.classList.remove(uc);
            el.classList.add(lc);
        } else {
            el.classList.remove(lc);
            el.classList.add(uc);
        }
    });
}

function setText() {
    const characters = characterSets[lang] || characterSets["en"];
    const result = [];
    for (let i = 0; i < characterCount; i++) {
        result[i] = characters[Math.floor(Math.random() * characters.length)];
    }
    monkeySee.value = result.join("");
    monkeyType.value = "";
}

const monkeyConfetti1 = confetti.shapeFromText({ text: '🙈' }, 3);
const monkeyConfetti2 = confetti.shapeFromText({ text: '🐒' }, 4);
let validating = undefined;
function validateResult(element) {
    if (validating !== undefined) {
        return;
    }
    const entered = element.value.toLowerCase();
    if (entered === monkeySee.value.toLowerCase()) {
        monkeySee.classList.add("valid");
        correctAnswers++;
        if (correctAnswers === 1 || correctAnswers % 5 === 0) {
            if (correctAnswers % 10 === 0) {
                const text = confetti.shapeFromText({ text: correctAnswers + '' }, 4);
                confetti({ shapes: [monkeyConfetti1, monkeyConfetti2, text], scalar: correctAnswers % 2 + 2 });
            }
            confetti({ shapes: [monkeyConfetti1, monkeyConfetti2], scalar: correctAnswers % 2 + 2 });
        }
        monkeyCount.innerText = "" + correctAnswers;
        element.disabled = true;
        validating = setTimeout(() => {
            element.disabled = false;
            setText();
            element.value = "";
            monkeySee.classList.remove("valid");
            validating = undefined;
        }, 400);
    }
}

function changeLetterCount(change) {
    characterCount += change;
    if (characterCount < 1) {
        characterCount = 1;
    }
    if (characterCount > 6) {
        characterCount = 6;
    }
    monkeyType.maxLength = "" + characterCount;
    setText();
}

function onPageLoaded() {
    const language = (navigator.language || navigator.userLanguage).toLowerCase();
    lang = Object.keys(characterSets).find((characterSet) => {
        return language.startsWith(characterSet) ? true : false;
    }) || "en";

    monkeySee = document.getElementById("monkey-see");
    monkeyType = document.getElementById("monkey-type");
    monkeyCount = document.getElementById("monkey-count");
    monkeyCount.innerText = lang;
    setText()

    document.addEventListener("mouseup", (event) => {
        monkeyType.focus();
    });
    document.addEventListener("keydown", (event) => { monkeyType.focus(); });
    monkeyType.addEventListener("keyup", (event) => {
        validateResult(monkeyType);
    });
    monkeyType.addEventListener("input", (event) => {
        validateResult(monkeyType);
    });
}
