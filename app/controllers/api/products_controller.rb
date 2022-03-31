class Api::ProductsController < ApplicationController
  def index
    render json: Product.available
  end
end
