'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let scores = [0, 0];
let currentScore1 = 0;
let currentScore2 = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  scores = [0, 0];
  currentScore1 = 0;
  currentScore2 = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();

//switching the player
const switchPlayer = function () {
  document.querySelector('#current--1').textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  currentScore1 = 0;
  currentScore2 = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// declaration of winner
const winnerPlayer = function () {
  if (
    document.getElementById(`score--0`).textContent >
    document.getElementById(`score--1`).textContent
  ) {
    document.querySelector('.player--0').classList.add('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
  } else if (
    document.getElementById(`score--1`).textContent >
    document.getElementById(`score--0`).textContent
  ) {
    document.querySelector('.player--1').classList.add('player--winner');
    document.querySelector('.player--1').classList.remove('player--active');
  } else {
    document.querySelector('.player--0').classList.add('player--winner');
    document.querySelector('.player--1').classList.add('player--winner');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.remove('player--active');
  }
  playing = false;
  diceEl.classList.add('hidden');
};

// function that compares both the values of team and declares the result
const checkWinner = function () {
  if (
    `current--${activePlayer}` === 'current--0' &&
    document.getElementById(`score--1`).textContent != 0
  ) {
    winnerPlayer();
  } else if (
    `current--${activePlayer}` === 'current--1' &&
    document.getElementById(`score--0`).textContent != 0
  ) {
    winnerPlayer();
  } else if (
    `current--${activePlayer}` === 'current--0' &&
    document.getElementById(`score--1`).textContent != 0 &&
    document.getElementById('score--0').textContent != 0
  ) {
    winnerPlayer();
  } else if (
    `current--${activePlayer}` === 'current--1' &&
    document.getElementById(`score--1`).textContent != 0 &&
    document.getElementById('score--0').textContent != 0
  ) {
    winnerPlayer();
  }
};

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //displaying the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 6:if true add 1 to other palyer's score
    if (dice !== 6) {
      //add score to current player
      if (`current--${activePlayer}` === 'current--0') {
        currentScore1 += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore1;
      } else {
        currentScore2 += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore2;
      }
    } else {
      //adding wickets to the non-active player
      if (`current--${activePlayer}` === 'current--0') {
        if (currentScore2 < 9) {
          currentScore2 += 1;
          current1El.textContent = currentScore2;
        } else {
          //when the team get's all-out
          document.getElementById(`score--0`).textContent = currentScore1;
          checkWinner();
          switchPlayer();
          document.querySelector('#current-label-0').textContent = 'Wickets';
          document.querySelector('#current-label-1').textContent = 'Runs';
        }
      }
      //adding wickets to the non-active player
      else if (`current--${activePlayer}` === 'current--1') {
        if (currentScore1 < 9) {
          currentScore1 += 1;
          current0El.textContent = currentScore1;
        } else {
          //when the team get's all-out
          document.getElementById(`score--1`).textContent = currentScore2;
          checkWinner();
          switchPlayer();
          document.querySelector('#current-label-0').textContent = 'Runs';
          document.querySelector('#current-label-1').textContent = 'Wickets';
        }
      }
    }
  }
});

//when declare button is pressend
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to the active player
    if (`current--${activePlayer}` === 'current--0') {
      scores[activePlayer] += currentScore1;
      document.getElementById(`score--0`).textContent = scores[0];
    } else if (`current--${activePlayer}` === 'current--1') {
      scores[activePlayer] += currentScore2;
      document.getElementById(`score--1`).textContent = scores[1];
    }

    checkWinner();
    switchPlayer();

    if (`current--${activePlayer}` !== 'current--0') {
      document.querySelector('#current-label-0').textContent = 'Wickets';
      document.querySelector('#current-label-1').textContent = 'Runs';
    } else if (`current--${activePlayer}` !== 'current--1') {
      document.querySelector('#current-label-0').textContent = 'Runs';
      document.querySelector('#current-label-1').textContent = 'Wickets';
    }
  }
});

btnNew.addEventListener('click', init);
