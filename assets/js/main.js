let correctCnt = document.querySelector(".correct-count");
let incorrectCnt = document.querySelector(".incorrect-count");
let timerCnt = document.querySelector(".timer-count");
let startButton = document.querySelector(".start-button");
let timer;
let timerCount;

let gamesCounter = 0;
let questionsCounter = 0;
let correctCounter = 0;
let incorrectCounter = 0;
let stopTimer = false

class Game{
  constructor(index, dateTime,numCorrect,numIncorrect,initials) {
    this.index = index;
    this.dateTime = dateTime;
    this.numCorrect = numCorrect;
    this.numIncorrect = numIncorrect;
    this.initials = initials;
  }
}

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

function init() {
  localStorage.setItem("correctAnswers",0);
  localStorage.setItem("incorrectAnswers",0);
  loadQuestions();
}

//start button onclick
function startGame() {
  timerCount = 30;
  startButton.disabled = true;

  startTimer()

  //render first question, do this more elegantly later
  renderQuestion(0);
}

function stopGame(){
  
}

function startTimer() {

  timer = setInterval(function() {
    timerCount--;
    timerCnt.textContent = timerCount;

    //processAnswer method set stopTimer to true
    //if no more questions.
    if (timerCount === 0 || stopTimer) {
      clearInterval(timer); 
    }
  }, 1000);
}

//get next requested question to the page
function renderQuestion(questionIndex) {
  let questTmp = questionsArray[questionIndex];

  let pQuestionEl = document.querySelector("#question-text");
  pQuestionEl.innerHTML = questTmp.questionText;

  //select ul parent and clear children for next list
  let ulEl = document.querySelector("#answer-list");
  //I'm sure there's a better way to do this
  while( ulEl.firstChild ){
    ulEl.removeChild( ulEl.firstChild );
  }

  questTmp.answers.forEach(function(answer,index){
    let liEl = document.createElement("li");
    let buttonEl = document.createElement("button")
      buttonEl.setAttribute("class","answer-button");
      buttonEl.setAttribute("id",index);
      buttonEl.setAttribute("value",answer.answerText);
      buttonEl.setAttribute("data-correct-answer",answer.isCorrect);
      buttonEl.innerText = answer.answerText;

      buttonEl.addEventListener("click", function() {
            processAnswer(questTmp,answer);
        });
      liEl.appendChild(buttonEl);
      ulEl.appendChild(liEl);
  });
}

//process the answer function
function processAnswer(questTmp,answerTmp){
  console.log("ProcessAnswerTmpQst " + questTmp.correctAnswerIndex + " | Selected:" + answerTmp.index);

  if(SetCorrectIncorrect(answerTmp.isCorrect)){
    console.log(questTmp.correctAnswerIndex + "| " + answerTmp.index 
      + " " + questTmp.questionText + " answered correctly!")
      alert("Correct!");
  }
  else{
    console.log(questTmp.correctAnswerIndex + "| " + answerTmp.index + " " 
      + questTmp.questionText + " answered incorrectly!")
      alert("Incorrect!");
  }

  let questionIndex = questTmp.index++;

  //get next question or end if no  more questions
  if(questionIndex > (questionsArray.length - 1)){
    displayResults();
  }
  else{
    renderQuestion(questionIndex);
  }
}

function SetCorrectIncorrect(isCorrect){
  if(isCorrect){
    correctCounter++;
    correctCnt.innerText = correctCounter;
    localStorage.setItem("correctAnswers",correctCounter);
    return true;
  }
  else{
    incorrectCounter++;
    localStorage.setItem("incorrectAnswers",incorrectCounter)
    incorrectCnt.innerText = incorrectCounter;
    return false;
  }
}

