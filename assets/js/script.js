// Create our questions array, fill with actual question objects.
var questions = [{
    // Question 1
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    // Question 2
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    // Question 3
    title: "Arrays in Javascript can be used to store: ",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    // Question 4
    title: "String values must be enclosed within ______ when being assigned to variables. ",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    // Question 5
    title: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log()"],
    answer: "console.log()"
  },
];


// Select and store our DOM elements from the index.html page.
var questionEl = document.querySelector("#question");
var questionListEl = document.querySelector("#question-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#viewHighScores");

// Create our variables to keep track of our progress.
var questionIndex = 0;
var correctCount = 0;

// ad vars for hold time and interval id
var time = questions.length * 5;
var intervalId;

var name;

// Render our first question to the user.
renderQuestion();


/*
  The renderQuestion() function references our questions array
  objects and displays them for our user on the screen.
*/
function renderQuestion() {

  if (time === 0) {
    endQuiz;
  }
  //create the time interval
  intervalId = setInterval(updateTime, 1000);

  // write code to generate questions
  questionEl.textContent = questions[questionIndex].title;
  questionListEl.innerHTML = "";

  // Take our answer choices and store them in choices.
  var choices = questions[questionIndex].choices;

  // Store the length of our new choices array for loop iteration.
  var choicesLength = choices.length;

  // Iterate through all of the answer choices and append them
  // to the page as LI elements.
  for (var i = 0; i < choicesLength; i++) {
    // Create the actual li element.
    var questionListItem = document.createElement("li");


    // Add the elements from the choices array to our new questionListItem.
    questionListItem.textContent = choices[i];

    // Append each item in our choices array to the screen as li elements.
    questionListEl.append(questionListItem);
  }

  if (time === 0) {
    endQuiz();
  }

}

/*
  The checkAnswer() function stores the user's click and uses input
  validation to ensure the user clicked on a valid li tag.
*/
function checkAnswer(event) {
  // pause the timer
  clearInterval(intervalId);

  // Store the user's click as a variable, 'target'.
  var target = event.target;

  // validate that the user clicked on a valid li element.
  if (target.matches("li")) {

    // Store the actual text content of the li element in variable, 'selectedChoice'.
    var selectedChoice = event.target.textContent;

    // Compare selectedChoice to the correct answer from the current question object.
    if (selectedChoice === questions[questionIndex].answer) {
      // If the selectedChoice is the correct answer, increment correctCount variable by 1.
      correctCount++;

      // Display a message to the user letting them know they were correct.
      questionResultEl.textContent = "Correct!";
    } else {

      // If the selectedChoice is not the correct answer, decrement correctCount variable by 1.
      correctCount--;
      time -= 2;

      // Display a message to the user letting them know they were incorrect.
      questionResultEl.textContent = "Incorrect.";

      // Remove time from the timer.
    }

  }

  // Wait 2 seconds and then call the nextQuestion() function.
  setTimeout(nextQuestion, 2000);
}

/* 
  The nextQuestion() function increments the questionIndex variable
  so that we can retrieve the next question object from our questions
  array. It then calls renderQuestion() to render the new question
  to our user's screen.
*/
function nextQuestion() {
  // Clear our questionResultEl value.
  questionResultEl.textContent = "";

  // Increment our question index variable by 1.
  questionIndex++;

  // Call our renderQuestion() function if there are questions left to ask
  // If not, just end the quiz.
  if (questionIndex === questions.length) {
    timer = 0;
    endQuiz();
  } else {
    renderQuestion();
  }
}

/*
  The updateTime() function displays our running timer to 
  the user. If the timer hits 0, end the quiz.
*/
function updateTime() {
  timerEl.textContent = time;
  // decrement time
  time--;
  // if time is up end the quiz
  if (time === 0) {
    endQuiz();
  }
}

/*
  The endQuiz() function stops the timer and brings the
  user to the high score screens.
*/
function endQuiz() {

  // clear interval
  clearInterval(intervalId);

  // Show the user the quiz is over
  setTimeout(showHighScore, 2000);
}

