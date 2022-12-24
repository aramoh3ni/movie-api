const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { movies } = require("../data/mock.json");

// return all items
router.get("/", async (req, res) => {
  try {
    const result = await movies;
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// return single item
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await movies.find((m) => m._id === id);
    if (!movie) return res.status(404).send("Not Found");
    res.status(200).send(movie);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Post Single Item
router.post("/", async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const checkIfExists = await movies.find((m) => m.title === req.body.title);
    if (checkIfExists)
      return res.status(400).send(`Item with ${req.body.title} name exists.`);

    const obj = {
      _id: movies.length * 100 + "e34ed7c",
      title: req.body.title,
      numberInStock: parseInt(req.body.numberInStock),
      dailyRentalRate: parseFloat(req.body.dailyRentalRate),
    };

    const result = await movies.push(obj);
    if (!result) return res.status(400).send("Insertion Error");

    res.status(200).send("Insert Successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update Single Item
router.put("/:id", (req, res) => {});

// Delete item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await movies.find((m) => m._id === id);
    if (!data)
      return res.status(400).send(`Item with ${id} id not exists.`);

    const index = movies.indexOf(data);
    await movies.splice(index, 1);
  
    res.status(200).send("Delete Successfuly.");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

const validateMovie = (movie) => {
  const result = Joi.object({
    title: Joi.string().min(6).max(255).strip().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  }).validate(movie);
  return result;
};

module.exports = router;
