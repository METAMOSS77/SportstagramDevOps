import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import posts from './posts'
import comments from './comments';
import  users from './users';
import { items, itemsHasErrored, itemsIsLoading } from './users';
import { sessionReducer } from 'redux-react-session';


// Combine all our reducers togeher
const rootReducer = combineReducers({
    posts,
    comments,
    users,
    items,
    itemsHasErrored,
    itemsIsLoading,
    routing: routerReducer,
    session: sessionReducer
});

export default rootReducer;