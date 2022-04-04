class Seller < ApplicationRecord
  has_many :buyers, dependent: :destroy
  has_many :products, dependent: :destroy

  def self.sellers
    sellers = select("DISTINCT id, name")
    # sellers.map do |seller|
    #   seller.id
    # end
  end

end
