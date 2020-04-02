import React, { Fragment } from 'react';

const orderSummary = props => {
    const IngredientsSummary = Object.keys(props.ingredients)
        .map(ig_key =>
            <li key={ig_key}>
                <span style={{textTransform: 'capitalize'}}>{ig_key}</span>:
                <span>{props.ingredients[ig_key]}</span>
            </li>
        );
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Order Ingredients:</p>
            <ul>
                {IngredientsSummary}
            </ul>
            <p>Are You Want To Checkout?</p>
        </Fragment>
    );
};

export default orderSummary;