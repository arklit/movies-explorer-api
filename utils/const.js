const {
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  dataMovies, PORT, JWT_SECRET, NODE_ENV,
};
