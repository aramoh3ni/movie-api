const { GenreModel } = require("../models/genre.model");
const { MovieModel, validateMovie } = require("../models/movie.model");

async function getMovies(req, res) {
  try {
    const movies = await MovieModel.find().sort("name");
    return !movies
      ? res.status(404).send("No Value.")
      : res.status(200).json(movies);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);
    return !movie
      ? res.status(404).send("Not Value.")
      : res.status(200).send(movie);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function setMovie(req, res) {
  try {
    const { id } = req.params;
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await MovieModel.findById(id);
    if (movie)
      return res.status(400).send(`Item with ${req.body.title} name exists.`);

    const genre = await GenreModel.findById(req.body.genre);
    if (!genre) return res.status(400).json("Invalid Genre");

    req.body.genre = {
      _id: genre._id,
      name: genre.name,
    };

    let newMovie = new MovieModel(req.body);

    await newMovie.save();
    return !newMovie
      ? res.status(400).send("Item not inserted!")
      : res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await GenreModel.findById(req.body.genreId);
    if (!genre) return res.status(404).json("Invalid Genre");

    req.body.genre = {
      _id: genre._id,
      name: genre.name
    };

    const movie = await MovieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return !movie
      ? res.status(400).send("Update faild.")
      : res.status(201).json("Update Successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const result = await MovieModel.findByIdAndDelete(id);
    return result
      ? res.status(400).send(`Item with id not exists.`)
      : res.status(200).send("Delete Successfuly.");
  } catch (err) {
    res.status(400).json(err.message);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  setMovie,
  updateMovie,
  deleteMovie,
};
