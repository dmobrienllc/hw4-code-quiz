// Assignment Code
const startBtn = document.querySelector("#start-quiz");
startBtn.addEventListener("click", initTime);

const timeEl = document.querySelector("#time");
const mainEl = document.querySelector("#result");

let stats = {
    numCorrect: 0,
    numWrong:0
}

function initTime() {
  var timerInterval = setInterval(function() {
    let secondsLeft = 60;
    let gameStarted = false;
    timeEl.textContent = "Timer: " + secondsLeft;
    secondsLeft--;

    //start our game; do I need to do a callback to make this async
    if(!gameStarted && secondsLeft === 60)
    {
        gameStarted = true;
        startGame();
    }

    if(secondsLeft === 0 && gameStarted) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

function startGame(){
    //fill array of question objects
    //present one by one to user and trap result from call
    //to start, just populate a collection of "li" elements
    //with buttons for the answers, so just a test array now
    let testQuestion = "Arrays in javascript can be used to hold __________?";
    let answers = ["boolean","string","object","all of the above"];

    //select ul parent
    var ulEl = document.querySelector("#answer-list");
    
    answers.forEach(function(answer,index){
        var liEl = document.createElement("li");
        var buttonEl = document.createElement("button")
        //prepend with question id?
        buttonEl.setAttribute("id","1:" + index)
        buttonEl.setAttribute("value",answer)

        buttonEl.addEventListener("click", function() {
            // if (count < 24) {
            //   count++;
            //   counter.textContent = count;
            //   localStorage.setItem("count", count);
            // }
            alert("Value: " + buttonEl.value)
          });
        liEl.appendChild(buttonEl);
        ulEl.appendChild(liEl);
    });

}

// Function to create and append colorsplosion image
function sendMessage() {
  timeEl.textContent = "Time's UP!!";
 
    var pEl = document.createElement("p");
    pEl.innerHTML = "The results go here!"
    mainEl.appendChild(pEl);
}

// var student = document.getElementById("student-names");
// var grade = document.getElementById("grades");
// var comment = document.getElementById("msg");
// var saveButton = document.getElementById("save");
// var savedName = document.getElementById("saved-name");

// saveButton.addEventListener("click", function(event) {
// event.preventDefault();

// var studentGrade = {
//   student: student.value,
//   grade: grade.value,
//   comment: comment.value.trim()
// };

// localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
// renderMessage();

// });

// function renderMessage() {
//   var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
//   if (lastGrade !== null) {
//     document.querySelector(".message").textContent = lastGrade.student + 
//     " received a/an " + lastGrade.grade
//   }
// }


// var counter = document.querySelector("#counter");
// var addButton = document.querySelector("#add");
// var subtractButton = document.querySelector("#subtract");

// var count = localStorage.getItem("count");

// counter.textContent = count;

// addButton.addEventListener("click", function() {
//   if (count < 24) {
//     count++;
//     counter.textContent = count;
//     localStorage.setItem("count", count);
//   }
// });

// subtractButton.addEventListener("click", function() {
//   if (count > 0) {
//     count--;
//     counter.textContent = count;
//     localStorage.setItem("count", count);
//   }
// });

// var passwordInfoDto={
//   pwdLength:0,
//   useLower:false,
//   useUpper:false,
//   useNumeric:false,
//   useSpecialChars:false,
//   password:"",
//   writeValues: function(){
//     return "Password Length: " + this.pwdLength +
//     "\nUse Lower Case: " + this.useLower +
//     "\nUse Upper Case: " + this.useUpper +
//     "\nUse Numeric Chars: " + this.useNumeric +
//     "\nUse Special Chars: " + this.useSpecialChars 
//   }
// }

// function writePassword() {
//   var passwordInfoDto = generatePassword();
//   var passwordText = document.querySelector("#password");
//   var passwordCriteria = document.querySelector("#password-criteria");

//   passwordText.value = passwordInfoDto.password;
//   passwordCriteria.value = passwordInfoDto.writeValues();
// }

// //Sets up password criteria and returns object
// function generatePassword() {

//   passwordInfoDto.password = "";
//   passwordInfoDto.pwdLength = validateNumberOfChars();
//   passwordInfoDto.useLower = confirm("Would you like lowercase characters in your password?");
//   passwordInfoDto.useUpper = confirm("Would you like UPPER CASE characters in your password?");
//   passwordInfoDto.useSpecialChars = confirm("Would you like special characters in your password");
//   passwordInfoDto.useNumeric = confirm("Would you like numeric characters in your password");

//   //init pwd char vars
//   var length = (passwordInfoDto.pwdLength>0)?(passwordInfoDto.pwdLength):(8);
//   var alphaChars = "abcdefghijklmnopqrstuvwxyz"; //to upper 
//   var numericChars = '0123456789';
//   var specialChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
//   var character = "";

//     while( passwordInfoDto.password.length<length ) {
//       if(passwordInfoDto.useLower)
//       {
//         alphaCharSelector = Math.ceil(alphaChars.length * Math.random()*Math.random());
//         character += alphaChars.charAt( alphaCharSelector );
//       }

//       if(passwordInfoDto.useUpper)
//       {
//         alphaCharSelector = Math.ceil(alphaChars.length * Math.random()*Math.random());
//         character += alphaChars.charAt( alphaCharSelector ).toUpperCase();
//       }
        
//       if(passwordInfoDto.useNumeric)
//       {
//         numCharSelector = Math.ceil(numericChars.length * Math.random()*Math.random());
//         character += numericChars.charAt( numCharSelector );
//       }
        
//       if(passwordInfoDto.useSpecialChars)
//       {
//         specCharSelector = Math.ceil(specialChars.length * Math.random()*Math.random());
//         character += specialChars.charAt( specCharSelector );
//       }
      
//       passwordInfoDto.password = character;
//     }
//     passwordInfoDto.password=passwordInfoDto.password.split('').sort(function(){return 0.5-Math.random()}).join('');
//     passwordInfoDto.password.substr(0,passwordInfoDto.pwdLength);
//     return passwordInfoDto;
// }

// function validateNumberOfChars(){
//   let input = 0;
//   while (input = prompt("Please enter desired password length, between 8 and 128 characters!",8)) {
//     if (isNaN(input) || 
//           (input < 8 || input > 128)) {
//       alert("Input must be a number between 8 and 128!");
//     } 
//     else {
//       return parseInt(input);
//     }
//   }
//   alert("Your password will default to 8 characters!");
//   return 8;
// }



//Temp code save
// //Page elements
// var submitEl = document.querySelector("#submit");
// var nameInput = document.querySelector("#name");
// var emailInput = document.querySelector("#email");
// var submissionResponseEl = document.querySelector("#response");
// var timeEl = document.querySelector(".time");
// var mainEl = document.querySelector("#main");
// //var mainEl = document.getElementById("main");

// //What do you need to create to satisfy the requirements?
// //Oject collection of 'Question' objects
//     -objQuestion

// class Question {
//     constructor(questionText, Answer) {
//         this.name = lName;
//         this.age = lAge;
//         this.talk = function () {
//             msg = "Hi! my name is " + this.name;
//             msg += " and I’m " + this.age;
//             alert(msg);
//         }; // end talk method
//     }
// } 

//     function main(){
//     //build two questions
//     critterA = new Question("Alpha", 1);
//     critterB = new Question("Beta", 2);
//     critterB.name = "Charlie";
//     critterB.age = 3;
//     //have 'em talk
//     critterA.talk();
//     critterB.talk();
//     } // end main 
       

// var secondsLeft = 10;

// function setTime() {
//   // Sets interval in variable
//   var timerInterval = setInterval(function() {
//     secondsLeft--;
//     timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

//     if(secondsLeft === 0) {
//       // Stops execution of action at set interval
//       clearInterval(timerInterval);
//       // Calls function to create and append image
//       sendMessage();
//     }

//   }, 1000);
// }

// // Function to create and append colorsplosion image
// function sendMessage() {
//   timeEl.textContent = " ";
//   var imgEl = document.createElement("img");
//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);

// }

// setTime();


// // Action to be performed on click store in named function
// function showResponse(event) {
//   // Prevent default action
//   event.preventDefault();
//   console.log(event);
//   var response = "Thank you for your submission " + nameInput.value + "! We will reach out to you at " + emailInput.value + ".";
//   submissionResponseEl.textContent = response;
// }
  
// // Add listener to submit element
// submitEl.addEventListener("click", showResponse);

