const express = require("express");
const Knex = require("knex");
const { groupBy } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  const { maxPrice, availableReservations, title, createdAfter, limit } =
    unpackParams(request); // This step will throw if any params are invalid

  let meals = knex("meal");

  if (maxPrice != Number.MAX_VALUE) {
    meals = meals.where("price", "<", maxPrice);
  }
  if (title.length !== 0) {
    meals = meals.where("title", "LIKE", `%${title}%`);
  }
  if (createdAfter) {
    meals = meals.where("created_date", ">", createdAfter);
  }
  if (limit !== Number.MAX_VALUE) {
    meals = meals.limit(limit);
  }

  if (availableReservations) {
    meals = meals
      .join("reservation", "meal.id", "reservations.meal_id")
      .select(
        "meal.id",
        "title",
        "description",
        "location",
        "when",
        "created",
        "price",
        "max_reservation",
        knex.raw("SUM(number_of_guests) AS total")
      )
      .where("max_reservation", ">", "number_of_guests")
      .groupBy("meal_id")
      .having(Knex.raw("max_reservation-SUM(number_of_guests)>0"));
  }
  try {
    const result = await meals;
    response.json(result);
  } catch (err) {
    throw new Error("something wrong with fetching meals");
  }
});

// Few things that are sent in should be bigger than Number.MAX_VALUE, and all strings include the empty string, the date could be some even older value
const defaultParams = {
  maxPrice: Number.MAX_VALUE,
  availableReservations: "",
  title: "",
  createdAfter: new Date(2000, 6, 6),
  limit: Number.MAX_VALUE,
};

function unpackParams(request) {
  const sentParams = {};

  if (request.query.maxPrice) {
    const maxPrice = parseInt(request.query.maxPrice);
    if (isNaN(maxPrice) || maxPrice < 1) {
      throw new Error("maxPrice param must be a positive number");
    }
    sentParams["maxPrice"] = maxPrice;
  }

  if (request.query.availableReservations) {
    const availableReservations =
      request.query.availableReservations.toLowerCase();
    if (availableReservations !== "false" && availableReservations !== "true") {
      throw new Error("availableReservations param must be a boolean");
    }
    sentParams["availableReservations"] = availableReservations;
  }

  if (request.query.limit) {
    const limit = parseInt(request.query.limit);
    if (isNaN(limit) || limit < 1) {
      throw new Error("limit param must be a positive number");
    }
    sentParams["limit"] = limit;
  }

  if (request.query.createdAfter) {
    const createdAfter = Date.parse(request.query.createdAfter);
    if (isNaN(createdAfter)) {
      throw new Error(
        "createdAfter param must be a valid date in format YYYY-MM-DD"
      );
    }
    sentParams["createdAfter"] = createdAfter;
  }

  if (request.query.title) {
    sentParams["title"] = request.query.title;
  }

  return Object.assign({}, defaultParams, sentParams); // Create a new object, then merge defaultParams into that and then sentParams on top of that which overrides the defaults with whatever params were sent and that are valid
}

router.post("/", async (req, res) => {
  try {
    const mealToAdd = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      when: req.body.when,
      max_reservations: req.body.max_reservations,
      price: req.body.price,
      created_date: req.body.created_date,
    };
    const result = await knex("meal").insert(mealToAdd);
    res.json(result);
  } catch (error) {
    throw new Error("something went wrong with adding meal");
  }
});

router.get("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    res.status(404).json({ status: "bad request", msq: "ID must be a number" });
  } else {
    try {
      const mealById = await knex("meal").where({
        id: parseInt(req.params.id),
      });
      res.send(mealById);
    } catch (error) {
      throw new Error("Something went wrong with getting meal by id");
    }
  }
});

router.put("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res
      .status(404)
      .json({ status: "bad request", msg: "ID  must be a number" });
  } else {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const titles = await knex("meal").select("title");
      response.json(titles);
      const updateMeal = await knex("meal")
        .where({ id: parseInt(req.params.id) })
        .update({ description: req.body.description });
      res.json(updateMeal);
    } catch (error) {
      throw error;
    }
  }
});

router.delete("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id))) {
    res
      .json(404)
      .json({ status: "bad request", msg: "ID to delete is not a number" });
  } else {
    try {
      const mealToDelete = await knex("meal")
        .where({ id: parseInt(req.params.id) })
        .del();
      res.json(mealToDelete);
    } catch (error) {
      throw new Error("Something went wrong for meal to delete");
    }
  }
});

module.exports = router;
