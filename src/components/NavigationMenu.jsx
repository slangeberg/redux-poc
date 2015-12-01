import {Map} from 'immutable';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import { /*Router, Route,*/ Link } from 'react-router'

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
        return this.props.sections ? (
            <div className="navigationMenu">
                <ul className="nav nav-pills nav-stacked">
                    {
                        this.props.sections.map(function(section) {
                            var boundClicker = comp.selectSection.bind(comp, section.id);
                            return <li key={section.id} className={comp.isSelected(section) ? "active" : ""}>
                                <Link to={`/${section.id}`}>{section.label}</Link>
                            </li>;
                        })
                    }
                </ul>
            </div>
        ) : (
            <div>No Sections Provided</div>
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
        state = state.app; //nested after combined reducers

        var navigation = state.get('navigation');
        var result = navigation.toJS();
        console.log('NavigationMenuContainer.connect().map() - navigation: ', result);
        return result;
    },
    actionCreators

)(NavigationMenu);