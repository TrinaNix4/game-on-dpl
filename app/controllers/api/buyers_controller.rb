class Api::BuyersController < ApplicationController
#as a  class method
    def show 
        buyer = Buyer.find(params[:id])
        render json: Buyer.my_products(buyer.id)
        #not finding a buyer, just calling it on the Buyer class 
        #and passing it a buyer 
    end

    #instance method 
    #calling my_products on an instance of the class
    def show1
        #finding a buyer in the class and then 
        #calling the method on that buyer
         buyer = Buyer.find(params[:id])
        render json: buyer.my_products
    end

end
