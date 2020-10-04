// Create our questions array, fill with actual question objects.
var questions = [
  {
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

// Render our first question to the user.
renderQuestion();



/*
  The renderQuestion() function references our questions array
  objects and displays them for our user on the screen.
*/
function renderQuestion() {

  if(time === 0){
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
  for(var i = 0; i< choicesLength; i++){
    // Create the actual li element.
    var questionListItem = document.createElement("li");

    // Add the elements from the choices array to our new questionListItem.
    questionListItem.textContent = choices[i];

    // Append each item in our choices array to the screen as li elements.
    questionListEl.append(questionListItem);
  }

  if(time === 0){
    endQuiz();
  }

  }

/*
  The checkAnswer() function stores the user's click and uses input
  validation to ensure the user clicked on a valid li tag.
*/
function checkAnswer(event){
  // pause the timer
  clearInterval(intervalId);

  // Store the user's click as a variable, 'target'.
  var target = event.target;

  // validate that the user clicked on a valid li element.
  if(target.matches("li")){

    // Store the actual text content of the li element in variable, 'selectedChoice'.
    var selectedChoice = event.target.textContent;

    // Compare selectedChoice to the correct answer from the current question object.
    if(selectedChoice === questions[questionIndex].answer){
      // If the selectedChoice is the correct answer, increment correctCount variable by 1.
      correctCount++;

      // Display a message to the user letting them know they were correct.
      questionResultEl.textContent = "Correct";
    } else {

      // If the selectedChoice is not the correct answer, decrement correctCount variable by 1.
      correctCount--;
      time -= 2;

      // Display a message to the user letting them know they were incorrect.
      questionResultEl.textContent = "Wrong";

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
function nextQuestion(){
  // When all Qs ask end the quiz

  // Clear our questionResultEl value.
  mainQuestionArea.textContent = "";
  // Increment our question index variable by 1.
  questionIndex++;

  // Call our renderQuestion() function.
  if(questionIndex === questions.length){
    timer = 0;
    endQuiz();
  } else {
  renderQuestion();}
}

function updateTime(){
  timerEl.textContent = time;
  // decrement time
  time --;
  // if time is up end the quiz
  if (time === 0){
    endQuiz();
  }
}


function endQuiz(){

  // clear interval
  clearInterval(intervalId);

  // Show the user the quiz is over
  setTimeout(showHighScore, 2000);
}


function showHighScore() {

  document.body.textContent = "";
  // Prompt user for name
  var name = prompt("What is your name?");

  // Check if there is anything in local storage and store it in variable
  // nothing there high_scores = false;
  var high_score = localStorage.getItem("scores");
  console.log(high_score);


  // if high scores doesn't exist
  if(!high_score){
    // create empty array
    high_score = [];
  } else {
    // parse stringified array
    high_score = JSON.parse(high_score);
  }

  var user = {
    name: name,
    score: correctCount
  }

  high_score.push(user);

  localStorage.setItem("scores", JSON.stringify(high_score))

  // sort array
  high_score.sort(function(a,b){
    return b.score-a.score;
  });

  // Write to DOM
  
  var heading = document.createElement("h2");
  heading.textContent = "Highscores";

  var div = document.createElement("div");
  document.body.append(div);
  div.setAttribute("class", "container");
  div.append(heading);

  var contentUL = document.createElement("ul");

  for(var i = 0; i < high_score.length; i++){
    var contentLi= document.createElement("li");
    contentLi.textContent = "Name: " + high_score[i].name + " Score: " + high_score[i].score;
    contentUL.append(contentLi);
  }
  div.append(contentUL);
}




 // Listen for a click on any of the LI elements, check their answer with the checkAnswer() function.
  questionListEl.addEventListener("click", checkAnswer);

  viewHighScores.addEventListener("click", function(){
    endQuiz();
  });