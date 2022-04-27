const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation");
    res.json(reservations);
  } catch (err) {
    throw new Error("something went wrong on fetching reservations");
  }
});
router.post("/", async (req, res) => {
  try {
    const reservationToAdd = {
      number_of_guests: req.body.number_of_guests,
      contact_phonenumber: req.body.contact_phonenumber,
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
      meal_id: req.body.meal_id,
      created_date: req.body.created_date,
    };
    const result= await knex("reservation").insert(reservationToAdd);
    res.json(result);
  } catch (error) {
    throw new Error("something went wrong with adding meal");
  }
});

router.get("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res.status(404).json({
      status: "bad request",
      msg: "no result, id is not a number",
    });
  }

  try {
    const reservationById = await knex("reservation").where({
      id: parseInt(req.params.id),
    });
    res.send(reservationById);
  } catch (error) {
    throw new Error("Something went wrong with getting reservation by id");
  }
});

router.put("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res
      .status(404)
      .json({ status: "bad request", msg: "ID  must be a number" });
  }

  try {
    const reservationToUpdate = await knex("reservation")
      .where({ id: parseInt(req.params.id) })
      .update({ contact_phonenumber: req.body.contact_phonenumber });
    res.json(reservationToUpdate);
  } catch (error) {
    throw new Error("something went wrong ,can not update reservation");
  }
});

router.delete("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    return res
      .status(404)
      .json({ status: "bad request", msg: "ID to delete is not a number" });
  }

  try {
    const reservationToDelete = await knex("reservation")
      .where({ id: parseInt(req.params.id) })
      .del();
    res.json(reservationToDelete);
  } catch (error) {
    throw new Error("Something went wrong for reservation to delete");
  }
});

module.exports = router;