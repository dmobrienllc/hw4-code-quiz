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

let questionsArray = [];

//Not used yet, when done I'll populate thiw when user saves initials, 
//then stringify it into json and store in local storage
class Game{
  constructor(index, dateTime,numCorrect,numIncorrect,initials) {
    this.index = index;
    this.dateTime = dateTime;
    this.numCorrect = numCorrect;
    this.numIncorrect = numIncorrect;
    this.initials = initials;
  }
}

//Parent question object
//method answered correctly not being used atm, maybe factor out
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

//child Answer object
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

function init() {
  localStorage.setItem("correctAnswers",0);
  localStorage.setItem("incorrectAnswers",0);

  loadQuestions();
}

//start button onclick
function startGame() {
  timerCount = 30;
  startButton.disabled = true;

  //questionsArray is zeroed out on Reset onclick, so load again
  //if user wants to play another game
  if(questionsArray.length === 0)
  {
    loadQuestions();
  }
  
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

    //processAnswer method sets stopTimer to true
    //if no more questions left to deliver
    //if no more questions.
    if (timerCount === 0 || stopTimer) {
      clearInterval(timer); 
    }
  }, 1000);
}

//resetGame
//zero it all out
function resetGame() {
  correctCounter = 0;
  incorrectCounter = 0;
  stopTimer = false;
  timerCnt.innerText = 30;
  correctCnt.innerText = 0;
  incorrectCnt.innerText = 0;
  startButton.disabled = false;
  questionsArray.length = 0;
  localStorage.setItem("correctCount","");
  localStorage.setItem("incorrectCount","");
}

//renderQuestion
//get next requested question to the page
//NOTE: The eventListener being added to the
//button; if you're not doing this you should,
//makes your life way easier!!
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

//processAnswer
//sets correct/incorrect values
//determines whether to serve another question or displayt results
//REFACTOR: break this out into two methods to sep concerns
function processAnswer(questTmp,answerTmp){
  console.log("ProcessAnswerTmpQst " + questTmp.correctAnswerIndex + " | Selected:" + answerTmp.index);

  if(setCorrectIncorrect(answerTmp.isCorrect)){
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
  console.log("Question index after increment" + questionIndex);

  //get next question or end if no  more questions
  if(questionIndex > (questionsArray.length -1)){
    displayResults();
  }
  else{
    renderQuestion(questionIndex);
  }
}

//setCorrectIncorrect
//updates appropriate entities based on correction/incorrect answer
function setCorrectIncorrect(isCorrect){
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

//displayResults
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

  //loadQuestions
  //REFACTORThis function to be refactored to call a 'create' constructor to
  //avoid duplication
  //In the real world you'd probably pull all this from the database so
  //here I'm just hard coding the questions to input.
  function loadQuestions(){

    //ensure we do a fresh load
    if(questionsArray.length>0)
    {
      questionsArray.length = 0;
    }

    //NOTE: Hard coding correct answer index to pass to the constructor,
    //in real world I'd have this information coming back from my data
    //store so this would be much more elegant
    let testQuestion = "Arrays in javascript can be used to hold __________?";
    let answers = ["boolean","string","object","all of the above"];
    addQuestionToCollection(testQuestion,answers,3)

    testQuestion = "Which built-in method calls a function for each element in the array __________?";
    answers = ["while()","loop()","forEach()","none of the above"];
    addQuestionToCollection(testQuestion,answers,2)

    testQuestion = "Which of the following function of String object combines the text of two strings and returns a new string __________?";
    answers = ["add()","concat()","merge()","append()"];
    addQuestionToCollection(testQuestion,answers,1)

    testQuestion = "Which of the following function of String object returns the characters " +
                    "in a string between two indexes into the string ___________?"
    answers = ["slice()","split()","subst()","substring()"];   
    addQuestionToCollection(testQuestion,answers,3)
  
  }

  //addQuestionToCollection
  //Hydrates Question object and pushes on to the collection array
  function addQuestionToCollection(questionText,answersArray,correctAnswerIndex){

    let tmpQuest = new Question((questionsArray.length+1),questionText,correctAnswerIndex);
    let tmpAns;

    alert(tmpQuest.index + tmpQuest.correctAnswerIndex);

    answersArray.forEach(function(answer,index){
      if(index === correctAnswerIndex){
        tmpAns = new Answer(answer,index,tmpQuest.index,true);
      }
      else{
        tmpAns = new Answer(answer,index,tmpQuest.index,false);
      }
      tmpQuest.answers[index] = tmpAns;
    });

    questionsArray.push(tmpQuest)
  }

startButton.addEventListener("click", startGame);

var resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", resetGame);

// Calls init() so that it fires when page opened
init();

