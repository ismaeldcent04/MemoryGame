"use strict";
var gamePattern = [];
var usserClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomNumber;
var started = false;
var level = 0;
var randomChosenColor;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userchosencolour = $(this).attr("id");
  usserClickedPattern.push(userchosencolour);
  makesound(userchosencolour);
  animatePress(userchosencolour);
  checkAnswer(usserClickedPattern.length - 1);
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === usserClickedPattern[currentlevel]) {
    if (gamePattern.length === usserClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    makesound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    starOver();
  }
}

function nextSequence() {
  usserClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random(randomNumber) * 4);
  randomChosenColor = randomColor(randomNumber);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  makesound(randomChosenColor);
  addPattern();
}

function randomColor() {
  var random = buttonColors[randomNumber];
  return random;
}
function addPattern() {
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function makesound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function starOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
