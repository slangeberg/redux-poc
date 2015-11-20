import fetch from 'isomorphic-fetch'

export const INIT = 'INIT';
export const GO_TO_SECTION = 'GO_TO_SECTION';

export const REQUEST_SECTION = 'REQUEST_SECTION';
export const RECEIVE_SECTION = 'RECEIVE_SECTION';
//export const SELECT_REDDIT = 'SELECT_REDDIT'
//export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

const dataDir = 'data';

export function init() {
    return {
        type: INIT
    }
}


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

function requestSection(section) {
    return {
        type: REQUEST_SECTION,
        section
    }
}

function receiveSection(section, json) {
    console.log('actions.receiveSection(', section, ', ', json);
    return {
        type: RECEIVE_SECTION,
        section: section,
        data: json.data, //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}
//
//function fetchPosts(reddit) {
//    return dispatch => {
//
//        dispatch(requestPosts(reddit))
//
//        return fetch(dataDir + '/entries.json') //`http://www.reddit.com/r/${reddit}.json`)
//            .then(response => response.json())
//            .then(json => dispatch(receiveSection(reddit, json)))
//    }
//}
//
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
//
//export function fetchPostsIfNeeded(reddit) {
//    console.log('actions.fetchPostsIfNeeded(', reddit);
//    return (dispatch, getState) => {
//        if (shouldFetchPosts(getState(), reddit)) {
//            return dispatch(fetchPosts(reddit))
//        }
//    }
//}

function fetchSection(section) {
    console.log('actions.fetchSection(', section);

    return dispatch => {

        dispatch(requestSection(section));

//--> TODO/TMP: Come up with better system to track endpoints
        var file = section == 'travelerDetails' ? 'traveler_details.json' : 'payment.json';
        var url = `${location.origin}/${dataDir}/${file}`;

        console.log('actions.fetchSection() - location: ', location);
        console.log('actions.fetchSection() - url: ', url);

        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveSection(section, json)))
            .catch(ex => {
                console.error(`actions.fetchSection(${section}) - Parsing Failed: `, ex, 'url: ', url);
            });
    }
}

function shouldFetchSection(state, section) {
    console.log('actions.shouldFetchSection(', section);
    const val = !state.getIn(["data", section, "hasLoaded"]);
    //console.log('actions.shouldFetchSection() - sectionData', sectionData.toJS());

    //const val = sectionData.get(hasLoaded;
    console.log('actions.shouldFetchSection() - val: ', val);
    return val;
}

function navigateToSection(section) {
    console.log('actions.navigateToSection(', section);
    return {
        type: GO_TO_SECTION,
        section
    }
}
export function goToSection(section) {
    console.log('actions.goToSection(', section);
    return (dispatch, getState) => {
        if (shouldFetchSection(getState(), section)) {
            return dispatch(fetchSection(section))
        }
    }
}
