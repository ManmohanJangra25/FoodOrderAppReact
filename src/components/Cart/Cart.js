import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.item.length > 0;

  const cartItemRemovedHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAdddHandler = (item) => {
    cartCtx.addItem({
        ...item, amount: 1
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => {
        return (
          <CartItem
            key={item.id + `${Math.random().toFixed(2)}`}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemovedHandler.bind(null, item.id)}
            onAdd={cartItemAdddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
