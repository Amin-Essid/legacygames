document.addEventListener("DOMContentLoaded", () =>{

    const squares = document.querySelectorAll(".grid div");
    const timeLeft = document.querySelector("#time-left");
    const result = document.querySelector("#result");
    const startBtn = document.querySelector("#button");
    const carsLeft = document.querySelectorAll(".car-left");
    const carsRight = document.querySelectorAll(".car-right");
    const logsLeft = document.querySelectorAll(".log-left");
    const logsRight = document.querySelectorAll(".log-right");
    const width = 9;
    let currentIndex = 76;
    let currenTime = 20
    let timeId;

    // render frog on starting block
    squares[currentIndex].classList.add("frog");

    // moving the frog
    function moveFrog(e) {
        squares[currentIndex].classList.remove("frog");
        switch(e.keyCode) {
            case 37 :
                if (currentIndex % width !== 0) currentIndex -= 1;
                break;
            case 38 :
                if (currentIndex - width >= 0) currentIndex -= width;
                break;
            case 39 : 
                if (currentIndex % width < width -1) currentIndex += 1;
                break;
            case 40:
                if(currentIndex + width < width * width) currentIndex += width;
                break;
        }
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }

    // move cars
    function autoMoveCars(){
        carsLeft.forEach(car => moveCarLeft(car));
        carsRight.forEach(car => moveCarRight(car));
    }

    function moveCarLeft(car) {
        switch(true) {
            case car.classList.contains("c1"):
                car.classList.remove("c1");
                car.classList.add("c2");
                break;
            case car.classList.contains("c2"):
                car.classList.remove("c2");
                car.classList.add("c3");
                break;
            case car.classList.contains("c3"):
                car.classList.remove("c3");
                car.classList.add("c1");
                break;
        }
    }

    function moveCarRight(car) {
        switch(true) {
            case car.classList.contains("c1"):
                car.classList.remove("c1");
                car.classList.add("c3");
                break;
            case car.classList.contains("c2"):
                car.classList.remove("c2");
                car.classList.add("c1");
                break;
            case car.classList.contains("c3"):
                car.classList.remove("c3");
                car.classList.add("c2");
                break;
        }
    }

    // move logs
    function autoMoveLogs(){
        logsLeft.forEach(log => moveLogsLeft(log));
        logsRight.forEach(log => moveLogsRight(log));
    }

    function moveLogsLeft(log){
        switch(true) {
            case log.classList.contains("l1"):
                log.classList.remove("l1");
                log.classList.add("l2");
                break;
            case log.classList.contains("l2"):
                log.classList.remove("l2");
                log.classList.add("l3");
                break;
            case log.classList.contains("l3"):
                log.classList.remove("l3");
                log.classList.add("l4");
                break;
            case log.classList.contains("l4"):
                log.classList.remove("l4");
                log.classList.add("l5");
                break;
            case log.classList.contains("l5"):
                log.classList.remove("l5");
                log.classList.add("l1");
                break;
        }
    }

    function moveLogsRight(log){
        switch(true) {
            case log.classList.contains("l1"):
                log.classList.remove("l1");
                log.classList.add("l5");
                break;
            case log.classList.contains("l2"):
                log.classList.remove("l2");
                log.classList.add("l1");
                break;
            case log.classList.contains("l3"):
                log.classList.remove("l3");
                log.classList.add("l2");
                break;
            case log.classList.contains("l4"):
                log.classList.remove("l4");
                log.classList.add("l3");
                break;
            case log.classList.contains("l5"):
                log.classList.remove("l5");
                log.classList.add("l4");
                break;
        }
    }

    // rules of the game:
    function win(){
        if (squares[4].classList.contains("frog")){
            result.innerHTML = "you won !!";
            squares[currentIndex].classList.remove("frog");
            clearInterval(timeId);
            document.removeEventListener("keyup", moveFrog);
        }
    }

    function lose() {
        if (currenTime === 0 || squares[currentIndex].classList.contains("c1") 
        || squares[currentIndex].classList.contains("l4") ||
         squares[currentIndex].classList.contains("l5") ) {
            result.innerHTML = "you lost !!";
            squares[currentIndex].classList.remove("frog");
            clearInterval(timeId);
            document.removeEventListener("keyup", moveFrog);
         }
    }

    // move the frog when its on the log moving
    function moveWithLogLeft() {
        if(currentIndex >= 27 && currentIndex < 35){
            squares[currentIndex].classList.remove("frog")
            currentIndex -= 1;
            squares[currentIndex].classList.add("frog");
        }
    }

    function moveWithLogRight() {
        if(currentIndex > 18 && currentIndex <= 26){
            squares[currentIndex].classList.remove("frog")
            currentIndex += 1;
            squares[currentIndex].classList.add("frog");
        }
    }

    // all the functions that move pieces
    function movingPieces(){
        currenTime--;
        timeLeft.innerHTML = currenTime;
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
    }

    // to start and pause the game
    startBtn.addEventListener("click", () =>{
        if (timeId){
            clearInterval(timeId)
        } else {
            timeId = setInterval(movingPieces, 1000)
            document.addEventListener("keyup", moveFrog)
        }
    })
    

})