const SCISSORS = "scissors";
const ROCK = "rock";
const PAPER = "paper";

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3 + 1);
    switch (choice) {
        case 1:
            return ROCK;

        case 2:
            return PAPER;

        case 3:
            return SCISSORS;
    }
}

function getHumanChoice() {
    return prompt("Enter your choice (rock, paper or scissors):");
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let round = 1;


    function playRound(humanChoice, computerChoice) {
        let displayHC = humanChoice.toLowerCase();
        let result = didTheHumanWin(displayHC, computerChoice);

        displayHC = capitalize(displayHC);
        let displayCC = capitalize(computerChoice);
        console.log("-----------");
        console.log("Round: " + round);
        console.log("===========");
        if (result > 0) {
            console.log(`Human wins! ${displayHC} beats ${displayCC}.`);
            humanScore++;
        } else if (result < 0) {
            console.log(`Computer wins! ${displayCC} beats ${displayHC}`);
            computerScore++;
        } else {
            console.log(`It's a tie! ${displayHC} equals ${displayCC}`);
        }
    }

    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    function didTheHumanWin(humanChoice, computerChoice) {
        let winningCombos = {
            rock: SCISSORS,
            scissors: PAPER,
            paper: ROCK
        }
        if (humanChoice === computerChoice) {
            return 0; //it's a tie
        } else if (winningCombos[humanChoice] === computerChoice) {
            return 1; //the human won
        } else {
            return -1; //the computer won
        }
    }


    console.clear();
    console.log("Welcome to the Rock, Paper and Scissors game!");
    console.log("This game will be played out of 5 rounds. Win three rounds to be declared the grand champion!");

    do {
        playRound(getHumanChoice(), getComputerChoice());
        round++;
    } while ( round <= 5 && (humanScore !== 3) && (computerScore !== 3));
    console.log("\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/");
    console.log("  \\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/");
    console.log("    \\\/\\\/\\\/\\\/\\\/\\\/\\\/\\\/");
    console.log("      \\\/\\\/\\\/\\\/\\\/\\\/");
    if ( computerScore === humanScore ) {
        console.log("That's weird! You tied!");
    } else if ( computerScore > humanScore ) {
        console.log("It's a sad day. The computer wins!");
    } else {
        console.log("Hurray! You have won!");
    }
}

playGame();