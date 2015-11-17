import objectAssign from 'object-assign';

export default socket => store => next => action => {

    console.log('remote_action_middleware.socket.store.next() - action: ', action);

    if (action.meta && action.meta.remote) {
        const clientId = store.getState().get('clientId');
        if (socket.emit) {
            socket.emit('action', objectAssign({}, action, {clientId}));
        } else {
            console.warn('remote_action_middleware.socket.store.next() - socket.emit() is undefined');
        }
    }
    return next(action);
}