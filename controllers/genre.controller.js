// MODEL & VALIDATION
const { GenreModel, validateGenre } = require("../models/genre.model");
const { MovieModel } = require("../models/movie.model");

const getGenre = async (req, res) => {
  const genres = await GenreModel.find().sort({ name: 1 });
  res.status(200).send(genres);
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  const genre = await GenreModel.findById(id);
  return !genre
    ? res.status(404).send("The genre with the given ID was not found.")
    : res.status(201).send(genre);
};

const setGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreExists = await GenreModel.findOne({ name: req.body.name });
  if (genreExists) res.status(400).send("Item Exists");

  let genre = new GenreModel({
    name: req.body.name,
  });

  genre = await genre.save();
  res.status(201).send(genre);
};
const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await MovieModel.updateMany(
    { "genre._id": id },
    { "genre.name": req.body.name },
    { new: true }
  );
  if (!movie.acknowledged)
    return res.status(400).send("Movie collection Update faild.");

  const genre = await GenreModel.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );
  return !genre
    ? res.status(404).send("The genre with the given ID was not found.")
    : res.status(201).send(genre);
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await GenreModel.findByIdAndRemove(id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.status(200).send("Genre Deleted Successfully.");
};

module.exports = {
  getGenre,
  getGenreById,
  setGenre,
  updateGenre,
  deleteGenre,
};
