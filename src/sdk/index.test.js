const { initializeSDK } = require("./index");
const axios = require("axios");

jest.mock("axios");

describe("SDK", () => {
  const accessToken = "test-access-token";
  const apiBaseUrl = "http://test-rings.com/v2";
  const headers = { Authorization: `Bearer ${accessToken}` };

  const config = {
    accessToken,
    apiBaseUrl,
  };

  test("able to successfully initalize sdk", () => {
    const sdk = initializeSDK(config);
    expect(sdk).toBeTruthy();
  });

  test("accessToken is required to initialize sdk", () => {
    expect(() => {
      initializeSDK({ apiBaseUrl });
    }).toThrow("SDK initialization failed: accessToken is required");
  });

  test("apiBaseUrl is required to initialize sdk", () => {
    expect(() => {
      initializeSDK({ accessToken });
    }).toThrow("SDK initialization failed: apiBaseUrl is required");
  });

  test("able to fetch movies", async () => {
    const mockedData = {
      docs: [
        { id: 1, name: "Hobbit" },
        { id: 2, name: "Rings" },
      ],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const sdk = initializeSDK(config);
    const movies = await sdk.getMovies();

    expect(movies).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}/movie`, {
      headers,
    });
  });

  test("able to fetch movies with filters", async () => {
    const mockedData = {
      docs: [
        { id: 1, name: "Hobbit" },
        { id: 2, name: "Rings" },
      ],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const sdk = initializeSDK(config);
    const filters = ["budgetInMillions<100", "budgetInMillions>93"];
    const movies = await sdk.getMovies(filters);

    expect(movies).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(
      `${apiBaseUrl}/movie?budgetInMillions<100&budgetInMillions>93`,
      {
        headers,
      }
    );
  });

  test("able to fetch movie by Id", async () => {
    const mockedData = {
      docs: [{ id: 1, name: "Hobbit" }],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const id = 1;
    const sdk = initializeSDK(config);
    const movie = await sdk.getMovieById(id);

    expect(movie).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}/movie/${id}`, {
      headers,
    });
  });

  test("able to fetch movie quotes by Id", async () => {
    const mockedData = {
      docs: [{ id: 1, name: "Hobbit" }],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const id = 1;
    const sdk = initializeSDK(config);
    const movie = await sdk.getMovieQuotes(id);

    expect(movie).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}/movie/${id}/quote`, {
      headers,
    });
  });

  test("movied Id is required to fetch movies by Id", () => {
    const sdk = initializeSDK(config);
    expect(() => {
      sdk.getMovieById();
    }).toThrow("Movie Id is missing");
  });

  test("able to fetch quotes", async () => {
    const mockedData = {
      docs: [
        { id: 1, name: "Deagol" },
        { id: 2, name: "Why?" },
      ],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const sdk = initializeSDK(config);
    const movies = await sdk.getQuotes();

    expect(movies).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}/quote`, {
      headers,
    });
  });

  test("able to fetch quotes with filters", async () => {
    const mockedData = {
      docs: [
        { id: 1, name: "Deagol" },
        { id: 2, name: "Why?" },
      ],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const sdk = initializeSDK(config);
    const filters = ["dialog=Deagol!"];
    const quotes = await sdk.getQuotes(filters);

    expect(quotes).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(
      `${apiBaseUrl}/quote?dialog=Deagol!`,
      {
        headers,
      }
    );
  });

  test("able to fetch quote by Id", async () => {
    const mockedData = {
      docs: [{ id: 1, name: "Deagol" }],
    };
    const mockedResponse = { data: { ...mockedData } };
    axios.get.mockResolvedValue(mockedResponse);

    const id = 1;
    const sdk = initializeSDK(config);
    const quote = await sdk.getQuoteById(id);

    expect(quote).toEqual(mockedData);
    expect(axios.get).toHaveBeenCalledWith(`${apiBaseUrl}/movie/${id}`, {
      headers,
    });
  });

  test("quote Id is required to fetch quote by Id", () => {
    const sdk = initializeSDK(config);
    expect(() => {
      sdk.getQuoteById();
    }).toThrow("Quote Id is missing");
  });
});
