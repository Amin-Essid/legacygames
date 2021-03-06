
   function runMemoryGame(){
    //card options
    const cardArray =[
        {
            name: "rocket1",
            img: "./MemoryGame-images/img 1.png"
        },
        {
            name: "rocket2",
            img: "./MemoryGame-images/img 1.png"
        },
        {
            name: "boat1",
            img: "./MemoryGame-images/img 2.png"
        },
        {
            name: "boat2",
            img: "./MemoryGame-images/img 2.png"
        },
        {
            name: "ballon1",
            img: "./MemoryGame-images/img 3.png"
        },
        {
            name: "ballon2",
            img: "./MemoryGame-images/img 3.png"
        },
        {
            name: "bike1",
            img: "./MemoryGame-images/img 4.png"
        },
        {
            name: "bike2",
            img: "./MemoryGame-images/img 4.png"
        },
        {
            name: "helicopter1",
            img: "./MemoryGame-images/img 5.png"
        },
        {
            name: "helicopter2",
            img: "./MemoryGame-images/img 5.png"
        },
        {
            name: "plane1",
            img: "./MemoryGame-images/img 6.png"
        },
        {
        name: "plane2",
        img: "./MemoryGame-images/img 6.png"
    }];

    cardArray.sort(() => 0.5 - Math.random());

    function formatEnvirement(){
        let head = document.createElement("h1");
        head.innerHTML = "score :"
        document.body.appendChild(head);
        let result = document.createElement("span");
        result.setAttribute("id", "result");
        head.appendChild(result);
        let grid = document.createElement("div");
        grid.setAttribute("class", "grid");
        document.body.appendChild(grid);
    }

    formatEnvirement();

    const grid = document.querySelector(".grid");
    let resultDisplay = document.querySelector("#result");
    let chosenCards = [];
    let chosenCardsId = [];
    let cardsWon = [];


    // create board
    function createBoard () {
        for (let i = 0; i<cardArray.length; i++){
            let card = document.createElement("img");
            card.setAttribute("src", "./MemoryGame-images/cover.png");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    // check for matchs:

    function checkForMatch(){
        let cards = document.querySelectorAll("img");
        let optionOneId = chosenCardsId[0], optionTwoId = chosenCardsId[1];
        if (chosenCards[0].slice(0, (chosenCards[0].length - 1)) === chosenCards[1].slice(0, (chosenCards[1].length - 1)) && chosenCards[0].slice((chosenCards[0].length - 1), chosenCards[0].length) !== chosenCards[1].slice((chosenCards[1].length - 1), chosenCards[1].length) ){
            alert("nice you found a match");
            cards[optionOneId].setAttribute("src", "./MemoryGame-images/empty.png");
            cards[optionTwoId].setAttribute("src", "./MemoryGame-images/empty.png");
            cardsWon.push(chosenCards);
        } else {
            alert("sorry try again")
            cards[optionOneId].setAttribute("src", "./MemoryGame-images/cover.png");
            cards[optionTwoId].setAttribute("src", "./MemoryGame-images/cover.png"); 
        }
        chosenCards = [];
        chosenCardsId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = "congratulations you found them all !"
        }
    }

    // flip your card:

    function flipCard(){
        let cardId = this.getAttribute("data-id");
        this.setAttribute("src", cardArray[cardId].img);
        chosenCards.push(cardArray[cardId].name);
        chosenCardsId.push(cardId);
        if (chosenCardsId.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    createBoard();

    
}

document.addEventListener("DOMContentLoaded", runMemoryGame)