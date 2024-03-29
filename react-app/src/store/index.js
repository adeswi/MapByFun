import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import routeReducer from './route'
import commentReducer from './comment';
import friendReducer from './friend';
import userReducer from './user';
import nonFriendReducer from './nonfriend';
import mapsReducer from './map';

const rootReducer = combineReducers({
  session: sessionReducer,
  routes: routeReducer,
  comments: commentReducer,
  friends: friendReducer,
  users: userReducer,
  nonFriends: nonFriendReducer,
  maps: mapsReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
