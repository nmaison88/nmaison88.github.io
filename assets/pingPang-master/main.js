import ScoreboardView from './scoreboard/ScoreboardView.js';
let playerOneScore = 0;
let playerTwoScore = 0;
let servingPlayer = null;
const root = document.querySelector('#app');
let serve = null; //we start with 0 but whoever wins service, is selected as serving player
document.onkeypress = function (e) {
  e = e || window.event;
  // any key restarts
  if (playerOneScore >= 21 || playerTwoScore >= 21) {
    if (view.checkIfWinnerStillBoasting() === true) {
      view.resetWinner();
      serve = null;
      playerOneScore = 0;
      playerTwoScore = 0;
      servingPlayer = null
      view.updateServer(serve, null);
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
    serve = null;
    playerOneScore = 0;
    playerTwoScore = 0;
    servingPlayer = null
    view.resetServe()
    view.updateServer(serve, servingPlayer);
    view.update(playerOneScore, playerTwoScore);
    playSound('321');

  }
};
const view = new ScoreboardView(
  root,
  'Player One',
  'Player Two',
  (player, direction) => {
    // assign service to who ever won the first service
    if (!serve && !servingPlayer) {
      servingPlayer = player;
      serve = 'first';
      view.updateServer(serve, servingPlayer);
      return;
    }
    if (serve === 'first') {
      serve = 'second';
    } else if (serve === 'second') {
      serve = 'first';
      if (direction !== 'minus') {
        servingPlayer = servingPlayer === 'one' ? 'two' : 'one';
      }
    }

    view.updateServer(serve, servingPlayer);

    const difference = direction === 'minus' ? -1 : 1;

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

    // juans
    if (playerOneScore === 1 && playerTwoScore === 1) {
      playSound('juans', player);
    }
    // twah
    if (playerOneScore === 2 && playerTwoScore === 2) {
      playSound('twah', player);
    }
    // five0
    if (
      (playerOneScore === 5 && playerTwoScore === 0) ||
      (playerOneScore === 0 && playerTwoScore === 5)
    ) {
      playSound('five0', player);
    }
    // crazy 8's
    if (playerOneScore === 8 && playerTwoScore === 8) {
      playSound('crazy8s', player);
    }
    // nines
    if (playerOneScore === 9 && playerTwoScore === 9) {
      playSound('nines', player);
    }
    if (
      (playerOneScore === 9 && playerTwoScore === 11) ||
      (playerOneScore === 11 && playerTwoScore === 9)
    ) {
      playSound('solute', player);
    }
    if (
      (playerOneScore === 19 && playerTwoScore === 11) ||
      (playerOneScore === 11 && playerTwoScore === 19)
    ) {
      playSound('1911', player);
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
        view.resetServe()
        const winningPlayer = playerOneScore === 21 ? 1 : 2;
        // wait for player x sound to finish
        setTimeout(() => {
          playSound('game over', player);
        }, 2000);

        view.showWinner();
        view.wordflick(winningPlayer);
        view.disableCounters();
      }
      serve = 'first';
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
    serve = null;
    playerOneScore = 0;
    playerTwoScore = 0;
    servingPlayer = null

    view.updateServer(serve, servingPlayer);
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
      case 'juans':
        setTimeout(() => {
          new Audio('juans macho.wav').play();
        }, 1000);
        break;
      case 'twah':
        setTimeout(() => {
          new Audio('twah macho.wav').play();
        }, 1000);
        break;
      case 'five0':
        setTimeout(() => {
          new Audio('5 0 macho.wav').play();
        }, 1000);
        break;
      case 'nines':
        setTimeout(() => {
          new Audio('nine macho.wav').play();
        }, 1000);
        break;
      case 'crazy8s':
        setTimeout(() => {
          new Audio('crazy8 macho.wav').play();
        }, 1000);
        break;
      case 'solute':
        setTimeout(() => {
          new Audio('solute macho.wav').play();
        }, 1000);
        break;
      case '1911':
        setTimeout(() => {
          new Audio('1911 macho.wav').play();
        }, 1000);
        break;
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
      case 'twah':
        setTimeout(() => {
          new Audio('tike twah.wav').play();
        }, 1000);
        break;
      case 'five0':
        setTimeout(() => {
          new Audio('tike 5 0.wav').play();
        }, 1000);
        break;
      case 'nines':
        setTimeout(() => {
          new Audio('nine tikes.wav').play();
        }, 1000);
        break;
      case 'crazy8s':
        setTimeout(() => {
          new Audio('tike crazy 8s.wav').play();
        }, 1000);
        break;
      case 'solute':
        setTimeout(() => {
          new Audio('tike solute.wav').play();
        }, 1000);
        break;
      case '1911':
        setTimeout(() => {
          new Audio('tike 1911.wav').play();
        }, 1000);
        break;
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
