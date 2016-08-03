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
    return {images: IIStore.buildIIs(), image: null};
  },

  componentDidMount: function () {
    this.setState({images: IIStore.buildIIs()});
    if (this.state.images.length > 0) {
      this.setState({image: this.state.images[0]['picture']});
    }
  },

  startPlaying: function () {
    $("#play-button").addClass("play-green")
    $("#stop-square").removeClass("stop-red")
    this.buildPreview();
  },

  stopPlaying: function () {
    $("#play-button").removeClass("play-green")
    $("#stop-square").addClass("stop-red")
    this.clearPreview();
  },

  buildPreview: function () {
    clearInterval(this.interval);
    this.interval = setInterval(this.loop, speed);
  },

  clearPreview: function () {
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
    $('.div-bars-holder').first().addClass('hidden')
    $('#clock').removeClass('clock-medium')
    $('#clock').removeClass('clock-fast')
    $('#clock').addClass('clock-slow')
    speed = 1000;
    clearInterval(this.interval);
    if (this.state.images.length > 1) {
      this.startPlaying();
    }
  },

  mediumSpeed: function (e) {
    e.preventDefault();
    $('.div-bars-holder').first().addClass('hidden')
    $('#clock').removeClass('clock-slow')
    $('#clock').removeClass('clock-fast')
    $('#clock').addClass('clock-medium')
    speed = 700;
    clearInterval(this.interval);
    if (this.state.images.length > 1) {
      this.startPlaying();
    }
  },

  fastSpeed: function (e) {
    e.preventDefault();
    $('.div-bars-holder').first().addClass('hidden')
    $('#clock').removeClass('clock-slow')
    $('#clock').removeClass('clock-medium')
    $('#clock').addClass('clock-fast')
    speed = 400;
    clearInterval(this.interval);
    if (this.state.images.length > 1) {
      this.startPlaying();
    }
  },

  showBars: function (e) {
    $('.div-bars-holder').removeClass('hidden')
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
    }, function(obj) {
      if(!obj.error) {
        this.clearPreview();
        ImageActions.saveStory(obj.image);
        this.goToGif();
      }
    }.bind(this));
  },

  render: function () {
    let headerCard;
    if (this.state.images.length > 0) {
      headerCard =
      <div className="image-holder">
        <img className="gif-item" src={this.state.image}></img>
          <i id="stop-square" className="material-icons md-30" onClick={this.stopPlaying}>stop</i>
          <i id="play-button" className="material-icons md-30" onClick={this.startPlaying}>play_arrow</i>
      </div>

    } else {
      headerCard =  <div className="blank-header-card">
                      <h2>No Cards Created</h2>
                    </div>
    }

    return (
      <div className="gif-holder">
        {headerCard}
        <div className="action-holder">
          <div className="action">
            <i onClick={this.showBars} id="clock" className="material-icons md-48">
              access_time
            </i>
            <div className="div-bars-holder hidden">
              <div onClick={this.slowSpeed} id="slow-div" className="div-bars" >
              ></div>
              <div onClick={this.mediumSpeed} id="medium-div" className="div-bars">
              > ></div>
              <div onClick={this.fastSpeed} id="fast-div" className="div-bars">
              > > ></div>
            </div>
          </div>
          <div onClick={this.create}>
            <h3 className="create-link">CREATE!</h3>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StoryPreview;
