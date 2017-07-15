import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// reducers
import rootReducer from './reducers/index';

import posts from './data/posts';
import comments from './data/comments';

const defaultState = {
    posts,
    comments,

};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const history = syncHistoryWithStore(browserHistory, store);

export default store;