/*
  showHighScore() asks the user for their name in order to
  tie it to their score value.
*/
function showHighScore() {
  // Prompt user for name
  document.body.textContent = "";

  // Create our containing div, container. Add to the body.
  var div = document.createElement("div");
  div.setAttribute("class", "container highscores-display");
  document.body.append(div);


  // Create our heading content. Style. Add to our div.
  var heading = document.createElement("h2");
  heading.textContent = "Add your name to the leaderboard!";
  div.append(heading);

  // Create our input box. Style. Add to our div.
  inputBox = document.createElement("input");
  inputBox.setAttribute("id", "nameBox");
  div.append(inputBox);


  // Create our submit button. Style. Add to our div.
  btnSubmit = document.createElement("button");
  btnSubmit.setAttribute("type", "submit");
  btnSubmit.setAttribute("class", "customBtn");
  btnSubmit.textContent = "Submit Name";
  div.append(btnSubmit);

  // Define what our submit button will do:
  btnSubmit.addEventListener("click", function (event) {
    // Prevent the input box from automatically clearing out.
    event.preventDefault();
    // Store the value from our input box.
    name = inputBox.value;
    // Display the high scores to the user.
    toHighScore();
  });
}

/*
  toHighScore() simply displays the highscores and the user's
  names. Modularized so that users can skip past the game and
  go straight to the highscores from the main page.
*/
function toHighScore() {
  // Stop our timer.
  clearInterval(intervalId);

  // Make room for the high scores.
  document.body.textContent = "";

  // Check if there is anything in local storage and store it in variable
  var high_score = localStorage.getItem("scores");

  // if high scores doesn't exist
  if (!high_score) {
    // create empty array
    high_score = [];
  } else {
    // parse stringified array
    high_score = JSON.parse(high_score);
  }

  // Create our user object.
  var user = {
    name: name,
    score: correctCount
  }

  // Push our user object values into high_score.
  high_score.push(user);

  // Set our highscores to localStorage.
  localStorage.setItem("scores", JSON.stringify(high_score))

  // Sort the high scores by greatest to least using the sort function.
  high_score.sort(function (a, b) {
    return b.score - a.score;
  });


  // Write to DOM

  // Create our heading content.
  var heading = document.createElement("h2");
  heading.textContent = "Highscores";

  // Create our containing div, container.
  var div = document.createElement("div");
  document.body.append(div);
  div.setAttribute("class", "container highscores-display");
  div.append(heading);

  // Create our containing UL.
  var contentUL = document.createElement("ul");
  contentUL.setAttribute("id", "highscore-list");

  // Create our "Go Back" buttons.
  var button = document.createElement("button");
  button.setAttribute("class", "customBtn");
  button.textContent = "Go back";

  // Loop through our scores and names and display them to the user.
  for (var i = 0; i < high_score.length; i++) {
    var contentLi = document.createElement("li");

    // Do not display scores if there is no username AND a zero score.
    // This allows our users to skip right to the highscores without registering a score and adding garbage data.
    if (high_score[i].name != null && high_score[i].score != 0) {

      contentLi.innerHTML = `<strong>Name: </strong> ${high_score[i].name} <strong>Score:</strong> ${high_score[i].score}`
      //contentLi.textContent = `Name: ${high_score[i].name} \tScore: ${high_score[i].score}`
      contentUL.append(contentLi);
    }
  }
  // Add our UL to the div.
  div.append(contentUL);

  // Add our button to the div.
  div.append(button);

  // Define what our go back button does-- sends the user to the start of the quiz.
  button.addEventListener("click", function () {
    location.reload()
  });

}


// Listen for a click on any of the LI elements, check their answer with the checkAnswer() function.
questionListEl.addEventListener("click", checkAnswer);

// Listen for a click on the "View Highscores" link. Allow the user to view scores without playing, entering a name, or having a score.
viewHighScores.addEventListener("click", toHighScore);