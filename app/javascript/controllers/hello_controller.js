import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["number", "button", "playButton", "pauseButton", "audio", "trackTitle", "bonusTime", "bonusTimeTimer"];
  static values = { tracks: String };
  static outlets = ["stats"];

  connect() {
    this.numberTarget.innerText = 1500;
    this.timer = null;
    this.bonusTimer = null;

    this.audioTarget.addEventListener("ended", this.playNextTrack.bind(this));
  }

  toggleButtonWord() {
    const interval = 1000;

    if (this.buttonTarget.innerText == "start") {
      this.buttonTarget.innerText = "stop";
      this.startTimer();
      this.playMusic();
      setInterval(() => {
      }, interval);
    } else if (this.buttonTarget.innerText == "reset") {
      this.stopBonusTimer();
      this.bonusTimeTimerTarget.innerText = 0;
      this.buttonTarget.innerText = "start";
      this.numberTarget.innerText = 1500;
      this.pauseMusic();
      this.bonusTimeTarget.classList.add("d-none");
    } else {
      this.buttonTarget.innerText = "start"
      this.stopTimer();
      this.pauseMusic();
    }
  }

  startTimer() {
    const interval = 1000;
    this.timer = setInterval(() => {
      this.numberTarget.innerText--;
      if (this.numberTarget.innerText == 0) {
        this.stopTimer();
        this.pauseMusic();
        this.buttonTarget.innerText = "reset";
        this.bonusTimeTarget.classList.remove("d-none");
        this.startBonusTimeTimer();
      }
    }, interval);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  stopBonusTimer() {
    clearInterval(this.bonusTimer);
    debugger
  }

  startBonusTimeTimer() {
    const interval = 1000;
    this.bonusTimer = setInterval(() => {
      this.bonusTimeTimerTarget.innerText++;
    }, interval)
  }

  playMusic() {
    this.audioTarget.play();
  }

  pauseMusic() {
    this.audioTarget.pause();
  }

  playNextTrack() {
    const tracks = this.tracksValue.split(",");
    let randomIndex = Math.floor(Math.random() * tracks.length);
    let nextTrack = tracks[randomIndex];

    this.audioTarget.src = nextTrack;
    this.audioTarget.play();
    let newTitle = nextTrack.match(/_(\d{1,2}.*?)\./)[1];
    this.setNewTitle(newTitle);
  }

  setNewTitle(title) {
    document.title = title;
    this.trackTitleTarget.innerText = title;
  }

  sessionEnded() {
    // accumulate time
    //
    // start bonus timer
    // bonus timer appears
    // bonus timer begins counting up
    // bonus timer has a start and stop button
    // when the bonus stop button is clicked, accumulate and display the total
  }

}
