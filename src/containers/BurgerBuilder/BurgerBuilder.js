import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControl from "../../components/Burger/BuildControls/BuildControl/BuildControl";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1,
    cheese: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = { ...this.state.ingredients };
        cloneIngredientState[type] = oldCount + 1;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ ingredients: cloneIngredientState, totalPrice: newPrice });
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = { ...this.state.ingredients };
        cloneIngredientState[type] = oldCount ? oldCount - 1 : 0;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: cloneIngredientState, totalPrice: newPrice });
    };

    render() {
        const disableIngredients = {
            ...this.state.ingredients
        }
        for(let key in disableIngredients) {
            disableIngredients[key] = disableIngredients[key] <=0
        }

        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableIngredients}
                    totalPrice={this.state.totalPrice}
                >
                </BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;