Please answer the following questions about your work:

0 - What language did you program in?
JavaScript on Node.js

1 - Have you manually tested the SDK?
Yes. Go through the `client/test.js` file.

2 - Did you add a test suite? If so, how will we use it? If not, why?
Yes. Run the below command to run test suite
` npm run test`

3 - Did you use any 3rd party library? Why did you use it? What are the tradeoffs?
Yes. Using 3rd library called `axios` to call `The One APIs`. It will be an additional work if we want to build our own fetch APIs using node.js native functions. The tradeoffs of using `axios` is, it increases the bundle size of our sdk package, and also need to take care of upgrading `axios` dependencies when there is an update.

4 - Do you feel this SDK makes it easier to interact with the API?
Of course, SDK abstracts out complexities of calling API, authentication, error handling

5 - If you had more time, what else would you add?

- I will try using `node-fetch` API rather than using `axios`. This will help us to easily switch to node.js's native fetch API when it becomes available in future node.js versions.
- I would add typescript for managability.
- Generate API documenation using tools like JSDOC.

6 - What would you change in your current SDK solution?
The current solution looks good, However, will improve the solution as described in question 5.

7 - On a scale of 1 to 10 (10 being the highest), how would you rate this solution?
10

8 - Anything else we should keep in mind when we evaluate the project?

- The SDK is not published to npm repostiry for privacy reason, need to use it locally by copying the source code into any project or using `npm link` described in installation steps.
- Passing `apiBaseUrl` to initializeSDK() function is debatable. The idea of having this config is to reach different environments.
