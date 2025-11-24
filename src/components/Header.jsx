import React, { useContext, useState } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/cartContext";
import Modal from "./UI/Modal";
import Cart from "./Cart";
import UserProgaressConstex, { UserProgressContext } from "../store/UserProgressContext";

function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [isOpenModal, setIsOpenModel] = useState(false);
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  function handleOpenModal() {
    setIsOpenModel(true);
  }
  function handleCloseModal() {
    setIsOpenModel(false);
  }

  function handleShowCart(){

    userProgressCtx.showCart()
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img id="title img" src={logoImg} alt="A restaurant" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItems})
          </Button>
        </nav>
      </header>
      <Cart open={isOpenModal} onClose={handleCloseModal} />
    </>
  );
}

export default Header;
