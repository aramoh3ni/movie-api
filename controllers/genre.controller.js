// MODEL & VALIDATION
const { GenreModel, validateGenre } = require("../models/genre.model");
const { MovieModel } = require("../models/movie.model");

const getGenre = async (req, res) => {
  try {
    const genres = await GenreModel.find().sort({ name: 1 });
    return !genres
      ? res.status(404).json("No Value.")
      : res.status(200).json(genres);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await GenreModel.findById(id);
    return !genre
      ? res.status(404).json("Not Found!")
      : res.status(200).json(genre);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const setGenre = async (req, res) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const genreExists = await GenreModel.findOne({ name: req.body.name });
    if (genreExists) return res.status(400).json("Item Exists");

    const genre = new GenreModel({
      name: req.body.name,
    });

    const result = await genre.save();
    return !result
      ? res.status(400).json("Item not Insert")
      : res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // Update all Movies with current genre id
    const movie = await MovieModel.updateMany(
      { "genre._id": id },
      { "genre.name": req.body.name },
      { new: true }
    );
    if(!movie.acknowledged) return res.status(400).json("Movie collection Update faild.")
    
    // Update Genre
    const genre = await GenreModel.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true }
    );
    return !genre
      ? res.status(404).json("The genre with the given ID was not found.")
      : res.status(201).json(genre);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await GenreModel.findByIdAndRemove(id);
    if (!genre)
      return res.status(404).json("The genre with the given ID was not found.");

    res.status(200).json("Genre Deleted Successfully.");
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  getGenre,
  getGenreById,
  setGenre,
  updateGenre,
  deleteGenre,
};
