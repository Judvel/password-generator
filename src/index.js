const letter = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "w",
  "x",
  "y",
  "z",
];
const capLetter = letter.map((item) => {
  return item.toUpperCase();
});
const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
const API = 'https://api.quotable.io/random?minLength=50';

const passwordGenerated = document.getElementById("password-generated");
const lenghtPassword = document.getElementById("length-password");
const buttonGenerate = document.getElementById("button-generate-password");
const buttonCopy = document.getElementById("button-copy-password");
const checkboxjs = document.querySelectorAll(".checkbox");
const passwordType = document.querySelector("#password");
const passphraseType = document.querySelector("#passphrase");
const passwordSection = document.querySelector(".main-password-container");
const passphraseSection = document.querySelector(".main-passphrase-container");
const numberWords = document.querySelector("#number-words");
const wordSeparator = document.querySelector("#word-separator");


const arrayLength = 20;
passwordType.checked = true;

let arrayOfArray = [];
let arrayCharacters = [];
let passwordCharacterArray = [];

checkboxjs[0].addEventListener("click", () => {
  if (checkboxjs[0].checked) {
    arrayOfArray.push(capLetter);
  }
});

checkboxjs[1].addEventListener("click", () => {
  if (checkboxjs[1].checked) {
    arrayOfArray.push(letter);
  }
});

checkboxjs[2].addEventListener("click", () => {
  if (checkboxjs[2].checked) {
    arrayOfArray.push(number);
  }
});
checkboxjs[3].addEventListener("click", () => {
  if (checkboxjs[3].checked) {
    arrayOfArray.push(symbols);
  }
});

buttonGenerate.addEventListener("click", passwordGenerator);
buttonCopy.addEventListener("click", copyPassword);

passwordType.addEventListener('click', togglePassword);
passphraseType.addEventListener('click', togglePassphrase);

function togglePassphrase(){
  passwordType.checked = false;
  passphraseSection.classList.remove("inactive");
  passwordSection.classList.add("inactive");
}
function togglePassword(){
  passphraseType.checked = false;
  passphraseSection.classList.add("inactive");
  passwordSection.classList.remove("inactive");
}

function passwordGenerator() {
  if (passwordType.checked) {
    passwords();
  }
  if(passphraseType.checked) {
    passPhrase();
  }
}

function passwords(){
  if (!checkboxjs[0].checked) {
    arrayOfArray = arrayOfArray.filter((item) => {
      return item != capLetter;
    });
  }

  if (!checkboxjs[1].checked) {
    arrayOfArray = arrayOfArray.filter((item) => {
      return item != letter;
    });
  }
  if (!checkboxjs[2].checked) {
    arrayOfArray = arrayOfArray.filter((item) => {
      return item != number;
    });
  }
  if (!checkboxjs[3].checked) {
    arrayOfArray = arrayOfArray.filter((item) => {
      return item != symbols;
    });
  }

  for (let i = 0; i < arrayOfArray.length; i++) {
    const element = arrayOfArray[i].map((item) => {
      return arrayCharacters.push(item);
    });
  }

  for (let i = 0; i < lenghtPassword.value; i++) {
    passwordCharacterArray.push(
      arrayCharacters[randomCharacters(0, arrayCharacters.length - 1)]
    );
  }
  passwordGenerated.textContent = passwordCharacterArray.join("");
  passwordCharacterArray = [];
  arrayCharacters = [];
}


function passPhrase(){
  let arrayQuote;
  async function fetchData(urlAPI) {
    const response = await fetch(urlAPI);
    const data = await response.json();
    return data;
  }
  
  const dataFunction = async (urlAPI) => {
    try {
      const quote = await fetchData(`${urlAPI}`)
      const contentQuote = quote.content;
      arrayQuote = contentQuote.split(' ')
    
      for (let i = 0; i < numberWords.value; i++) {
        passwordCharacterArray.push(
          arrayQuote[randomCharacters(0, arrayQuote.length - 1)]
        );
      }
      passwordGenerated.textContent = passwordCharacterArray.join(`${wordSeparator.value}`);
      passwordCharacterArray = [];
      arrayCharacters = [];
    } catch(error) {
      console.log(error)
    }
  }
  
  dataFunction(API);
}





function randomCharacters(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function copyPassword() {
  navigator.clipboard.writeText(passwordGenerated.innerText);
}
