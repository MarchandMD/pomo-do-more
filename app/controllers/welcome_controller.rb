class WelcomeController < ApplicationController
  include WelcomeHelper

  def index
    @track = get_music["rss"]["channel"]["item"].sample
    @tracks = get_music["rss"]["channel"]["item"].map { |episode| episode["enclosure"]["url"] }
  end
end
