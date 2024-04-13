Rails.application.routes.draw do
  root "welcome#index"
  get "/music", to: "rss#index"
end
