/**
 * Created by angrycans on 16/7/14.
 */
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const INVALIDATE_REQUEST  = 'INVALIDATE_REQUEST ';




export function invalidateRequest(item) {
    return {
        type: INVALIDATE_REQUEST ,
        item
    }
}

function requestPosts(item) {
    return {
        type: REQUEST_POSTS,
        item
    }
}

function receivePosts(item, json) {
    return {
        type: RECEIVE_POSTS,
        item,
        //posts: json.data.children.map(child => child.data),
        //receivedAt: Date.now()
    }
}

export function fetchPosts(item) {
    console.log("fetchPosts(item)");
    return dispatch => {

        dispatch(requestPosts(item));
        return fetch('http://www.baidu.com')
            //.then((response) => response.text())
            .then((responseText) => {
                console.log("responseText======");
                dispatch(receivePosts({a:10}));
                //receivePosts({a:10});
            })
            .catch((e)=>{
                console.log("logIn error",e);
                //AlertIOS.alert(e.message);
                //dispatch({'type': TYPES.LOGGED_ERROR, error: e});
            });
    }
}


export function fetchPostsIfNeeded(item) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), item)) {
            return dispatch(fetchPosts(item))
        }
    }
}

export function logIn(item){
    return (dispatch) => {
        dispatch(requestPosts(item));
        let inner_get = fetch('http://www.baidu.com')
            .then((res)=>{
                console.log("logIn ok");
                dispatch({'type': TYPES.LOGGED_IN, user: testUser});
            }).catch((e)=>{
                console.log("logIn error");
                AlertIOS.alert(e.message);
                dispatch({'type': TYPES.LOGGED_ERROR, error: e});
            });
    }
}
