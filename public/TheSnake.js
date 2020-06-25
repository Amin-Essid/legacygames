function runGame() {

    function buildEnvirement(){
        let button = document.createElement("button");
        button.innerHTML ="start";
        button.setAttribute("class", "start");
        document.body.appendChild(button);
        let score = document.createElement("h1");
        score.setAttribute("class", "score");
        score.innerHTML = "score: ";
        document.body.appendChild(score);
        let result = document.createElement("span");
        score.appendChild(result);
        let grid = document.createElement("div");
        grid.setAttribute("class", "grid");
        document.body.appendChild(grid);
        for (let i = 0; i<100; i++){
            let div = document.createElement("div");
            grid.appendChild(div);
        }
    }
    
    buildEnvirement();

    let squares = document.querySelectorAll('.grid div');
    let scoreDisplay = document.querySelector("span");
    let startBtn = document.querySelector(".start");

    let width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake =[2, 1, 0];

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;



    function startGame() {
        squares.forEach( square => {
            square.classList.remove("snake");
            square.classList.remove("apple");
        })
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake =[2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {
        // stop the game if the head of the snake hits the border or his body
        if ((currentSnake[0] + width >= (width * width) && direction === width) ||
         (currentSnake[0] % width == width - 1 && direction === 1) ||
         (currentSnake[0] % width == 0 && direction === -1) ||
         (currentSnake[0] - width < 0 && direction === - width) ||
         squares[currentSnake[0] + direction].classList.contains("snake")) {
             scoreDisplay.innerHTML = "you lost";
             clearInterval(interval);
         }

        //  delete the tail of the snake and move his head
         let tail = currentSnake.pop();
         squares[tail].classList.remove("snake");
         let step = currentSnake[0] + direction;
         if (step < 0 || step >= 100) {
             step = currentSnake[0]
         }
         currentSnake.unshift(step);

        //  deals with snake getting apple
         if (squares[currentSnake[0]].classList.contains("apple")) {
             squares[currentSnake[0]].classList.remove("apple");
             squares[tail].classList.add("snake")
             currentSnake.push(tail);
             randomApple();
             score++;
             scoreDisplay.textContent = score;
             clearInterval(interval);
             intervalTime = intervalTime * speed;
             interval = setInterval(moveOutcomes, intervalTime);
         }

         squares[currentSnake[0]].classList.add("snake");


    }


    function randomApple(){
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while (squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple");
    }


    function control(e){
        squares[currentIndex].classList.remove("snake")

        if (e.keyCode === 39){
            direction = 1;
        } else if (e.keyCode === 38){
            direction = -width;
        } else if (e.keyCode === 37){
            direction = -1;
        } else if (e.keyCode === 40){
            direction = width;
        }
    }

    document.addEventListener("keyup", control);
    startBtn.addEventListener("click", startGame);


}

document.addEventListener("DOMContentLoaded", runGame);