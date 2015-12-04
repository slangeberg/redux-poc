import es6Promise from 'es6-promise';

import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {combineReducers, compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import appReducer from './reducer';
import {reducer as formReducer} from 'redux-form';
import {init, goToSection} from './action_creators';

import {AppContainer} from './components/App';
import {TravelerDetailsContainer} from './components/TravelerDetails';
import {PaymentContainer} from './components/Payment';

////////////////

//require('./style.css');

//require('expose?$!expose?jQuery!jquery');
//require("bootstrap-webpack");

//import * from 'bootstrap/css/bootstrap.css';

//////// IE shims ///////////////

es6Promise.polyfill();

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
if (!window.console) {
    window.console = {
        log: () => {},
        error: () => {},
        warn: () => {}
    }
}


////////////////

//Ah, bloody keys become keys on new state object, seen in connect()!
const reducer = combineReducers({
    app: appReducer,
    form: formReducer
});

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f  //NOICE
)(createStore);
const store = createStoreWithMiddleware(reducer);

console.log('index.jsx - store.getState(): ', store.getState());

store.subscribe(() =>
    console.log('index - store.subscribe() - store.getState().form: ', store.getState().form, ', store.getState().app: ', store.getState().app.toJS())
)

////////////

const routes = (
    <Route path="/" component={AppContainer}>
      <Route path="/travelerDetails" component={TravelerDetailsContainer} />
      <Route path="/payment" component={PaymentContainer} />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);