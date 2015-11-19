import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';

export const NavigationMenu = React.createClass({

    mixins: [PureRenderMixin],

    isSelected: function (section) {
        return this.props.selectedSection == section.id
    },

    selectSection: function(section) {
        console.log('NavigationMenu.selectSection(', section);
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
    state => state.get('navigation', Map()).toJS()

)(NavigationMenu);