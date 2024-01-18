export default class ScoreboardView {
  constructor(
    root,
    playerOneName,
    playerTwoName,
    onControlButtonClick,
    resetFunction
  ) {
    this.onControlButtonClick = onControlButtonClick;
    this.root = root;
    this.server = '';
    this.root.innerHTML = `
    <div class="container">
      <div id="bg-start" class="bg-start"><div class="starter-text">To start Game, Enter point for which player is serving first</div></div>
      <div id="bg-left" class="bg-left" hidden></div>
      <div id="bg-right" class="bg-right" hidden></div>    
      <section class="topWrapper">
        <div class="top">Ping Pang</div>
        <div class="bottom" aria-hidden="true">Ping Pang</div>
      </section>
      <div class="scoreboard">
        <div class="scoreboard__name scoreboard__name--one">${playerOneName}<select class = "narrator" name="Narrator" id="narrator1">
        <option>Select Narrator</option>
        <option selected value="macho">Macho</option>
        <option value="tike">Tike</option>
        <option value="basic">Basic</option>
        <option value="none">None</option>
      </select>
      <select class = "narrator" name="Taunt" id="taunt1">
        <option selected value="yes">Taunts Enabled</option>
        <option value="no">Taunts Disabled</option>
      </select>
      </div>
        <div class="scoreboard__name scoreboard__name--two">${playerTwoName}     <select class = "narrator" name="Narrator" id="narrator2">
        <option>Select Narrator</option>
        <option selected value="macho">Macho</option>
        <option value="tike">Tike</option>
        <option value="basic">Basic</option>
        <option value="none">None</option>
      </select>
      <select class = "narrator" name="Taunt" id="taunt2">
        <option selected value="yes">Taunts Enabled</option>
        <option value="no">Taunts Disabled</option>
      </select>
      </div>
        
 
        <div class="scoreboard__score" data-for-player="one">0</div>
        <div class="scoreboard__score" data-for-player="two">0</div>
        <div class="scoreboard__controls" data-for-player="one">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
        <div class="scoreboard__controls" data-for-player="two">
          <button class="scoreboard__control-button">-</button>
          <button class="scoreboard__control-button">+</button>
        </div>
        <div>
          <div class="serve"></div>
          <div class="scoreboard__controls">
          <button class="reset button" hidden>Reset</button>
          </div>
        </div>
        <h3 class="word" hidden></h3>

      </div>
      <section class="bottomWrapper">
        <div class="top">deathmatch</div>
        <div class="bottom" aria-hidden="true">deathmatch</div>
      </section>
      
    </div>
		`;

    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((controlButton) => {
        controlButton.addEventListener('click', () => {
          const direction =
            controlButton.textContent === '-' ? 'minus' : 'plus';
          const player = controlButton.closest('.scoreboard__controls').dataset
            .forPlayer;

          onControlButtonClick(player, direction);
        });
      });

    const resetButton = this.root.querySelector('.reset');

    resetButton.addEventListener('click', (event) => {
      resetFunction();
      this.resetServe();
    });
  }
  keypressCatch(player, direction) {
    console.log('keypressCatch hit', player, direction);
    this.onControlButtonClick(player, direction);
  }
  update(playerOneScore, playerTwoScore) {
    this.root.querySelector(
      ".scoreboard__score[data-for-player='one']"
    ).textContent = playerOneScore;
    this.root.querySelector(
      ".scoreboard__score[data-for-player='two']"
    ).textContent = playerTwoScore;
  }
  resetServe() {
    document.getElementById('bg-left').hidden = true;
    document.getElementById('bg-right').hidden = true;
  }
  wordflick(player) {
    let winningPlayer = player == 1 ? 'Player One' : 'Player Two';
    let LosingPlayer = player == 2 ? 'Player One' : 'Player Two';
    let words = [
        `${winningPlayer} Wins`,
        `${LosingPlayer} Loses`,
        'Press any button to restart',
      ],
      part,
      i = 0,
      offset = 0,
      len = words.length,
      forwards = true,
      skip_count = 0,
      skip_delay = 15,
      speed = 70;
    const wordInterval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      this.updateWord(part);
      if (!this.checkIfWinnerStillBoasting()) {
        clearInterval(wordInterval);
      }
    }, speed);
  }
  updateWord(part) {
    this.root.querySelector('.word').textContent = part;
  }
  showWinner() {
    this.root.querySelector('.word').hidden = false;
  }
  resetWinner() {
    this.root.querySelector('.word').hidden = true;
    this.resetCOunters();
  }
  disableCounters() {
    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((button) => {
        button.disabled = true;
        button.hidden = true;
      });
    this.root.querySelector('.reset').hidden = false;
  }
  resetCOunters() {
    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((button) => {
        button.disabled = false;
        button.hidden = false;
      });
    this.root.querySelector('.reset').hidden = true;
  }
  updateServer(serve, servingPlayer) {
    if (serve && servingPlayer) {
      document.getElementById('bg-start').hidden = true;
      this.root.querySelector(
        '.serve'
      ).textContent = ` Player ${servingPlayer} ${serve} Serve`;
      if (servingPlayer === 'one') {
        document.getElementById('bg-left').hidden = false;
        document.getElementById('bg-right').hidden = true;
      } else if (servingPlayer === 'two') {
        document.getElementById('bg-left').hidden = true;
        document.getElementById('bg-right').hidden = false;
      }
      return;
    }
    document.getElementById('bg-start').hidden = false;
    this.root.querySelector('.serve').textContent = ``;
  }
  checkIfWinnerStillBoasting() {
    const visible = this.root.querySelector('.word').hidden === false;
    return visible;
  }
}
