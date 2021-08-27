var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = false;

var level = 0;
// //console.log(buttonColours[2]);
// //var randomChosenColour = buttonColours[randomNumber];
// //console.log(buttonColours);
//
$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  //console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        console.log("wrong");
        var audioWrong = new Audio("sounds/wrong.mp3");
            audioWrong.play();
            $("body").addClass("game-over");
            setTimeout(function() {
              $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
      }
}

function nextSequence() {
  userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    //console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    //console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);
    $("#" + randomChosenColour).fadeOut(50).fadeIn();

    // $("#" + randomChosenColour).on("click", function () {
    //   $("#" + randomChosenColour).fadeOut(50).fadeIn();
      //var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
          //audio.play();
          playSound(randomChosenColour);
    //});
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// console.log(nextSequence());
