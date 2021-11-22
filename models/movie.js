const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../errors/errorsMessages');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messages.url,
    },
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messages.url,
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: messages.url,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEU: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
