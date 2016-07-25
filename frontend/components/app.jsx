const React = require('react');
const hashHistory = require('react-router').hashHistory;


module.exports = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    return (
      <div className="app-container">
        <div className="header-bar">
          <h1>StoryMaker</h1>
        </div>
        {this.props.children}
      </div>
    );
  }
});
