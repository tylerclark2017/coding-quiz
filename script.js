document.addEventListener("DOMContentLoaded", function() {
  var currentQuestionIndex = 0;
  var time = 120;
  var timervalueEl = document.getElementById("timer-value");
  var timerId;
  var score = 0;

  var startButton = document.getElementById("start");
  var restartButton = document.getElementById("restart-button");

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionContainerEl.classList.remove("hide");
    resultsSection.classList.add("hidden");
    startQuiz();
  }

  restartButton.addEventListener('click', restartQuiz);
  restartButton.onclick = restartQuiz;

  var submitBtn = document.getElementById("submit-button");
  var questionContainerEl = document.getElementById("question-container");
  var questionEl = document.getElementById("question-text");
  var choicesEl = document.getElementById("choices-list");
  var feedbackEl = document.getElementById("feedback");
  var finalScoreEl = document.getElementById("final-score");
  var quizSection = document.getElementById("quiz");
  var resultsSection = document.getElementById("results");
  var questions = [
    {
      question: "In JavaScript, commonly used data types include all but the following:",
      answers: ["A) strings", "B) booleans", "C) alerts", "D) numbers"],
      correctAnswer: "C) alerts"
    },
   { 
    question: "The condition in an if/else statement is enclosed with which of the following?",
   answers: ["A) quotes B) curly brackets C) parentheses D) square brackets"],
   correctAnswer: "C) parentheses"
},
{ 
    question: "Arrays in JavaScript can be used to store ___.",
   answers: ["A) numbers and strings B) other arrays C) booleans D) all of the above"],
   correctAnswer: "D) all of the above"
},
{ 
    question: "String values must be enclosed within which of the following when being assigned to variables, or var?",
   answers: ["A) commas B) curly brackets C) quotes D) parentheses"],
   correctAnswer: "C) quotes"
},
{ 
    question: "Which of the following is useful during development of applications when debugging, and printing content to the debugger??",
   answers: ["A) JavaScript B) terminal/bash C) for loops D) console.log"],
   correctAnswer: "D) console.log"
},
{ 
    question: "What does DOM stand for?",
  answers: ["A) Document Obscure Models B) Declaration Object Model C) Document Object Model D) None of the above"],
  correctAnswer: "C) Document Object Model"
},
{ 
  question: "When traversing the DOM, what is the correct document. input when trying to access an element by its ID and log it to the console?",
  correctAnswer: "var firstChildUl = document.getElementById"
},
{ 
question: "Input the correct method to traverse the DOM when accessing the first child of an unordered list.",
  correctAnswer: "var firstChild = document.querySelector"
},
{ 
    question: "Input the two functions used to get and set items in local storage.",
correctAnswer: "getItem, setItem"
},
{ 
    question: "What is the correct method to listen for an event, whether it be a key press or click of a mouse or trackpad?",
 correctAnswer: "document.addEventListener"
},
  ];

  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    choicesEl.innerHTML = "";
    currentQuestion.answers.forEach(function (answer, i) {
      var choiceButton = document.createElement("button");
      choiceButton.setAttribute("class", "choice");
      choiceButton.setAttribute("value", answer);
      choiceButton.textContent = answer;
      choiceButton.onclick = questionClick;
      choicesEl.appendChild(choiceButton);
    });
  }

  function startQuiz() {
    var secondsLeft = 180;
    currentQuestionIndex = 0;
    score = 0;
    startTimer();
    showQuestion();
    startButton.disabled = true;
  }

  function startTimer() {
    timerId = setInterval(function() {
      secondsLeft--;
      timervalueEl.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timerId);
        endQuiz();
      }
    }, 1000);
  }

  function questionClick() {
    var selectedAnswer = this.value;
    handleAnswer(selectedAnswer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

  function handleAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      score++;
      feedbackEl.textContent = "Correct!";
      feedbackEl.setAttribute("class", "feedback correct");
    } else {
      feedbackEl.textContent = "Incorrect!";
      feedbackEl.setAttribute("class", "feedback incorrect");
      secondsLeft -= 10;
    }
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timerId);
    resultsSection.classList.remove("hidden");
    quizSection.style.display = "none";
    finalScoreEl.textContent = score;
    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("placeholder", "Enter your initials");
    var submitInitialsBtn = document.createElement("button");
    submitInitialsBtn.textContent = "Submit";
    submitInitialsBtn.onclick = function() {
      var initials = initialsInput.value;
      if (initials) {
        localStorage.setItem("initialsAndScore", initials + " - " + score);
      }
      var endScreenEl = document.getElementById("end-screen");
      endScreenEl.classList.remove("hide");
    };
    feedbackEl.parentNode.insertBefore(initialsInput, feedbackEl.nextSibling);
    feedbackEl.parentNode.insertBefore(submitInitialsBtn, feedbackEl.nextSibling);
  }

  startButton.onclick = startQuiz;
});