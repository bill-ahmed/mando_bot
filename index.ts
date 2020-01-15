const { App } = require('@slack/bolt');

const config = require('./config.json');

const app = new App({
  signingSecret: config.slack.signing_secret,
  token: config.slack.bot_token,
});

app.error((err: any) => {
  console.error(err);
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();