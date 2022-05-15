import React from "react";

function Meal({ meal }) {
  return (
    <li>
      <div>#{meal.id}</div>
      <div>{meal.title}</div>
      <div>{meal.description}</div>
      <div>{meal.price}</div>
      <div>{meal.location}</div>
    </li>
  );
}

export default Meal;
