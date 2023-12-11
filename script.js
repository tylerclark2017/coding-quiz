
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


var startButton = document.getElementById("start");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var timerEl = document.getElementById("timer");
var secondsLeft = 120;

function startTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      // Call a function to handle the end of the game
      endGame();
    }
  }, 1000);
}

function startQuiz() {
  startButton.classList.add("hide");
  questionContainerEl.classList.remove("hide");
  timerId = setInterval(clockTick, 1000);

  // Display the first question
  getQuestion();
}

// Function to get the current question from the array
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  // Clear any existing choices
  choicesEl.innerHTML = "";

  // Create a button for each choice
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = i + 1 + ". " + choice;

    // Add event listener for when the user selects a choice
    choiceButton.onclick = questionClick;

    choicesEl.appendChild(choiceButton);
  });
}

// Function to check if the user's answer is correct
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // Display "Wrong!" feedback
    feedbackEl.textContent = "Wrong!";
  } else {
    // Display "Correct!" feedback
    feedbackEl.textContent = "Correct!";
  }

  // Display the feedback for a short duration
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions or if the time has run out
  if (currentQuestionIndex === questions.length || time === 0) {
    endQuiz();
  } else {
    getQuestion();
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerId);

  // Display the end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.classList.remove("hide");

  // Display the final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Hide the question container
  questionContainerEl.classList.add("hide");
}

// Function to update the timer
function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

// Event listener to start the quiz when the start button is clicked
startButton.onclick = startQuiz;