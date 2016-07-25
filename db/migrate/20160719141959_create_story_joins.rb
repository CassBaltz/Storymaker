class CreateStoryJoins < ActiveRecord::Migration
  def change
    create_table :story_joins do |t|
      t.integer :story_item_id, null: false
      t.integer :story_id, null: false
      t.timestamps null: false
      t.index :story_item_id
      t.index :story_id
    end
  end
end
