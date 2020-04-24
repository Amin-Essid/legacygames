let squares = [];
let displayResult, score, displayTimeLeft, result, timeLeft;
const width=3;
let carIndex = 19;
let wallInterval, secondWallInterval;
let wallsInterval1, secondWallsInterval;
let intervalTime = 500;
let speed = 0.9;
let wallNumber;

function formatEnvirement(){
    const s = document.createElement("h3");
    const r = document.createElement("span");
    const t = document.createElement("h1");
    const tl = document.createElement("h2");
    const grid = document.createElement("div");
    grid.setAttribute("class", "grid");
    document.body.appendChild(s);
    s.textContent = "score: ";
    s.appendChild(r);
    r.textContent = "0";
    displayResult = document.querySelector("span");
    document.body.appendChild(t);
    t.textContent = "walls left: ";
    document.body.appendChild(tl);
    tl.textContent = "60";
    displayTimeLeft = document.querySelector("h2");
    document.body.appendChild(grid);
    result = displayResult.textContent;
    timeLeft = displayTimeLeft.textContent;
    let c;
    for (let i = 0; i<21; i++){
        let dv = document.createElement("div");
        grid.appendChild(dv);
        if (i%3 === 0){
            dv.setAttribute("class", "right-line");
            c = i;
        }  else if (i === c + 2 ){
            dv.setAttribute("class", "left-line");
        }
    }
    squares = document.querySelectorAll(".grid div");
    squares[carIndex].setAttribute("class", "car");
}

function controlCar(e){
    squares[carIndex].classList.remove("car");
    switch(e.key){
        case "ArrowRight":
            if (carIndex % width !== width - 1) carIndex += 1;
            break;
        case "ArrowLeft":
            if (carIndex % width !== 0 ) carIndex -= 1;
            break;
    }
    squares[carIndex].classList.add("car");
}

function moveWall(wallIndex) {
    squares[wallIndex].classList.add("wall");
    wallInterval = setInterval(() => {
    squares[wallIndex].classList.remove("wall");
    wallIndex += width;
    squares[wallIndex].classList.add("wall");
    if(wallIndex > squares.length - 4 ) {
        clearInterval(wallInterval);
        result++;
        displayResult.textContent = result;
        timeLeft--;
        displayTimeLeft.textContent = timeLeft;
        setTimeout( () => {
            squares[wallIndex].classList.remove("wall")}, intervalTime);
    }
    lose();
    win();
}, intervalTime);
}

function moveSecondWall(wallIndex){
    squares[wallIndex].classList.add("wall");
    secondWallInterval = setInterval(() => {
    squares[wallIndex].classList.remove("wall");
    wallIndex += width;
    squares[wallIndex].classList.add("wall");
    if(wallIndex > squares.length - 4 ) {
        clearInterval(secondWallInterval);
        result++;
        displayResult.textContent = result;
        timeLeft--;
        displayTimeLeft.textContent = timeLeft;
        setTimeout( () => {
            squares[wallIndex].classList.remove("wall")}, intervalTime);
    }
    lose();
    win();
}, intervalTime);
}

function randomWall() {
    let i = Math.random();
    if(i < 0.33) {
        wallNumber = 0;
    }
    else if (i>=0.33 && i<=0.66) {
        wallNumber = 1;
    }
    else if (i>0.66) {
        wallNumber = 2;
    }
    moveWall(wallNumber);
    intervalTime = intervalTime * speed;
}

function randomWall2() {
    let j = Math.random(), wallNumber2;
    if (j>0.5){
        wallNumber2 = wallNumber + 1;
        if (wallNumber2 === 3) {wallNumber2 = 0;}
        console.log("after")
    } else {
        wallNumber2 = wallNumber - 1;
        if (wallNumber2 === -1) {wallNumber2 = 2;}
        console.log("before")
    }
    setTimeout(() => {
        moveSecondWall(wallNumber2);
    }, intervalTime*2)

}

function lose(){
    for (let i = 17; i<squares.length; i++) {
        if(squares[i].classList.contains("wall") && squares[i].classList.contains("car")) {
            clearInterval(wallsInterval1);
            clearInterval(wallsInterval2);
            clearInterval(wallInterval);
            clearInterval(secondWallInterval);
            document.removeEventListener("keyup", controlCar);
            displayResult.textContent = "you lost"
        }
    }
}

function win(){
    if (timeLeft === 0){
        clearInterval(wallsInterval1);
        clearInterval(wallsInterval2);
        clearInterval(wallInterval);
        clearInterval(secondWallInterval);
        document.removeEventListener("keyup", controlCar);
        displayResult.textContent = "you won";
    }
}

function runGame(){
    formatEnvirement();
    document.addEventListener("keyup", controlCar);
    wallsInterval1 = setInterval(randomWall, (intervalTime*7));
    wallsInterval2 = setInterval(randomWall2, (intervalTime*8));
}

document.addEventListener("DOMContentLoaded", runGame);