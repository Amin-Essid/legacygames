document.addEventListener("DOMContentLoaded", () => {
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



    function runGame() {
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
             clearInterval(interval);
         }

        //  delete the tail of the snake and move his head
         let tail = currentSnake.pop();
         squares[tail].classList.remove("snake");
         currentSnake.unshift(currentSnake[0] + direction);

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
    startBtn.addEventListener("click", runGame);


})