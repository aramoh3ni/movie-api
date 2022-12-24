const Joi = require("joi");
const router = require("express").Router();

const { genres } = require("../data/mock.json");

router.get("/", (req, res) => {
  try {
    if (!genres.length > 0) return res.status(404).send("No Value");
    res.status(200).send(genres);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await genres.find((g) => g._id == id);
    if (!genre) return res.status(404).send("Not Found!");
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).json(err.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genreExists = await genres.find((g) => g.name == req.body);
    if (genreExists) return res.status(400).send("Item Exists");

    const genre = {
      _id: genres.length * 100 + "df342278sad332",
      name: req.body.name,
    };

    const result = await genres.push(genre);
    if (!result) return res.status(400).send("Item not Insert");

    res.status(200).send("Insert Succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.put("/:id", (req, res) => {});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await genres.find((g) => g._id === id);
    if (!genre) return res.status(400).send("Item not Exists");

    const index = genres.indexOf(genre);
    await genres.splice(index, 1)
    res.status(200).send("Delete Successfully.")
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const validateGenre = (genre) => {
  return Joi.object({
    name: Joi.string().max(30).required().label("Genre Title"),
  }).validate(genre);
};

module.exports = router;
