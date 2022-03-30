class Buyer < ApplicationRecord
  belongs_to :seller
  serialize :desired_cat, Array
end
