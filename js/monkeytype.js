const characterSets = {
    "en": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "fi": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "å", "ä", "ö"]
}

const lang = "fi"; // TODO: change

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

function validateResult(element) {
    const entered = element.value;
    if (entered === monkeySee.value) {
        monkeySee.classList.add("valid");
        correctAnswers++;
        monkeyCount.innerText = "" + correctAnswers;
        element.disabled = true;
        setTimeout(() => {
            element.disabled = false;
            setText();
            element.value = "";
            monkeySee.classList.remove("valid");
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
    setText();
}

function onPageLoaded() {
    monkeySee = document.getElementById("monkey-see");
    monkeyType = document.getElementById("monkey-type");
    monkeyCount = document.getElementById("monkey-count");
    setText()

    document.addEventListener("mouseup", (event) => {
        monkeyType.focus();
    });
    document.addEventListener("keydown", (event) => { monkeyType.focus(); });
}
