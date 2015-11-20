import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import * as actionCreators from '../action_creators';


export const NavigationMenu = React.createClass({

    mixins: [PureRenderMixin],

    isSelected: function (section) {
        return this.props.selectedSection == section.id
    },

    selectSection: function(section) {
        console.log('NavigationMenu.selectSection(', section);
        this.props.goToSection(section);
    },

    render: function () {
        var comp = this;
        return (
            <div className="navigationMenu">
                <ul>
                    {
                        this.props.sections.map(function(section) {
                            var boundClicker = comp.selectSection.bind(comp, section.id);
                            return <li key={section.id} style={{fontWeight: comp.isSelected(section) ? 'bold' : 'normal'}} >
                                <a section={section.id} onClick={boundClicker}>
                                    {[section.label, section.hasChanges ? <b>&nbsp;*</b> : '']}
                                </a>
                            </li>;
                        })
                    }
                </ul>
            </div>
        );
    }
});

export const NavigationMenuContainer = connect(
    /*
     "navigation": {
         "selectedSection": "travelerDetails",
         "sections": [
             {"id": "travelerDetails", "label": "Traveler Details", hasChanges: false},
             {"id": "payment", "label": "Payment", hasChanges: false}
         ]
     },
     */
    state => {
        var navigation = state.get('navigation');//, Map());
        //debugger;
        var result = navigation.toJS();
        console.log('NavigationMenuContainer.connect().map() - navigation: ', result);
        return result;
    },
    actionCreators

)(NavigationMenu);