const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-box");
const quizIntro = document.getElementById("introText");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btn-grid");
const submitHighScore = document.getElementById("scores-btn");

const incorrectPenalty = 10;
const maxQuestions = 10;
var randomQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  randomQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  quizIntro.classList.add("hide");
  nextQuestion();
  startTimer();
}

function nextQuestion() {
  resetState();
  showQuestion(randomQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (randomQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Play again?";
    startButton.classList.remove("hide");
    submitHighScore.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("wrong");
  element.classList.remove("correct");
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  submitHighScore.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

const questions = [
  {
    question: "var a; if (a) {return true;} else {return false;}",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question: 'var b = ""; if (b) {return true;} else {return false;}',
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true }
    ]
  },
  {
    question:
      'var a; var b = ""; if (a == b) {return true;} else {return false;}',
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question: "var a = 0; if (a) {return true;} else {return false;}",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question:
      'var a = ["a"]; var b = "b"; if (a.indexOf(b)) {return true;} else {return false;}',
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question: 'var a = "a"; if (a = 1) {return true;} else {return false;}',
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question: 'var a = "a"; if (a = 0) {return true;} else {return false;}',
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question:
      "var a = true; var b = false; if (a || b) {return true;} else {return false;}",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false }
    ]
  },
  {
    question: "var a; var b = a || 0; b ===",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "0", correct: true }
    ]
  },
  {
    question: 'var a = ["a", "b", "c"]; var b = ["d", "e", "f"]; a + b ===',
    answers: [
      { text: '["a", "b", "c", "d", "e", "f"]', correct: false },
      { text: "abcdef", correct: false },
      { text: '"a", "b", "c", "d", "e", "f"', correct: false },
      { text: "a,b,cd,e,f", correct: true }
    ]
  }
];

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function() {
  var twoMinutes = 60 * 2,
    display = document.querySelector("#time");
  startTimer(twoMinutes, display);
};
