const createError = require("http-errors");
// MODEL & VALIDATION
const { GenreModel, validateGenre } = require("../models/genre.model");
const { MovieModel } = require("../models/movie.model");

const { messages } = require("../constants/message");
const msg = messages("Genre");

const getGenre = async (req, res) => {
  const genres = await GenreModel.find().sort({ name: 1 });
  throw !getGenre
    ? createError.NotFound(msg.not_found)
    : res.status(200).json({ data: genres });
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  const genre = await GenreModel.findById(id);
  throw !genre
    ? createError.NotFound(msg.not_found)
    : res.status(200).json({ data: genre });
};

const setGenre = async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) throw createError.BadRequest(error.details[0].message);

  const genreExists = await GenreModel.findOne({ name: req.body.name });
  if (genreExists) throw createError.BadRequest(msg.item_exists);

  let genre = new GenreModel({
    name: req.body.name,
  });

  genre = await genre.save();
  throw !genre
    ? createError.BadRequest(msg.create_error)
    : res.status(201).json({ data: genre, message: msg.create });
};
const updateGenre = async (req, res) => {
  const { id } = req.params;
  const { error } = validateGenre(req.body);
  if (error) throw createError.BadRequest(error.details[0].message);

  const movie = await MovieModel.updateMany(
    { "genre._id": id },
    { "genre.name": req.body.name },
    { new: true }
  );
  if (!movie.acknowledged) throw createError.BadRequest(msg.update_error);

  const genre = await GenreModel.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );
  throw !genre
    ? createError.NotFound(msg.not_found)
    : res.status(201).json({ data: genre, message: msg.update });
};

const deleteGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await GenreModel.findByIdAndRemove(id);
  if (!genre) throw createError.NotFound(msg.delete_error);
  res.status(200).json(msg.delete);
};

module.exports = {
  getGenre,
  getGenreById,
  setGenre,
  updateGenre,
  deleteGenre,
};
