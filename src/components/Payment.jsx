import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import * as actionCreators from '../action_creators';

// this is the 'dumb' component
export const Payment = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    render: function() {
        console.log('Payment.render()');
/*
 {
 "data": {
 "creditCards": {
 "data": {
 "cards": [
 {
 "vendor": "Visa",
 "description": "My personal card",
 "cardNumber": "xxxx-xxxx-xxxx-1121",
 "preferred": [
 "hotel",
 "rail"
 ]
 }
 ]
 }
 }
 }
 }
 */
        return (
            <div>
                <div>
                    hasLoaded: {this.props.hasLoaded.toString()}, isLoading: {this.props.isLoading.toString()}, hasChanges: {this.props.hasChanges.toString()}
                </div>

                <div>
                    <PaymentSection section={this.props['travelerInformation']} />
                    <PaymentSection section={this.props['additionalInformation']} />
                    <PaymentSection section={this.props['phoneNumber']} />
                </div>
            </div>
        );
    }
});

const PaymentSection = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        console.log('PaymentSection.render() - props.section: ', this.props.section);
        const section = this.props.section;
        return section.data ? (
            <div>
                <hr/>
                <h4>{section.label}</h4>
                {
                    Object.keys(section.data).map(k => {
                        return (
                            <p key={k}>{k}: <b>{section.data[k]}</b></p>
                        )
                    })
                }
            </div>
        ) : <div/>;
    }
});

//function mapStateToProps(state) {
//    return {
//        pair: state.getIn(['vote', 'pair']),
//        hasVoted: state.getIn(['myVote', 'entry']),
//        winner: state.get('winner'),
//        isFetching: state.get('isFetching'),
//    };
//}

// Container is the 'smart' / wired component
export const PaymentContainer = connect(
        state => {
        var payment = state.getIn(['data', 'payment']);
        var result = payment.toJS();
        console.log('PaymentContainer.connect().map() - result: ', result);
        return result;
    },
    actionCreators
)(Payment);