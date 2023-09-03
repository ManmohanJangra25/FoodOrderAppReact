import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    item: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    if(action.type === "ADD"){
        const updateditem = state.item.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            item: updateditem,
            totalAmount: updatedTotalAmount,
        };
    } else if(action.type === "REMOVE"){
        return;
    } else {
        return;
    }
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD",
            item: item,
        });
    };

    const removeItemToCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE",
            id: id,
        });
    };

    const cartContext = {
        item: cartState.item,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
}

export default CartProvider;