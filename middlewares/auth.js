const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const messages = require('../errors/errorsMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError(messages.unauthorizeError);
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    throw new UnauthorizedError(messages.unauthorizeError);
  }
};
