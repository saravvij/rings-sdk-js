const { initializeSDK } = require("../index");

// Client specific configuration
const config = {
  accessToken: "QK-hXScg9pmSwNIt7pb6",
  apiBaseUrl: "https://the-one-api.dev/v2",
};

// Initialize sdk with configuration
const sdk = initializeSDK(config);

// Fetch movies
let filters = ["budgetInMillions<100", "budgetInMillions>93"];
sdk
  .getMovies(filters)
  .then((movies) => console.log(movies))
  .catch((e) => console.log(e));

// Fetch movies by Id
sdk
  .getMovieById("5cd95395de30eff6ebccde56")
  .then((movies) => console.log(movies))
  .catch((e) => console.log(e));

// Fetch movie quotes by Id
sdk
  .getMovieQuotes("5cd95395de30eff6ebccde56")
  .then((movies) => console.log(movies))
  .catch((e) => console.log(e));

// Fetch quotes
filters = ["dialog=Deagol!", "character=5cd99d4bde30eff6ebccfe9e"];
sdk
  .getQuotes(filters)
  .then((quotes) => console.log(quotes))
  .catch((e) => console.log(e));

// Fetch quote by Id
sdk
  .getQuoteById("5cd96e05de30eff6ebcce7f6")
  .then((movies) => console.log(movies))
  .catch((e) => console.log(e));
