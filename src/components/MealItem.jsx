import React from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

function MealItem({ meal }) {
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
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;
