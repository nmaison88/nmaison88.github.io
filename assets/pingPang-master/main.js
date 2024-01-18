import ScoreboardView from './scoreboard/ScoreboardView.js';
let playerOneScore = 0;
let playerTwoScore = 0;
let servingPlayer = null;
let audioQueue = [];
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
      servingPlayer = null;
      view.updateServer(serve, null);
      play_sound_queue([getSound('321')]);
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
    servingPlayer = null;
    view.resetServe();
    view.updateServer(serve, servingPlayer);
    view.update(playerOneScore, playerTwoScore);
    getSound('321');
  }
};
const view = new ScoreboardView(
  root,
  'Player One',
  'Player Two',
  (player, direction) => {
    audioQueue = [];
    let special = false;
    const difference = direction === 'minus' ? -1 : 1;

    // assign service to who ever won the first service
    if (!serve && !servingPlayer) {
      servingPlayer = player;
      serve = 'first';
      view.updateServer(serve, servingPlayer);
      audioQueue.push(
        ...AnnounceScore(servingPlayer, playerOneScore, playerTwoScore, true)
      );
      play_sound_queue(audioQueue);
      return;
    }
    // only play audio on adding points
    if (direction === 'plus') {
      audioQueue.push(getSound('ding', 'global'));
    }
    if (serve === 'first') {
      serve = 'second';
    } else if (serve === 'second') {
      serve = 'first';
      if (direction !== 'minus') {
        servingPlayer = servingPlayer === 'one' ? 'two' : 'one';
        audioQueue.push(
          ...AnnounceScore(servingPlayer, playerOneScore, playerTwoScore, true)
        );
      }
    }

    view.updateServer(serve, servingPlayer);

    let audio;

    if (player === 'one') {
      playerOneScore = Math.max(playerOneScore + difference, 0);
      audio = 'player1';
    } else {
      playerTwoScore = Math.max(playerTwoScore + difference, 0);
      audio = 'player2';
    }
    const specialCalled = callSpecial(
      servingPlayer,
      playerOneScore,
      playerTwoScore,
      player
    );
    if (specialCalled) {
      special = true;
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
        view.resetServe();
        const winningPlayer = playerOneScore === 21 ? 1 : 2;
        audioQueue.push(getSound('game over', player));

        view.showWinner();
        view.wordflick(winningPlayer);
        view.disableCounters();
      }
      serve = 'first';
    }
    // sudden death!
    if (playerOneScore === 20 && playerTwoScore === 20) {
      audioQueue.push(getSound('sudden death', player));
    }
    view.update(playerOneScore, playerTwoScore);

    // dont announce score if we did a special already
    if (!special) {
      audioQueue.push(
        ...AnnounceScore(servingPlayer, playerOneScore, playerTwoScore)
      );
    }
    // play the sounds
    play_sound_queue(audioQueue);
  },
  () => {
    view.resetWinner();
    serve = null;
    playerOneScore = 0;
    playerTwoScore = 0;
    servingPlayer = null;

    view.updateServer(serve, servingPlayer);
    view.update(playerOneScore, playerTwoScore);
    getSound('321');
  }
);

const getSound = (sound, player = 'one') => {
  let voice =
    player !== 'global' ? document.getElementById('narrator1').value : 'global';

  if (player != 'one' && player !== 'global') {
    voice = document.getElementById('narrator2').value;
  }
  if (voice === 'global') {
    switch (sound) {
      case 'ding':
        return new Audio('ding.wav');
    }
  }

  if (voice === 'basic') {
    switch (sound) {
      case '321':
        return new Audio('321.wav');
      case 'player1':
        return new Audio('player1.wav');

      case 'player2':
        return new Audio('player2.wav');

      case 'game over':
        return new Audio('game over.wav');

      case 'sudden death':
        return new Audio('sudden death.wav');
    }
  }

  if (voice === 'macho') {
    switch (sound) {
      case 'juans':
        return new Audio('juans macho.wav');

      case 'twah':
        return new Audio('twah macho.wav');

      case 'five0':
        return new Audio('5 0 macho.wav');

      case 'nines':
        return new Audio('nine macho.wav');

      case 'crazy8s':
        return new Audio('crazy8 macho.wav');

      case 'solute':
        return new Audio('solute macho.wav');

      case '1911':
        return new Audio('1911 macho.wav');

      case '321':
        return new Audio('321 macho.wav');

      case 'player1':
        return new Audio('macho player one.wav');

      case 'player2':
        return new Audio('macho player 2.wav');

      case 'game over':
        return new Audio('macho game over.wav');

      case 'sudden death':
        return new Audio('macho sudden death.wav');

      case 'vs':
        return new Audio('macho vs.wav');

      case '0':
        return new Audio('macho 0.wav');

      case '1':
        return new Audio('macho 1.wav');

      case '2':
        return new Audio('macho 2.wav');

      case '3':
        return new Audio('macho 3.wav');

      case '4':
        return new Audio('macho 4.wav');

      case '5':
        return new Audio('macho 5.wav');

      case '6':
        return new Audio('macho 6.wav');

      case '7':
        return new Audio('macho 7.wav');

      case '8':
        return new Audio('macho 8.wav');

      case '9':
        return new Audio('macho 9.wav');

      case '10':
        return new Audio('macho 10.wav');

      case '11':
        return new Audio('macho 11.wav');

      case '12':
        return new Audio('macho 12.wav');

      case '13':
        return new Audio('macho 13.wav');

      case '14':
        return new Audio('macho 14.wav');

      case '15':
        return new Audio('macho 15.wav');

      case '16':
        return new Audio('macho 16.wav');

      case '17':
        return new Audio('macho 17.wav');

      case '18':
        return new Audio('macho 18.wav');

      case '19':
        return new Audio('macho 19.wav');

      case '20':
        return new Audio('macho 20.wav');

      case '21':
        return new Audio('macho 21.wav');

      case '22':
        return new Audio('macho 22.wav');

      case 'serving':
        return new Audio('macho serving.wav');
    }
  }

  if (voice === 'tike') {
    switch (sound) {
      case 'twah':
        return new Audio('tike twah.wav');

      case 'five0':
        return new Audio('tike 5 0.wav');

      case 'nines':
        return new Audio('nine tikes.wav');

      case 'crazy8s':
        return new Audio('tike crazy 8s.wav');

      case 'solute':
        return new Audio('tike solute.wav');

      case '1911':
        return new Audio('tike 1911.wav');

      case '321':
        return new Audio('tike 321 go.wav');

      case 'player1':
        return new Audio('tike player 1.wav');

      case 'player2':
        return new Audio('tike player 2.wav');

      case 'game over':
        return new Audio('tike game over.wav');

      case 'sudden death':
        return new Audio('tike sudden death.wav');
    }
  }
};

