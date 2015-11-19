
import React from 'react';
import {NavigationMenuContainer} from './NavigationMenu';

export default React.createClass({

    //NOT using PureRenderMixin here, for now - route changes may not fire:
    //https://github.com/rackt/react-router/issues/470

    render: function() {
        return <div>
            <NavigationMenuContainer />
            {this.props.children}
        </div>
    }
});
