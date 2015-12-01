import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import appReducer from './reducer';
import {reducer as formReducer} from 'redux-form';
import {init, goToSection} from './action_creators';

import {AppContainer} from './components/App';
import {TravelerDetailsContainer} from './components/TravelerDetails';
import {PaymentContainer} from './components/Payment';

import AddTravel from './components/AddTravel'; //= require('./AddTravel')


////////////////

//require('./style.css');

////////////////

//const tempReducer = (state = {hi: 'there'}, action) => {
//
//    console.log('index.tempReducer(state: ', state, ', action: ', action);
//
//    switch (action.type) {
//        default:
//            return state;
//    }
//}

//Ah, bloody keys become keys on new state object, seen in connect()!
const reducer = combineReducers({
    app: appReducer,
    //temp: tempReducer,
    form: formReducer
});

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
const store = createStoreWithMiddleware(reducer);

console.log('index.jsx - store.getState(): ', store.getState());

store.subscribe(() =>
    console.log('index - store.subscribe() - store.getState().app: ', store.getState().app)
)

////////////

const routes = (
    <Route path="/" component={AppContainer}>
      <Route path="/travelerDetails" component={TravelerDetailsContainer} />
      <Route path="/payment" component={PaymentContainer} />
      <Route path="/travel" component={AddTravel} />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
