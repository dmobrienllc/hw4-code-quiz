var wordBlank = document.querySelector(".word-blanks");
let answerGuess = document.querySelector(".answer-guess");

let correctCnt = document.querySelector(".correct-count");
let incorrectCnt = document.querySelector(".incorrect-count");
let timerCnt = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");

var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;

let questionsCounter = 0;
let correctCounter = 0;
let incorrectCounter = 0;

class Question {
  constructor(index, questionText,correctAnswerIndex) {
    this.index = index;
    this.questionText = questionText;
    this.correctAnswerIndex = correctAnswerIndex;
    this.answers = [];
    this.answeredCorrectly = function(answerIndex){
      var answer = this.answers[answerIndex];
      return answer.isCorrect;
    };
  }
}

class Answer{
  constructor(answerText,index,parentIndex,isCorrect) {
    this.answerText = answerText;
    this.parentIndex = parentIndex;
    this.index = index;
    this.isCorrect = isCorrect;
    this.checkAnswer = function(){
      return this.isCorrect;
    };
  }
}

let questionsArray = [];

// The init function is called when the page loads 
function init() {
  //getCorrectAnswers();
  //getIncorrectAnswers();
  loadQuestions();

  questionsArray.forEach((element, index) => {
    console.log(`Current index: ${index}`);
    console.log(element);
});
  console.log(questionsArray);
}

// The startGame function is called when the start button is clicked
function startGame() {
  timerCount = 60;
  startButton.disabled = true;

  //renderBlanks()
  //you won't call render question here, you'd just go to a method
  //which loops through the 
  startTimer()
  renderQuestion(0);
}

function displayResults()
{
  
}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerCnt.textContent = timerCount;

    if (timerCount === 0) {
      clearInterval(timer); 
      //display resultsloseGame();
    }
  }, 1000);
}

  //This function to be refactored to call a 'create' constructor to
  //avoid duplication
  function loadQuestions(){
    let testQuestion = "Arrays in javascript can be used to hold __________?";
    let answers = ["boolean","string","object","all of the above"];
    let question = new Question(1,testQuestion);
    let tmp;

    answers.forEach(function(answer,index){
      if(index === 2){
        tmp = new Answer(answer,index,question.index,true);
      }
      else{
        tmp = new Answer(answer,index,question.index,false);
      }
      question.answers[index] = tmp;
    });

    questionsArray[0] = question;

    let testQuestion2 = "Methods/Objects in the WEB API are __________?";
    let answers2 = ["setInterval","localStorage","stopTimer","all of the above"];
    let question2 = new Question(2,testQuestion);

    answers2.forEach(function(answer,index){
      if(index === 2){
        tmp = new Answer(answer,index,question2.index,true);
      }
      else{
        tmp = new Answer(answer,index,question2.index,false);
      }
      question2.answers[index] = tmp;
    });
    questionsArray[1] = question2;
  }

//get next requested question to the page
function renderQuestion(questionIndex) {
  let questTmp = questionsArray[questionIndex];

  let pQuestionEl = document.querySelector("#question-text");
  pQuestionEl.innerHTML = questTmp.questionText;

  //select ul parent
  let ulEl = document.querySelector("#answer-list");

  questTmp.answers.forEach(function(answer,index){
    let liEl = document.createElement("li");
    let buttonEl = document.createElement("button")
      //prepend with question id?
      buttonEl.setAttribute("class","answer-button");
      buttonEl.setAttribute("id",index);
      buttonEl.setAttribute("value",answer.answerText);
      buttonEl.innerText = answer.answerText;

      buttonEl.addEventListener("click", function() {
            alert("Value: " + buttonEl.value)
            processAnswer(questTmp.innerText,index);
        });
      liEl.appendChild(buttonEl);
      ulEl.appendChild(liEl);
  });
}

//process the answer function
//check to see if correct and write result
//advance selection index
//return next question or
//route to 'done'
function processAnswer(questionIndex,answerIndex){
  alert("You answered: " + answerIndex)

  //not checking for null here as if we have an answer, we 
  //had a question. Wouldn't be hard to make it  more robust.
  let tmpQst = questionsArray[questionIndex];

  //Return message should be human friendly
  if(SetCorrectIncorrect(mpQst.correctAnswerIndex,answerIndex)){
    alert(tmpQst.questionText + " answered correctly!")
  }
  else{
    alert(tmpQst.questionText + " answered incorrectly!")
  }

  //get next question or end if no  more questions
}

function SetCorrectIncorrect(correctIndex,chosenIndex){
  if(correctIndex === chosenIndex){
    correctCounter++;
    localStorage.setItem("correctAnswers",correctCounter);
    return true;
  }
  else{
    incorrectCounter++;
    localStorage.setItem("incorrectCount",incorrectCounter)
    return false;
  }
}

  function getCorrectAnswers(){
    // Get stored value from client storage, if it exists
    var storedCorrect = localStorage.getItem("correctCount");
    // If stored value doesn't exist, set counter to 0
    if (storedCorrect === null) {
      correctCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      correctCounter = storedCorrect;
    }
      correctCnt.textContent = correctCounter;
    }

  function getIncorrectAnswers(){
    // Get stored value from client storage, if it exists
    var storedIncorrect = localStorage.getItem("incorrectCount");
    // If stored value doesn't exist, set counter to 0
    if (storedIncorrect === null) {
      incorrectCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      incorrectCounter = storedIncorrect;
    }
      incorrectCnt.textContent = incorrectCounter;
  }

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()

   // Resets win and loss counts
   correctCounter = 0;
   incorrectCounter = 0;
   // Renders win and loss counts and sets them into client storage
   setCorrect()
   setIncorrect()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);


// // Tests if guessed letter is in word and renders it to the screen.
// function checkLetters(letter) {
//   var letterInWord = false;
//   for (var i = 0; i < numBlanks; i++) {
//     if (chosenWord[i] === letter) {
//       letterInWord = true;
//     }
//   }
//   if (letterInWord) {
//     for (var j = 0; j < numBlanks; j++) {
//       if (chosenWord[j] === letter) {
//         blanksLetters[j] = letter;
//       }
//     }
//     wordBlank.textContent = blanksLetters.join(" ");
//   }
// }

// // Attach event listener to document to listen for key event
// document.addEventListener("keydown", function(event) {
//   // If the count is zero, exit function
//   if (timerCount === 0) {
//     return;
//   }
//   // Convert all keys to lower case
//   var key = event.key.toLowerCase();
//   var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
//   // Test if key pushed is letter
//   if (alphabetNumericCharacters.includes(key)) {
  //     var letterGuessed = event.key;
  //     checkLetters(letterGuessed)
  //     checkWin();
  //   }
  // });
