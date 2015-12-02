import React, {Component} from 'react';
import {connectReduxForm, reduxForm} from 'redux-form';

class ContactForm extends Component {
    render() {
        const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
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

ContactForm = connectReduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'contact',                           // a unique name for this form
    fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm);

export default ContactForm;