import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  static targets = ["total"];

  connect() {
    console.log("connected");
  }
}