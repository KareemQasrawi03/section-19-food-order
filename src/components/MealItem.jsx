import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { CartContext } from "../store/cartContext";

function MealItem({ meal }) {
   const cartCtx = useContext(CartContext);
    function handleAddMealToCart(){
        cartCtx.addItem(meal)

    }
  return (
    <li className="meal-item" key={meal.id}>
      <article className="article">
        {/* <img src={`../../backend/public/${meal.image}`} alt={meal.name} /> */}
        {/* this is correctly */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3 className="meal-item h3">{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
