import React from "react";
import { Link } from "react-router-dom";

function MealLink({ meal }) {
  return (
    <li>
      <div>
        <div className="meal-price">
          <div>{meal.title}</div>
          <div>kr {meal.price}</div>
        </div>
        <div>{meal.descriptioin}</div>
        <div>{meal.location}</div>
        <Link to={`/meals/${meal.id}`}>
          <div>
            {" "}
            <button> {meal.id}</button>
          </div>
        </Link>
      </div>
    </li>
  );
}

export default MealLink;
