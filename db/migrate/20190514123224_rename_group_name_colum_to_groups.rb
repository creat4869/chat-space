class RenameGroupNameColumToGroups < ActiveRecord::Migration[5.0]
  def change
    rename_column :groups, :group_name, :name
  end
end
