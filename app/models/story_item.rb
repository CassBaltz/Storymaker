class StoryItem < ActiveRecord::Base
  validates :picture, presence: true
end
