const debug = require('debug')('app:startup');

const morgan = require('morgan');
const logger = require("./middleware/logger");
const express = require("express");
const app = express();

// ENV VARIABLES
require('dotenv').config();
const envirnment = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);

// SETUP ENVIRNMENT
if (envirnment === 'development') {
  app.use(morgan('tiny'));
  debug("Morgan enabled...");
}

// ROUTES
const movies = require('./Routes/movie');
const genres = require('./Routes/genre');
const books = require('./Routes/books');
const home = require('./Routes/main');

app.use('/api/movies', movies);
app.use('/api/books', books);
app.use('/api/genres', genres);
app.use('/', home);

app.listen(PORT, (err) => {
  if (err) console.log(`Connection: ${err}`);
  else console.log(`Server Listening on PORT ${PORT} 🚀`);
});
