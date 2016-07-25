const React = require("react");
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;

module.exports = React.createClass({
  sendToCreate: function(e) {
    e.preventDefault();
    hashHistory.push('/create')
  },

  render: function() {
    return (
      <div className="home-screen-div">
        <h3>Welcome To StoryMaker</h3>
        <p>StoryMaker allows you to draw cards, save them as .gif files, and then share with friends.</p>
        <h3 className="home-link" onClick={this.sendToCreate}>Click Here To Get Started!</h3>
      </div>
    );
  }
});
