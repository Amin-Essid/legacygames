function runGame() {

    let width=10;
    let bombsNumber = 20;
    let flags = 0;
    let squares = [];
    let isGameOver = false;
    // create the interface of the game
    let grid = document.createElement("div");
    grid.setAttribute("class", "grid");
    grid.setAttribute("id", "grid");
    document.body.appendChild(grid);
    const bombsArray = Array(bombsNumber).fill('bomb');
    const emptyArray = Array(width*width - bombsNumber).fill('valid');
    const shuffledArray = bombsArray.concat(emptyArray).sort(() => Math.random() - 0.5);
    for (let i = 0; i<width*width; i++){
        let square = document.createElement("div");
        square.setAttribute("id", i);
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);
        squares.push(square)

        // on left click
        square.addEventListener('click', (e)=>{
            click(square)
        })

        // on right click
        square.oncontextmenu = (e) => {
            e.preventDefault();
            addFlag(square)
        }
    }

    // add numbers
    for (let i = 0; i<width*width; i++){
        let total = 0;
        isLeftEdge = i % width === 0;
        isRightEdge = i % width === width-1;

        if(squares[i].classList.contains('valid')) {
            if(i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total ++
            if(i>9 && !isRightEdge && squares[i+1 - width].classList.contains('bomb')) total ++
            if(i>9 && squares[i - width].classList.contains('bomb')) total ++
            if(i>9 && !isLeftEdge && squares[i-1 - width].classList.contains('bomb')) total ++
            if(i<99 && !isRightEdge && squares[i+1].classList.contains('bomb')) total ++
            if(i<90 && !isLeftEdge && squares[i-1 + width].classList.contains('bomb')) total ++
            if(i<90 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total ++
            if(i<90 && squares[i + width].classList.contains('bomb')) total ++
            squares[i].setAttribute('data', total)
        }
    }

    // add flag with right click
    addFlag = square => {
        if(isGameOver) return
        if(!square.classList.contains("checked")) {
            if(!square.classList.contains("flag") && flags < bombsNumber){
                square.classList.add("flag");
                square.innerHTML = "🏁";
                flags ++
                checkForWin(square)
            } else if(square.classList.contains("flag")) {
                square.classList.remove("flag");
                square.innerHTML = "";
                flags --
            }
        }
    }



    // click in square action
    click = (square) => {
        let currentId = square.id;
        if(isGameOver) return
        if(square.classList.contains("checked") || square.classList.contains("flag")) return
        if(square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')  
            if (total != 0) {
                square.classList.add("checked")
                square.innerHTML = total
                return
            }  
            square.classList.add("checked")
            checkSquare(square, currentId)
        }
        
    }

    checkSquare = (square, currentId) => {
        const isLeftEdge = currentId % width === 0;
        const isRightEdge = currentId % width === width-1;

        setTimeout(() => {
            if(currentId > 0 && !isLeftEdge) {
                const newId = parseInt(currentId) - 1;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 9 && !isRightEdge) {
                const newId = parseInt(currentId) + 1;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 10) {
                const newId = parseInt(currentId) - width;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 11 && !isLeftEdge) {
                const newId = parseInt(currentId) - 1 - width;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 99 && !isRightEdge) {
                const newId = parseInt(currentId) + 1;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 90 && !isLeftEdge) {
                const newId = parseInt(currentId) - 1 +width;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 90 && !isRightEdge) {
                const newId = parseInt(currentId) + 1 + width;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 90) {
                const newId = parseInt(currentId) + width;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10)
    }

    gameOver = () => {
        isGameOver = true;
        squares.forEach(square => {
            if(square.classList.contains("bomb")) square.innerHTML = "💣"
        })
        setTimeout(() => {alert("BOOOOOM, refresh to restart the game")}, 20)
    }

    checkForWin = square => {
        let matches = 0;
        squares.forEach(square => {
            if(square.classList.contains("bomb") && square.classList.contains("flag")) {
                matches ++
            }
        })
        if(matches === bombsNumber){ 
               setTimeout( () => {alert('game won')}, 20)
               isGameOver = true
        }
    }
} 

document.addEventListener("DOMContentLoaded", runGame);