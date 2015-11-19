import {fromJS, List, Map} from 'immutable';
import {
    INIT,
   // SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_POSTS, RECEIVE_POSTS
} from './action_creators';

function init() {
    console.log('reducer.init()');
    var state = fromJS(
        {
            "navigation": {
                "selectedSection": "travelerDetails",
                "sections": [
                    {"id": "travelerDetails", "label": "Traveler Details", hasChanges: false},
                    {"id": "payment", "label": "Payment", hasChanges: false}
                ]
            },
            "data": {
                travelerDetails: {
                    travelerInformation: {
                        "label": "Traveler Information",
                        "hasChanges": false,
                        isLoading: false,
                        "hasLoaded": false,
                        data: { }
                    },
                    additionalInformation: {
                        "label": "Additional Information",
                        "hasChanges": false,
                        isLoading: false,
                        "hasLoaded": false,
                        data: {}
                    },
                    phoneNumber: {
                        "label": "Phone Number",
                        "hasChanges": false,
                        isLoading: false,
                        "hasLoaded": false,
                        data: {}
                    }
                },
                payment: {
                    creditCards: {
                        "label": "Credit Cards",
                        "hasChanges": false,
                        isLoading: false,
                        "hasLoaded": false,
                        data: {}
                    }
                }
            }
        }
    );

    console.log('reducer.init() - state: ', state.toJS());

    return state;
}
function setConnectionState(state, connectionState, connected) {
    console.log('reducer.setConnectionState(connectionState: ', connectionState, ', connected: ', connected);
    return state.set('connection', Map({
        state: connectionState,
        connected
    }));
}

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {

    console.log('reducer.vote( entry: ', entry);

    const currentRound = state.getIn(['vote', 'round']);
    const currentPair = state.getIn(['vote', 'pair']);

    if (currentPair && currentPair.includes(entry)) {
        return state.set('myVote', Map({
            round: currentRound,
            entry
        }));
    } else {
        return state;
    }
}

function resetVote(state) {
    const votedForRound = state.getIn(['myVote', 'round']);
    const currentRound = state.getIn(['vote', 'round']);
    if (votedForRound !== currentRound) {
        return state.remove('myVote');
    } else {
        return state;
    }
}

function requestPosts(state, reddit) {
    console.log('reducer.requestPosts(', state.toJS(), reddit);
    return state.set('isFetching', true)
        .set('reddit', reddit);
}

/////////////////

//Copied from server proj
export function next(state, round = state.getIn(['vote', 'round'], 0)) {
    const entries = state.get('entries')
        .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({
                round: round + 1,
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
    }
}

//Copied from server proj
export function restart(state) {
    console.log('reducer.restart(', state.toJS());
    const round = state.getIn(['vote', 'round'], 0);
    return next(
        state.set('entries', state.get('initialEntries'))
            .remove('vote')
            .remove('winner'),
        round
    );
}

//Copied from server proj
export function setEntries(state, entries) {
    console.log('reducer.setEntries(entries: ', entries);
    const list = List(entries);
    return state.set('entries', list)
        .set('initialEntries', list);
}

export default function(state = Map(), action) {

    console.log('reducer(state: ', state.toJS(), ', action: ', action);

    switch (action.type) {
        case INIT:
            return init();
        case REQUEST_POSTS:
            return requestPosts(state, action.reddit);
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'RESTART':
            return restart(state);
        case 'SET_CLIENT_ID':
            return state.set('clientId', action.clientId);
        case 'SET_CONNECTION_STATE':
            return setConnectionState(state, action.state, action.connected);
        case 'SET_STATE':
            return resetVote(setState(state, action.state));
        case 'VOTE':
            return vote(state, action.entry);
    }
    return state;
}
