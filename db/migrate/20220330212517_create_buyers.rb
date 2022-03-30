class CreateBuyers < ActiveRecord::Migration[6.1]
  def change
    create_table :buyers do |t|
      t.string :name
      t.float :max_price
      t.text :desired_cat
      t.belongs_to :seller, null: false, foreign_key: true

      t.timestamps
    end
  end
end
