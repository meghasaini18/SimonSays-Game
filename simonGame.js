let currentScore = 0;
let highestScore = 0;

let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

// let startButton = document.getElementById("start-button");
let currScoreSpan = document.getElementById("current-score");
let highestScoreSpan = document.getElementById("highest-score");

let h2 = document.querySelector("h2");
document.addEventListener("keydown", function(){
    if(!started){
        console.log("game is start");
        started = true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(){
    // console.log("Curr level : ", level);
    let idx = userSeq.length-1;

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
            currentScore++;
            currScoreSpan.textContent = currentScore;
            if(currentScore > highestScore){
                highestScore = currentScore;
                highestScoreSpan.textContent = highestScore;
            }
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${currentScore}</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        setTimeout(reset, 500);
        // reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns();
}
let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    currentScore = 0;
    currScoreSpan.textContent = currentScore;
}