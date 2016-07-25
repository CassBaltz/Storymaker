const React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {button: this.props.page}
  },

  changeToBuild: function () {
    if (this.props.page !== "edit") {
      this.props.changePage("edit")
    }
  },

  changeToHome: function () {
    if (this.props.page !== "home") {
      this.props.changePage("home")
    }
  },

  changeToPreview: function () {
    if (this.props.page !== "preview") {
      this.props.changePage("preview")
    }
  },

  render: function () {
    return (
      <div className="create-navbar">
        <div onClick={this.changeToHome} className="nav-button">
          <h3>Home</h3>
        </div>
        <div onClick={this.changeToPreview} className="nav-button">
          <h3>Preview</h3>
        </div>
        <div onClick={this.changeToBuild} className="nav-button">
          <h3>Create</h3>
        </div>
      </div>
    );
  }
});
