import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

function Meals() {
  const [mealsData, setMealsData] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch("http://localhost:3000/meals");
        if (!response.ok) {
          //...
        }
        const meals = await response.json();
        setMealsData(meals);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMeals();
  }, []);
  console.log("data", mealsData);

  return (
    <ul id="meals">
      {mealsData?.length > 0 &&
        mealsData.map((meal) => <MealItem key={meal.id} meal={meal} />)}
      {mealsData.length == 0 && <p>owuhvci,</p>}
    </ul>
  );
}

export default Meals;
