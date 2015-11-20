import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import reducer from './reducer';
import {init} from './action_creators';

import App from './components/App';
import {TravelerDetailsContainer} from './components/TravelerDetails';
import {ResultsContainer} from './components/Results';

////////////////

//require('./style.css');

////////////////

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);
const store = createStoreWithMiddleware(reducer);

store.dispatch(init());

////////////

const routes = <Route component={App}>
  <Route path="/" component={TravelerDetailsContainer} />
  <Route path="/results" component={ResultsContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
      <Router>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
