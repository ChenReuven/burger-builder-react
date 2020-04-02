import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = { ...this.state.ingredients };
        cloneIngredientState[type] = oldCount + 1;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ ingredients: cloneIngredientState, totalPrice: newPrice });
        this.updatePurchasableState(cloneIngredientState);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = { ...this.state.ingredients };
        cloneIngredientState[type] = oldCount ? oldCount - 1 : 0;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ ingredients: cloneIngredientState, totalPrice: newPrice });
        this.updatePurchasableState(cloneIngredientState);
    };

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ig_key => ingredients[ig_key])
            .reduce((acc, cur) => acc + cur, 0);
        this.setState({
            purchasable: sum > 0
        })
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    render() {
        const disableIngredients = {
            ...this.state.ingredients
        }
        for (let key in disableIngredients) {
            disableIngredients[key] = disableIngredients[key] <= 0
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableIngredients}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                >
                </BuildControls>
            </Fragment>
        );
    }
}

export default BurgerBuilder;