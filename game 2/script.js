const squares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
let score = document.querySelector("#score");
let currentTime = timeLeft.textContent;
let result = 0, hitPosition;

function randomMole (){
    squares.forEach(square => {
        square.classList.remove("mole");
    });
    let randomPosition = squares[Math.floor(Math.random()*9)];
    randomPosition.classList.add("mole");
    hitPosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener("mouseup", () => {
        if (square.id === hitPosition) {
            result++;
            score.textContent = result;
        }
    })
})

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(timer);
        clearInterval(moleTimer);
        score.textContent = "Game Over and your score is:" + result;
    }
}


let moleTimer = setInterval(randomMole, 1000)
let timer = setInterval(countDown, 1000);


