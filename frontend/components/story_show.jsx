const React = require("react");
const IIStore = require("../stores/image_items_store");

module.exports = React.createClass({
  getInitialState: function () {
    return {story: null}
  },

  componentDidMount: function () {
    this.listener = IIStore.addListener(this.update)
  },

  update: function () {
    this.setState({story: IIStore.getCurrentStory()})
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    let display;
    if (this.state.story === null) {
      display = <h3>No Gif</h3>
    } else {
      display = <img className="gif-display" src={this.state.story.gif} />
    }

    return (
      <div className="story-show-container">
        <h3>click on the .gif to copy, then send it to your friends</h3>
        {display}
      </div>

    );
  }
});
