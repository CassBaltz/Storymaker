class Story < ActiveRecord::Base
  validates :gif, presence: true
end
