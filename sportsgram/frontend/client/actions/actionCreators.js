//<editor-fold desc="Headers">
let header = new Headers({
    'Access-Control-Allow-Headers':'*',
    'Content-Type': 'application/json'
});
//</editor-fold>


//<editor-fold desc="Basics">

// increment pics likes
export function increment(index) {
    return {
        type: 'INCREMENT_LIKES',
        index
    }
}

export function incrementLikeSuggestion(index, idItemLiked, items) {
    console.log("incrementLikeSuggestion items = " + JSON.stringify(items));
    console.log("index = " + index);
    console.log("idItemLiked = " + idItemLiked);
     return {
        type: 'INCREMENT_LIKES_SUGGESTION',
        index,
        idItemLiked,
        payload: items
    }
}

// add comment
export function addComment(postId, author, comment) {
    console.log(author, comment);
    return {
        type: 'ADD_COMMENT',
        postId,
        author,
        comment
    }
}

// remove comment
export function removeComment(postId, i) {
    console.log('Comment delete');
    return {
        type: 'REMOVE_COMMENT',
        i,
        postId
    }
}
//</editor-fold>

//<editor-fold desc="Basics fetch">
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        payload: items
    };
}
//</editor-fold>

//<editor-fold desc="Handle FetchData">
export function subscibeFetchData(items){
    return {
        type: 'SUBSCRIBE',
        payload: items, // contient message de retour du serveur
    };
}

export function NewsFeedFetchData(items){
    return {
        type: 'NEWS_FEED',
        payload: items,
    };
}

export function GetSuggestion(items){
    return {
        type: 'SUGGESTION',
        payload: items,
    };
}

export function deletePictureFetchData(items, i){
    return {
        type: 'DELETE_IMAGE',
        payload: items,
        i
    };
}
//</editor-fold>

export function SubscriptionRandomImage(items) {
    console.log("test1");
     return {
        type: 'SUBSCRIPTION_RANDOM_IMAGE',
        payload: items,
    };
}

export function getAllTags(items) {
     return {
        type: 'GET_TAGS',
        payload: items,
    };
}

export function followAdd(items) {
     return {
        type: 'ADD_FOLLOW',
        payload: items,
    };
}

export function shareAdd(items) {
     return {
        type: 'ADD_SHARE',
        payload: items,
    };
}

export function getPicturesLiked(items) {
     return {
        type: 'GET_LIKED_PICTURES',
        payload: items,
    };
}

export function getUserImage(items) {
     return {
        type: 'GET_IMAGE_USER',
        payload: items,
    };
}

export function getPicturesLikedProfil(items) {
     return {
        type: 'GET_LIKED_PICTURES_PROFIL',
        payload: items,
    };
}

export function getPicturesShared(items) {
    console.log("get pictures shared action creator : ok");
     return {
        type: 'GET_SHARED_PICTURES',
        payload: items,
    };
}

export function userFollowed(items) {
    return {
        type: 'USER_FOLLOWED',
        payload: items,
    }
}

export function PictureUpdate(items) {
    console.log("PictureUpdate");
     return {
        type: 'PICTURE_UPDATE',
        payload: items,
    };
}

//<editor-fold desc="Fetch Call">
export function subscribe(url, username, password, like1, like2, like3){
    console.log(password);
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: username,
                password: password,
                like1: like1,
                like2: like2,
                like3: like3,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(subscibeFetchData(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function newsFeed(url){
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(NewsFeedFetchData(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getSuggestion(url){
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(GetSuggestion(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function incrementSuggestionLike(url, index, idUser, idPicture, idItemLiked) {   
   return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                idImage: idPicture,
            })
        })
            .then((response) => {
                console.log("incrementSuggestionLike response = " + response.statusText);
                if (!response.ok) {
                    console.log("incrementSuggestionLike error = " + response.statusText);
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(incrementLikeSuggestion(index, idItemLiked, items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}


export function updatePicture(url, caption, tag1, tag2, tag3, idPhoto) {
    console.log("urllllll = " + url);
   return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                caption: caption,
                tag1: tag1,
                tag2: tag2,
                tag3: tag3,
                idPhoto : idPhoto,
            })
        })
            .then((response) => {
                console.log("response = " + response.ok);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(PictureUpdate(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getRandomPicture(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(SubscriptionRandomImage(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getTags(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getAllTags(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getLikedPictures(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getPicturesLiked(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getImageUser(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getUserImage(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getLikedPicturesProfile(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getPicturesLikedProfil(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getSharedPictures(url) {
    console.log("get shared pictures action creator url = " + url);
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response getShared Picture = " + response.statusText);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getPicturesShared(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function getUserFollowed(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'GET',
            header : header
        })
            .then((response) => {
                console.log("response = " + response);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(userFollowed(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}
//</editor-fold>

export function deletePicture(url, i, id){
    console.log("id client = " + id);
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idPicture: id,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(deletePictureFetchData(items, i)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function addFollow(url, idFollower, idFollowed){
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idFollower: idFollower,
                idFollowed: idFollowed,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(followAdd(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function addShare(url, idUser, idImage){
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: idUser,
                idImage: idImage,
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(shareAdd(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}


//</editor-fold>

export function login(url, method = 'GET', type = '', i = 0, id = 0) {
    console.log("login action url = " + url);
    if(method === 'GET') {
        return (dispatch) => {
            dispatch(itemsIsLoading(true));
            fetch(url, {
                method: 'GET',
                header : header
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(itemsIsLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((items) => dispatch(itemsFetchDataSuccess(items)))
                .catch(() => dispatch(itemsHasErrored(true)));
        };
    } else {
        return (dispatch) => {
            dispatch(itemsIsLoading(true));
            fetch(url, {
                method: 'POST',
                header: header
            })
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    dispatch(itemsIsLoading(false));
                    return response;
                })
                .then((response) => response.json())
                .then((items) => dispatch(itemsFetchDataSuccess(items, type, i)))
                .catch(() => dispatch(itemsHasErrored(true)));
        };
    }
}