class Product < ApplicationRecord
  belongs_to :seller

  def self.sellers
    select(
      'products.id, 
      products.name, 
      products.price, 
      products.description, 
      products.category, 
      s.id AS seller_id, 
      s.name AS seller_name,
      s.email 
      ')
      .joins('INNER JOIN sellers s ON s.id = products.seller_id')
      .order('s.id')
  end
end
