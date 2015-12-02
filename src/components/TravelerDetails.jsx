import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import ContactForm from './ContactForm';

import * as actionCreators from '../action_creators';

const SECTION_NAME = 'travelerDetails';

// this is the 'dumb' component
export const TravelerDetails = React.createClass({

    //Immutable data ensures shallow change checks should pass - PureRenderMixin should be perf boost
    mixins: [PureRenderMixin],

    componentWillReceiveProps: function(nextProps) {
        //console.log('componentWillReceiveProps() - this.props: ', this.props, ', nextProps: ', nextProps);
        this.props.goToSection(SECTION_NAME);
    },

    render: function() {
        console.log('TravelerDetails.render()');

        return (
            <div>
                <div>
                    hasLoaded: {this.props.hasLoaded.toString()},
                    isLoading: {this.props.isLoading.toString()},
                    hasChanges: {this.props.hasChanges.toString()}
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
                <ContactForm handleSubmit={() => console.log('TravelerDetails.handleSubmit()')} />
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
export const TravelerDetailsContainer = connect(
    state => {
        state = state.app; //nested after combined reducers

        var details = state.getIn(['data', SECTION_NAME]);
        var result = details.toJS();
        console.log('TravelerDetailsContainer.connect().map() - result: ', result);
        return result;
    },
    actionCreators
)(TravelerDetails);