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

function playGame() {

    const rockBtn = document.querySelector('#rock');
    const paperBtn = document.querySelector('#paper');
    const scissorsBtn = document.querySelector('#scissors');
    const playAgainBtn = document.querySelector('#playAgain');
    const resultsDiv = document.querySelector('#results');
    const playerScoreDiv = document.querySelector('#playerScore');
    const computerScoreDiv = document.querySelector('#computerScore');

    let playerSelection = '';
    console.clear();
    let humanScore = 0;
    let computerScore = 0;

    function resetGame() {
        playAgainBtn.style.opacity = "0";
        rockBtn.addEventListener("click", getPlayerSelection);
        paperBtn.addEventListener("click", getPlayerSelection);
        scissorsBtn.addEventListener("click", getPlayerSelection);
        humanScore = 0;
        computerScore = 0;
        playerScoreDiv.innerText = 0;
        computerScoreDiv.innerHTML = 0;
        playerScoreDiv.parentElement.classList.remove('winner');
        computerScoreDiv.parentElement.classList.remove('winner');
        console.clear();
        Array.from(resultsDiv.children).forEach( (el, i) => {
            if (i !== 0) {
                resultsDiv.removeChild(el);
            }
        });
    }
    function showResult(str, header) {
        const paragraph = document.createElement('p');
        paragraph.innerText = str;
        if (header) {
            paragraph.style.fontSize = "larger";
            paragraph.style.fontWeight = "800";
        }
        resultsDiv.appendChild(paragraph);
    }
    const getPlayerSelection = (e) => {
        e.preventDefault();
        playerSelection = e.target.getAttribute('id');

        if (!(humanScore === 5 || computerScore === 5)) {
            playRound(playerSelection, getComputerChoice());
        } 
        
        if (humanScore === 5 || computerScore === 5) {
            if (computerScore === humanScore) {
                showResult("That's weird! You tied!", true);
            } else if (computerScore > humanScore) {
                computerScoreDiv.parentElement.classList.toggle('winner');
                playerScoreDiv.innerText = "😦";
                showResult("It's a sad day. The computer wins the game!", true);
            } else {
                playerScoreDiv.parentElement.classList.toggle('winner');
                playerScoreDiv.innerText = "😀";
                showResult("Hurray! You have won the game!", true);
            }
            //TODO show a modal to ask if they want to play again then reset if yes
            // if they say no then turn off the event listeners
            rockBtn.removeEventListener("click", getPlayerSelection);
            paperBtn.removeEventListener("click", getPlayerSelection);
            scissorsBtn.removeEventListener("click", getPlayerSelection);
            playAgainBtn.style.opacity = "100";
        } 
    };

    playAgainBtn.addEventListener("click", resetGame);
    rockBtn.addEventListener("click", getPlayerSelection);
    paperBtn.addEventListener("click", getPlayerSelection);
    scissorsBtn.addEventListener("click", getPlayerSelection);

    function playRound(displayHC, computerChoice) {
        let result = didTheHumanWin(displayHC, computerChoice);

        displayHC = capitalize(displayHC);
        let displayCC = capitalize(computerChoice);

        if (result > 0) {
            showResult(`Human wins! ${displayHC} beats ${displayCC}.`);
            humanScore++;
            playerScoreDiv.innerText = humanScore;
        } else if (result < 0) {
            showResult(`Computer wins! ${displayCC} beats ${displayHC}`);
            computerScore++;
            computerScoreDiv.innerText = computerScore;
        } else {
            showResult(`It's a tie! ${displayHC} equals ${displayCC}`);
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
}

playGame();