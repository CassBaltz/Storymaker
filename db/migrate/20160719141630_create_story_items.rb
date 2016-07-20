class CreateStoryItems < ActiveRecord::Migration
  def change
    create_table :story_items do |t|
      t.string :picture, null: false

      t.timestamps null: false
    end
  end
end
