class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :desired_cat, Array

  #class method implementation; self.method_name is a class method
  #self here refers to the class
  def self.my_products(id, desired_cat)
    select("buyers.name, max_price, desired_cat, p.id, p.name, p.price, p.description, p.category")
    .joins("INNER JOIN products AS p ON buyers.seller_id = p.seller_id AND p.category = ANY ('{#{desired_cat.join(',')}}')
    INNER JOIN sellers AS s ON buyers.seller_id = s.id")
    .where("buyers.id = ?", id)
  end


  #instance method implementation 
  #can use 'self' to grab things 
# self refers to the instance; (1) thing of the class 
  # def my_products
  #   {id:self.id, desired_cat:self.desired_cat}
  # end

end
