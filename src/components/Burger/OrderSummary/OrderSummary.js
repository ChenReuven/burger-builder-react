import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Are You Want To Checkout?</p>
            <Button type="Danger" clicked={props.cancel}>Cancel</Button>
            <Button type="Success" clicked={props.success}>Order</Button>
        </Fragment>
    );
};

export default orderSummary;
