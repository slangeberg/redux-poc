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
                <ul className="nav nav-pills nav-stacked">
                    {
                        this.props.sections.map(function(section) {
                            var boundClicker = comp.selectSection.bind(comp, section.id);
                            return <li key={section.id}
                                       className={comp.isSelected(section) ? "active" : ""}>
                                <a section={section.id}
                                        onClick={boundClicker}
                                        href="#">
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
        var navigation = state.get('navigation');
        var result = navigation.toJS();
        console.log('NavigationMenuContainer.connect().map() - navigation: ', result);
        return result;
    },
    actionCreators

)(NavigationMenu);