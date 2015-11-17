
import React from 'react';
import {ConnectionStateContainer} from './ConnectionState';

export default React.createClass({

    //NOT using PureRenderMixin here, for now - route changes may not fire:
    //https://github.com/rackt/react-router/issues/470

    render: function() {
        return <div>
            <ConnectionStateContainer />
            {this.props.children}
        </div>
    }
});
