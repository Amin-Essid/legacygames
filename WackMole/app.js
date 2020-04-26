function runGame(){


    function buildEnvirement(){
        let score = document.createElement("h1");
        score.innerHTML = "score: ";
        document.body.appendChild(score);
        let result = document.createElement("span");
        result.setAttribute("id", "score");
        result.innerHTML = "0";
        score.appendChild(result);
        let timeLeft = document.createElement("h1");
        timeLeft.innerHTML = "time left: ";
        document.body.appendChild(timeLeft);
        let TL = document.createElement("span");
        TL.setAttribute("id", "time-left");
        TL.innerHTML = "60";
        timeLeft.appendChild(TL);
        let grid = document.createElement("div");
        grid.setAttribute("class", "grid");
        document.body.appendChild(grid);
        for (let i = 0; i<9; i++){
            let div = document.createElement("div");
            div.setAttribute("id", i);
            div.setAttribute("class", "square")
            grid.appendChild(div);
        }
    }
    
    buildEnvirement();


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
}

runGame()

