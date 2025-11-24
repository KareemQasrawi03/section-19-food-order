import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { CartContext } from "../store/cartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";

function Cart({ open, onClose }) {
  const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
  // console.log(cartCtx.items[0].name)
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  return (
    <Modal open={userProgressCtx.progress === "cart"} onClose={onClose} className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.length === 0 && <li>No items in cart</li>}
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            <p>
              {item.name} - {item.quantity} x{" "}
              {currencyFormatter.format(item.price)}
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={userProgressCtx.hideCart} textOnly>Close</Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;
