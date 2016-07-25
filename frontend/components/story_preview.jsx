const React = require("react");
const IIStore = require('../stores/image_items_store');
const gifshot = require('gifshot');
const ImageActions = require('../actions/image_actions');


let image;
let loopVar = true;
let speed = 700;
let interval = 0;

const StoryPreview = React.createClass({
  getInitialState: function() {
    return {images: IIStore.buildIIs(), image: null}
  },

  componentDidMount: function () {
    this.setState({images: IIStore.buildIIs()});
    if (this.state.images.length > 0) {
      this.setState({image: this.state.images[0]['picture']});
    }
  },

  buildPreview: function (e) {
    e.preventDefault();
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, speed);
  },

  clearPreview: function (e) {
    e.preventDefault();
    clearInterval(this.interval);
  },

  endLoop: function () {
    clearInterval(this.interval);
  },

  loop: function () {
    this.setState({image: this.state.images[interval]['picture']})
    if (interval < this.state.images.length - 1) {
      interval ++;
    } else {
      interval = 0;
    }
  },

  slowSpeed: function (e) {
    e.preventDefault();
    speed = 1000;
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, speed);
  },

  mediumSpeed: function (e) {
    e.preventDefault();
    speed = 700;
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, speed);
  },

  fastSpeed: function (e) {
    e.preventDefault();
    speed = 400;
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, speed);
  },

  goToGif: function () {
    this.props.props("view-story");
  },

  create: function (e) {
    e.preventDefault();

    let images = this.state.images.map(image => {
      return image['picture'];
    });

    gifshot.createGIF({
    'images': images,
    'interval': speed/1000,
    'saveRenderingContexts': true,
    'crossOrigin': 'Anonymous',
    'gifWidth': 350,
    'gifHeight': 350
    },function(obj) {
      if(!obj.error) {
        this.endLoop();
        ImageActions.saveStory(obj.image);
        this.goToGif();
      }
    }.bind(this));
  },

  render: function () {
    return (
      <div className="gif-holder">
        <img className="gif-item" src={this.state.image}></img>
        <div className="action">
          <h3 onClick={this.slowSpeed}>slow</h3>
          <h3 onClick={this.mediumSpeed}>medium</h3>
          <h3 onClick={this.fastSpeed}>fast</h3>
        </div>
        <div className="action">
          <h3 onClick={this.create}>CREATE GIF!</h3>
          <h3 onClick={this.clearPreview}>stop preview</h3>
        </div>
      </div>
    );
  }
});

module.exports = StoryPreview;
