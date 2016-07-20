class Api::StoryItemsController < ApplicationController
  def index
    @story_items = StoryItem.all
  end

  def create
    @story_item = StoryItem.new(story_item_params)
    if @story_item.save
      redirect_to api_story_item_path(@story_item)
    end
  end

  def show
    @story_item = StoryItem.find(params[:id])
  end

  private

  def story_item_params
    params.require(:story_item).permit(:picture)
  end
end
