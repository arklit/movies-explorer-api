const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');
const messages = require('../errors/errorsMessages');

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.url);
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.url);
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError(messages.url);
      }
      return value;
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  userValidation,
  movieValidation,
  createUserValidation,
  loginValidation,
  movieIdValidation,
};
