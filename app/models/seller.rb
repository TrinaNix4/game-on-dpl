class Seller < ApplicationRecord
  has_many :buyers, dependent: :destroy
  has_many :products, dependent: :destroy
end
