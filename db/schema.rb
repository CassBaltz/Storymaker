# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160719185741) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "stories", force: :cascade do |t|
    t.string   "gif",        null: false
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "stories", ["title"], name: "index_stories_on_title", using: :btree

  create_table "story_items", force: :cascade do |t|
    t.string   "picture",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "story_joins", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "story_item_id", null: false
    t.integer  "story_id",      null: false
  end

  add_index "story_joins", ["story_id"], name: "index_story_joins_on_story_id", using: :btree
  add_index "story_joins", ["story_item_id"], name: "index_story_joins_on_story_item_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",        null: false
    t.integer  "story_item_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "taggings", ["story_item_id"], name: "index_taggings_on_story_item_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
