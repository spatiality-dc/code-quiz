const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-box");
const quizIntro = document.getElementById("introText");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btn-grid");
const submitHighScore = document.getElementById("scores-btn");
const incorrectPenalty = 10;
const highscores = JSON.parse(localStorage.getItem("highscores") || "[]");

var randomQuestions, currentQuestionIndex;

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});
submitHighScore.addEventListener("click", function() {
  var time = document.querySelector("#time").textContent;
  var initials = prompt("Input your initials here");
  highscores.push({ time, initials });
  localStorage.setItem("highscores", JSON.stringify(highscores));
});

function startGame() {
  startButton.classList.add("hide");
  randomQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  quizIntro.classList.add("hide");
  nextQuestion();
  startTimer();
  var twoMinutes = 60 * 2;
  var display = document.querySelector("#time");
  startTimer(twoMinutes, display);
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
    clearInterval(timerId);
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

//Hard coded questions
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

var timerId;

//Timer interval
function startTimer(duration, display) {
  var timeRemaining = duration;
  var minutes;
  var seconds;
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(function() {
    minutes = parseInt(timeRemaining / 60, 10);
    seconds = parseInt(timeRemaining % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timeRemaining < 0) {
      timeRemaining = duration;
      clearInterval(timerId);
    }
  }, 1000);
}

//Add in time decrement for incorrect answers
//Add stop time function to end of quiz
//Parse in remaining time as "score" - local storage
//On button click, scores-btn
//Add alert or similar for initials input
//Local storage for initials and scores
//Reset timer on "PLay again"
