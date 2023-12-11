
var currentQuestionIndex = 0;
var time = questionEl.length * 15;
var timerId;
var score = 0;
var currentQuestionIndex = 0;

var startButton = document.getElementById("start");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("timer");
var secondsLeft = 120;
var quizQuestions = [
    {
      question: "In JavaScript, commonly used data types include all but the following:",
      answers: ["A) strings", "B) booleans", "C) alerts", "D) numbers"],
      correctAnswer: "C) alerts"
    },
   { question: "The condition in an if/else statement is enclosed with which of the following?",
   answers: ["A) quotes B) curly brackets C) parentheses D) square brackets"],
   correctAnswer: "C) parentheses"
},
{ question: "Arrays in JavaScript can be used to store ___.",
   answers: ["A) numbers and strings B) other arrays C) booleans D) all of the above"],
   correctAnswer: "D) all of the above"
},
{ question: "String values must be enclosed within which of the following when being assigned to variables, or var?",
   answers: ["A) commas B) curly brackets C) quotes D) parentheses"],
   correctAnswer: "C) quotes"
},
{ question: "Which of the following is useful during development of applications when debugging, and printing content to the debugger??",
   answers: ["A) JavaScript B) terminal/bash C) for loops D) console.log"],
   correctAnswer: "D) console.log"
},
{ question: "What does DOM stand for?",
  answers: ["A) Document Obscure Models B) Declaration Object Model C) Document Object Model D) None of the above"],
  correctAnswer: "C) Document Object Model"
},
{ question: "When traversing the DOM, what is the correct document. input when trying to access an element by its ID and log it to the console?",
  correctAnswer: "var firstChildUl = document.getElementById"
},
{ question: "Input the correct method to traverse the DOM when accessing the first child of an unordered list.",
  correctAnswer: "var firstChild = document.querySelector"
},
{ question: "Input the two functions used to get and set items in local storage.",
correctAnswer: "getItem, setItem"
},
{ question: "What is the correct method to listen for an event, whether it be a key press or click of a mouse or trackpad?",
 correctAnswer: "document.addEventListener"
},
  ];

function startTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      
      endGame();
    }
  }, 1000);
}

function startQuiz() {
    
    startTimer();
   
    displayQuestion();
  }

  var timeLeft = 120; 

  function startTimer() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      
      console.log("Time left: " + timeLeft);
      
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        console.log("Time's up!");
       
        displayScore();
      }
    }, 1000);
  }

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  
  choicesEl.innerHTML = "";

  
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = i + 1 + ". " + choice;

    
    choiceButton.onclick = questionClick;

    choicesEl.appendChild(choiceButton);
  });
}
function handleAnswer(answer) {
    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      score++;
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex === quizQuestions.length) {
      
      displayScore();
    } else {
      
      displayQuestion();
    }
  }

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    
    feedbackEl.textContent = "Wrong!";
  } else {
    
    feedbackEl.textContent = "Correct!";
  }

  
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionIndex++;

  
  if (currentQuestionIndex === questions.length || time === 0) {
    endQuiz();
  } else {
    getQuestion();
  }
}


function endQuiz() {
  clearInterval(timerId);

  
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");

  
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

 
  questionContainerEl.classList.add("hide");
}

function displayScore() {
    console.log("Your score: " + score + " out of " + quizQuestions.length);
    if (score === quizQuestions.length) {
      console.log("You got a new high score!");
    }
  }

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}


startButton.onclick = startQuiz;