import React, { useEffect, useState } from "react";

function AddMeal({ addMeal }) {
  const initialstateForMeal = {
    title: "",
    description: "",
    location: "",
    when: "",
    max_reservations: "",
    price: "",
    created_date: "",
  };
  const [meal, setMeal] = useState(initialstateForMeal);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeal((prevMeal) => {
      return {
        ...prevMeal,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validate(meal));

    addMeal(meal);

    setMeal(initialstateForMeal);
  };

  const validate = (values) => {
    let sentParams = {};
    if (!values.title) {
      sentParams.title = "Title required";
    }
    if (!values.description) {
      sentParams.description = "description required";
    }
    if (!values.price) {
      sentParams.price = "Price required";
    }
    if (!values.when) {
      sentParams.when = "Due date required";
    }
    if (!values.created_date) {
      sentParams.created_date = "Created date required";
    }
    if (!values.location) {
      sentParams.location = "Location required";
    }
    if (!values.max_reservations) {
      sentParams.max_reservations = "Maximum reservation required ";
    }
    return sentParams;
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-meal">
        <input
          className="title"
          placeholder="Title"
          type="text"
          name="title"
          value={meal.title}
          onChange={handleChange}
        />
        <p className="error">{error.title}</p>

        <textarea
          type="text"
          name="description"
          rows="4"
          value={meal.description}
          onChange={handleChange}
          placeholder="Content"
        />
        <p className="error">{error.description}</p>

        <input
          type="text"
          name="location"
          value={meal.location}
          onChange={handleChange}
          placeholder="location"
        />
        <p className="error">{error.location}</p>

        <input
          type="number"
          name="price"
          value={meal.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <p className="error">{error.price}</p>

        <input
          type="number"
          name="max_reservations"
          value={meal.max_reservations}
          onChange={handleChange}
          placeholder="Maximum Reservation"
        />
        <p className="error">{error.max_reservations}</p>
        <input
          type="date"
          name="when"
          value={meal.when}
          onChange={handleChange}
          placeholder="Due date"
        />
        <p className="error">{error.when}</p>

        <input
          type="date"
          name="created_date"
          value={meal.created_date}
          onChange={handleChange}
          placeholder="created date"
        />
        <p className="error"> {error.created_date}</p>

        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
}

export default AddMeal;
