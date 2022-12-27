// MODEL & VALIDATION
const { GenreModel, validateGenre } = require("../models/genre.model");
const { MovieModel } = require("../models/movie.model");

const getGenre = async (req, res) => {
  try {
    const genres = await GenreModel.find().sort({ name: 1 });
    if (!genres) return res.status(404).send("No Value.");
    res.status(200).send(genres);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await GenreModel.findById(id);
    if (!genre) return res.status(404).send("Not Found!");
    res.status(200).send(genre);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const setGenre = async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genreExists = await GenreModel.findOne({ name: req.body.name });
    if (genreExists) return res.status(400).send("Item Exists");

    const genre = new GenreModel({
      name: req.body.name,
    });

    const result = await genre.save();
    if (!result) return res.status(400).send("Item not Insert");

    res.status(201).send("Insert Succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await GenreModel.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true }
    );

    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.status(201).send("Update Succesfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await GenreModel.findByIdAndRemove(id);
    if (!genre)
      return res.status(404).send("The genre with the given ID was not found.");

    res.status(200).send("Genre Deleted Successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getGenre,
  getGenreById,
  setGenre,
  updateGenre,
  deleteGenre,
};
