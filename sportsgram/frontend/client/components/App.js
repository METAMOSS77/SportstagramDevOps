import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import * as actionCreators from '../actions/actionCreators';

import Main from './Main';

function mapStateToProps(state){
    return {
        posts : state.posts,
        comments : state.comments,
        users : state.users,
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;