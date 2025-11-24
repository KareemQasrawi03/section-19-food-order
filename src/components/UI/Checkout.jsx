import React, { useContext } from "react";
import Modal from "./Modal";
import { CartContext } from "../../store/cartContext";
import Input from "./Input";
import { UserProgressContext } from "../../store/UserProgressContext";
import { currencyFormatter } from "../../util/formatting";
import Button from "./Button";

function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgaressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgaressCtx.hideCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: {
            items: cartCtx.items,
            customer: customerData,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log("Order success:", data);
    } catch (err) {
      console.error("Order error:", err.message);
    }
  }
  return (
    <Modal open={userProgaressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input lable="Full Name" type="text" id="name" />
        <Input lable="E-Mail Address" type="email" id="email" />
        <Input lable="Street" type="text" id="street" />
        <div className="control-row">
          <Input lable="Postal Code" type="text" id="postal-code" />
          <Input lable="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
