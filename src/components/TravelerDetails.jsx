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
                    hasLoaded: {this.props.hasLoaded.toString()}, isLoading: {this.props.isLoading}, hasChanges: {this.props.hasChanges}
                </div>

                <div>
                    {this.props.travelerInformation.label}: {this.props.travelerInformation.data.toString()}
                </div>
            </div>
        );
        //<div>
        //{this.props.winner ?
        //<Winner ref="winner" winner={this.props.winner} /> :
        //<Vote {...this.props} />}

        //</div>
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