const createError = require("http-errors");
const { GenreModel } = require("../models/genre.model");
const { MovieModel, validateMovie } = require("../models/movie.model");

const { messages } = require("../constants/message");
const msg = messages("Movie");

async function getMovies(req, res) {
  const movies = await MovieModel.find().sort("name");
  throw !movies
    ? createError.BadRequest(msg.not_found)
    : res.status(200).json({ data: movies });
}

async function getMovieById(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findById(id);
  return !movie
    ? res.status(404).json("Not Value.")
    : res.status(200).json(movie);
}

async function setMovie(req, res) {
  const { id } = req.params;

  const movie = await MovieModel.findById(id);
  if (movie) throw createError.NotAcceptable(msg.item_exists);

  const genre = await GenreModel.findById(req.body.genre);
  if (!genre) throw createError.NotFound(messages("Genre").not_found);

  req.body.genre = {
    _id: genre._id,
    name: genre.name,
  };

  let newMovie = new MovieModel(req.body);

  await newMovie.save();
  throw !newMovie
    ? createError.BadRequest(msg.create_error)
    : res.status(201).json({ data: newMovie, message: msg.create });
}

async function updateMovie(req, res) {
  const { id } = req.params;

  const genre = await GenreModel.findById(req.body.genreId);
  if (!genre) throw createError.NotFound(messages("Genere").not_found);

  req.body.genre = {
    _id: genre._id,
    name: genre.name,
  };

  const movie = await MovieModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  throw !movie
    ? createError.BadRequest(msg.update_error)
    : res.status(200).json({ data: movie, message: msg.update });
}

async function deleteMovie(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findByIdAndDelete(id);
  throw movie
    ? createError.BadRequest(msg.delete_error)
    : res.status(200).json({ message: msg.delete });
}

module.exports = {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
};
