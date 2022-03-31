class Product < ApplicationRecord
  belongs_to :seller

  def self.available
    select('product.id, name, price, description, category, s.id AS seller_id')
end
