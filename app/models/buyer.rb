class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :desired_cat, Array

  def self.buyers(seller_id)
    buyers = select("DISTINCT buyers.id, buyers.name, buyers.seller_id")
    .joins("INNER JOIN sellers s ON buyers.seller_id = s.id")
    .where("s.id = #{seller_id}")
  end

  # def self.buyers(seller_id)
  #   buyers = select("buyers.name AS buyer_name,
  #     buyers.id AS buyer_id, 
  #     buyers.seller_id AS seller_id")
  #     .joins("INNER JOIN sellers s ON buyers.seller_id = s.id")
  #     .where("s.id = #{seller_id}")
  #     buyers.map do |buyer|
  #       buyers.id
  #     end
  # end

end
