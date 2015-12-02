import React, {Component} from 'react';
import {connectReduxForm, reduxForm} from 'redux-form';

class CreditCardForm extends Component {
    render() {
        const {fields: {firstName, lastName, email}, card, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <p>----</p>
                <p key={card.cardNumber}>#: {card.cardNumber} <b>{card.vendor}</b></p>
                <div>
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" {...firstName}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" {...lastName}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="Email" {...email}/>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        );
    }
}

CreditCardForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'creditCard',                        // a unique name for this form
    fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(CreditCardForm);

export default CreditCardForm;