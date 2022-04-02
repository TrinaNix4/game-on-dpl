class Api::ProductsController < ApplicationController
  def index
    render json: Product.sellers
  end

  def sellers
    render json: Seller.sellers
  end

  def buyers
    render json: Buyer.buyers(params[:seller_id])
  end

  def find
    render json: Product.find(params[:buyer_id])
  end

end
