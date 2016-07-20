const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// testing
const IIStore = require('./stores/image_items_store');

const App = require('./components/app');
const HomeScreen = require('./components/home_screen');
const StoryCreate = require('./components/story_create');
const StoryIndex = require('./components/story_index');

const appRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ App } >
      <IndexRoute component={ HomeScreen } />
      <Route path="stories" component={ StoryIndex } />
      <Route path="create" component={ StoryCreate } />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  const root = document.getElementById('content');
  ReactDOM.render(appRouter, root);
});

window.IIStore = IIStore;
