Rails.application.routes.draw do
  # generates all devise routes
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

namespace :api do
  get 'products', to: 'products#index'
 
  get '/sellers', to:'sellers#index'
  get '/sellers/:id', to:'sellers#show'

  #class method
  get '/buyers/:id', to:'buyers#show'
  #instance method 
  get '/buyers1/:id', to:'buyers#show1'

  
end

end
