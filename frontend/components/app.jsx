const React = require('react');

module.exports = React.createClass({
  // getInitialState: function() {
  //
  // },

  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});
