import {fromJS, List, Map} from 'immutable';
import {
    INIT, GO_TO_SECTION,
   // SELECT_REDDIT, INVALIDATE_REDDIT,
    REQUEST_SECTION, RECEIVE_SECTION
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
                    "hasLoaded": false,
                    "isLoading": false,
                    "hasChanges": false,

                    travelerInformation: {
                        data: null
                    },
                    additionalInformation: {
                        data: null
                    },
                    phoneNumber: {
                        data: null
                    }
                },
                payment: {
                    "hasLoaded": false,
                    "isLoading": false,
                    "hasChanges": false,

                    creditCards: {
                        data: null
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

function requestSection(state, section) {
    var result = state.setIn(["data", section, "isLoading"], true);

    console.log(`reducer.requestSection(${section}) - updated section: `, result.getIn(["data", section]).toJS());

    return result;
}

function receiveSection(state, section, data, receivedAt) {
    data.hasLoaded = true;
    data.isLoading = false;
    data.lastUpdated = receivedAt;
    var result = state.mergeIn(["data", section], data);

    console.log('reducer.receiveSection(', arguments, ', result: ', result.toJS());

    return result;
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

function goToSection(state, section) {
    var updated = state.setIn(["navigation", "selectedSection"], section);
    var hasChanged = updated !== state;

    console.log('reducer.goToSection(section: ', section, ') - hasChanged: ', hasChanged);

    return updated;
}

export default function(state = Map(), action) {

    console.log('reducer(state: ', state.toJS(), ', action: ', action);

    switch (action.type) {
        case INIT:
            return init();
        case GO_TO_SECTION:
            return goToSection(state, action.section);
        case REQUEST_SECTION:
            return requestSection(state, action.section);
        case RECEIVE_SECTION:
            return receiveSection(state, action.section, action.data, action.receivedAt);
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
