import React from 'react';
import CheckoutSummary from '../../components/Order/Checkout Summary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData'

import { connect } from 'react-redux';


class Checkout extends React.Component {



    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }



    render() {
        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>)
        }
        return summary
    }


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients, //has to have the same name as the one in the reducer
        purchased: state.order.purchased
    }
};



export default connect(mapStateToProps)(Checkout);