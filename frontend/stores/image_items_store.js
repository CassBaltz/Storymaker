const Store = require('flux/utils').Store;
const IIConstants = require('../constants/image_items');
const Dispatcher = require('../dispatcher/app_dispatcher');

const IIStore = new Store(Dispatcher);

let _IIs = {};
let _buildIIs = [];
let _currentStory;

IIStore.all = function () {
  return Object.keys(_IIs).map(key => _IIs[key]);
};

IIStore.find = function (id) {
  return _IIs[id];
};

IIStore.buildIIs = function () {
  return _buildIIs;
  IIStore.__emitChange();
};

IIStore.clearBuildIIs = function () {
  _buildIIs = [];
};

IIStore.getCurrentStory = function () {
  return _currentStory;
};

function reset (items) {
  _IIs = {};
  items.forEach(item => _IIs[item.id] = item)
};

function clearBuild () {
  _buildIIs = [];
}

function newStory (story) {
  _currentStory = story
}

function add (item) {
  _IIs[item.id] = item;
  _buildIIs.push(item);
};

IIStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case IIConstants.UPDATE_IMAGE:
    add(payload.imageItem);
    IIStore.__emitChange();
    break;

    case IIConstants.UPDATE_STORY:
    clearBuild();
    newStory(payload.storyItem);
    IIStore.__emitChange();
    break;
  }
};


module.exports = IIStore;
