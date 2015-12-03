import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import CreditCardForm2 from './CreditCardForm2';

import * as actionCreators from '../action_creators';


//////////////////

const SECTION_NAME = 'payment';

// this is the 'dumb' component
export const Payment = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    componentWillReceiveProps: function(nextProps) {
        this.props.goToSection(SECTION_NAME);
    },

    render: function() {
        return (
            <div>
                <div>
                    hasLoaded: {this.props.hasLoaded.toString()},
                    isLoading: {this.props.isLoading.toString()},
                    hasChanges: {this.props.hasChanges.toString()}
                </div>
                <div>
                    <CreditCards section={this.props.creditCards} {...this.props} />
                </div>
            </div>
        );
    }
});

const CreditCards = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        const { section } = this.props;

        console.log('CreditCards.render() - section: ', section, ', props: ', this.props, 'props.deleteCard: ', this.props.deleteCard);

        const cards = section.data;

        return cards ? (
            <div>
                <hr/>
                <h4>{section.label}</h4>
                {
                    cards.length > 0
                        ? cards.map(card => {
                            return (
                                <CreditCard key={card.number} card={card} {...this.props} />
                            )
                        })
                        : <p>-- No Cards --</p>
                }
            </div>
        ) : <div/>;
    }
});

const CreditCard = React.createClass({

    mixins: [PureRenderMixin],

    render: function() {
        const { card } = this.props;
        return (
            <div>
                {
                    card.isEditMode ? (
                        <CreditCardForm2 card={card} handleSubmit={() => console.log('handleSubmit() - card: ', card)}/>
                    ) : (
                        <p>
                            #: {card.cardNumber} <b>{card.vendor}</b>&nbsp;&nbsp;
                            <button onClick={() => this.props.deleteCard(card.id)}>Del</button>
                        </p>
                    )
                }
            </div>
        );
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