

/*function users(state = [], action){
    switch (action.type){
        case 'LOGIN_ACTION':
            console.log('Reducers catch login');
            return [...state, {
                username : action.username,
                password : action.password
            }];
        default:
            return state;
    }
    return state;
}*/

export default function (){
    return [];
}
export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

function deleteImage (state = [], action) {
    switch (action.type) {
        case 'DELETE_IMAGE':
            return [
                ...state.slice(0, action.i),
                ...state.slice(action.i + 1)
            ]
        default:
            return state;
    }
}

function increment_like(state = [], action){
    const i = action.index;
    return [
        ...state.slice(0, i),
        {...state[i], nb_like : state[i].nb_like + 1},
        ...state.slice(i + 1),
    ];
}

function increment_like_suggestion(state = [], action){
    const i = action.index;
    return [
        ...state.slice(0, i),
        {...state[i], nb_like : state[i].nb_like + 1},
        ...state.slice(i + 1),
    ];
}

function NewLike(state = [], action) {
    switch (action.type){
        case 'INCREMENT_LIKES_SUGGESTION':
            return  [...state, {
               id_image : action.idItemLiked
            }];
        default:
            return state;
    }
}

export function items(state = [], action) {
    //console.log("action.type = " + action.type);
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.payload;
        
        case 'DELETE_IMAGE':
        console.log('delete image reducer = ' + state.Pictures);
        
            return {
                ...state, 
                MyImages: deleteImage(state.MyImages, action)
            };
        case 'INCREMENT_LIKES':
            console.log('USER REDUCER    =>      ' + state);
            return {
                ...state,
                Pictures: increment_like(state.Pictures, action),
                LikedPictures: action.payload.LikedPictures
            };

         case 'INCREMENT_LIKES_SUGGESTION':
          return  {
                ...state,
                Pictures: increment_like_suggestion(state.Pictures, action),
                LikedPictures: NewLike(state.LikedPictures, action)
            }
        case 'SUBSCRIBE':
            return action.payload;
        case 'NEWS_FEED':
            return action.payload;
        case 'SUBSCRIPTION_RANDOM_IMAGE':
            console.log("test2!!!!");
            return action.payload;
        case 'GET_TAGS':
            console.log("test2");
            return action.payload;
        case 'GET_LIKED_PICTURES':
            return  {
                ...state,
                LikedPictures: action.payload.ImageLiked
            }

         case 'GET_LIKED_PICTURES_PROFIL':
            return  {
                ...state,
                ImageLikedProfil: action.payload.ImageLikedProfil
            }
         case 'GET_IMAGE_USER':
            return  {
                ...state,
                MyImages: action.payload.MyImages
            }

        case 'GET_SHARED_PICTURES':
            return  {
                ...state,
                SharedPictures: action.payload.ImageShared
            }
        case 'SUGGESTION':
            console.log("payload = " + action.payload);
            return  {
                ...state,
                suggestions: action.payload.Suggestion
            }
        case 'PICTURE_UPDATE':
        console.log("picture Update !!");
         return {
                ...state,
                MessageUpdate: action.payload.Message
            }
        case 'ADD_FOLLOW':
        return {
                ...state,
                UserFollowed: action.payload.UserFollowed
            }
          case 'ADD_SHARE':
        return {
                ...state,
                SharedPictures: action.payload.SharedPictures
            }
        case 'USER_FOLLOWED':
            return {
                ...state,
                UserFollowed: action.payload.Followed
            }
        default:
            return state;
    }    
}
//export default users;