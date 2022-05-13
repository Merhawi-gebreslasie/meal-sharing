import React, { useEffect, useState } from "react";
import "./reserve.css";
import { useParams } from "react-router-dom";

import Header from "../menu/Header";
import Modal from "../modal/Modal";
import SubmitReservation from "./SubmitReservation";

const initialState = {
  status: "",
  msg: "",
};
function ReserveForSpecificMeal() {
  const [display, setDisplay] = useState({});
  const { id } = useParams();
  const ID = parseInt(id);
  console.log(typeof ID);

  const [permited, setPermited] = useState(initialState);
  const [isReserved, setIsReserved] = useState(false);
  const [meals, setMeals] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getmealById();
  }, []);

  const getmealById = async () => {
    try {
      const response = await fetch(`/api/meals/${ID}`);
      const result = await response.json();

      setMeals(result);
    } catch (err) {
      throw new Error("can not fetch meals by meal id");
    }
  };

  const addReservation = (reservation) => {
    const reservationToPost = {
      meal_id: reservation.meal_id,
      number_of_guests: reservation.number_of_guests,
      contact_phonenumber: reservation.contact_phonenumber,
      contact_name: reservation.contact_name,
      contact_email: reservation.contact_email,
      created_date: reservation.created_date,
    };
    setDisplay(reservation);
    setIsReserved(true);
    fetch("/api/reservations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reservationToPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setOpen(true);
        setPermited({
          status: "Reservation sent",
          message: "Hi ,Thank you for your resrvation  your order no. is ",
        });
      })
      .catch((error) => {
        setOpen(true);
        setPermited({
          status: "Failled to send",
          message: `Try again `,
          error,
        });
      });
  };

  console.log(meals);

  const results = meals.map((meal) => (
    <SubmitReservation
      key={meal.id}
      addRervation={addReservation}
      meal={meal}
    />
  ));

  return (
    <div>
      <Header />
      {open && <Modal closeModal={setOpen} permited={permited} />}
      <div className="meal-item">
        {results}

        {isReserved && (
          <div className="display-reservation">
            <p> {display.contact_name}</p>
            <p>{display.contact_phonenumber}</p>
            <p> {display.contact_email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReserveForSpecificMeal;
