const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const messages = require('../errors/errorsMessages');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messages.badRequestError);
      }
      next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const id = req.user._id;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(messages.notFoundError);
      }
      if (movie.owner.toString() !== id) {
        throw new ForbiddenError(messages.forbiddenError);
      } else {
        return movie.remove()
          .then(() => res.status(200).send(movie));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  deleteMovie,
  addMovie,
};
