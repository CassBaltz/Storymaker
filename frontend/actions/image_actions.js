const Dispatcher = require("../dispatcher/app_dispatcher");
const ImageUtil = require("../util/image_util");
const IIConstants = require("../constants/image_items");

const ImageActions = {
  saveImage: function (data) {
    ImageUtil.uploadImage(data, ImageActions.updateImage)
  },

  saveStory: function (data) {
    ImageUtil.uploadStory(data, ImageActions.updateStory)
  },

  updateImage: function (data) {
    Dispatcher.dispatch({
      actionType: IIConstants.UPDATE_IMAGE,
      imageItem: data
    });
  },

  updateStory: function (data) {
    Dispatcher.dispatch({
      actionType: IIConstants.UPDATE_STORY,
      storyItem: data
    });
  }
};

module.exports = ImageActions;
