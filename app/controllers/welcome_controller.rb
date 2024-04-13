class WelcomeController < ApplicationController
  include WelcomeHelper

  def index
    @track = get_music["rss"]["channel"]["item"].sample
  end
end
