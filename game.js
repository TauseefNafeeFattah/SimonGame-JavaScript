var colors = ["red","blue","green","yellow"];

var gameContinue = false;
var sequence = [];
var userSequence = [];

var level = -1;
// handles computer click

$(document).keydown(function(event){
  if (!(gameContinue)){
    if ($("body").hasClass("game-over")){
       $("body").removeClass("game-over")
    }
    setTimeout(startGame,50);
 //   startGame();
  }
});
function startGame(){

  gameContinue = true;

  count = 0;
  nextSequence();
}
function startOver(){
  $("h1").html("Game Over. Level reached: " + level +"\n Press A key to play again");
  level = -1;
  gameContinue = false;
  sequence = [];
  if (!($("body").hasClass("game-over"))){
    $("body").addClass("game-over")
  }


}
function nextSequence(){

  var randomNumber = Math.floor(Math.random()*4) ;
  randomColor = colors[randomNumber];
  sequence.push(randomColor);

  $("#"+randomColor).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+randomColor+".mp3");
  audio.play();

  level += 1;
  $("h1").html("Level: " + level);
  count = 0;
}

// handles user click
$(".btn").click(function(){
  if (gameContinue == true){
    var userColor = $(this).attr("id");
    userSequence.push(userColor);
// makesound
    var audio = new Audio("sounds/"+this.id+".mp3");
    audio.play();
// animate press
    $("#"+userColor).addClass("pressed");

    setTimeout(function(){
      $("#"+userColor).removeClass("pressed");}, 100);

    // check answer
    if (sequence[count] != userColor){
      gameContinue = false;
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      startOver();
    }
    else{
      if (count == level){
        setTimeout(nextSequence, 100);

      }
      count+=1;
    }
  }
  else{
    console.log(gameContinue);
  }
});
