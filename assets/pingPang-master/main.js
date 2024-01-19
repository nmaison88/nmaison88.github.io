import ScoreboardView from './scoreboard/ScoreboardView.js';
let playerOneScore = 0;
let playerTwoScore = 0;
let servingPlayer = null;
let audioQueue = [];
const root = document.querySelector('#app');
let serve = null; //we start with 0 but whoever wins service, is selected as serving player
let lastTimeKeyPressed = 0;
let audio = new Audio();
let  i = 0;
const playlist = new Array('sounds/music/bg music.mp3', 'sounds/music/bg music2.mp3','sounds/music/bg music3.mp3','sounds/music/bg music4.mp3' );


audio.addEventListener('ended', function () {
    i = ++i < playlist.length ? i : 0;
    console.log(i)
    audio.src = playlist[i];
    audio.play();
}, true);

document.onkeypress = function (e) {
  //  if the button is pressed before 3 seconds of the last button press, we don't allow it to trigger
  if (Date.now() - lastTimeKeyPressed <= 3000) {
    // debounce now passed
    return;
  }
  // reset debounce
  lastTimeKeyPressed = Date.now();
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
    play_sound_queue([getSound('321')]);
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
    const tauntEnabled = document.getElementById('taunt').checked;
    if (!special && tauntEnabled) {
      taunt(servingPlayer, playerOneScore, playerTwoScore, player);
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
    play_sound_queue([getSound('321')]);
  },()=>{  
    const playmusic = document.getElementById('bgMusic').checked;
    if(!playmusic){
      audio.load()
      return;
    }
  if (playmusic) {
    audio.volume = 0.3;
    audio.loop = false;
    audio.src = playlist[0];
    audio.play();
  }

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
        return new Audio('sounds/global/ding.wav');

      case 'wah wah':
        return new Audio('sounds/global/wah wah wah.mp3');
    }
  }

  if (voice === 'basic') {
    switch (sound) {
      case '321':
        return new Audio('sounds/basic/321.wav');
      case 'player1':
        return new Audio('sounds/basic/player1.wav');

      case 'player2':
        return new Audio('sounds/basic/player2.wav');

      case 'game over':
        return new Audio('sounds/basic/game over.wav');

      case 'sudden death':
        return new Audio('sounds/basic/sudden death.wav');
    }
  }

  if (voice === 'macho') {
    switch (sound) {
      case 'juans':
        return new Audio('sounds/macho/juans macho.wav');

      case 'twah':
        return new Audio('sounds/macho/twah macho.wav');

      case 'five0':
        return new Audio('sounds/macho/5 0 macho.wav');

      case 'nines':
        return new Audio('sounds/macho/nine macho.wav');

      case 'crazy8s':
        return new Audio('sounds/macho/crazy8 macho.wav');

      case 'solute':
        return new Audio('sounds/macho/solute macho.wav');

      case '1911':
        return new Audio('sounds/macho/1911 macho.wav');

      case '321':
        return new Audio('sounds/macho/321 macho.wav');

      case 'player1':
        return new Audio('sounds/macho/macho player one.wav');

      case 'player2':
        return new Audio('sounds/macho/macho player 2.wav');

      case 'game over':
        return new Audio('sounds/macho/macho game over.wav');

      case 'sudden death':
        return new Audio('sounds/macho/macho sudden death.wav');
      case 'mistakes':
        return new Audio('sounds/macho/macho mistakes.wav');
      case 'what we signed up for':
        return new Audio('sounds/macho/macho not what we signed up for.wav');
      case 'superb':
        return new Audio('sounds/macho/macho superb.wav');
      case 'serious':
        return new Audio('sounds/macho/macho serious.wav');
      case 'coming home':
        return new Audio('sounds/macho/macho coming home.wav');
      case 'whoa':
        return new Audio('sounds/macho/macho whoa.wav');
      case 'solid':
        return new Audio('sounds/macho/macho solid.wav');
      case 'disappointing':
        return new Audio('sounds/macho/macho disappointing.wav');
      case 'how you do it':
        return new Audio('sounds/macho/macho how you do it.wav');
      case 'better luck':
        return new Audio('sounds/macho/macho better luck.wav');

      case 'encouragement':
        return new Audio('sounds/macho/macho encouragement.wav');
      case 'game point':
        return new Audio('sounds/macho/macho game point.wav');
      case 'hands':
        return new Audio('sounds/macho/macho hands.wav');
      case 'no contest':
        return new Audio('sounds/macho/macho no contest.wav');
      case 'no no no':
        return new Audio('sounds/macho/macho no no no.wav');
      case 'no pressure':
        return new Audio('sounds/macho/macho no pressure.wav');
      case 'goat':
        return new Audio('sounds/macho/macho goat.wav');
      case 'almost there':
        return new Audio('sounds/macho/macho almost there.wav');
      case 'end it':
        return new Audio('sounds/macho/macho end it.wav');
      case 'misery':
        return new Audio('sounds/macho/macho misery.wav');
      case 'rabbits':
        return new Audio('sounds/macho/macho rabbits.wav');
      case 'vs':
        return new Audio('sounds/macho/macho vs.wav');

      case '0':
        return new Audio('sounds/macho/macho 0.wav');

      case '1':
        return new Audio('sounds/macho/macho 1.wav');

      case '2':
        return new Audio('sounds/macho/macho 2.wav');

      case '3':
        return new Audio('sounds/macho/macho 3.wav');

      case '4':
        return new Audio('sounds/macho/macho 4.wav');

      case '5':
        return new Audio('sounds/macho/macho 5.wav');

      case '6':
        return new Audio('sounds/macho/macho 6.wav');

      case '7':
        return new Audio('sounds/macho/macho 7.wav');

      case '8':
        return new Audio('sounds/macho/macho 8.wav');

      case '9':
        return new Audio('sounds/macho/macho 9.wav');

      case '10':
        return new Audio('sounds/macho/macho 10.wav');

      case '11':
        return new Audio('sounds/macho/macho 11.wav');

      case '12':
        return new Audio('sounds/macho/macho 12.wav');

      case '13':
        return new Audio('sounds/macho/macho 13.wav');

      case '14':
        return new Audio('sounds/macho/macho 14.wav');

      case '15':
        return new Audio('sounds/macho/macho 15.wav');

      case '16':
        return new Audio('sounds/macho/macho 16.wav');

      case '17':
        return new Audio('sounds/macho/macho 17.wav');

      case '18':
        return new Audio('sounds/macho/macho 18.wav');

      case '19':
        return new Audio('sounds/macho/macho 19.wav');

      case '20':
        return new Audio('sounds/macho/macho 20.wav');

      case '21':
        return new Audio('sounds/macho/macho 21.wav');

      case '22':
        return new Audio('sounds/macho/macho 22.wav');

      case 'serving':
        return new Audio('sounds/macho/macho serving.wav');
    }
  }

  if (voice === 'tike') {
    switch (sound) {
      case 'twah':
        return new Audio('sounds/tike/tike twah.wav');

      case 'five0':
        return new Audio('sounds/tike/tike 5 0.wav');

      case 'nines':
        return new Audio('sounds/tike/nine tikes.wav');

      case 'crazy8s':
        return new Audio('sounds/tike/tike crazy 8s.wav');

      case 'solute':
        return new Audio('sounds/tike/tike solute.wav');

      case '1911':
        return new Audio('sounds/tike/tike 1911.wav');

      case '321':
        return new Audio('sounds/tike/tike 321 go.wav');

      case 'player1':
        return new Audio('sounds/tike/tike player 1.wav');

      case 'player2':
        return new Audio('sounds/tike/tike player 2.wav');

      case 'game over':
        return new Audio('sounds/tike/tike game over.wav');

      case 'sudden death':
        return new Audio('sounds/tike/tike sudden death.wav');
    }
  }
  if (voice === 'irish') {
    switch (sound) {
      case 'juans':
        return new Audio('sounds/irish/irish juans.wav');

      case 'twah':
        return new Audio('sounds/irish/irish twah.wav');

      case 'five0':
        return new Audio('sounds/irish/irish 5 0.wav');

      case 'nines':
        return new Audio('sounds/irish/irish nines.wav');

      case 'crazy8s':
        return new Audio('sounds/irish/irish crazy 8s.wav');

      case 'solute':
        return new Audio('sounds/irish/irish solute.wav');

      case '1911':
        return new Audio('sounds/irish/irish 1911.wav');

      case '321':
        return new Audio('sounds/irish/321 irish.wav');

      case 'player1':
        return new Audio('sounds/irish/irish player one.wav');

      case 'player2':
        return new Audio('sounds/irish/irish player 2.wav');

      case 'game over':
        return new Audio('sounds/irish/irish game over.wav');

      case 'sudden death':
        return new Audio('sounds/irish/irish sudden death.wav');
      case 'mistakes':
        return new Audio('sounds/irish/irish mistakes.wav');
      case 'what we signed up for':
        return new Audio('sounds/irish/irish not what we signed up for.wav');
      case 'superb':
        return new Audio('sounds/irish/irish superb.wav');
      case 'serious':
        return new Audio('sounds/irish/irish serious.wav');
      case 'coming home':
        return new Audio('sounds/irish/irish coming home.wav');
      case 'whoa':
        return new Audio('sounds/irish/irish whoa.wav');
      case 'solid':
        return new Audio('sounds/irish/irish solid.wav');
      case 'disappointing':
        return new Audio('sounds/irish/irish disappointing.wav');
      case 'how you do it':
        return new Audio('sounds/irish/irish how you do it.wav');
      case 'better luck':
        return new Audio('sounds/irish/irish better luck.wav');

      case 'encouragement':
        return new Audio('sounds/irish/irish encouragement.wav');
      case 'game point':
        return new Audio('sounds/irish/irish game point.wav');
      case 'hands':
        return new Audio('sounds/irish/irish hands.wav');
      case 'no contest':
        return new Audio('sounds/irish/irish no contest.wav');
      case 'no no no':
        return new Audio('sounds/irish/irish no no no.wav');
      case 'no pressure':
        return new Audio('sounds/irish/irish no pressure.wav');
      case 'goat':
        return new Audio('sounds/irish/irish goat.wav');
      case 'almost there':
        return new Audio('sounds/irish/irish almost there.wav');
      case 'end it':
        return new Audio('sounds/irish/irish end it.wav');
      case 'misery':
        return new Audio('sounds/irish/irish misery.wav');
      case 'rabbits':
        return new Audio('sounds/irish/irish rabbits.wav');
      case 'vs':
        return new Audio('sounds/irish/irish vs.wav');

      case '0':
        return new Audio('sounds/irish/irish 0.wav');

      case '1':
        return new Audio('sounds/irish/irish 1.wav');

      case '2':
        return new Audio('sounds/irish/irish 2.wav');

      case '3':
        return new Audio('sounds/irish/irish 3.wav');

      case '4':
        return new Audio('sounds/irish/irish 4.wav');

      case '5':
        return new Audio('sounds/irish/irish 5.wav');

      case '6':
        return new Audio('sounds/irish/irish 6.wav');

      case '7':
        return new Audio('sounds/irish/irish 7.wav');

      case '8':
        return new Audio('sounds/irish/irish 8.wav');

      case '9':
        return new Audio('sounds/irish/irish 9.wav');

      case '10':
        return new Audio('sounds/irish/irish 10.wav');

      case '11':
        return new Audio('sounds/irish/irish 11.wav');

      case '12':
        return new Audio('sounds/irish/irish 12.wav');

      case '13':
        return new Audio('sounds/irish/irish 13.wav');

      case '14':
        return new Audio('sounds/irish/irish 14.wav');

      case '15':
        return new Audio('sounds/irish/irish 15.wav');

      case '16':
        return new Audio('sounds/irish/irish 16.wav');

      case '17':
        return new Audio('sounds/irish/irish 17.wav');

      case '18':
        return new Audio('sounds/irish/irish 18.wav');

      case '19':
        return new Audio('sounds/irish/irish 19.wav');

      case '20':
        return new Audio('sounds/irish/irish 20.wav');

      case '21':
        return new Audio('sounds/irish/irish 21.wav');

      case '22':
        return new Audio('sounds/irish/irish 22.wav');

      case 'serving':
        return new Audio('sounds/irish/irish serving.wav');
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
    // const otherPlayer = getSound(
    //   servingPlayer === 'one' ? 'player2' : 'player1',
    //   servingPlayer
    // );
    return [player, getSound('serving', servingPlayer)];
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

const taunt = (servingPlayer, playerOneScore, playerTwoScore, player) => {
  if (playerOneScore === 20 || playerTwoScore === 20) {
    audioQueue.push(getSound('game point', player));
    return;
  }
  // if servingPlayer 1 scored point, we can taunt
  if (servingPlayer === player) {
    // greater than three points
    const servingPlayerScore =
      player === 'one' ? playerOneScore : playerTwoScore;
    const opponentScore = player === 'one' ? playerTwoScore : playerOneScore;
    if (servingPlayerScore - opponentScore >= 3) {
      const tauntArray = [
        getSound('superb', player),
        getSound('whoa', player),
        getSound('solid', player),
        getSound('how you do it', player),
        getSound('better luck', player),
        getSound('hands', player),
        getSound('no contest', player),
        getSound('goat', player),
      ];
      const randomSOund = tauntArray[(tauntArray.length * Math.random()) | 0];
      audioQueue.push(randomSOund);
    }
  } //if server lost a point, we can add reactions
  else if (servingPlayer !== player) {
    const servingPlayerScore =
      servingPlayer === 'one' ? playerOneScore : playerTwoScore;
    const opponentScore =
      servingPlayer === 'one' ? playerTwoScore : playerOneScore;

    if (
      opponentScore - servingPlayerScore >= 3 &&
      opponentScore - servingPlayerScore < 10
    ) {
      const reactionArray = [
        getSound('mistakes', player),
        getSound('disappointing', player),
        getSound('wah wah', 'global'),
        getSound('what we signed up for', player),
        getSound('serious', player),
        getSound('coming home', player),
        getSound('encouragement', player),
        getSound('no no no', player),
        getSound('no pressure', player),
      ];
      const randomSOund =
        reactionArray[(reactionArray.length * Math.random()) | 0];
      audioQueue.push(randomSOund);
    } else if (opponentScore - servingPlayerScore >= 10) {
      const reactionArray = [
        getSound('end it', player),
        getSound('misery', player),
        getSound('wah wah', 'global'),
        getSound('rabbits', player),
        getSound('serious', player),
        getSound('almost there', player),
      ];
      const randomSOund =
        reactionArray[(reactionArray.length * Math.random()) | 0];
      audioQueue.push(randomSOund);
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
  try {
    audio.play();
  } catch (error) {
    console.log(error);
  }
  if (callback) {
    //When the audio object completes it's playback, call the callback
    //provided
    audio.addEventListener('ended', callback);
  }
}
