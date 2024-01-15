import ScoreboardView from './scoreboard/ScoreboardView.js';
let playerOneScore = 0;
let playerTwoScore = 0;
const root = document.querySelector('#app');
let servingPlayer = 0;
document.onkeypress = function (e) {
  e = e || window.event;
  // any key restarts
  if (playerOneScore >= 21 || playerTwoScore >= 21) {
    if (view.checkIfWinnerStillBoasting() === true) {
      view.resetWinner();
      view.updateServer(1);
      servingPlayer = 0;
      playerOneScore = 0;
      playerTwoScore = 0;
      playSound('321');
    }
    view.update(playerOneScore, playerTwoScore);
  }
  const key1 = 49;
  if (e.keyCode === key1) {
    view.keypressCatch('one', 'plus');
  }
  const key2 = 50;
  if (e.keyCode === key2) {
    view.keypressCatch('two', 'plus');
  }

  // pressing shift and 1 subtracts point from player 1
  const key1Shift = 33;
  if (e.keyCode === key1Shift) {
    view.keypressCatch('one', 'minus');
  }

  // pressing shift and 2 subtracts point from player 2
  const key2Shift = 64;
  if (e.keyCode === key2Shift) {
    view.keypressCatch('two', 'minus');
  }

  // pressing 3 resets the board
  const key3 = 51;
  if (e.keyCode === key3) {
    view.resetWinner();
    view.updateServer(1);
    servingPlayer = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    view.update(playerOneScore, playerTwoScore);

    playSound('321');
  }
};
const view = new ScoreboardView(
  root,
  'Player One',
  'Player Two',
  (player, direction) => {
    const difference = direction === 'minus' ? -1 : 1;
    if (direction !== 'minus') {
      view.updateServer(servingPlayer);
      servingPlayer++;
    }
    let audio;

    if (player === 'one') {
      playerOneScore = Math.max(playerOneScore + difference, 0);
      audio = 'player1';
    } else {
      playerTwoScore = Math.max(playerTwoScore + difference, 0);
      audio = 'player2';
    }
    // only play audio on adding points
    if (direction === 'plus') {
      playSound(audio, player);
    }

    // winning point reached
    if (playerOneScore >= 21 || playerTwoScore >= 21) {
      // winner already announced
      if (view.checkIfWinnerStillBoasting() === true) {
        view.resetWinner();
        playerOneScore = 0;
        playerTwoScore = 0;
      }
      // winning point reached
      else {
        const winningPlayer = playerOneScore === 21 ? 1 : 2;
        // wait for player x sound to finish
        setTimeout(() => {
          playSound('game over', player);
        }, 2000);

        view.showWinner();
        view.wordflick(winningPlayer);
        view.disableCounters();
      }
      servingPlayer = 0;
    }
    // sudden death!
    if (playerOneScore === 20 && playerTwoScore === 20) {
      // wait for player x sound to finish
      setTimeout(() => {
        playSound('sudden death', player);
      }, 2000);
    }
    view.update(playerOneScore, playerTwoScore);
  },
  () => {
    view.resetWinner();
    view.updateServer(1);
    servingPlayer = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    view.update(playerOneScore, playerTwoScore);
    playSound('321');
  }
);

const playSound = (sound, player = 'one') => {
  let voice = document.getElementById('narrator1').value;

  if (player != 'one') {
    voice = document.getElementById('narrator2').value;
  }

  if (voice === 'basic') {
    switch (sound) {
      case '321':
        new Audio('321.wav').play();
        break;
      case 'player1':
        new Audio('player1.wav').play();
        break;
      case 'player2':
        new Audio('player2.wav').play();
        break;
      case 'game over':
        new Audio('game over.wav').play();
        break;
      case 'sudden death':
        new Audio('sudden death.wav').play();
        break;
    }
  }

  if (voice === 'macho') {
    switch (sound) {
      case '321':
        new Audio('321 macho.wav').play();
        break;
      case 'player1':
        new Audio('macho player one.wav').play();
        break;
      case 'player2':
        new Audio('macho player 2.wav').play();
        break;
      case 'game over':
        new Audio('macho game over.wav').play();
        break;
      case 'sudden death':
        new Audio('macho sudden death.wav').play();
        break;
    }
  }

  if (voice === 'tike') {
    switch (sound) {
      case '321':
        new Audio('tike 321 go.wav').play();
        break;
      case 'player1':
        new Audio('tike player 1.wav').play();
        break;
      case 'player2':
        new Audio('tike player 2.wav').play();
        break;
      case 'game over':
        new Audio('tike game over.wav').play();
        break;
      case 'sudden death':
        new Audio('tike sudden death.wav').play();
        break;
    }
  }
};
