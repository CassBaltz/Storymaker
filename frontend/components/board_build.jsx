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
    } else {
      items = <h3>Click Create to Add Tiles</h3>
    }

    return (
      <div className="tiles-container">
        {items}
      </div>
    )
  }
})
