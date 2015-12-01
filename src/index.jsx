import {combineReducers, createStore} from 'redux'

import {Map} from 'immutable';

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your project.
 */
function counter(state = Map(), action) {
    let val = state.get('count');
    val = val ? val : 0;
    switch (action.type) {
        case 'INCREMENT':
            return state.set('count', val + 1)
        case 'DECREMENT':
            return state.set('count', val - 1)
        default:
            return state
    }
}
function other(state = Map(), action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + '+ '
        case 'DECREMENT':
            return state + '- '
        default:
            return state
    }
}

const reducer = combineReducers({
    counter,
    other
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
//let store = createStore(counter)
let store = createStore(reducer);

// You can subscribe to the updates manually, or use bindings to your view layer.
store.subscribe(() => {
    console.log('subscribe() - state: ', store.getState())
    console.log('subscribe() - state.count: ', store.getState().counter.get('count'));
})

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'INCREMENT' })
// 3
