const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const reviews = await knex("review");
    res.json(reviews);
  } catch (err) {
    throw new Error("something went wrong on fetching reviews");
  }
});
router.post("/", async (req, res) => {
  try {
    const reviewToAdd = {
      title: req.body.title,
      description: req.body.description,
      stars: req.body.stars,
      meal_id: req.body.meal_id,
      created_date: req.body.created_date,
    };
    const result = await knex("review").insert(reviewToAdd);
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
    const reviewById = await knex("review").where({
      id: parseInt(req.params.id),
    });
    res.send(reviewById);
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
    const reviewToUpdate = await knex("review")
      .where({ id: parseInt(req.params.id) })
      .update({ title: req.body.title });
    res.json(reviewToUpdate);
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
    const reviewToDelete = await knex("review")
      .where({ id: parseInt(req.params.id) })
      .del();
    res.json(reviewToDelete);
  } catch (error) {
    throw new Error("Something went wrong for reviews to delete");
  }
});

module.exports = router;