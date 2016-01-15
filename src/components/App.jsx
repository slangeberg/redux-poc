import React from 'react';
import {connect} from 'react-redux';

import {NavigationMenuContainer} from './NavigationMenu';

import SearchBox from './SearchBox'

export const App = React.createClass({

    //NOT using PureRenderMixin here, for now - route changes may not fire:
    //https://github.com/rackt/react-router/issues/470
    
    render: function() {
        return (
            <div>
                <div>
                    Current Selection: {this.props.navigation.selectedSection}

                    <SearchBox/>
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
        state = state.app; // nested, after combining reducers!

        var result = state.toJS();
        console.log('AppContainer.connect().map() - result: ', result);
        return result;
    }

)(App);
