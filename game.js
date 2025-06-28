

var gamepattern=[];
var buttoncolors=["red", "blue", "green", "yellow"];

var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("level"+level);
        nextsequence();
        started=true;
    }
})


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkanswer(gamepattern.length-1);
})


function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level"+level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomchosencolor=buttoncolors[randomnumber];
    gamepattern.push(randomchosencolor);

    $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomchosencolor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)

}

function checkanswer(currentlevel){
    if(gamepattern[currentlevel]===userClickedPattern[currentlevel])
    {
        
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }


    }
    else{
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text( "Game Over, Press Any Key to Restart");
        startover();
    }
}

function startover(){
    gamepattern=[];
    level=0;
    started=false;

}