import React, { useEffect, useState } from "react";
import "./meal.css";

import AddMeal from "./AddMeal";
import MealLink from "./MealLink";

import Header from "../menu/Header";
import Modal from "../modal/Modal";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [permited, setPermited] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getMeals();
  }, []);
  const getMeals = async () => {
    try {
      const response = await fetch("/api/meals");
      const results = await response.json();

      setMeals(results);
    } catch (err) {
      throw new Error("fetching meals went wrong");
    }
  };
  const addMeal = (meal) => {
    const mealToAdd = {
      title: meal.title,
      description: meal.description,
      location: meal.location,
      when: meal.when,
      max_reservations: meal.max_reservations,
      price: meal.price,
      created_date: meal.created_date,
    };
    fetch("/api/meals", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(mealToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(true);
        setPermited({ message: "Hi your meal added successfully" });
      })
      .catch((error) => {
        setIsOpen(true);
        setPermited(error);
      });
  };
  const listofpages = meals.map((meal) => (
    <MealLink key={meal.id} meal={meal} />
  ));

  return (
    <div>
      <Header />
      {isOpen && <Modal closeModal={setIsOpen} permited={permited} />}
      <AddMeal addMeal={addMeal} />
      <ul className="meals-list">{listofpages}</ul>
    </div>
  );
}

export default MealsPage;
