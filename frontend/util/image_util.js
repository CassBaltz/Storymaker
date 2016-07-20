const ImageActions = require('../actions/image_actions');

const ImageUtil = {
  uploadImage: function (data, callback) {
    $.ajax({
      url: "https://api.cloudinary.com/v1_1/cassbaltz/image/upload",
      method: 'POST',
      data: {"file": `${data}`, "upload_preset": "zsh3fz7d"},
      success: function (response) {
        ImageUtil.saveImageToDB(response, callback);
      }
    });
  },

  saveImageToDB: function (response, callback) {
    $.ajax({
      url: "/api/story_items",
      method: 'POST',
      data: {story_item: {picture: response.url}},
      success: function (storyItem) {
        callback(storyItem);
      }
    });
  }

}

module.exports = ImageUtil;
