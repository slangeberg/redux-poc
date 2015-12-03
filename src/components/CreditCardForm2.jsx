import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';

export const fields = ['vendor', 'description', 'cardNumber'];

const validate = values => {
    const errors = {};

    if (!values.vendor) {
        errors.vendor = 'Required';

    } else if (values.vendor.length > 15) {
        errors.vendor = 'Must be 15 characters or less';
    }
    //
    //if (!values.email) {
    //    errors.email = 'Required';
    //
    //} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //    errors.email = 'Invalid email address';
    //}
    //
    //if (!values.age) {
    //    errors.age = 'Required';
    //
    //} else if (isNaN(Number(values.age))) {
    //    errors.age = 'Must be a number';
    //
    //} else if (Number(values.age) < 18) {
    //    errors.age = 'Sorry, you must be at least 18 years old';
    //}

    if (!values.cardNumber) {
        errors.cardNumber = 'Required';

    } else if (isNaN(Number(values.cardNumber))) {
        errors.cardNumber = 'Must be a number';

    } else if (Number(values.cardNumber) < 18) {
        errors.cardNumber = 'Sorry, bad credit card msg...';
    }

    return errors;
};

class CreditCardForm2 extends Component {
    render() {
        const {fields: {vendor, description, cardNumber}, card, resetForm, handleSubmit} = this.props;
/*
 "id": 1,
 "vendor": "Visa",
 "description": "My personal card",
 "cardNumber": "xxxx-xxxx-xxxx-1121",
 "preferred": [
 "hotel",
 "rail"
 ]
  <p>----</p>
 <p key={card.cardNumber}>#: {card.cardNumber} <b>{card.vendor}</b></p>
 */
        return (
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <div className={'form-group' + (vendor.touched && vendor.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">vendor</label>
                    <div className={'col-xs-' + (vendor.touched && vendor.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="vendor" {...vendor}/>
                    </div>
                    {vendor.touched && vendor.error && <div className="col-xs-3 help-block">{vendor.error}</div>}
                </div>

                <div className={'form-group' + (description.touched && description.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">description</label>
                    <div className={'col-xs-' + (description.touched && description.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="description" {...description}/>
                    </div>
                    {description.touched && description.error && <div className="col-xs-3 help-block">{description.error}</div>}
                </div>

                <div className={'form-group' + (cardNumber.touched && cardNumber.error ? ' has-error' : '')}>
                    <label className="col-xs-4 control-label">cardNumber</label>
                    <div className={'col-xs-' + (cardNumber.touched && cardNumber.error ? '5' : '8')}>
                        <input type="text" className="col-xs-8 form-control" placeholder="cardNumber" {...cardNumber}/>
                    </div>
                    {cardNumber.touched && cardNumber.error && <div className="col-xs-3 help-block">{cardNumber.error}</div>}
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

const config = {
    form: 'creditCard2',
    fields,
    validate
};

CreditCardForm2 = reduxForm(config)(CreditCardForm2);

export default CreditCardForm2;
