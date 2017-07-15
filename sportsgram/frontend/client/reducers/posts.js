// 1. the action (what happened)
// 2. copy of current state

// action, store => okay let me see , store

function posts(state = [], action){
    /*switch (action.type){
        case 'INCREMENT_LIKES':
            console.log(state);
            const i = action.index;
            return [
                ...state.slice(0, i),
                {...state[i], nb_like : state[i].nb_like + 1},
                ...state.slice(i + 1),
            ];
        default:
            return state;
    }*/
    return state;
}

export default posts;