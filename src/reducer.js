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
   return initState;
}

function selectSection(state, section) {
    console.log('reducer.selectSection(section: ', section);

    if (!section){
        return state;
    }

    var updated = state.setIn(["navigation", "selectedSection"], section);
    var hasChanged = updated !== state;

    console.log('reducer.selectSection(section: ', section, ') - hasChanged: ', hasChanged);

    return updated;
}

function requestSection(state, section) {
    console.log(`reducer.requestSection(section: ${section})`);

    if (!section) {
        return state;
    }

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


export default function(state = initState, action) {

    console.log('reducer.default(state: ', state.toJS(), ', action: ', action);

    let result = state;

    switch (action.type) {
        case INIT:
            result = init();
            break;
        case SELECT_SECTION:
            result = selectSection(state, action.section);
            break;
        case REQUEST_SECTION:
            result = requestSection(state, action.section);
            break;
        case RECEIVE_SECTION:
            result = receiveSection(state, action.section, action.data, action.receivedAt);
            break;
        //default:
        //    result = state;
    }
    console.log('reducer.default() - result: ', result); //state: ', state.toJS(), ', action: ', action);

    return result;
}
