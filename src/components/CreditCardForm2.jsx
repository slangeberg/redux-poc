import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

export const fields = ['username', 'email', 'age'];

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.age) {
        errors.age = 'Required';
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number';
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old';
    }
    return errors;
};

class CreditCardForm2 extends Component {
    render() {
        const {fields: {username, email, age}, card, resetForm, handleSubmit} = this.props;

        return (<form className="form-horizontal" onSubmit={handleSubmit}>
                <p>----</p>
                <p key={card.cardNumber}>#: {card.cardNumber} <b>{card.vendor}</b></p>

                <div className={'form-group' + (username.touched && username.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">Username</label>
                    <div className={'col-xs-' + (username.touched && username.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="Username" {...username}/>
                    </div>
                    {username.touched && username.error && <div className="col-xs-3 help-block">{username.error}</div>}
                </div>
                <div className={'form-group' + (email.touched && email.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">Email</label>
                    <div className={'col-xs-' + (email.touched && email.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="Email" {...email}/>
                    </div>
                    {email.touched && email.error && <div className="col-xs-3 help-block">{email.error}</div>}
                </div>
                <div className={'form-group' + (age.touched && age.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">Age</label>
                    <div className={'col-xs-' + (age.touched && age.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="Age" {...age}/>
                    </div>
                    {age.touched && age.error && <div className="col-xs-3 help-block">{age.error}</div>}
                </div>
                <div className="text-center">
                    <button className="btn btn-primary btn-lg" style={{margin: 10}} onClick={handleSubmit}>Submit</button>
                    <button className="btn btn-default btn-lg" style={{margin: 10}} onClick={resetForm}>Clear Values</button>
                </div>
            </form>
        );
    }
}
CreditCardForm2.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
};

CreditCardForm2 = reduxForm({
    form: 'creditCard2',
    fields,
    validate
})(CreditCardForm2);

export default CreditCardForm2;
