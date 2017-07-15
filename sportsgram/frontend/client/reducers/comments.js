// 1. the action (what happened)
// 2. copy of current state

// action, store => okay let me see , store


function postComments(state = [], action){
    switch (action.type){
        case 'ADD_COMMENT':
            console.log('add a comment');
            return [...state, {
               user : action.author,
                text : action.comment
            }];
        case 'REMOVE_COMMENT':
            console.log('remove a comment');
            return [
                ...state.slice(0, action.i),
                ...state.slice(action.i + 1)
            ];
        default:
            return state;
    }
}

function comments(state = [], action){
    if  (typeof action.postId !== 'undefined'){
        return {
            ...state, // current state
            [action.postId] : postComments(state[action.postId], action) // override post with a new one
        }
    }
    return state;
}


export default comments;
