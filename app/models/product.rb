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

  def self.categories
    select('products.id, 
    products.name, 
    products.price, 
    products.description, 
    products.category,'
    )
  end

  def self.find(buyer_id)
    products = select("DISTINCT products.id, 
    products.name AS game,
    products.category,
    products.description")
    .joins("INNER JOIN buyers b ON products.seller_id = b.seller_id")
    .where("b.id = #{buyer_id}")
  end

end
