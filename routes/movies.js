const router = require('express').Router();
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', movieValidation, addMovie);
router.delete('/movies/:_id', movieIdValidation, deleteMovie);

module.exports = router;
