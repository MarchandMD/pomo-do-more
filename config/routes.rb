Rails.application.routes.draw do
  root "welcome#index"
  get "/music", to: "rss#index"
  get "/why", to: "why#index"
end
