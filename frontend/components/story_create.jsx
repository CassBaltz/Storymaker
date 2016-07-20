const React = require("react");
const ImageActions = require("../actions/image_actions");

module.exports = React.createClass({
  upload: function(data) {
    ImageActions.saveImage(data);
  },

  getData: function() {
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL();
    this.upload(dataURL);
  },

  render: function() {
    return (
      <div>
        <div onClick={this.upload}>StoryCreate</div>
        <canvas onClick={this.getData} id="canvas" width="100" height="100"></canvas>
    </div>
    );
  }
});
