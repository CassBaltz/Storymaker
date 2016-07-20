class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :story_item_id, null: false
      t.timestamps null: false
      t.index :story_item_id
      t.index :tag_id
    end
  end
end
