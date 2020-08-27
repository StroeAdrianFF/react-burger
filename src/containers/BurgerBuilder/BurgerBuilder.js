import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


import Spinner from '../../components/UI/Spinner/Spinner'

import { connect } from 'react-redux'; //helps connect the store with this component
import * as actions from '../../store/actions/index'





export class BurgerBuilder extends Component {

    state = {
        purchasing: false

    }

    //use componentDidMount to fetch data
    componentDidMount() {
        this.props.onInitIngredients();
    }




    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)//array of string objects
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {//turn array in 1 number
                return sum + el;
            }, 0);
        return sum > 0
    }



    //function(){} //wont trigger this properly
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true, });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }

    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false, })
    }


    purchaseContinueHandler = () => {//AXIOS INSTANCE USED
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }



        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price}
            />;
        }
        /* if (this.state.loading) {
            orderSummary = <Spinner /> //check if loading to show spinner or not
        } */


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));