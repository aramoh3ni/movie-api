const { GenreModel } = require("../models/genre.model");
const { MovieModel, validateMovie } = require("../models/movie.model");

async function getMovies(req, res) {
  const movies = await MovieModel.find().sort("name");
  return !movies
    ? res.status(404).send("No Value.")
    : res.status(200).send(movies);
}

async function getMovieById(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findById(id);
  return !movie
    ? res.status(404).send("Not Value.")
    : res.status(200).send(movie);
}

async function setMovie(req, res) {
  const { id } = req.params;
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await MovieModel.findById(id);
  if (movie)
    return res.status(400).send(`Item with ${req.body.title} name exists.`);

  const genre = await GenreModel.findById(req.body.genre);
  if (!genre) return res.status(400).send("Invalid Genre");

  req.body.genre = {
    _id: genre._id,
    name: genre.name,
  };

  let newMovie = new MovieModel(req.body);

  await newMovie.save();
  return !newMovie
    ? res.status(400).send("Item not inserted!")
    : res.status(201).send(newMovie);
}

async function updateMovie(req, res) {
  const { id } = req.params;
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await GenreModel.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Invalid Genre");

  req.body.genre = {
    _id: genre._id,
    name: genre.name,
  };

  const movie = await MovieModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return !movie
    ? res.status(400).send("Update faild.")
    : res.status(201).send("Update Successfully.");
}

async function deleteMovie(req, res) {
  const { id } = req.params;
  const result = await MovieModel.findByIdAndDelete(id);
  return result
    ? res.status(400).send(`Item with id not exists.`)
    : res.status(200).send("Delete Successfuly.");
}

module.exports = {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
};
