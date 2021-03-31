'use strict';

// ELEMENTS//
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const curScore0El = document.getElementById('current--0');
const curScore1El = document.getElementById('current--1');
///////////////////////////////////////////////////
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
////////////////////////////////////////////////
const rules = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const btnRules = document.querySelector('.btn-rules');
const btnRulesClose = document.querySelector('.close-rules');

let currentScore = 0;
let score = [0, 0];
let activePlayer = 0;
let playing = true;

// Beginning of the game
diceEl.classList.add('hidden');
score0El.textContent = 0;
curScore1El.textContent = 0;
curScore0El.textContent = 0;

//REUSABLE FUNCTION
const closeRule = function () {
  rules.classList.add('hidden');
  overlay.classList.add('hidden');
};

const resetGame = function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  curScore1El.textContent = 0;
  curScore0El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  name1El.textContent = 'Player 2';
  name0El.textContent = 'Player 1';

  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;
  playing = true;
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/////////////////////////////////////////////////

// BTN ROLL
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generate a random dice from 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.if the dice is not 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// BTN HOLD
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add CurScore to TotalScore
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.if score is >=100
    if (score[activePlayer] >= 10) {
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);

//RULES BTNS FUNCTIONS

btnRules.addEventListener('click', function () {
  rules.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
btnRulesClose.addEventListener('click', closeRule);
overlay.addEventListener('click', closeRule);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !rules.classList.contains('hidden')) {
    closeRule();
  }
});
