import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "number",
    "button",
    "playButton",
    "pauseButton",
    "audio",
    "trackTitle",
    "sessions",
    "interval",
  ]
  static values = { tracks: String }
  static outlets = ["stats"]

  connect() {
    let totalSeconds = this.intervalTarget.value * 60
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    this.numberTarget.innerText = `${minutes}:${remainingSeconds}`
    this.timer = null

    this.audioTarget.addEventListener("ended", this.playNextTrack.bind(this))
  }

  toggleButtonWord() {
    const interval = 1000

    if (this.buttonTarget.innerText == "start") {
      this.buttonTarget.innerText = "stop"
      this.startTimer()
      this.playMusic()
      setInterval(() => {
        console.log("another second gone")
      }, interval)
    } else if (this.buttonTarget.innerText == "reset") {
      this.resetButtonClicked()
    } else {
      this.buttonTarget.innerText = "start"
      this.stopTimer()
      this.pauseMusic()
    }
  }

  resetButtonClicked() {
    this.buttonTarget.innerText = "start"
    this.numberTarget.innerText = 10
    this.pauseMusic()
  }

  startTimer() {
    const interval = 1000
    let totalSeconds = 0 // Track total seconds

    this.timer = setInterval(() => {
      totalSeconds++ // Increment total seconds

      // Calculate minutes and remaining seconds
      const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0")
      const remainingSeconds = (totalSeconds % 60).toString().padStart(2, "0")

      // Update the total time display in mm:ss format
      this.numberTarget.innerText-- // Update the countdown

      if (this.numberTarget.innerText == 0) {
        this.stopTimer()
        this.pauseMusic()
        this.buttonTarget.innerText = "reset"
        this.sessionsTarget.innerText++
      }
    }, interval)
  }

  stopTimer() {
    clearInterval(this.timer)
    let sessions = this.sessionsTarget.innerText
    let num = parseInt(sessions, 10)
    this.sessionsTarget.innerText = num++
  }

  playMusic() {
    this.audioTarget.play()
  }

  pauseMusic() {
    this.audioTarget.pause()
  }

  playNextTrack() {
    const tracks = this.tracksValue.split(",")
    let randomIndex = Math.floor(Math.random() * tracks.length)
    let nextTrack = tracks[randomIndex]

    this.audioTarget.src = nextTrack
    this.audioTarget.play()
    let newTitle = nextTrack.match(/_(\d{1,2}.*?)\./)[1]
    this.setNewTitle(newTitle)
  }

  setNewTitle(title) {
    document.title = title
    this.trackTitleTarget.innerText = title
  }

  updateTarget() {
    this.numberTarget.innerText = this.intervalTarget.value * 60
  }
}
