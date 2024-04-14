import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["number", "button", "playButton", "pauseButton", "audio"];
  static values = { tracks: String };

  connect() {
    this.numberTarget.innerText = 1500;
    this.timer = null;

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
      this.buttonTarget.innerText = "start";
      this.numberTarget.innerText = 1500;
      this.pauseMusic();
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
      }
    }, interval);
  }

  stopTimer() {
    clearInterval(this.timer);
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

    this.audioTarget.src = tracks[randomIndex];
    this.audioTarget.play();
    document.title = `new song: ${randomIndex}`;
  }
}
