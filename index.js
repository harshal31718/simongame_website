var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;

$(document).keypress(function () {
  nextSequence();
});
$(".btn").click(function () {
  if (level != -1) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    soundAndAnimation(userChosenColor);

    checkAnswer();
  } else gameOver();
  //   console.log(userClickedPattern.length);
});

function nextSequence() {
  // random genration
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); // updating game
  soundAndAnimation(randomChosenColor);
}

// function for sound and animation
function soundAndAnimation(elementId) {
  $("#" + elementId).addClass("pressed");
  var audio = new Audio("sounds/" + elementId + ".mp3");
  audio.play();
  setTimeout(function () {
    $("#" + elementId).removeClass("pressed");
  }, 100);
}

function checkAnswer() {
  var last = userClickedPattern.length - 1;
  console.log(last);
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (userClickedPattern[last] === gamePattern[last]) {
    // console.log("succes");
    if (checkArray()) {
      console.log("win");
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    restart();
  }
}

function gameOver() {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over!! Press Any Key to Restart");
  restart();
}

function restart() {
  gamePattern = [];
  level = -1;
}

function checkArray() {
  if (gamePattern.length === userClickedPattern.length) {
    for (var i = 0; i < gamePattern.length; i++) {
      if (gamePattern[i] !== userClickedPattern[i]) return 0;
    }
    return 1;
  }
  return 0;
}
