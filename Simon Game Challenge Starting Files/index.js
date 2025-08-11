// // Playing sounds
var len = document.querySelectorAll(".btn").length;
for (let i = 0; i < len; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var att = this.getAttribute("id");
    var audio=new Audio(`./sounds/${att}.mp3`);
    audio.play();
  });
}



var game = ["green", "red", "yellow", "blue"];
var playerSequence = [];
var computerSequence = [];
var level = 0;
var started = false;

// Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    level = 1;
    started = true;
    playerSequence = [];
    computerSequence = [];
    nextSequence();
  }
});

function nextSequence() {
  document.querySelector("#level-title").innerHTML = "Level " + level;
  var randomColor = game[Math.floor(Math.random() * game.length)];
  computerSequence.push(randomColor);
  flashButton(randomColor);
  playerSequence = [];
}

// Visual flash effect
function flashButton(color) {
  let btn = document.querySelector("#" + color);
    var audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
  btn.classList.add("compSelected");
  setTimeout(() => btn.classList.remove("compSelected"), 500);
}

// Button click logic
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function () {
    this.classList.add("pressed");
    setTimeout(()=>{
        this.classList.remove("pressed");
    },100);
    let userColor = this.getAttribute("id");
    playerSequence.push(userColor);
    check(playerSequence.length - 1);
  });
});

// Check function with current step
function check(currentIndex) {
  if (playerSequence[currentIndex] !== computerSequence[currentIndex]) {
    document.querySelector("#level-title").innerHTML = "Game Over,Press Any Key to Continue";
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    startOver();
  } else if (playerSequence.length === computerSequence.length) {
    // Move to next level
    setTimeout(() => {
      level++;
      nextSequence();
    }, 1000);
  }
}

// Reset game
function startOver() {
  level = 0;
  playerSequence = [];
  computerSequence = [];
  started = false;
}
