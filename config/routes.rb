Rails.application.routes.draw do
  get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: 'home#index'

  resources :users

  namespace :api do
    resources :users do
      member do
        patch 'save', to: 'users#save'
      end
    end
  end
end
