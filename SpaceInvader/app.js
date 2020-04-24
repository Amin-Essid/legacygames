function runGame() {


    function formatEnvirement(){
        let head = document.createElement("h1");
        head.innerHTML = "score: "
        document.body.appendChild(head);
        let result = document.createElement("span");
        result.setAttribute("class", "result");
        head.appendChild(result);
        let grid = document.createElement("div");
        grid.setAttribute("class", "grid");
        document.body.appendChild(grid);
        for (let i = 0; i<225; i++){
            let div = document.createElement("div");
            grid.appendChild(div);
        }
    }

    formatEnvirement();

    const squares = document.querySelectorAll('.grid div');
    const resultDisplay = document.querySelector(".result");
    let width = 15;
    let currentShooterIndex = 202;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId;

    // define the alien invaders :
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    // draw alienInvaders
    alienInvaders.forEach( invader => {
        squares[invader].classList.add("invader");
    })

    // draw shoter
    squares[currentShooterIndex].classList.add("shooter");

    // move the shooter
    function moveShooter(e){
        squares[currentShooterIndex].classList.remove("shooter");
        switch(e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break
            case 39:
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
                break
        }
        squares[currentShooterIndex].classList.add("shooter");
        }
    document.addEventListener("keyup", moveShooter) 


    // move invaders 
    function moveInvaders(){
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;
        if (leftEdge && direction === -1 || rightEdge && direction === 1){
            direction = width;
        } else if (direction === width){
            if (leftEdge) direction = 1;
            else if (rightEdge) direction = -1;
        }
        for (let i = 0; i<alienInvaders.length; i++){
            squares[alienInvaders[i]].classList.remove("invader");
        }
        for (let i = 0; i<alienInvaders.length; i++){
            alienInvaders[i] += direction;
        }
        for (let i = 0; i<alienInvaders.length; i++){
            if (!alienInvadersTakenDown.includes(i)){
                squares[alienInvaders[i]].classList.add("invader");
            }
        }
   

    // decide the game is over:
        if (squares[currentShooterIndex].classList.contains("invader", "shooter")){
            resultDisplay.textContent = "game over";
            squares[currentShooterIndex].classList.add("boom");
            clearInterval(invaderId);
            document.removeEventListener("keyup", moveShooter);
        } 

        for (let i = 0; i<alienInvaders.length; i++){
            if (alienInvaders[i] > (squares.length - (width - 1))) {
                resultDisplay.textContent = "game over";
                clearInterval(invaderId);
                document.removeEventListener("keyup", moveShooter);
            }
        }
        if (alienInvaders.length === alienInvadersTakenDown.length){
            resultDisplay.textContent = "you won";
            clearInterval(invaderId)
        }
    }

invaderId = setInterval(moveInvaders, 500);

// shoot at aliens
function shoot(e) {
    let laserInterval;
    let currentLaserIndex = currentShooterIndex;
        // move the laser from the shooter to the aliens
    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");
        if (squares[currentLaserIndex].classList.contains("invader")){
            squares[currentLaserIndex].classList.remove("invader", "laser");
            squares[currentLaserIndex].classList.add("boom");
            setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 250);
            clearInterval(laserInterval);

            let alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
            alienInvadersTakenDown.push(alienTakenDown);
            result++;
            resultDisplay.textContent = result;
        }

        if (currentLaserIndex < width){
            clearInterval(laserInterval);
            setTimeout(() => squares[currentLaserIndex].classList.remove("laser"), 100);
        }
    }
    switch(e.keyCode) {
        case 32:
          laserInterval = setInterval(moveLaser, 100)
          break
      }
}

document.addEventListener("keyup", shoot);


}


document.addEventListener("DOMContentLoaded", runGame)