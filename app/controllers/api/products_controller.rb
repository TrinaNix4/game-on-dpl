class Api::ProductsController < ApplicationController
  def index
    render json: Product.sellers
  end
end
