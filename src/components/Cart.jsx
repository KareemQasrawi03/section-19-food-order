import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { CartContext } from "../store/cartContext";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./UI/CartItem";

function Cart({ open, onClose }) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  // console.log(cartCtx.items[0].name)
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleGoToCheckout(){
    userProgressCtx.showCheckout()
  }
  return (
    <Modal
      open={userProgressCtx.progress === "cart"}
      onClose={onClose}
      className="cart"
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.length === 0 && <li>No items in cart</li>}
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={userProgressCtx.hideCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;
