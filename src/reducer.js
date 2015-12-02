import {fromJS, List, Map} from 'immutable';
import {
    INIT, SELECT_SECTION, REQUEST_SECTION, RECEIVE_SECTION
} from './action_creators';

const initState = fromJS({
    "navigation": {
        "selectedSection": null,
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
});

function init() {
    console.log('reducer.init()');
    return initState;
}

function selectSection(state, section) {
    var updated = state.setIn(["navigation", "selectedSection"], section);
    var hasChanged = updated !== state;

    console.log('reducer.selectSection(section: ', section, ') - hasChanged: ', hasChanged);

    return updated;
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

/////////

export default function(state = initState, action) {

    console.log('reducer.default(state: ', state.toJS(), ', action: ', action);

    switch (action.type) {
        case INIT:
            return init();
        case SELECT_SECTION:
            return selectSection(state, action.section);
        case REQUEST_SECTION:
            return requestSection(state, action.section);
        case RECEIVE_SECTION:
            return receiveSection(state, action.section, action.data, action.receivedAt);
        default:
            return state;
    }
}
