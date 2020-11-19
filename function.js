var main = document.getElementById("arrow")
let startButton = document.getElementById("startbutton")
var up = './arrow/arrow-up.png'
var down = './arrow/arrow-down.png'
var right = './arrow/arrow-right.png'
var left = './arrow/arrow-left.png'
let question = ""
let keyPressed = 0
const limitNum = 1             //set required button press here
let codeLeft = limitNum         
let timer = 2                  //set timer here
var countTimer
let gameStart = false
let miss = 0

//audio var
let sound = new Audio("./sound/button.wav")
let bgm = new Audio("./sound/shepard-tone.mp3")
let fiuw = new Audio("./sound/phiuw.wav")
let boom = new Audio("./sound/jeger.wav")
let victory = new Audio("./sound/dissidia.mp3")

//bottom of variable area



//function to make random arrow
function arrowCreator() {
    var randomNum = Math.floor(Math.random() * 41) + 1 
    if (randomNum > 0 && randomNum <= 10) {
        question = "ArrowUp"
        document.getElementById("arrow").src=up
    }
    if (randomNum > 10 && randomNum <= 20) {
        question = "ArrowDown"
        document.getElementById('arrow').src=down
    }
    if (randomNum > 20 && randomNum <= 30) {
        question = "ArrowRight"
        document.getElementById('arrow').src=right
    }
    if (randomNum > 30 && randomNum <= 40) {
        question = "ArrowLeft"
        document.getElementById('arrow').src=left
    }
}

//Start the game
function startIt() {
    gameStart = true
    main.style="visibility: visible;"
    startButton.style="visibility: hidden;"
    console.log(question);
    document.getElementById("timeleft").innerHTML = timer + " seconds";
    document.getElementById("missed").innerHTML = "0"
    document.getElementById("keyleft").innerHTML = "0"
    document.getElementById("keypressed").innerHTML = "0"
    document.getElementById("popup").innerHTML = "good luck!!!"
    bgm.play()
}

//timer handler
function countdown() {
    countTimer = setInterval(function(){
    if(timer <= 0){
        clearInterval(countTimer);
        document.getElementById("timeleft").innerHTML = "time's up";
        gameStart = false
        document.getElementById("popup").innerHTML = "the world is gonna end. at least you tried..."
        main.style="visibility: hidden;"
        bgm.pause();
        fiuw.play()
        fiuw.onended = function(){
            boom.play()
        };
        if (keyPressed == 0) {
            document.getElementById("popup").innerHTML = "how dare you! i guess some people just want to watch the world burn..."

        }
    } else {
        document.getElementById("timeleft").innerHTML = timer + " seconds";
    }
    timer -= 1;
    }, 1000);
}
function stopCount() {
    clearInterval(countTimer);
}


//start handler
startButton.onclick = function() {
    arrowCreator(),startIt(),countdown()
};

//key input handler
document.addEventListener('keydown', function(event) {
    console.log(event.code);
    if (gameStart == true) {
        if (miss == 0) {
            document.getElementById("statuscombo").innerHTML = "perfect"
        } else if (miss < 5 && miss > 0) {
            document.getElementById("statuscombo").innerHTML = "good"
        } else if (miss > 10) {
            document.getElementById("statuscombo").innerHTML = "oh my god! the world's gonna end"
        }


        if (event.code != "ArrowLeft" && event.code != "ArrowRight" && event.code != "ArrowDown" && event.code != "ArrowUp") {
            document.getElementById("popup").innerHTML = "press the arrow key !!!"
        } else if (event.code !== question) {
            codeLeft = limitNum
            sound.play()
            document.getElementById("keyleft").innerHTML = codeLeft
            keyPressed ++
            document.getElementById("keypressed").innerHTML = keyPressed
            document.getElementById("popup").innerHTML = "don't panic! concentrate!!!"
            miss ++
            document.getElementById("missed").innerHTML = miss

            arrowCreator()
            // music.pause();
            // music.currentTime = 0
            // i=0
            // j=0
            // score=0 
            // timeleft=0
            // command.pause();
            // command.currentTime = 0
        } else if (event.code === question) {
            arrowCreator()
            sound.play()
            codeLeft --
            document.getElementById("keyleft").innerHTML = codeLeft
            keyPressed ++
            document.getElementById("keypressed").innerHTML = keyPressed
            document.getElementById("popup").innerHTML = "Good! keep it up!!"
            if (codeLeft == 0 && timer != 0) {
                document.getElementById("keypressed").innerHTML = keyPressed
                gameStart = false
                document.getElementById("popup").innerHTML = "Good job!!! you save the world! thank you!"
                stopCount()
                document.getElementById("timeleft").innerHTML = timer + " seconds";
                main.style="visibility: hidden;"
                bgm.pause();
                victory.play()
                document.getElementById("fireworks").style="visibility: visible;"
                document.getElementById("hardmode").style="visibility: visible; width: 200px;"
            }
        }

    }
})