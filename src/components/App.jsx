import React from 'react';
import {List} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');
const vote = function() {
    console.warn('App.vote() - TBD');
};

export default React.createClass({

    //NOT using PureRenderMixin here, for now - route changes may not fire:
    //https://github.com/rackt/react-router/issues/470

    render: function() {
        return React.cloneElement(this.props.children, {pair: pair, vote: vote});
    }
});