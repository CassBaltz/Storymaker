Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :story_items, only: [:create, :show, :index]
    resources :stories, only: [:create, :show, :index]
  end
end
