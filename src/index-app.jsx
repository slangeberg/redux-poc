import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import appReducer from './reducer';
import {init, goToSection} from './action_creators';

import {AppContainer} from './components/App';
import {TravelerDetailsContainer} from './components/TravelerDetails';
import {PaymentContainer} from './components/Payment';

import {Map} from 'immutable';

////////////////

//require('./style.css');

////////////////

const reducers = {
    app: appReducer,
    tmp: (state = Map(), action) => {
        console.log('index.reducers.arrow() - state: ', (state && state.toJS ? state.toJS() : state), ', action: ', action);
        return state;
    }
    //form: formReducer     // <---- Mounted at 'form'. See note below.
}
const reducer = combineReducers(reducers);

//console.log('index - reducer: ', reducer);

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
const store = createStoreWithMiddleware(reducer);
//const store = createStore(reducer);

console.log('index - store.getState(): ', store.getState());

store.dispatch(init());

store.subscribe(() =>
    console.log('index.store.subscribe() - state: ', store.getState().toJS())
);


////////////

const routes = <Route path="/" component={AppContainer}>
  <Route path="/travelerDetails" component={TravelerDetailsContainer} />
  <Route path="/payment" component={PaymentContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
