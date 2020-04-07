import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrders from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

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
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = {...this.state.ingredients};
        cloneIngredientState[type] = oldCount + 1;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ingredients: cloneIngredientState, totalPrice: newPrice});
        this.updatePurchasableState(cloneIngredientState);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const cloneIngredientState = {...this.state.ingredients};
        cloneIngredientState[type] = oldCount ? oldCount - 1 : 0;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: cloneIngredientState, totalPrice: newPrice});
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
    };

    successHandler = async () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Chen Reuven',
                address: {
                    street: 'Bahs 2',
                    zipCode: '32322',
                    country: 'isr'
                },
                email: 'chen@gmail.com',
            },
            deliveryMethod: 'fast'
        };
        try {
            const axiosSuccessOrder = await axiosOrders.post('/orders.json', order);
            this.setState({
                loading:false,
                purchasing: false
            })
            console.log(axiosSuccessOrder);
        } catch (e) {
            this.setState({
                loading: false,
                purchasing: false
            })
            console.log(e);
        }

    };

    render() {
        const disableIngredients = {
            ...this.state.ingredients
        }
        for (let key in disableIngredients) {
            disableIngredients[key] = disableIngredients[key] <= 0
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            cancel={this.purchaseCancelHandler}
            success={this.successHandler}/>;
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
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
