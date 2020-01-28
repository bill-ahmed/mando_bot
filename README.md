# Slack Bot
This Slack bot was created as a fun side-project 😊.

## Setup
This application requires the LTS version of [NodeJS](https://nodejs.org/en/download/).

1. Installed LTS version of NodeJS
2. In the root directory, run `npm install` to get all dependencies
3. Create a folder called `logs` in the root directory
4. Done!

## Running the app
In the project repo, use `npm run dev` to start the server in development mode. For other use cases, take a look at `package.json` for additional scripts.
* Build JS Bundle: `npm run build`
* Production: `NODE_ENV=production node ./build/index.js`
* Etc...


## Additional Notes
All logging will be sent to the console when running in dev. All error/info/etc. logs are combined into a single file when in production.