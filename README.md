This ReadMe file explains how to build an application that will use features such as SQL queries, pagination etc. 
Will be using 
- Trello
- Github
- Lucid Charts
- SQLElectron
- and more

This ReadMe illustrates how to make a real estate app that shows all homes for sale. Listings will organized by real estate agent and will display the price, # of beds and baths, square footage and address of the home. 
# Clone from this repo or your starter: 

```
$ git clone git@github.com:jimibue/starter-rv6.git dpl-real-estate
$ cd dpl-real-estate
$ bundle
$ rails db:create db:migrate
$ cd client
$ yarn

```

## Use lucid.app to create a db diagram. 

visit the link for an example: 
https://trello.com/b/ITqIWe5e/real-estate-sp22


## Create models using iTerm

```
$ rails g model agent first_name last_name email phone
$ rails g model buyer first_name last_name email phone max_price:float cities:text agent:belongs_to
$ rails g model property price:float sold:boolean sold_price:float beds:integer baths:integer sq_ft:integer agent:belongs_to
$ rails g model address street city zip property:belongs_to
```

## Then Create the relationships 

for example, in app/models/agent.rb
```
class Agent < ApplicationRecord
  has_many :buyers
  has_many :properties
end
```
app/models/buyer.rb

```
class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :cities, Array
end

```
app/models/property.rb

```
class Property < ApplicationRecord
  belongs_to :agent
  has_one :address
end
```

```
$ rails db:migrate
```

## Next step, seed data 
* insert into your gemfile the following gems: 
```
group :development, :test do
  # Debugging
  gem 'pry'
  # Seed Data
  gem 'faker'
end
```
```
$ bundle

```
* The following code is an example of some data for the seeds.rb file: 

```
cities = [
  'Sandy',
  'Draper',
  'SLC',
  'Orem',
  'Provo',
  'Ogden',
  'Layton',
  'Midvale',
  'Murray'
]

100.times do
  a = Agent.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    phone: Faker::PhoneNumber.cell_phone
  )

  50.times do
    num_cities = rand(0..cities.length - 1);
    Buyer.create(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.cell_phone,
      max_price: rand(99000..1500000),
      cities: cities.sample(num_cities),
      agent_id: a.id
    )
  end
  
  50.times do
    sold = Faker::Boolean.boolean(0.3)
    price = rand(99000..1500000)
    percent_change = (-3..3).to_a.sample.to_f / 100
    sold_price = sold ? price * (1 + percent_change) : nil
    p = Property.create(
      price: price,
      sold: sold,
      sold_price: sold_price,
      beds: rand(1..8),
      baths: rand(1..8),
      sq_ft: rand(1000..7000),
      agent_id: a.id
  )
  
  p.create_address(
    street: Faker::Address.street_address,
    zip: Faker::Address.zip_code,
    city: cities.sample
  )
  end
end
```
```
$ rails db:seed
```

## Next step is to isolate some features you may want:
for example,
1. Find all not-sold homes
2. Find not-sold homes by city
3. Find homes for a specific buyer in city and price range 


e.g. Finding all home not sold (SQL)
```
SELECT properties.id, price, beds, baths, sq_ft, ad.city, ad.zip, ad.street, a.first_name, a.last_name, a.email, a.id AS agent_id
  FROM properties
  INNER JOIN agents a ON a.id = properties.agent_id
  INNER JOIN addresses ad ON ad.property_id = properties.id
  WHERE properties.sold <> TRUE
  ORDER BY a.id
  ```

  ## Next step is to hooking up SQL with Rails
  - create a controller to an index route
  ```
  $ rails g controller api/properties index --skip-routes
 ```

- create the route in the routes.rb file: 
```
namespace :api do
  get 'properties', to: 'properties#index'
end
```

- define the index method in the controller:
```
def index
  render json: Property.available
end
```

* in the properties.rb file implement the SQL code from earlier: 
```
class Property < ApplicationRecord
  belongs_to :agent
  has_one :address

  def self.available
    select('properties.id, price, beds, baths, sq_ft,
            ad.city, ad.zip, ad.street,
            a.first_name, a.last_name, a.email, a.id AS agent_id')
    .joins('INNER JOIN agents a ON a.id = properties.agent_id
            INNER JOIN addresses ad ON ad.property_id = properties.id')
    .where('properties.sold <> TRUE')
    .order('a.id')
  end
end
```

## Use postman to check if correct data is being sent back




