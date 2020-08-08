function runGame() {




  function buildEnvirement(){
    let button = document.createElement("button");
    let buttonLnk = document.createElement("a");
    buttonLnk.setAttribute("href", "#grid")
    button.innerHTML ="start/pause";
    buttonLnk.appendChild(button);
    document.body.appendChild(buttonLnk);
    let score = document.createElement("h1");
    score.setAttribute("class", "score-display");
    score.innerHTML = "0";
    document.body.appendChild(score);
    let lines = document.createElement("h4");
    lines.setAttribute("class", "lines-display");
    lines.innerHTML = "0";
    document.body.appendChild(lines);
    let previousGrid = document.createElement("div");
    previousGrid.setAttribute("class", "previous-grid");
    document.body.appendChild(previousGrid);
    for (let i = 0; i<16; i++){
        let div = document.createElement("div");
        previousGrid.appendChild(div);
    }
    let grid = document.createElement("div");
    grid.setAttribute("class", "grid");
    grid.setAttribute("id", "grid");
    document.body.appendChild(grid);
    for (let i = 0; i<200; i++){
        let div = document.createElement("div");
        if(i>=190) div.setAttribute("class", "block3");
        grid.appendChild(div);
    }
}

buildEnvirement();

    const grid = document.querySelector(".grid");
    let squares = Array.from(grid.querySelectorAll("div"));
    const scoreDisplay = document.querySelector(".score-display")
    const linesDisplay = document.querySelector(".lines-display")
    const width = 10;
    const startBtn = document.querySelector("button");
    const height = 20;
    let currentPosition = 4;
    let timerId;
    let lines = 0;
    let score = 0;
    let currentIndex = 0;

    // prevent default actions on arrows keys
    function preventDefaultMoves(e){
      if(e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 40) e.preventDefault(); 
    }

    document.addEventListener("keydown", preventDefaultMoves);

    // control
  function control(e){
    if(e.keyCode === 39){
      moveright()
    } else if (e.keyCode === 38){
      rotate()
    } else if(e.keyCode === 37){
      moveleft()
    } else if(e.keyCode === 40){
      moveDown();
    }
  }




      //The Tetrominoes
  const lTetromino = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let random = Math.floor(Math.random()*theTetrominoes.length);
let currentRotation = 0;
let current = theTetrominoes[random][currentRotation];

// draw the shape
function draw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.add("block");
    })
}

// undraw the shape
function undraw(){
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("block");
    })
}

// move down shape
function moveDown(){
    undraw();
    currentPosition += width;
    draw();
    freeze();
}

  //move left and prevent collisions with shapes moving left
  function moveright() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if(!isAtRightEdge) currentPosition += 1
    if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition -= 1
    }
    draw()
  }

  //move right and prevent collisions with shapes moving right
  function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if(!isAtLeftEdge) currentPosition -= 1
    if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      currentPosition += 1
    }
    draw()
  }

  //rotate the tetramino:
  function rotate(){
    undraw();
    currentRotation++;
    if (currentRotation === current.length) currentRotation = 0;
    current = theTetrominoes[random][currentRotation];
    draw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
    if(isAtLeftEdge && isAtRightEdge){
      undraw();
      currentRotation--;
      if (currentRotation === -1) {currentRotation = current.length - 1}
      current = theTetrominoes[random][currentRotation];
      draw();
    }
  }

  //show previous tetromino in scoreDisplay
  const displayWidth = 4
  const displaySquares = document.querySelectorAll('.previous-grid div')
  let displayIndex = 0
  let randomNext = 0;
  
  const smallTetrominoes = [
    [1,displayWidth+1,displayWidth*2+1,2], /* lTetromino */
    [0,displayWidth,displayWidth+1,displayWidth*2+1],  /* zTetromino */
    [1,displayWidth,displayWidth+1,displayWidth+2],    /* tTetromino */
    [0,1,displayWidth,displayWidth+1],     /* oTetromino */
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]  /* iTetromino */
  ]

  function displayShape(){
    displaySquares.forEach(square => {
      square.classList.remove("block")
    });

    smallTetrominoes[randomNext].forEach(index => {
      displaySquares[displayIndex + index].classList.add("block")
    })
  }


  // freeze the shape:
  function freeze(){
    if (current.some(index => squares[currentPosition + index + width].classList.contains("block3") || squares[currentPosition + index + width].classList.contains("block2"))) {
      current.forEach(index => {
        squares[currentPosition + index].classList.add("block2")
      })
    random = randomNext;
    randomNext = Math.floor(Math.random()*theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
    addScore();
    gameOver();
  }
  }

  startBtn.addEventListener("click", () => {
    if(timerId){
      document.removeEventListener("keyup", control)
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);
      randomNext = Math.floor(Math.random()*theTetrominoes.length);
      displayShape();
      document.addEventListener("keyup", control);
    }
  })

  // game over
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
      scoreDisplay.innerHTML = 'end'
      clearInterval(timerId);
      document.removeEventListener("keyup", control)
    }
  }

  // add score
  function addScore(){
    for (currentIndex = 0; currentIndex < 199;currentIndex += width) {
      const row = [currentIndex,currentIndex+1,currentIndex+2,currentIndex+3,currentIndex+4,currentIndex+5,currentIndex+6,currentIndex+7,currentIndex+8,currentIndex+9]
      if(row.every(index => squares[index].classList.contains('block2'))) {
        score += 10;
        lines +=1;
        scoreDisplay.innerHTML = score;
        linesDisplay.innerHTML = lines;
        row.forEach(index => {
          squares[index].classList.remove("block2")
          squares[index].classList.remove("block")
        });
        const squaresRemoved = squares.splice(currentIndex, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(square => grid.appendChild(square))

      }
    }
  }

  


};

document.addEventListener("DOMContentLoaded", runGame);