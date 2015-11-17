import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState, setConnectionState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

//require('./style.css');
//
const socket = function(){}; //io(`${location.protocol}//${location.hostname}:8090`);
//socket.on('state', state =>
//    store.dispatch(setState(state))
//);
//[
//  'connect',
//  'connect_error',
//  'connect_timeout',
//  'reconnect',
//  'reconnecting',
//  'reconnect_error',
//  'reconnect_failed'
//].forEach(ev =>
//    socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
//);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

store.dispatch(setClientId(getClientId()));

//No socket - just fake connection
store.dispatch(setConnectionState(null, true))

//Copied from server
store.dispatch({
  type: 'SET_ENTRIES',
  entries: [
    "Shallow Grave",
    "Trainspotting",
    "A Life Less Ordinary",
    "The Beach",
    "28 Days Later",
    "Millions",
    "Sunshine",
    "Slumdog Millionaire",
    "127 Hours",
    "Trance",
    "Steve Jobs"
  ]// require('./entries.json')
});
store.dispatch({type: 'NEXT'});

////////////

const routes = <Route component={App}>
  <Route path="/" component={VotingContainer} />
  <Route path="/results" component={ResultsContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
