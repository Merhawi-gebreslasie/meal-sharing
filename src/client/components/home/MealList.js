import React, { createContext, useEffect, useState } from "react";
import Meal from "./Meal";
import "./meals.css";
export const MealContext = createContext();
function MealList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://hyf-meal-sharing-app-project.herokuapp.com//api/meals"
      );
      const result = await response.json();
      console.log(result);
      setMeals(result);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const results = meals.map((meal) => <Meal key={meal.id} meal={meal} />);
  return (
    <div>
      <div className="title">
        <h1>Meals App</h1>
        <h3>Here are the meals that you looking for</h3>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul className="meals-list">{results}</ul>
          {error && <div>{error.message}</div>}
        </div>
      )}
    </div>
  );
}
export default MealList;
