Rails.application.routes.draw do
  # generates all devise routes
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

namespace :api do
  get 'products', to: 'products#index'
  get '/products/sellers', to: 'products#sellers'
  get '/products/:seller_id', to: 'products#buyers'
  get '/products/:seller_id/:buyer_id', to: 'products#find'
  
end

end
