import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
//export const SELECT_REDDIT = 'SELECT_REDDIT'
//export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function setClientId(clientId) {
  return {
    type: 'SET_CLIENT_ID',
    clientId
  };
}

export function setConnectionState(state, connected) {
  return {
    type: 'SET_CONNECTION_STATE',
    state,
    connected
  };
}

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function vote(entry) {
  console.log('action_creators.vote(', entry);
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function restart() {
  return {
    type: 'RESTART'
  };
}


// Start async stuff

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function receivePosts(reddit, json) {
    console.log('actions.receivePosts(', reddit, ', ', json);
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json, //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        return fetch('./entries.json') //`http://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }
}

//function shouldFetchPosts(state, reddit) {
//    const posts = state.postsByReddit[reddit]
//    if (!posts) {
//        return true
//    }
//    if (posts.isFetching) {
//        return false
//    }
//    return posts.didInvalidate
//}

export function fetchPostsIfNeeded(reddit) {
    console.log('actions.fetchPostsIfNeeded(', reddit);
    return (dispatch, getState) => {
        //if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        //}
    }
}