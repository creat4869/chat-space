class Group < ApplicationRecord
  has_many :group_users
  has_many :user, through: :group_users
  has_many :messages
end
