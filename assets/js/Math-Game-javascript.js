var playing = false;
var score;
var action;
var timeremaining;

// if we click on the start/reset
function start_reset() {
  if (playing !== true) {
    // if we are not playing
    hide("gameOver");
    score = 0; //set score to 0
    document.getElementById("scorevalue").innerHTML = score; //set score to 0
    show("timeremaining"); //show countdown box
    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    document.getElementById("startreset").innerHTML = "Reset Game"; //change button to reset
    playing = true;
    generateQA();
    startCountDown();
  } else {
    // if we are playing
    location.reload(); //reloads our page
  }
}

//Functions

//Start counter
function startCountDown() {
  action = setInterval(function() {
    timeremaining--;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining; //Updates the time remaining element in html
    if (timeremaining == 0) {
      // Game over
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//Stop the counter
function stopCountdown() {
  clearInterval(action);
}

//Hides a certain element
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//Shows a vertain element
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

//generate new Q&A
function generateQA() {
  //check to make sure that the new question is not thesame as the past question
  var currentQ = document.getElementById("question").innerHTML;
  var reverseQ = currentQ.split("");
  reverseQ = reverseQ.reverse();
  reverseQ = reverseQ.join("");
  do {
    var x = 1 + Math.round(Math.random() * 11);
    var y = 1 + Math.round(Math.random() * 11);
    correctAnswer = x * y;
    var newQuestion = x + "x" + y;
  } while (currentQ == newQuestion || reverseQ == newQuestion);
  document.getElementById("question").innerHTML = newQuestion; //Displays the new question
  correctBox = 1 + Math.round(Math.random() * 3); //Which box the right answer goes in
  //generate wrong answers and place correctAnswer
  //Make sure all boxes don't have thesame wrong answer
  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    var wrongAnswer = randMultiple();
    while (answers.indexOf(wrongAnswer) > -1) {
      wrongAnswer = randMultiple();
    }
    if (i !== correctBox) {
      answers.push(wrongAnswer);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
    } else {
      document.getElementById("box" + i).innerHTML = correctAnswer;
    }
  }
}

//generate random multiple
function randMultiple() {
  return (
    (1 + Math.round(Math.random() * 11)) * (Math.round(Math.random() * 11) + 1)
  );
}

///If we click on an answer box (for loop)
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    if (playing) {
      //if we are playing
      if (this.innerHTML == correctAnswer) {
        //If correct
        score++; //increase score by 1
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        //show correct box for one second
        setTimeout(function() {
          hide("correct");
        }, 1000);
        generateQA(); //generate new Q&A
      } else {
        //If wrong
        hide("correct");
        show("wrong");
        //show try again box for one second
        setTimeout(function() {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
