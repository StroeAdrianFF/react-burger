import React from 'react';
import classes from '../Burger/Burger.module.css'
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient'

import { withRouter } from 'react-router-dom'; //hoc 

const burger = (props) => {


    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {//extract the key of a given object and turn them in an array
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });


    }).reduce((arr, el) => {//allows us to make an array into something else
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients !</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );



}

export default withRouter(burger); //acces .history property