//put together meaningful results based on correct/incorrect
function displayResults()
{
  stopTimer = true;

  let pQuestionEl = document.querySelector("#question-text");

  let correctCnt = localStorage.getItem("correctAnswers");
  let incorrectCnt = localStorage.getItem("incorrectAnswers");

  console.log("Display: No More Questions! Correct: " +
      correctCnt + " Incorrect: " + incorrectCnt);

  if(correctCnt === 0){
    pQuestionEl.innerText = "How could you not answer a single question?!?!"
  }else if(correctCnt > incorrectCnt){
    pQuestionEl.innerText = "There's no question, you've defeated the quiz!!"
  }else if(correctCnt < incorrectCnt){
    pQuestionEl.innerText = "There's no question, you've been defeated by the quiz!!"
  }else{
    pQuestionEl.innerText = "There's no question, you've tied the quiz!!!"
  }
  
  //are there extension methods in js? cleaner to do it,
  //at least make this a function and pass ul to it.
  let ulEl = document.querySelector("#answer-list");

  while( ulEl.firstChild ){
    ulEl.removeChild( ulEl.firstChild );
  }
}

  //This function to be refactored to call a 'create' constructor to
  //avoid duplication
  function loadQuestions(){

    //ensure we do a fresh load
    if(questionsArray.length>0)
    {
      questionsArray.length = 0;
    }

    let testQuestion = "Arrays in javascript can be used to hold __________?";
    let answers = ["boolean","string","object","all of the above"];
    let question = new Question(1,testQuestion,3);
    let tmp;

    answers.forEach(function(answer,index){
      if(index === 3){
        tmp = new Answer(answer,index,question.index,true);
      }
      else{
        tmp = new Answer(answer,index,question.index,false);
      }
      question.answers[index] = tmp;
    });

    questionsArray[0] = question;

    let testQuestion2 = "Which built-in method calls a function for each element in the array __________?";
    let answers2 = ["while()","loop()","forEach()","none of the above"];
    let question2 = new Question(2,testQuestion2,2);

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

    let testQuestion3 = "Which of the following function of String object combines the text of two strings and returns a new string? __________?";
    let answers3 = ["add()","concat()","merge()","append()"];
    let question3 = new Question(3,testQuestion3,1);

    answers3.forEach(function(answer,index){
      if(index === 1){
        tmp = new Answer(answer,index,question3.index,true);
      }
      else{
        tmp = new Answer(answer,index,question3.index,false);
      }
      question3.answers[index] = tmp;
    });
    questionsArray[2] = question3;
  }

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  correctCounter = 0;
  incorrectCounter = 0;
  stopTimer = false;
  timerCnt.innerText = 30;
  correctCnt.innerText = 0;
  incorrectCnt.innerText = 0;
  startButton.disabled = false;
  localStorage.setItem("correctCount","");
  localStorage.setItem("incorrectCount","");
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);



// function SetCorrectIncorrect(correctIndex,chosenIndex){
//   if(correctIndex === chosenIndex){
//     correctCounter++;
//     correctCnt.innerText = correctCounter;
//     localStorage.setItem("correctAnswers",correctCounter);
//     return true;
//   }
//   else{
//     incorrectCounter++;
//     alert("Set incorrect " + incorrectCounter);
//     localStorage.setItem("incorrectAnswers",incorrectCounter)
//     incorrectCnt.innerText = incorrectCounter;
//     return false;
//   }
// }

// function getCorrectAnswers(){
//   // Get stored value from client storage, if it exists
//   var storedCorrect = localStorage.getItem("correctCount");
//   // If stored value doesn't exist, set counter to 0
//   if (storedCorrect === null) {
//     correctCounter = 0;
//   } else {
//     // If a value is retrieved from client storage set the winCounter to that value
//     correctCounter = storedCorrect;
//   }
//     correctCnt.textContent = correctCounter;
//   }

// function getIncorrectAnswers(){
//   // Get stored value from client storage, if it exists
//   var storedIncorrect = localStorage.getItem("incorrectCount");
//   // If stored value doesn't exist, set counter to 0
//   if (storedIncorrect === null) {
//     incorrectCounter = 0;
//   } else {
//     // If a value is retrieved from client storage set the winCounter to that value
//     incorrectCounter = storedIncorrect;
//   }
//     incorrectCnt.textContent = incorrectCounter;
// }

// var container = document.querySelector(".container");
// var para = document.querySelector("#result");

// container.addEventListener("click", function(event) {
//   var element = event.target;
//   console.log(element);

//   var state = element.getAttribute("data-state");
//   var number = element.getAttribute("data-number");

//   "[id='22']"
//   var selectionAttString = "[data-number='" + number + "']";

//   var divEl = document.querySelector(selectionAttString);
//   divEl.innerHTML = number;
  
//   element.setAttribute("data-state", "visible");

//   para.innerHTML= state + number;
// });

// function processAnswer(questTmp,answerIndex){
//   alert("QuestionIndex: " + questTmp.index + "You answered: " + answerIndex)

//   console.log("ProcessAnswerTmpQst " + questTmp.correctAnswerIndex + " | Selected:" + answerIndex);

//   //Return message should be human friendly. write this to p tag
//   if(SetCorrectIncorrect(questTmp.correctAnswerIndex,answerIndex)){
//     alert(questTmp.correctAnswerIndex + "| " + answerIndex 
//       + " " + questTmp.questionText + " answered correctly!")
//   }
//   else{
//     alert(questTmp.correctAnswerIndex + "| " + answerIndex + " " 
//       + questTmp.questionText + " answered incorrectly!")
//   }

//   let questionIndex = questTmp.index++;

//   //get next question or end if no  more questions
//   if(questionIndex > (questionsArray.length - 1)){
//     displayResults();
//   }
//   else{
//     renderQuestion(questionIndex);
//   }
// }
