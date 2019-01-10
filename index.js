let userScore = 0;
let computerScore = 0;
const userScoreEl = document.querySelector('.userScore');
const computerScoreEl = document.querySelector('.computerScore');
const scoreBoardEl = document.getElementsByClassName('scoreBoard');
const resultMessage = document.querySelector('.message');
const rockEl = document.getElementById('ro');
const paperEl = document.getElementById('pa');
const spockEl = document.getElementById('sp');
const scissorsEl = document.getElementById('sc');
const lizardEl = document.getElementById('li');
const gameStartPosition = document.getElementById('gameStart');
const startBtn = document.getElementById('startGame');
const gamePositionMode = document.getElementById('gamePosition');
const gameMatchMessage = document.querySelector('.gameMatchMessage');
const gameMode = document.querySelector('.gameMode');
const buttonReplay = document.querySelector('.btnReplay');
let roundNumber = 0;
const renderMessage = document.getElementById('renderMessage');

function startGame() {
    startBtn.addEventListener('click', () => {
        gamePositionMode.classList.remove('hidden-position');
        gameStartPosition.classList.add('hidden-start');
        buttonReplay.classList.add('hidden-button');
        roundNumber = document.getElementById('gameNumber').value;
        getNumberMatch();
    });
};

window.addEventListener('load', function() {
    gamePositionMode.classList.add('hidden-position');
    startGame();
});

buttonReplay.addEventListener('click', () => {
    window.location.reload();
});

function symbolWord(letter) {
    if (letter === 'ro') return "Rock"
    if (letter === 'pa') return "Paper"
    if (letter === 'sc') return "Scissors"
    if (letter === 'sp') return "Spock"
    return "Lizard"
};

function gameComp() {
    const choisesComp = ['ro', 'pa', 'sc', 'sp', 'li'];
    const randomNumber = Math.floor(Math.random() * 5);
    return choisesComp[randomNumber];
};

function getNumberMatch() {
    gameMatchMessage.textContent = `Left ${roundNumber} match.`;
};

function winUser(user, computer) {
    userScore++;
    roundNumber--;
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;
    const userName = ' (user)'.fontsize(3).sub();
    const compName = ' (comp)'.fontsize(3).sup();
    resultMessage.innerHTML = `${symbolWord(user)}${userName} beats ${symbolWord(computer)}${compName}. You win!`;
    const gameStatus = document.getElementById(user);
    gameStatus.classList.add('green');
    setTimeout(() => gameStatus.classList.remove('green'), 350);
};

function winComp(user, computer) {
    computerScore++;
    roundNumber--;
    userScoreEl.textContent = userScore;
    computerScoreEl.textContent = computerScore;
    const userName = ' (user)'.fontsize(3).sub();
    const compName = ' (comp)'.fontsize(3).sup();
    resultMessage.innerHTML = `${symbolWord(user)}${userName} loses to ${symbolWord(computer)}${compName}. You lost!`;
    const gameStatus = document.getElementById(user);
    gameStatus.classList.add('red');
    setTimeout(() => gameStatus.classList.remove('red'), 350);
};

function draw(user) {
    resultMessage.textContent = `It was a draw! You both chose ${symbolWord(user)}`;
    const gameStatus = document.getElementById(user);
    gameStatus.classList.add('grey');
    setTimeout(() => gameStatus.classList.remove('grey'), 350);
};

function gameUser(userChoise) {
    const computerChoise = gameComp();
    switch (userChoise + computerChoise) {
        case 'rosc':
        case 'roli':
        case 'paro':
        case 'pasp':
        case 'scpa':
        case 'scli':
        case 'spro':
        case 'spsc':
        case 'lipa':
        case 'lisp':
            winUser(userChoise, computerChoise);
            break;
        case 'roro':
        case 'lili':
        case 'papa':
        case 'spsp':
        case 'scsc':
            draw(userChoise, computerChoise);
            break;
        case 'rosp':
        case 'ropa':
        case 'pali':
        case 'pasc':
        case 'scsp':
        case 'scro':
        case 'spli':
        case 'sppa':
        case 'liro':
        case 'lisc':
            winComp(userChoise, computerChoise);
            break;
    }
    getNumberMatch();
    if (roundNumber < 1) {
        gameMode.classList.add('hidden-position');
        buttonReplay.classList.remove('hidden-button');
    };
};

function gamePosition() {
    rockEl.addEventListener('click', () => gameUser('ro'));
    paperEl.addEventListener('click', () => gameUser('pa'));
    scissorsEl.addEventListener('click', () => gameUser('sc'));
    spockEl.addEventListener('click', () => gameUser('sp'));
    lizardEl.addEventListener('click', () => gameUser('li'));
};

gamePosition();
gameComp();