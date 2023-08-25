const axios = require("axios");
const { isEmptyStr } = require("../utils");

class RingsSDK {
  // accessToken - User specific credential
  // apiBaseUrl - The Url of the of the API. This will help us to reach different environments
  constructor({ accessToken, apiBaseUrl }) {
    this.accessToken = accessToken;
    this.apiBaseUrl = apiBaseUrl;
  }

  // Private method to build api URL
  #buildApiUrl(resource, filters = []) {
    const url = `${this.apiBaseUrl}/${resource}`;
    if (filters.length > 0) {
      const queryStr = filters.join("&");
      return `${url}?${queryStr}`;
    }
    return url;
  }

  // Private method to call API
  async #invokeApiGet(apiUrl) {
    try {
      const { data } = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
      return data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  /**
   * Fetches all movies
   * @param {string[]} filters Array of optional filters to be applied. Example: ["budgetInMillions<100", "academyAwardWins>0"]
   * @returns {Promise<Object>} A promise that resolves with the fetched movies.
   * @throws {Error} If the API request fails or returns an error.
   */
  getMovies(filters) {
    return this.#invokeApiGet(this.#buildApiUrl("movie", filters));
  }

  /**
   * Fetches a specific movie for the provided movie ID.
   * @param {string} id Movie ID.
   * @returns {Promise<Object>} A promise that resolves with a fetched movie.
   * @throws {Error} If a required movie id is missing or invalid, and if the API request fails or returns an error.
   */
  getMovieById(id) {
    if (isEmptyStr(id)) {
      throw new Error("Movie Id is missing");
    }
    return this.#invokeApiGet(this.#buildApiUrl(`movie/${id}`));
  }

  /**
   * Fetches a specific movie quote.
   * @param {string} id Movie ID.
   * @returns {Promise<Object>} A promise that resolves with a fetched movie quote.
   * @throws {Error} If a required movie id is missing or invalid, and if the API request fails or returns an error.
   */
  getMovieQuotes(id) {
    if (isEmptyStr(id)) {
      throw new Error("Movie Id is missing");
    }
    return this.#invokeApiGet(this.#buildApiUrl(`movie/${id}/quote`));
  }

  /**
   * Fetches all quotes
   * @param {string[]} filters Array of optional filters to be applied. Example ["dialog=Deagol!", "character=5cd99d4bde30eff6ebccfe9e"]
   * @returns {Promise<Object>} A promise that resolves with the fetched quotes.
   * @throws {Error} If the API request fails or returns an error.
   */
  getQuotes(filters) {
    return this.#invokeApiGet(this.#buildApiUrl("quote", filters));
  }

  /**
   * Fetches a specific quote for the provided quote ID.
   * @param {string} id Quote ID.
   * @returns {Promise<Object>} A promise that resolves with a fetched quote.
   * @throws {Error} If a required quote id is missing or invalid, and if the API request fails or returns an error.
   */
  getQuoteById(id) {
    if (isEmptyStr(id)) {
      throw new Error("Quote Id is missing");
    }

    return this.#invokeApiGet(this.#buildApiUrl(`quote/${id}`));
  }
}

/**
 * Intialize RingsSDK
 * @param {Object} config An object containing SDK configuration options such as accessToken, apiBaseUrl.
 * @returns An instance of sdk.
 * @throws {Error} If a required properties such as accessToken, apiBaseUrl are missing or invalid.
 */
function initializeSDK(config = {}) {
  const { accessToken, apiBaseUrl } = config;

  if (isEmptyStr(accessToken)) {
    throw new Error("SDK initialization failed: accessToken is required");
  }
  if (isEmptyStr(apiBaseUrl)) {
    throw new Error("SDK initialization failed: apiBaseUrl is required");
  }
  return new RingsSDK(config);
}

module.exports = {
  initializeSDK,
};
