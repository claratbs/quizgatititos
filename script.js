const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let userChoices = [];

btnRestart.onclick = () => {
  currentIndex = 0;
  userChoices = [];
  loadQuestion();
  content.style.display = "flex";
  contentFinish.style.display = "none";
};

function nextQuestion(e) {
  const character = e.target.getAttribute("data-character");
  userChoices.push(character);

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  const characterCounts = userChoices.reduce((acc, character) => {
    acc[character] = (acc[character] || 0) + 1;
    return acc;
  }, {});

  const maxCharacter = Object.keys(characterCounts).reduce((a, b) =>
    characterCounts[a] > characterCounts[b] ? a : b
  );

  textFinish.innerHTML = `Você é ${maxCharacter}!`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answersElement.innerHTML = "";
  questionElement.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.setAttribute("data-character", answer.character);
    button.innerText = answer.option;
    answersElement.appendChild(button);
  });

  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
