FactoryBot.define do
  factory :group do
    group_name {Faker::Team.name}
  end
end