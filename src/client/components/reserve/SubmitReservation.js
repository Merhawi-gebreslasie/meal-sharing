import React, { useState } from "react";
import { Link } from "react-router-dom";

function SubmitReservation({ meal, addRervation }) {
  const initialReservation = {
    meal_id: meal.id,
    contact_name: "",
    contact_phonenumber: "",
    contact_email: "",
    location: "odense c",
    number_of_guests: 4,
    created_date: "2022-04-20",
  };

  const [isClicked, setIsClicked] = useState(true);
  const [error, setError] = useState({});
  const [reservation, setReservatioin] = useState(initialReservation);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservatioin((preReservation) => {
      return {
        ...preReservation,
        [name]: value,
      };
    });
  };
  const validate = (values) => {
    let sentParams = {};

    if (!values.contact_email) {
      sentParams.contact_email = "due date required";
    }
    if (!values.contact_name) {
      sentParams.contact_name = "created date required";
    }
    if (!values.contact_phonenumber) {
      sentParams.contact_phonenumber = "phone number required";
    }
    return sentParams;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(validate(reservation));
    addRervation(reservation);

    setReservatioin(initialReservation);
  };
  return (
    <div className="meal-container">
      <div className="meal-list">
        <div># {meal.id}</div>
        <div>{meal.title}</div>
        <div>{meal.description}</div>
        <div> kr {meal.price}</div>
        <div>{meal.location}</div>
      </div>
      {isClicked ? (
        <Link to={`/meals/${meal.id}`}>
          {" "}
          <button onClick={() => setIsClicked(!isClicked)}>Reserve Meal</button>
        </Link>
      ) : (
        <form onSubmit={handleSubmit} className="create-reservation">
          <label> Name</label>
          <input
            type="text"
            name="contact_name"
            value={reservation.contact_name}
            onChange={handleChange}
          />
          <p className="error">{error.contact_name} </p>
          <label>Phone</label>
          <input
            type="number"
            name="contact_phonenumber"
            value={reservation.contact_phonenumber}
            onChange={handleChange}
          />
          <p className="error">{error.contact_phonenumber} </p>

          <label>Email</label>
          <input
            type="email"
            name="contact_email"
            value={reservation.contact_email}
            onChange={handleChange}
          />

          <p className="error">{error.contact_email} </p>

          <button type="submit"> book seat</button>
        </form>
      )}
    </div>
  );
}

export default SubmitReservation;
