class Api::BuyersController < ApplicationController

    def show 
        buyer = Buyer.find(params[:id])
        render json: buyer.my_products
    end
end
