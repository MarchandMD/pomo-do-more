// the @hotwired/stimulus module defines this "Controller" base class and then exports it.
// at the top of each stimulus controller, that "Controller" base class is imported to start.
import { Controller } from "@hotwired/stimulus"

// to begin definins what this specific controller is capable of, the basic language to type is this opening line.
export default class extends Controller {
  // targets are the HTML elements that will be within the parent HTML element that defines the controller.
  static targets = ["number", "button", "playButton", "pauseButton", "audio"];

  // connect() is a built-in method that evaluates whenever this controller connects to the DOM; since controllers are connected to HTML pages, the stimulus controller will connect when the page is displayed.
  connect() {
    this.numberTarget.innerText = 1500;
    this.timer = null;
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
}