const AnnounceScore = (
  servingPlayer,
  playerOneScore,
  playerTwoScore,
  isFirstServe = false
) => {
  if (isFirstServe) {
    const player =
      servingPlayer === 'one'
        ? getSound('player1', servingPlayer)
        : getSound('player2', servingPlayer);
    const otherPlayer = getSound(
      servingPlayer === 'one' ? 'player2' : 'player1',
      servingPlayer
    );
    return [player, getSound('serving', servingPlayer), otherPlayer];
  }
  // play whose sering score first
  const player =
    servingPlayer === 'one'
      ? getSound(playerOneScore.toString(), servingPlayer)
      : getSound(playerTwoScore.toString(), servingPlayer);
  // then play the recievers score next
  const otherPlayer =
    servingPlayer === 'one'
      ? getSound(playerTwoScore.toString(), servingPlayer)
      : getSound(playerOneScore.toString(), servingPlayer);
  return [player, otherPlayer];
};

const callSpecial = (servingPlayer, playerOneScore, playerTwoScore, player) => {
  // juans
  if (playerOneScore === 1 && playerTwoScore === 1) {
    audioQueue.push(getSound('juans', player));
    return true;
  }
  // twah
  if (playerOneScore === 2 && playerTwoScore === 2) {
    audioQueue.push(getSound('twah', player));
    return true;
  }

  // crazy 8's
  if (playerOneScore === 8 && playerTwoScore === 8) {
    audioQueue.push(getSound('crazy8s', player));
    return true;
  }
  // nines
  if (playerOneScore === 9 && playerTwoScore === 9) {
    audioQueue.push(getSound('nines', player));
    return true;
  }
  if (
    (playerOneScore === 9 && playerTwoScore === 11) ||
    (playerOneScore === 11 && playerTwoScore === 9)
  ) {
    audioQueue.push(getSound('solute', player));
    return true;
  }

  if (servingPlayer === 'one') {
    // five0
    if (playerOneScore === 5 && playerTwoScore === 0) {
      audioQueue.push(getSound('five0', player));
      return true;
    }
    if (playerOneScore === 19 && playerTwoScore === 11) {
      audioQueue.push(getSound('1911', player));
      return true;
    }
  } else {
    // five0
    if (playerTwoScore === 5 && playerOneScore === 0) {
      audioQueue.push(getSound('five0', player));
      return true;
    }
    if (playerTwoScore === 19 && playerOneScore === 11) {
      audioQueue.push(getSound('1911', player));
      return true;
    }
  }
};

function play_sound_queue(sounds) {
  let index = 0;
  function recursive_play() {
    //If the index is the last of the table, play the sound
    //without running a callback after
    if (index + 1 === sounds.length) {
      play(sounds[index], null);
    } else {
      //Else, play the sound, and when the playing is complete
      //increment index by one and play the sound in the
      //indexth position of the array
      play(sounds[index], function () {
        index++;
        recursive_play();
      });
    }
  }
  recursive_play();
}

function play(audio, callback) {
  audio.play();
  if (callback) {
    //When the audio object completes it's playback, call the callback
    //provided
    audio.addEventListener('ended', callback);
  }
}
