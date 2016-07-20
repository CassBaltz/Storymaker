class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.string :gif, null: false
      t.string :title

      t.timestamps null: false
      t.index :title
    end
  end
end
