class AddColumnToStoryJoins < ActiveRecord::Migration
  def change
    add_column :story_joins, :story_item_id, :integer, null: false
    add_column :story_joins, :story_id, :integer, null: false
    add_index :story_joins, :story_id
    add_index :story_joins, :story_item_id
  end
end
