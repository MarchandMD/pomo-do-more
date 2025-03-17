class WelcomeController < ApplicationController
  include WelcomeHelper

  def index
    all_tracks = get_music["rss"]["channel"]["item"]
    @track_titles = all_tracks.map { |track| track["title"] }
    @track = all_tracks.sample
    @tracks = all_tracks.map { |episode| episode["enclosure"]["url"] }
  end
end
