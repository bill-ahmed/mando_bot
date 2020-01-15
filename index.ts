const { App } = require('@slack/bolt');

const PORT = 3500;                        // Use port 2500
const config = require('./config.json');  // Load config info

const app = new App({
  signingSecret: config.slack.signing_secret,
  token: config.slack.bot_token,
});

app.error((err: any) => {
  console.error(err);
});

/* Add functionality here */
app.message('test', async ({ message, say }: any) => {
  console.log(message);
  say(`Hello, <@${message.user}>`);
});




(async () => {
  // Start the app
  await app.start(PORT);

  console.log(`⚡️  Bolt app is running on: http://localhost:${PORT} ⚡️`);
})();