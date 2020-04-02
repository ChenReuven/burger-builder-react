import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.css';

const Burger = props => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])]
            .map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}></BurgerIngredient>
            })
        )
        .reduce((acc, cur) => {
            return acc.concat(cur);
        }, []);
    if (!transformIngredients.length) {
        transformIngredients = <p>Please Insert Ingredients</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;