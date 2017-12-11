/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var turnCount, randomDice = 0;

var playerOne = {
    roundScore: 0,
    globalScore: 0,
    rollDice: function() {
        randomDice = getRandomDice();
        document.querySelector("#dice").setAttribute("src", "dice-" + randomDice + ".png")
        if (randomDice === 1) {
            this.roundScore = 0;
            turnCount = 1;
        } else {
            this.roundScore += randomDice;
        }
    },
    hold: function() {
        this.globalScore += this.roundScore;
        this.roundScore = 0;
        turnCount = 1;
    }
}

var playerTwo = {
    roundScore: 0,
    globalScore: 0  ,
    rollDice: function() {
        randomDice = getRandomDice();
        document.querySelector("#dice").setAttribute("src", "dice-" + randomDice + ".png")
        if (randomDice === 1) {
            this.roundScore = 0;
            turnCount = 0;
        } else {
            this.roundScore += randomDice;
        }
    },
    hold: function() {
        this.globalScore += this.roundScore;
        this.roundScore = 0;
        turnCount = 0;
    }
}


function getRandomDice() {
    return Math.floor((Math.random() * 6) + 1);  
};


function takeTurn() {
    
    if ((playerOne.globalScore >= 100) || (playerTwo.globalScore >= 100)) {
        alert("Game over!");
    } else {
         if (turnCount === 0) {
            playerOne.rollDice();
        } else {
            playerTwo.rollDice();
        }
    }
    refreshInterface();
}

function refreshInterface() {
    if (turnCount === 0) {
        document.getElementById("panel-0").classList.add("active");
        document.getElementById("panel-1").classList.remove("active");
    } else {
        document.getElementById("panel-1").classList.add("active");
        document.getElementById("panel-0").classList.remove("active");  
    }
    
    document.querySelector("#current-0").textContent = playerOne.globalScore;
    document.querySelector("#current-1").textContent = playerTwo.globalScore;
    document.querySelector("#score-0").textContent = playerOne.roundScore;
    document.querySelector("#score-1").textContent = playerTwo.roundScore;
}

function holdNow() {
   
    if ((playerOne.globalScore >= 100) || (playerTwo.globalScore >= 100)) {
        alert("Game over!");
    } else {
         if (turnCount === 0) {
            playerOne.hold();
        } else {
            playerTwo.hold();
        }
    }
   
    refreshInterface();

}

function newGame() {
    turnCount = Math.round(Math.random());
    playerOne.globalScore = 0;
    playerOne.roundScore = 0;
    playerTwo.globalScore = 0;
    playerTwo.roundScore = 0;
    refreshInterface();
}

newGame();


