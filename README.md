# DB設計

## usesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
|password_confirmation|string|null: false|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|group_name|string|null: false, index: true|

### Association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|body|text||
|image|string||
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|
|timestamp|||

### Association
- belongs_to :group
- belongs_to :user

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|references|index: true, foreign_key: true|
|group_id|references|index: true, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user