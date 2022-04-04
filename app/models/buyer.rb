class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :desired_cat, Array

  def self.my_products(id)
    select("buyers.name, p.id, p.name, p.price, p.description, p.category")
    .joins("INNER JOIN products AS p ON buyers.seller_id = p.seller_id")
    .where("buyers.id = ?", id)
  end

  def my_products
    {id:self.id, desired_cat:self.desired_cat}
  end

end
