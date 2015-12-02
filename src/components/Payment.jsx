import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import CreditCardForm from './CreditCardForm';
import * as actionCreators from '../action_creators';


//////////////////

const SECTION_NAME = 'payment';

// this is the 'dumb' component
export const Payment = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    componentWillReceiveProps: function(nextProps) {
        //console.log('componentWillReceiveProps() - this.props: ', this.props, ', nextProps: ', nextProps);
        this.props.goToSection(SECTION_NAME);
    },

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
                    hasLoaded: {this.props.hasLoaded.toString()},
                    isLoading: {this.props.isLoading.toString()},
                    hasChanges: {this.props.hasChanges.toString()}
                </div>
                <div>
                    <CreditCards section={this.props.creditCards} />
                </div>
            </div>
        );
    }
});

const CreditCards = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        const section = this.props.section;
        console.log('CreditCards.render() - section: ', section);

/*
 {
 "vendor": "Master Card",
 "description": "My business card",
 "cardNumber": "xxxx-xxxx-xxxx-3211",
 "preferred": [
 "car"
 ]
 }
 */

        const cards = section.data;

        //console.log('render() - keys: ', keys, ', vals: ', vals);
        return cards ? (
            <div>
                <hr/>
                <h4>{section.label}</h4>
                {
                    cards.map(card => {
                        return (
                            <p key={card.cardNumber}>#: {card.cardNumber} <b>{card.vendor}</b></p>
                        )
                    })
                }
                <CreditCardForm card={cards[0]} handleSubmit={() => console.log('handleSubmit()')} />
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
        state = state.app; //nested, after combined reducers

        var payment = state.getIn(['data', SECTION_NAME]);
        var result = payment.toJS();
        console.log('PaymentContainer.connect().map() - result: ', result);
        return result;
    },
    actionCreators
)(Payment);