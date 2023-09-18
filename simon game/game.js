var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level"+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){//which button got clicked
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);//make sound
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press any key to restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}


function nextSequence()//generating random sequence from colors
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("levle"+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // animate the random
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ $("#"+currentColour).removeClass("pressed");},100);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
