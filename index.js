const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const { fakebooks } = require("./data/mock.json");

app.get("/", (req, res) => {
  return res.send("Hello World!!!");
});

app.get("/api/books", (req, res) => {
  return res.send(JSON.stringify(fakebooks));
});

app.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const data = await fakebooks.find((item) => item._id === parseInt(id));
  if (!data) return res.status(404).send("Not Found");
  else return res.status(200).send(data);
});

app.post("/api/books", async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const book = {
      _id: data.length + 1,
      name: req.body.name,
      genre: req.body.genre,
      isbn: req.body.isbn,
      published_on: req.body.published_on,
    };

    const result = await fakebooks.push(book);
    if (!result) return res.status(404).send("Item Not Insert");

    return res.status(200).send("Insert Sucessfully");
  } catch (err) {
    return res.status(400).send(err.code);
  }
});

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = Joi.object({
    id: Joi.number().integer().required(),
  }).validate({ id });
  if (error) return res.status(400).json(error.details[0].message);

  try {
    // VALIDATE THE BODY
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // CHECK IF ITEM EXISTS
    let data = await fakebooks.find((item) => item._id === parseInt(id));
    if (!data) return res.status(404).send("Item not Exists");

    // Update here.

    res.status(200).send("Update SUccessfulyy");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // CHECK IF ITEM EXISTS
    let data = await fakebooks.find((item) => item._id === parseInt(id));
    if (!data) return res.status(404).json("Item not Exists");

    const index = fakebooks.indexOf(data);
    fakebooks.splice(index, 1);

    res.status(200).send("Delete Successfully");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

const validateBook = (book) => {
  const result = Joi.object({
    name: Joi.string().min(3).max(30).required().label("Name"),
    isbn: Joi.string().strip().min(3).max(30).required().label("ISBN"),
    genre: Joi.string().min(6).max(10).required().strip(),
    publish_year: Joi.number()
      .integer()
      .min(1980)
      .max(2014)
      .label("Published Year"),
  }).validate(book);

  return result;
};

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server Listening on PORT ${PORT} 🚀`);
});
