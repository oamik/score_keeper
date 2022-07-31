const p1 = {
    score: 0,
    button: document.querySelector('#p1Btn'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Btn'),
    display: document.querySelector('#p2Display')
}

function updateScores(player, opponent) {
    if (!isGameOver) {
        ++player.score;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            clearInterval(idDemo);
        }
        player.display.textContent = player.score;
    }
}


const resetButton = document.querySelector('#resetBtn');
const demoButton = document.querySelector('#demoBtn');
const winningScoreSelect = document.querySelector('#playTo');

let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;
let idDemo = null;

p1.button.addEventListener('click', function () {
    updateScores(p1, p2);
});

p2.button.addEventListener('click', function () {
    updateScores(p2, p1);
});

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);
demoButton.addEventListener('click', showDemo);

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
        p.button.classList.remove('is-hidden');
    }
    clearInterval(idDemo);
    demoButton.disabled = false;
};

function showDemo() {
    reset();
    p1.button.classList.add('is-hidden');
    p2.button.classList.add('is-hidden');
    demoButton.disabled = true;
    function flipAcoin() {
        return Math.floor(Math.random() * 2);
    }
    idDemo = setInterval(() => {
        if (flipAcoin()) {
            p1.button.click();
        }
        else {
            p2.button.click();
        }
        console.log('Tick Tock');
    }, 500);
}
