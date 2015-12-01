import React from 'react';
import {connect} from 'react-redux';

import {NavigationMenuContainer} from './NavigationMenu';

export const App = React.createClass({

    //NOT using PureRenderMixin here, for now - route changes may not fire:
    //https://github.com/rackt/react-router/issues/470
    
    render: function() {
        return (
            <div>
                <div>
                    Current Selection: {this.props.navigation.selectedSection}
                </div>
                <div>
                    <NavigationMenuContainer />
                    <div className="main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export const AppContainer = connect(
    state => {
        console.log('AppContainer.connect().map() - state: ', state);
        //var navigation = state.get('navigation');
        var result = state && state.toJS ? state.toJS() : {navigation: {selectedSection: null}};
        console.log('AppContainer.connect().map() - result: ', result);
        return result;
    }

)(App);
