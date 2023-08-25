# Lord of the Rings SDK

## Install

### Prerequisites

1. Node v18+
2. Terminal / CMD

### Steps

As rings-sdk is not published in npm public repo, follow the steps to install or link rings-sdk to your local npm repository to use in your node project.

#### 1. Open termimal and clone the repo.

```
git clone https://github.com/hatchways-community/08462b1fb4304fcc9f0e681eca2763d2.git
```

#### 2. Change to repo directory and install dependencies

```
cd 08462b1fb4304fcc9f0e681eca2763d2
npm install
```

#### 3. Link the Rings SDK package to local npm repository by running the below command

```
npm link
```

#### 4. Go to your node project where you would want to use the rings-sdk, Otherwise create a node project by following the below steps

```
cd ..
mkdir sdk-test
cd sdk-test
npm init
touch index.js
```

#### 5. Link rings-sdk to your project, this will install rings-sdk package to your project node_modules.

```
npm link rings-sdk
```

Note: Make sure, you are inside your `sdk-test` project while performing this step.

#### 6. Add below client test code into your `sdk-test` project's `index.js` file

```
const { initializeSDK } = require("rings-sdk");

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

```

#### 7. Run your sdk-test/index.js file, and you should be able to see the results printed on console.

```
node index.js
```

## Run Unit Tests in rings-sdk

#### 1. Go to the repo 08462b1fb4304fcc9f0e681eca2763d2 where you have cloned.

```
cd 08462b1fb4304fcc9f0e681eca2763d2
```

#### 2. Run unit test

```
npm run test
```
