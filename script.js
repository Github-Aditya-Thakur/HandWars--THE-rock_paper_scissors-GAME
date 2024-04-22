const rock_button = document.getElementById('rock');
const paper_Button = document.getElementById('paper');
const scissors_Button = document.getElementById('scissors');
const resultDisplay = document.getElementById('result');

rock_button.addEventListener('click', () => playRound('rock'));
paper_Button.addEventListener('click', () => playRound('paper'));
scissors_Button.addEventListener('click', () => playRound('scissors'));

let PLAYER_SCORE = 0;
let COMPUTER_SCORE = 0;
const player_Score_Display = document.getElementById('player-score');
const computer_Score_Display = document.getElementById('computer-score');

let current_round = 1;
const total_rounds = 10;
const round_display = document.getElementById('round');
const background_img = ['bgImage1', 'bgImage2', 'bgImage3'];

let currentBackground = 0;
setInterval(() => {
    document.body.className = background_img[currentBackground];
    currentBackground = (currentBackground + 1) % background_img.length;
}, 3000);


function playRound(playerChoice) {
    if (current_round <= total_rounds) {

        round_display.textContent = `Round: ${current_round} of ${total_rounds}`;
        current_round++;
        console.log(current_round)

        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        if (playerChoice === computerChoice) {
            resultDisplay.textContent = 'It\'s a draw!';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            resultDisplay.textContent = 'You win!';
            PLAYER_SCORE++;
        } else {
            resultDisplay.textContent = 'Computer wins!';
            COMPUTER_SCORE++;
        }

        player_Score_Display.textContent = `Player Score: ${PLAYER_SCORE}`;
        computer_Score_Display.textContent = `Computer Score: ${COMPUTER_SCORE}`;

    }
    
    if (current_round > total_rounds) {
        concludeGame();
    }
}

function concludeGame() {
    const game_Container = document.getElementById('rps-game');
    const choices = document.getElementById('choices');
    const game_info = document.getElementById('game-info');
    const roundRes = document.getElementById('result');
    if (choices) {
        choices.style.display = 'none';
    }

    if (game_info) {
        game_info.style.display = 'none';
    }

    if (roundRes) {
        roundRes.style.display = 'none';
    }

    const gameConclusion = document.createElement('div');
    gameConclusion.setAttribute('id', 'game-conclusion');

    let finalMessage = '';
    if (PLAYER_SCORE > COMPUTER_SCORE) {
        finalMessage = 'Congratulations, you won the game!';
    } else if (PLAYER_SCORE < COMPUTER_SCORE) {
        finalMessage = 'Game over, the computer wins!';
    } else {
        finalMessage = 'The game ends in a draw!';
    }

    gameConclusion.innerHTML = `
        <h2>Game Over</h2>
        <p>${finalMessage}</p>
        <p>Final Score - You: ${PLAYER_SCORE} | Computer: ${COMPUTER_SCORE}</p>
        <button id="restart-btn">Restart Game</button>
    `;

    game_Container.appendChild(gameConclusion);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
}

function restartGame() {
    PLAYER_SCORE = 0;
    COMPUTER_SCORE = 0;
    current_round = 1;

    player_Score_Display.textContent = 'Player Score: 0';
    computer_Score_Display.textContent = 'Computer Score: 0';
    round_display.textContent = `Round: 1 of ${total_rounds}`;

    const choices = document.getElementById('choices');
    const game_info = document.getElementById('game-info');
    const roundRes = document.getElementById('result');
    if (choices) {
        choices.style.display = '';
    }

    if (game_info) {
        game_info.style.display = '';
    }

    if (roundRes) {
        roundRes.style.display = '';
    }

    const gameConclusion = document.getElementById('game-conclusion');
    if (gameConclusion) {
        gameConclusion.remove();
    }

    document.getElementById('choices').style.display = '';
    resultDisplay.textContent = 'Choose your weapon!';
}