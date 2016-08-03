const React = require("react");
const StoryTile = require("./story_tile");

module.exports = React.createClass({
  render: function () {
    let items;
    if (this.props.tiles.length > 0) {
      items = this.props.tiles.map((tile) => <StoryTile key={tile.id} tileInfo={tile} />)
    } else {
      items = null;
    }

    return (
      <div className="tiles-container">
        {items}
        <div onClick={() => this.props.props("edit")} className="tile-board-add"><h2>+</h2></div>
      </div>
    )
  }
})
