const React = require("react");
const StoryTile = require("./story_tile");

module.exports = React.createClass({
  sendToPreview: function () {
    this.props.props("preview")
  },

  render: function () {
    let items;
    if (this.props.tiles.length > 0) {
      items = this.props.tiles.map((tile) => <StoryTile key={tile.id} tileInfo={tile} />)
    }

    return (
      <div>
        {items}
        <div className="empty-tiles">
          <h2>Add Tiles to Your Board</h2>
          <h2 onClick={this.sendToPreview}>Preview</h2>
        </div>
      </div>
    )
  }
})
