var playing = false;
var score;
var trialsLeft;
var step;
var action; //used for the set interval action
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "watermelon"
];

$(function() {
  $("#startreset").click(function() {
    //Click start/reset button
    //we are playing
    if (playing) {
      location.reload(); //reload the page
    }
    //we are not playing
    else {
      playing = true; //started playing
      score = 0; //set score to 0
      $("#scorevalue").html(score); //set score to 0
      $("#trialsLeft").show(); //show trials left box
      trialsLeft = 3;
      addHearts(); //add hearts
      $("#gameOver").hide(); //hide game over box
      $("#startreset").html("Reset Game"); //change button text to "Reset Game"
      startAction(); //start sending fruits
    }
  });

  //Slice a fruit
  $("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); //Update the score
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound
    //stop fruit
    clearInterval(action);
    //hide fruit using animation
    $("#fruit1").hide("explode", 400);
    //wait for 800ms and then send new fruit
    setTimeout(startAction, 800);
  });

  //Functions

  //add hearts
  function addHearts() {
    $("#trialsLeft").empty();
    for (i = 0; i < trialsLeft; i++) {
      $("#trialsLeft").append('<img class="life" src="images/heart.png">');
    }
  }

  // randomly create fuit and start moving it
  // check to see if the player lost and send game over message.
  function startAction() {
    $("#fruit1").show();
    chooseFruit(); //choose a random fruit
    $("#fruit1").css({
      left: Math.round(Math.random() * 550),
      top: -50
    }); //Random position

    //generate a random step
    step = 1 + Math.round(5 * Math.random());

    //move fruit down by one step every 10ms
    action = setInterval(function() {
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      //is fruit too low?
      if ($("#fruit1").position().top > $("#fruitContainer").height()) {
        //check if we have trials left
        if (trialsLeft > 1) {
          $("#fruit1").show();
          chooseFruit(); //choose a random fruit
          $("#fruit1").css({
            left: Math.round(Math.random() * 550),
            top: -50
          }); //Random position

          //generate a random step
          step = 1 + Math.round(5 * Math.random());

          //reduce lives by one
          trialsLeft--;
          addHearts(); //populate trials left box
        } else {
          //game over
          playing = false;
          $("#startreset").html("Start Game"); //change start button text to "start game"
          //show game over
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsLeft").hide();
          stopAction();
        }
      }
    }, 10);
  }

  //generate a random fruit
  function chooseFruit() {
    var randomFruit = Math.round(Math.random() * 8);
    //create a random fruit
    $("#fruit1").attr("src", "images/" + fruits[randomFruit] + ".png");
  }

  //stop dropping fruits
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
