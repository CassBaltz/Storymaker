const Dispatcher = require("../dispatcher/app_dispatcher");
const ImageUtil = require("../util/image_util");
const IIConstants = require("../constants/image_items");

const ImageActions = {
  saveImage: function (data) {
    ImageUtil.uploadImage(data, ImageActions.updateImage)
  },

  updateImage: function (data) {
    debugger;
    Dispatcher.dispatch({
      actionType: IIConstants.UPDATE_IMAGE,
      imageItem: data
    });
  }
};

module.exports = ImageActions;
