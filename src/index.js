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

const passwordGenerated = document.getElementById("password-generated");
const lenghtPassword = document.getElementById("length-password");
const checkboxCapLetter = document.getElementById("capitalize-letter");
const checkboxLowLetter = document.getElementById("lower-letter");
const checkboxNumber = document.getElementById("number-checkbox");
const checkboxSymbols = document.getElementById("symbols-checkbox");
const buttonGenerate = document.getElementById("button-generate-password");
const buttonCopy = document.getElementById("button-copy-password");

const arrayLength = 20;

const arrayOfArray = [letter, capLetter, number, symbols];
const arrayCharacters = [];
let passwordCharacterArray = [];

for (let i = 0; i < arrayOfArray.length; i++) {
  const element = arrayOfArray[i].map((item) => {
    return arrayCharacters.push(item);
  });
}

buttonGenerate.addEventListener("click", passwordGenerator);
buttonCopy.addEventListener("click", copyPassword);

function passwordGenerator() {
  for (let i = 0; i < lenghtPassword.value; i++) {
    passwordCharacterArray.push(
      arrayCharacters[randomCharacters(0, arrayCharacters.length - 1)]
    );
  }
  passwordGenerated.textContent = passwordCharacterArray.join("");
  passwordCharacterArray = [];
}

function randomCharacters(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function copyPassword() {
  navigator.clipboard.writeText(passwordGenerated.innerText);
}
