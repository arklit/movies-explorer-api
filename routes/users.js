const router = require('express').Router();
const { getUser, updateUser, signOut } = require('../controllers/users');
const { userValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', userValidation, updateUser);
router.delete('/signout', signOut);

module.exports = router;
