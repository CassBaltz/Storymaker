const React = require('react');

module.exports = React.createClass({

  componentWillReceiveProps: function (props) {
    if (props.page === "home") {
      $(".create-navbar").first().children().removeClass("nav-clicked");
      $("#home-div").addClass('nav-clicked');
    }
    if (props.page === "edit") {
      $(".create-navbar").first().children().removeClass("nav-clicked");
      $("#edit-div").addClass('nav-clicked');
    }
    if (props.page === "preview") {
      $(".create-navbar").first().children().removeClass("nav-clicked");
      $("#preview-div").addClass('nav-clicked');
    }


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
        <div id="home-div" onClick={this.changeToHome} className="nav-button nav-clicked">
          <h3>Cards</h3>
        </div>
        <div id="preview-div" onClick={this.changeToPreview} className="nav-button">
          <h3>Preview {this.props.count}</h3>
        </div>
        <div id="edit-div" onClick={this.changeToBuild} className="nav-button">
          <h3>Create</h3>
        </div>
      </div>
    );
  }
});
