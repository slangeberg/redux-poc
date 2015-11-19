import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';

export const NavigationMenu = React.createClass({

    mixins: [PureRenderMixin],

    getMessage: function () {
        return `Selected: (${this.props.selectedSection})`;
    },
    isSelected: function (section) {
        return this.props.selectedSection == section.id
    },
    render: function () {
        var comp = this;
        return <div className="navigationMenu">
            <div>{this.getMessage()}</div>
            <div>
                <ul>
                    {
                        this.props.sections.map(function(section) {
                            return <li key={section.id}
                                       style={{fontWeight: comp.isSelected(section) ? 'bold' : 'normal'}}>
                                {[section.label, section.hasChanges ? <b>&nbsp;*</b> : '']}
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>
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