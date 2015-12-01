import fetch from 'isomorphic-fetch'

export const INIT = 'INIT';
export const SELECT_SECTION = 'SELECT_SECTION';
export const REQUEST_SECTION = 'REQUEST_SECTION';
export const RECEIVE_SECTION = 'RECEIVE_SECTION';

const dataDir = 'data';

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
        data: json.data,
        receivedAt: Date.now()
    }
}

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
    state = state.app; //nested, after combined reducers

    console.log('actions.shouldFetchSection(', section);
    const val = !state.getIn(["data", section, "hasLoaded"]);
    //console.log('actions.shouldFetchSection() - sectionData', sectionData.toJS());

    //const val = sectionData.get(hasLoaded;
    console.log('actions.shouldFetchSection() - val: ', val);
    return val;
}

function selectSection(section) {
    console.log('actions.selectSection(', section);
    return {
        type: SELECT_SECTION,
        section
    }
}

////////

export function init() {
    return {
        type: INIT
    }
}

export function goToSection(section) {
    console.log('actions.goToSection(', section);

    return (dispatch, getState) => {

        dispatch(selectSection(section));

        if (shouldFetchSection(getState(), section)) {
            return dispatch(fetchSection(section))
        }
    }
}
