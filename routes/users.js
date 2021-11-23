const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { userValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', userValidation, updateUser);

module.exports = router;
