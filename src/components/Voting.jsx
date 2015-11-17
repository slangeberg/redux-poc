import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// Voting is the 'dumb' component
export const Voting = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],
    render: function() {
        return <div>
            {this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Vote {...this.props} />}
        </div>;
    }
});

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.getIn(['myVote', 'entry']),
        winner: state.get('winner')
    };
}

// VotingContainer is the 'smart' / wired component
export const VotingContainer = connect(
    mapStateToProps,
    actionCreators
)(Voting);