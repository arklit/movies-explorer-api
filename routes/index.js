const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const messages = require('../errors/errorsMessages');

const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(messages.crashTest);
  }, 0);
});

router.use('*', () => {
  throw new NotFoundError(messages.notFoundError);
});

module.exports = router;
