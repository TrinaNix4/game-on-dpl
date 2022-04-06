   # This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all


u1 = User.create(email:'test1@test.com', password:123456)
u2 = User.create(email:'test2@test.com', password:123456)

cat = ['Playstation', 'Playstation 2', 'Playstation 3', 'Playstation 4', 'Playstation 5',
'Xbox', 'Xbox 360', 'PC', 'Xbox One', 'Nintendo', 'Xbox Series X']

5.times do 
  s = Seller.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
  )

 3.times do 
    num_desired_cat=rand(0..cat.length - 1);
     Buyer.create(
      name: Faker::Name.name,
      max_price: Faker::Number.decimal(l_digits: 2),
      desired_cat: cat.sample(num_desired_cat),
      seller_id: s.id,
    )
  end
  
3.times do
  p = Product.create(
    name: Faker::Game.title,
    category: cat.sample,
    price: Faker::Number.decimal(l_digits: 2),
    description: Faker::Game.genre,
    seller_id: s.id,
  )
end
end