const React = require("react");

module.exports = React.createClass({

  render: function () {

    return (
      <img className="tile-board-image" src={this.props.tileInfo.picture} />
    );
  }
});
