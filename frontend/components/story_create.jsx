const React = require("react");
const EditCanvas = require('./edit_canvas');
const BoardBuild = require('./board_build');
const CreateNav = require('./create_nav');
const IIStore = require('../stores/image_items_store');
const StoryPreview = require('./story_preview');
const StoryShow = require('./story_show');

module.exports = React.createClass({
  getInitialState: function () {
    return {page: "home", currentTiles: []}
  },

  componentDidMount: function () {
    this.listener = IIStore.addListener(this.updateBuild);
    IIStore.buildIIs();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  updateBuild: function () {
    this.setState({currentTiles: IIStore.buildIIs()})
  },

  updatePage: function (page) {
    this.setState({page: page});
  },

  render: function() {
    let createAspect;
    let count = this.state.currentTiles.length;
    if (this.state.page === "home") {
      createAspect = <BoardBuild props={this.updatePage} tiles={this.state.currentTiles} />
    } else if (this.state.page === "edit") {
      createAspect = <EditCanvas props={this.updatePage} />
    } else if (this.state.page === "preview") {
      createAspect = <StoryPreview props={this.updatePage} />
    } else {
      createAspect = <StoryShow props={this.updatePage} />
    }
    return (
      <div className="story-create-container">
        {createAspect}
        <CreateNav changePage={this.updatePage} page={this.state.page} count={count}/>
      </div>
    );
  }
});
