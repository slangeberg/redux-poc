import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// this is the 'dumb' component
export const TravelerDetails = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    render: function() {
        console.log('TravelerDetails.render()');

        return (
            <div>
                <div>
                    hasLoaded: {this.props.hasLoaded.toString()}, isLoading: {this.props.isLoading.toString()}, hasChanges: {this.props.hasChanges.toString()}
                </div>

                <div>
                    <TravelerDetailSection section={this.props['travelerInformation']} />
                    <TravelerDetailSection section={this.props['additionalInformation']} />
                    <TravelerDetailSection section={this.props['phoneNumber']} />
                </div>
            </div>
        );
    }
});

const TravelerDetailSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        console.log('TravelerDetailSection.render() - props.section: ', this.props.section);
        const section = this.props.section;
        return (
            <div>
                <hr/>
                <h4>{section.label}</h4>
                {
                    Object.keys(section.data).map(k => {
                        return (
                            <p>{k}: <b>{section.data[k]}</b></p>
                        )
                    })
                }
            </div>
        );
    }
});
/*
 travelerDetails: {
 "hasLoaded": false,
 "isLoading": false,
 "hasChanges": false,

 travelerInformation: {
 "label": "Traveler Information",
 data: { }
 },
 additionalInformation: {
 "label": "Additional Information",
 data: {}
 },
 phoneNumber: {
 "label": "Phone Number",
 "hasChanges": false,
 isLoading: false,
 "hasLoaded": false,
 data: {}
 }
 },
 */

//function mapStateToProps(state) {
//    return {
//        pair: state.getIn(['vote', 'pair']),
//        hasVoted: state.getIn(['myVote', 'entry']),
//        winner: state.get('winner'),
//        isFetching: state.get('isFetching'),
//        reddit: state.get('reddit')
//    };
//}

// Container is the 'smart' / wired component
export const TravelerDetailsContainer = connect(
    state => {
        var details = state.getIn(['data', 'travelerDetails']);
        //debugger;
        var result = details.toJS();
        console.log('TravelerDetailsContainer.connect().map() - result: ', result);
        return result;
    },
    actionCreators
)(TravelerDetails);